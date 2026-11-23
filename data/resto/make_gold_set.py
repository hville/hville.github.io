#!/usr/bin/env python3
"""Build a stratified 60-review gold set from data/resto/central_mtl_reviews.json.gz.

Deterministic (seeded) so re-runs reproduce the exact same 60 items across 60
distinct restaurants. Never modifies central_mtl_reviews.json.gz (review keys
are place_id:index).
"""

import gzip
import json
import random
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
REVIEWS_PATH = ROOT / "central_mtl_reviews.json.gz"
OUT_PATH = ROOT / "gold_set.json"

GUIDE = {
	"instructions": (
		"Hand-label each item's `gold` object using the allowed values below. "
		"Leave `quote` as null if nothing is funny/revealing, if any red flag is present, "
		"or if a usable excerpt would name a staff member or reviewer. "
		"`quote` must be a verbatim substring of `text` (<=180 chars) in FR, EN, or ES."
	),
	"primary": [
		"rude", "slow", "authentic", "friction", "entitled", "loud", "decor", "price",
		"food", "hygiene", "decline", "shady", "serious",
		"noise", "none",
	],
	"complaints": ["rude", "slow", "authentic", "friction", "entitled", "loud", "decor", "price"],
	"red_flags": ["food", "hygiene", "decline", "shady", "serious"],
	"channel": ["dine_in", "takeout", "delivery", "unknown"],
	"ate": ["ate", "walked_out_or_turned_away", "non_food_venue"],
	"change": ["none", "better", "worse", "neutral"],
	"food_sentiment": "-1 (bad on this visit), 0 (not mentioned / neutral), 1 (praised on this visit — never past-tense 'used to be good')",
	"tone": ["plain", "reluctant_praise", "self_own", "unhinged_owner", "overdramatic", "absurd_reason"],
	"quotable": "0 (dull) to 3 (genuinely funny or iconic, safe to display)",
}

# Ordered (stratum, quota, matcher_fn)
STRATA = [
	("slang_qc", 4, lambda p, r: bool(re.search(
		r"(bouffe.{0,20}(malade|pas pire|[eé]c[oœ]urant)|nourriture.{0,20}(pas pire|malade|[eé]c[oœ]urant)|service b[eê]te|\bpas pire\b)",
		r["text"], re.I
	)) and not re.search(r"(tomb[eé]|rendu|[eé]t[eé])\s+malade", r["text"], re.I)
		and len(r["text"]) <= 650),

	("sarcasm", 3, lambda p, r: bool(re.search(
		r"(v[eé]ritable brique|without fish|excellent choix si|best .* if you like|congratulations on|10/10 if you want|5 stars? for.*(wait|rude|cold))",
		r["text"], re.I
	))),

	("hygiene_with_praise", 2, lambda p, r: bool(re.search(
		r"(\bsouris\b|\bmouse\b|\bmice\b|coquerelle|cockroach|\brat\b|intoxication|food poison|tomb[eé] malade|rendu malade)",
		r["text"], re.I
	)) and bool(re.search(
		r"(nourriture est bonne|bouffe est bonne|food is good|food was good|tr[eè]s bon|delicious|good food|great food)",
		r["text"], re.I
	)) and len(r["text"]) <= 800),

	("decline_past_praise", 3, lambda p, r: bool(re.search(
		r"(auparavant|used to be|avant c.[eé]tait|l.ombre de ce qu|used to love|autrefois|has gone downhill|plus comme avant)",
		r["text"], re.I
	)) and len(r["text"]) <= 650),

	("change_hands", 2, lambda p, r: bool(re.search(
		r"(new owner|nouveau propri|chang[eé] de propri|nouvelle administration|nouvelle direction|under new management)",
		r["text"], re.I
	)) and len(r["text"]) <= 650),

	("tipping", 4, lambda p, r: bool(re.search(
		r"\b(pourboire obligatoire|mandatory tip|not tipping|assez de tip|22%|20%|18%|gratuity|demande du tip|impos[eé].*tip)\b",
		r["text"], re.I
	)) and 50 <= len(r["text"]) <= 500),

	("delivery", 3, lambda p, r: bool(re.search(
		r"\b(hubert|uber\s*eats|doordash|skipthedishes|livreur|delivery driver)\b",
		r["text"], re.I
	)) and 60 <= len(r["text"]) <= 500),

	("language_oqlf", 2, lambda p, r: bool(re.search(
		r"\b(oqlf|loi 96|bill 96|refus[eé] de parler.*fran[cç]ais|speak french|bonjour.?hi|en fran[cç]ais)\b",
		r["text"], re.I
	)) and 60 <= len(r["text"]) <= 500),

	("non_food_venue", 3, lambda p, r: bool(re.search(
		r"(bouncer|portier|d[eé]panneur|chambre|room|bowling|karaok|cocktail|bi[eè]re|drinks only|margarita)",
		r["text"], re.I
	)) and bool(re.search(
		r"(bar|h[oô]tel|hotel|bowling|mart|taverne|pub|lounge|club|karaok)",
		p["name"] + " " + p["type"], re.I
	)) and len(r["text"]) <= 600),

	("walkout", 3, lambda p, r: bool(re.search(
		r"(sommes partis|nous sommes lev[eé]s|walked out|we left|refused to seat|refus[eé] de nous asseoir|full party|tout le groupe)",
		r["text"], re.I
	)) and 60 <= len(r["text"]) <= 550),

	("serious", 3, lambda p, r: bool(re.search(
		r"\b(racis[mt]|discriminat|allergi[ec]|celiac|c[oœ]liaque|harc[eè]lement|harass|wheelchair|fauteuil roulant)\b",
		r["text"], re.I
	)) and 60 <= len(r["text"]) <= 600),

	("staff_named", 2, lambda p, r: bool(re.search(
		r"(?:\b(serveur|serveuse|waiter|waitress|g[eé]rant|manager|par)\s+)(?!Uber|Ubereats|Doordash|Skip|Google|Montr[eé]al|Canada|Qu[eé]bec|Saint|Sainte|Rue|Jean|Notre|Pour|Mais|Très|Tres|Tout|Nous|Vous|Avec|Sans|Cette|Dans)[A-ZÉÈÊ][a-zàâéèêîôùûç]{2,11}\b",
		r["text"]
	)) and 50 <= len(r["text"]) <= 550),

	("price_boundary", 3, lambda p, r: bool(re.search(
		r"(gen[eè]ve|copenhague|trop cher|overpriced|way too expensive|shrinkflation)",
		r["text"], re.I
	)) and 50 <= len(r["text"]) <= 350),

	("authentic", 3, lambda p, r: bool(re.search(
		r"\b(cash only|comptant seulement|argent comptant|pas de carte|no substitution|too spicy|trop [eé]pic[eé]|tasting menu|menu d[eé]gustation|pas de r[eé]servation)\b",
		r["text"], re.I
	)) and 50 <= len(r["text"]) <= 500),

	("decor_loud", 2, lambda p, r: bool(re.search(
		r"\b(courant d.air|draft|by the door|pr[eè]s de la porte|trop bruyant|too loud|can.t hear|s.entendre parler)\b",
		r["text"], re.I
	)) and 50 <= len(r["text"]) <= 500),

	("comedy_owner_meta", 3, lambda p, r: bool(re.search(
		r"(comment.+4\.|how does this have|don.t understand the (high|good) rating|tape sur notre table|crie sur nous|yelled at us|tiktok|gen[eè]ve)",
		r["text"], re.I
	)) and 50 <= len(r["text"]) <= 500),

	("spanish", 5, lambda p, r: bool(re.search(
		r"\b(comida|servicio|p[eé]simo|muy mala|muy bueno|nunca m[aá]s|no recomiendo|mesero|mesera|restaurante|caro para)\b",
		r["text"], re.I
	)) and not bool(re.search(r"\b(tr[eè]s|vraiment|nourriture|bouffe|avec|pour|n[aã]o|muito|esse|prato|fica|saindo)\b", r["text"], re.I))
		and 40 <= len(r["text"]) <= 500),

	("polite_2_3_star", 3, lambda p, r: r["stars"] in (2, 3) and 40 <= len(r["text"]) <= 400),

	("noise", 2, lambda p, r: (
		len(r["text"].strip()) <= 45
		or bool(re.search(r"(ferm[eé] alors que|closed when google|wrong address|ancien emplacement|mauvais resto)", r["text"], re.I))
	)),
]


