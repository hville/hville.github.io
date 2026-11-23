// Build a stratified 60-review gold set from data/resto/central_mtl_reviews.json.gz.
// Deterministic (seeded PRNG) across 60 distinct places.
// Never modifies central_mtl_reviews.json.gz (review keys are place_id:index).
//
// Usage: node data/resto/make_gold_set.js

import {readFileSync, writeFileSync} from 'node:fs'
import {gunzipSync} from 'node:zlib'
import {join} from 'node:path'

const dir = import.meta.dirname,
			reviewsPath = join(dir, 'central_mtl_reviews.json.gz'),
			outPath = join(dir, 'gold_set.json')

const guide = {
	instructions:
		'Hand-label each item\'s `gold` object using the allowed values below. ' +
		'Leave `quote` as null if nothing is funny/revealing, if any red flag is present, ' +
		'or if a usable excerpt would name a staff member or reviewer. ' +
		'`quote` must be a verbatim substring of `text` (<=180 chars) in FR, EN, or ES.',
	primary: [
		'rude', 'slow', 'authentic', 'friction', 'entitled', 'loud', 'decor', 'price',
		'food', 'hygiene', 'decline', 'shady', 'serious',
		'noise', 'none',
	],
	complaints: ['rude', 'slow', 'authentic', 'friction', 'entitled', 'loud', 'decor', 'price'],
	red_flags: ['food', 'hygiene', 'decline', 'shady', 'serious'],
	channel: ['dine_in', 'takeout', 'delivery', 'unknown'],
	ate: ['ate', 'walked_out_or_turned_away', 'non_food_venue'],
	change: ['none', 'better', 'worse', 'neutral'],
	food_sentiment: '-1 (bad on this visit), 0 (not mentioned / neutral), 1 (praised on this visit — never past-tense \'used to be good\')',
	tone: ['plain', 'reluctant_praise', 'self_own', 'unhinged_owner', 'overdramatic', 'absurd_reason'],
	quotable: '0 (dull) to 3 (genuinely funny or iconic, safe to display)',
}

// Seeded Mulberry32 PRNG + Fisher-Yates shuffle
function mulberry32(seed) {
	return () => {
		seed |= 0
		seed = (seed + 0x6D2B79F5) | 0
		let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296
	}
}

function shuffle(arr, rand) {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(rand() * (i + 1))
		;[arr[i], arr[j]] = [arr[j], arr[i]]
	}
	return arr
}

// Ordered [stratum, quota, matcher(place, review)]
const strata = [
	['slang_qc', 4, (p, r) =>
		/(bouffe.{0,20}(malade|pas pire|[eé]c[oœ]urant)|nourriture.{0,20}(pas pire|malade|[eé]c[oœ]urant)|service b[eê]te|\bpas pire\b)/i.test(r.text)
		&& !/(tomb[eé]|rendu|[eé]t[eé])\s+malade/i.test(r.text)
		&& r.text.length <= 650],

	['sarcasm', 3, (p, r) =>
		/(v[eé]ritable brique|without fish|excellent choix si|best .* if you like|congratulations on|10\/10 if you want|5 stars? for.*(wait|rude|cold))/i.test(r.text)],

	['hygiene_with_praise', 2, (p, r) =>
		/(\bsouris\b|\bmouse\b|\bmice\b|coquerelle|cockroach|\brat\b|intoxication|food poison|tomb[eé] malade|rendu malade)/i.test(r.text)
		&& /(nourriture est bonne|bouffe est bonne|food is good|food was good|tr[eè]s bon|delicious|good food|great food)/i.test(r.text)
		&& r.text.length <= 800],

	['decline_past_praise', 3, (p, r) =>
		/(auparavant|used to be|avant c.[eé]tait|l.ombre de ce qu|used to love|autrefois|has gone downhill|plus comme avant)/i.test(r.text)
		&& r.text.length <= 650],

	['change_hands', 2, (p, r) =>
		/(new owner|nouveau propri|chang[eé] de propri|nouvelle administration|nouvelle direction|under new management)/i.test(r.text)
		&& r.text.length <= 650],

	['tipping', 4, (p, r) =>
		/\b(pourboire obligatoire|mandatory tip|not tipping|assez de tip|22%|20%|18%|gratuity|demande du tip|impos[eé].*tip)\b/i.test(r.text)
		&& r.text.length >= 50 && r.text.length <= 500],

	['delivery', 3, (p, r) =>
		/\b(hubert|uber\s*eats|doordash|skipthedishes|livreur|delivery driver)\b/i.test(r.text)
		&& r.text.length >= 60 && r.text.length <= 500],

	['language_oqlf', 2, (p, r) =>
		/\b(oqlf|loi 96|bill 96|refus[eé] de parler.*fran[cç]ais|speak french|bonjour.?hi|en fran[cç]ais)\b/i.test(r.text)
		&& r.text.length >= 60 && r.text.length <= 500],

	['non_food_venue', 3, (p, r) =>
		/(bouncer|portier|d[eé]panneur|chambre|room|bowling|karaok|cocktail|bi[eè]re|drinks only|margarita)/i.test(r.text)
		&& /(bar|h[oô]tel|hotel|bowling|mart|taverne|pub|lounge|club|karaok)/i.test(`${p.name} ${p.type}`)
		&& r.text.length <= 600],

	['walkout', 3, (p, r) =>
		/(sommes partis|nous sommes lev[eé]s|walked out|we left|refused to seat|refus[eé] de nous asseoir|full party|tout le groupe)/i.test(r.text)
		&& r.text.length >= 60 && r.text.length <= 550],

	['serious', 3, (p, r) =>
		/\b(racis[mt]|discriminat|allergi[ec]|celiac|c[oœ]liaque|harc[eè]lement|harass|wheelchair|fauteuil roulant)\b/i.test(r.text)
		&& r.text.length >= 60 && r.text.length <= 600],

	['staff_named', 2, (p, r) =>
		/(?:\b(serveur|serveuse|waiter|waitress|g[eé]rant|manager|par)\s+)(?!Uber|Ubereats|Doordash|Skip|Google|Montr[eé]al|Canada|Qu[eé]bec|Saint|Sainte|Rue|Jean|Notre|Pour|Mais|Très|Tres|Tout|Nous|Vous|Avec|Sans|Cette|Dans)[A-ZÉÈÊ][a-zàâéèêîôùûç]{2,11}\b/.test(r.text)
		&& r.text.length >= 50 && r.text.length <= 550],

	['price_boundary', 3, (p, r) =>
		/(gen[eè]ve|copenhague|trop cher|overpriced|way too expensive|shrinkflation)/i.test(r.text)
		&& r.text.length >= 50 && r.text.length <= 350],

	['authentic', 3, (p, r) =>
		/\b(cash only|comptant seulement|argent comptant|pas de carte|no substitution|too spicy|trop [eé]pic[eé]|tasting menu|menu d[eé]gustation|pas de r[eé]servation)\b/i.test(r.text)
		&& r.text.length >= 50 && r.text.length <= 500],

	['decor_loud', 2, (p, r) =>
		/\b(courant d.air|draft|by the door|pr[eè]s de la porte|trop bruyant|too loud|can.t hear|s.entendre parler)\b/i.test(r.text)
		&& r.text.length >= 50 && r.text.length <= 500],

	['comedy_owner_meta', 3, (p, r) =>
		/(comment.+4\.|how does this have|don.t understand the (high|good) rating|tape sur notre table|crie sur nous|yelled at us|tiktok|gen[eè]ve)/i.test(r.text)
		&& r.text.length >= 50 && r.text.length <= 500],

	['spanish', 5, (p, r) =>
		/\b(comida|servicio|p[eé]simo|muy mala|muy bueno|nunca m[aá]s|no recomiendo|mesero|mesera|restaurante|caro para)\b/i.test(r.text)
		&& !/\b(tr[eè]s|vraiment|nourriture|bouffe|avec|pour|n[aã]o|muito|esse|prato|fica|saindo|the food|was horrible)\b/i.test(r.text)
		&& r.text.length >= 40 && r.text.length <= 500],

	['polite_2_3_star', 3, (p, r) =>
		(r.stars === 2 || r.stars === 3) && r.text.length >= 40 && r.text.length <= 400],

	['noise', 2, (p, r) =>
		r.text.trim().length <= 45
		|| /(ferm[eé] alors que|closed when google|wrong address|ancien emplacement|mauvais resto)/i.test(r.text)],
]

const rand = mulberry32(20261122)
const places = JSON.parse(gunzipSync(readFileSync(reviewsPath)).toString('utf8'))
const allItems = places.flatMap(p => p.reviews.map((r, idx) => ({p, idx, r})))

const selected = []
const usedIds = new Set()
const usedPlaces = new Set()

function pick(stratum, quota, matcher) {
	const cands = shuffle(
		allItems.filter(({p, idx, r}) => !usedIds.has(`${p.id}:${idx}`) && !usedPlaces.has(p.id) && matcher(p, r)),
		rand
	)
	let added = 0
	for (const {p, idx, r} of cands) {
		if (usedPlaces.has(p.id)) continue
		usedIds.add(`${p.id}:${idx}`)
		usedPlaces.add(p.id)
		selected.push({stratum, p, idx, r})
		if (++added === quota) break
	}
	if (added < quota) console.warn(`WARN: stratum ${stratum} matched ${added}/${quota}`)
}

for (const [stratum, quota, matcher] of strata) pick(stratum, quota, matcher)

const remaining = 60 - selected.length
if (remaining > 0) pick('random_baseline', remaining, (p, r) => r.text.length >= 40 && r.text.length <= 600)

const items = selected.map(({stratum, p, idx, r}, i) => ({
	num: i + 1,
	id: `${p.id}:${idx}`,
	stratum,
	place: p.name,
	cuisine: p.type,
	stars: r.stars,
	date: r.date,
	text: r.text,
	gold: {
		primary: '',
		complaints: [],
		red_flags: [],
		channel: '',
		ate: '',
		change: 'none',
		food_sentiment: 0,
		tone: 'plain',
		quotable: 0,
		quote: null,
		notes: '',
	},
}))

const payload = {
	version: 1,
	created: '2026-11-22',
	source: 'data/resto/central_mtl_reviews.json.gz',
	count: items.length,
	guide,
	items,
}

writeFileSync(outPath, JSON.stringify(payload, null, 2) + '\n', 'utf8')
console.log(`Wrote ${items.length} items across ${usedPlaces.size} places to ${outPath}`)