def main():
	rng = random.Random(20261122)
	with gzip.open(REVIEWS_PATH, "rt", encoding="utf-8") as f:
		places = json.load(f)

	all_items = []
	for p in places:
		for idx, r in enumerate(p["reviews"]):
			all_items.append((p, idx, r))

	selected = []
	used_ids = set()
	used_places = set()

	def pick(stratum, quota, matcher):
		cands = [
			item for item in all_items
			if f"{item[0]['id']}:{item[1]}" not in used_ids
			and item[0]["id"] not in used_places
			and matcher(item[0], item[2])
		]
		rng.shuffle(cands)
		chosen = cands[:quota]
		for p, idx, r in chosen:
			rid = f"{p['id']}:{idx}"
			used_ids.add(rid)
			used_places.add(p["id"])
			selected.append((stratum, p, idx, r))
		if len(chosen) < quota:
			print(f"WARN: stratum {stratum} only matched {len(chosen)}/{quota}")

	for stratum, quota, matcher in STRATA:
		pick(stratum, quota, matcher)

	remaining = 60 - len(selected)
	if remaining > 0:
		pick("random_baseline", remaining, lambda p, r: 40 <= len(r["text"]) <= 600)

	items_out = []
	for i, (stratum, p, idx, r) in enumerate(selected, 1):
		items_out.append({
			"num": i,
			"id": f"{p['id']}:{idx}",
			"stratum": stratum,
			"place": p["name"],
			"cuisine": p["type"],
			"stars": r["stars"],
			"date": r["date"],
			"text": r["text"],
			"gold": {
				"primary": "",
				"complaints": [],
				"red_flags": [],
				"channel": "",
				"ate": "",
				"change": "none",
				"food_sentiment": 0,
				"tone": "plain",
				"quotable": 0,
				"quote": None,
				"notes": "",
			},
		})

	payload = {
		"version": 1,
		"created": "2026-11-22",
		"source": "data/resto/central_mtl_reviews.json.gz",
		"count": len(items_out),
		"guide": GUIDE,
		"items": items_out,
	}

	OUT_PATH.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
	print(f"Wrote {len(items_out)} items across {len(used_places)} places to {OUT_PATH}")


if __name__ == "__main__":
	main()
