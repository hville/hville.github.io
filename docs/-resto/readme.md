# resto

![resto](readme.svg)

Discover opinionated Montreal restaurants ignored because of *bad bad reviews*—1–3★ rants where the reviewer is mad about everything except the food.

A 4.8★ spot tries to please everyone. A 3.9★ spot where someone leaves 1 star because *"service bête pis pas de parking, mais bon la bouffe est malade"* is probably worth a visit.

## status & handoff (2026-11-22)

**Where we are:** Data procurement is **done** (total Outscraper spend: **$32.11 USD**, ~$68 headroom left under the $100 cap). A local $0 heuristic peek confirmed strong gems around Little Italy and surfaced key prompt-calibration rules. A keyword check of the saved reviews then refined the tags, scoring and sampling caveats below (see *Sampling caveats*). Ready for a gold set + pilot, then LLM classification + UI build.

**Saved datasets (in repo at `data/resto/`, outside `docs/` so never published on `schem.ist`):**

- `data/resto/central_mtl_places.json.gz` (~390 KB) — **3,023** unique operational places across 48 Central Montreal FSAs (`$7.60`).
- `data/resto/central_mtl_reviews.json.gz` (~1.9 MB) — **602** cleaned independent restaurants within **6.5 km of Little Italy** (`45.5361, -73.6149`, Jean-Talon Market; ~1h walk + generous overshoot) with **11,447** non-empty original-language 1–3★ text reviews (`10,434` 1★, `635` 2★, `378` 3★; ~69% French / ~31% English; `4,725` from 2025–2026; `$24.51`). Reviewer names, user IDs, review IDs, and links are stripped; dates are truncated to `YYYY-MM`.

**Next steps (pick up here):**

1. **Step 4a — Gold set + pilot (a few cents):** the owner hand-labels ~60 varied reviews; run 2 prompt variants on them plus ~200 more; fix the rules. See *Before the full batch*.
2. **Step 4b — Batch LLM classification (~$0.50–$1.50):** classify all 11,447 reviews in `data/resto/central_mtl_reviews.json.gz` with Gemini Flash-Lite (or similar) using the schema and rules below. Save labels only (keyed `place_id:index`, no review text) to `data/resto/classified_reviews.json.gz`.
3. **Decision point — buy more data?** Only if the pilot numbers call for it (see *Decision point* in Step 4).
4. **Step 5 — Local scoring & export ($0):** apply recency weights, change-of-hands cut and veto rules, estimate each place's complaint mix, and write compact `docs/-resto/gems.json` (~150–300 ranked spots) plus optional `data/resto/montreal_gems.csv` for Google My Maps.
5. **Step 6 — Build `docs/-resto/index.html`:** simple, funny, bilingual EN/FR mobile-first list + map toggle, taste picker, *your rating*, "Surprise me" dice button, and `hash-data.js` shareable URL state.

## goals

- **Discover opinionated gems:** surface Central Montreal restaurants (centered on Little Italy, ~1h walk radius + overshoot) whose Google Maps ratings are artificially depressed by unfair, misplaced, or non-food-related complaints.
- **Food first:** a place qualifies only if someone praises its food somewhere in the reviews. Bars and clubs where nobody ate are out, however clean their record.
- **Your taste, your rating:** one person's deal-breaker is another's bonus. Hard parking keeps the crowds away, no discount and no refund show conviction, and a loud room is fun for some and a deal-breaker for others. The user marks each complaint type as a plus, don't care, or minus, and the rating recomputes.
- **Recent first:** owners, chefs and menus change. Recent reviews weigh far more, and reviews from before a detected change of hands barely count.
- **Simple, funny, mobile-first:** lead with the funniest or most revealing bad-review quote, not a wall of analytics. Laugh at the situation, never at a person's identity or at someone who got hurt.
- **Signal over noise:** counteract rating inflation (anchoring, peer pressure, polite 5-star scores) by treating **1–3★ reviews** as higher-signal data. 5★ reviews are never read (often fake or empathy-based); Google's star counts only serve as the baseline the rating starts from.
- **Zero user profiling:** classify complaints purely from in-text tone and complaint type—no reviewer history needed. The user's taste settings live only in their own URL.
- **Bilingual UI, verbatim quotes:** all controls switch EN/FR via `data-lang`, while review quotes stay verbatim in their original French, English, or Franglais (auto-translation kills both the joke and the signal).
- **Offline batch, $0 ongoing:** run strictly as an offline, one-time batch pipeline **under $100 USD total** with **$0 recurring fees** (manual re-runs only if desired later).

## taxonomy: great bad reviews vs. real red flags

One shared tag set is used by the LLM classifier, the static JSON, and the UI.

### Complaint tags (the user can adjust each one)

Each tag is set to 👍 *plus*, 😐 *don't care* (default) or 👎 *minus* in the taste picker (see *Your rating* in Step 5).

| tag | EN label | FR label | what counts |
| --- | --- | --- | --- |
| `rude` | Gruff service | Service bête | Blunt, cold or gruff staff, attitude, no smile. |
| `slow` | Long waits | Attente | Slow pacing, long waits for a table, the food or the bill, lineups. |
| `authentic` | Too authentic | Trop authentique | Too spicy, unfamiliar traditional ingredients, small tasting portions, no substitutions, cash-only, no reservations, tiny opinionated menu/wine list. |
| `friction` | Montreal friction | Cônes, parking & livraison | Street parking, orange cones/construction, delivery-app trouble (late driver, wrong address; voice-to-text *"Hubert"* = Uber Eats), OQLF / language-policy friction. |
| `entitled` | Main-character syndrome | Client roi froissé | Hyperbole over normal rules: waiting for full party, charging for extras, table time limits and turnover, no discount, no refund, prepayment/tipping outrage, large-group drama, expecting free comps. |
| `loud` | Loud & packed | Bruyant | Noisy room, loud music, cramped tables, busy room. |
| `decor` | Zero decor, drafty | Zéro déco, courants d'air | Fluorescent hole-in-the-wall aesthetics, uncomfortable chairs, cold seat by the door, winter drafts. |
| `price` | Pricey | Trop cher | "Too expensive" with no food-quality complaint. Shrinkflation goes to `decline`, tiny tasting portions to `authentic`, an empty plate to `food`. |

### Derived badge (computed, not adjustable)

| tag | EN label | FR label | what counts |
| --- | --- | --- | --- |
| `split` | Food praised, rest hated | Bouffe top, reste bof | Computed locally: `food_sentiment = 1` and no red flag (*"service bête mais la bouffe est malade"*). Food praise never outweighs a red flag. |

### Red flags (fixed, always count against)

| tag | what counts |
| --- | --- |
| `food` | Core food failure: stale/spoiled ingredients, raw or overcooked mains, greasy/bland execution, obviously frozen/reheated dishes, bad/empty portions. Delivery-only food complaints count half: a soggy fry after 40 minutes in a car says little about the kitchen. |
| `hygiene` | Food poisoning, dirty kitchen/washrooms, or pests (heavy veto). |
| `decline` | Time-stamped deterioration (*"used to be amazing, new owner ruined it"*, obvious shrinkflation). |
| `shady` | Billing or trust issues: wrong charges, sketchy mandatory fees, bait-and-switch. |
| `serious` | Discrimination, harassment, allergy mishandled, accessibility. Never quoted, never filed as `rude` or `entitled`: not material for laughs. |

### Noise (ignored)

Vague rants with no specifics (*"worst place ever"*), wrong business, or hours/closed confusion. In the rating, noise reviews are assumed to follow the place's other low-star reviews (spread proportionally).

## v1 (keep it simple)

Build a tight, fun first version before adding complexity.

- **List-first + map toggle:** on a 390px phone screen, a scrollable feed of funny 1-star "badge of honour" cards is faster and funnier than pinching a tiny map (and works even offline or when map tiles are blocked). Pair it with a map view toggle (or side-by-side on desktop).
- **Per-restaurant card / pin:**
  - Name, neighborhood, cuisine, distance from Little Italy (or optional user location), Google overall rating, total review count
  - **Your rating** next to Google's: *« Google : 3,9★ — sans le chialage : 4,4★ »*
  - **The bill / L'addition:** the receipt styled as a restaurant bill, with the estimated number of low-star reviews per main reason: *Attente ×7 · Serveur bête ×5 · Courant d'air ×2 · Bouffe ×0*
  - **Top 1–2 verbatim quotes** (short excerpt ≤ 180 chars, original language, star rating + `YYYY-MM`, no reviewer name), with the *mais / but / par contre* pivot in bold: *"Service bête **mais** la bouffe est malade"*
  - **Complaint tags**, plus *changed hands ~YYYY* when detected
  - **Direct Google Maps link** for live hours, open/closed status, menu, and directions
- **Playful discovery controls:**
  - **Taste picker (complaint bingo):** a 3×3 grid, one square per complaint tag around a free center square (*Bouffe malade*). Tap a square to cycle 😐 → 👍 → 👎; ratings and order update live.
  - **Neighborhood / cuisine** filters + sort (`Your rating`, `Gap`, `Funniest quote`, `Closest`, `Lowest Google rating`)
  - **"Surprise me" / "Au hasard"** button: picks one random matching gem for tonight's dinner (fits the `schem.ist` dice icon), with a survival tip for its top complaint: *« Ce soir : Mam Grillades. Apportez votre patience. »* (`slow` → patience, cash only → cash, `friction` → take the BIXI, too spicy → milk…). One short line per tag and language, written by the owner.
  - **Mini glossary for English readers:** tap *malade* → *"(QC) delicious"*. Quotes stay verbatim.
- **URL state (`hash-data.js`):** taste settings, filters, sort and selected restaurant live in `#en/…` or `#fr/…`, so you can text a friend a direct link to one hilarious 1-star gem or a filtered shortlist (see *URL state*).
- **Dataset freshness:** show the snapshot date (`generated: YYYY-MM`) clearly so nobody mistakes static data for live hours.

## UI & map options ($0/month)

All options read the same precomputed static file (~150–300 ranked restaurants):

- **Static HTML + Leaflet (OpenStreetMap) — recommended for v1:** self-contained page + `gems.json` in `docs/-resto/`, custom filters, no API key or billing account, works identically on `localhost` and GitHub Pages. (Requires owner sign-off to add Leaflet as a dependency per `AGENTS.md`.)
- **Static HTML + Google Maps JS API:** native Google map tiles, free up to 10,000 Dynamic Map loads/month. `docs/_env/` already has a Google Maps key restricted to `schem.ist` (note: won't load on `localhost`, and needs a hard daily quota cap on billing).
- **Google My Maps CSV (bonus export):** emit `data/resto/montreal_gems.csv` alongside `docs/-resto/gems.json` (fits within 2,000 rows/layer, 10 layers, 20,000 cells) so the list also opens natively in the Google Maps phone app with basic layer toggles.

## methodology & data pipeline (verified 2026-11-22)

### Repo hygiene

Everything inside `docs/` is published live on GitHub Pages. Non-published datasets live in `data/resto/` at the repo root (gzip-compressed, zero API keys, zero reviewer PII). The classifier output holds keys and labels only, no review text. Only the compact final `docs/-resto/gems.json` (~150–300 KB) is committed inside `docs/`.

### Steps 1–3 — Extraction (COMPLETED, $32.11 total)

Executed directly via Outscraper's REST API (`https://api.outscraper.cloud`) instead of the mobile web UI (faster, zero manual borough picking, and unlocks `ignoreEmpty=true`).

- **Step 1 — Central Montreal directory (`$7.60`, 3,033 places incl. 10-place pilot):**
  - `POST /google-maps-search` across **48 Central Montreal FSAs** centered on Little Italy (`H2S`, `H2G`, `H2R`, `H2P`, `H2E`, `H3N`, `H1Y`, `H1X`, `H1T`, `H2A`, `H1Z`, `H2M`, `H2N`, `H2C`, `H2B`, `H3L`, `H2T`, `H2J`, `H2H`, `H2W`, `H2X`, `H2V`, `H2K`, `H2L`, `H1W`, `H1V`, `H3P`, `H3R`, `H4P`, `H3S`, `H3T`, `H3V`, `H3W`, `H3X`, `H4A`, `H3Y`, `H3Z`, `H3A`, `H3B`, `H3G`, `H3H`, `H2Y`, `H2Z`, `H3C`, `H3J`, `H3K`, `H4C`, `H4G`).
  - Parameters: `limit=250`, `dropDuplicates=true`, `filters=["operational_only"]`, `language="en"`, `region="CA"`, no enrichments.
  - Result: **3,023 unique places**, saved cleaned to `data/resto/central_mtl_places.json.gz`.
- **Step 2 — Local pre-filter (`$0`):**
  - Kept Montreal `H*` postal codes within **6.5 km** of Little Italy (`45.5361, -73.6149`).
  - Excluded non-restaurant Google types (groceries, markets, dépanneurs, caterers, coffee shops, bakeries, dessert shops, bars without restaurant) and multi-location chains (`McDonald's`, `Tim Hortons`, `A&W`, `Subway`, `Pizza Hut`, `Boustan`, `St-Hubert`, `L'Œufrier`, `Mito/Aki/Bento Sushi`, etc.).
  - Filtered to overall rating **3.4–4.4★**, **≥ 30** total reviews, and **≥ 8** low-star (`1–3★`) reviews using `reviews_per_score`.
  - Result: **602 clean independent restaurants**.
- **Step 3 — Targeted 1–3★ review scrape (`$24.51`, 11,497 units incl. pilot):**
  - `GET /google-maps-reviews` in resumable chunks of 50 `place_id`s: `reviewsLimit=20`, `sort=lowest_rating`, `cutoffRating=3`, `ignoreEmpty=true`, `language=fr`, `region=CA`.
  - Result: **11,447 non-empty original-language reviews** (`100%` have text; `10,434` 1★, `635` 2★, `378` 3★; ~69% French, ~31% English), saved cleaned to `data/resto/central_mtl_reviews.json.gz`.

**Verified Outscraper API quirks (keep for any future re-run):**

- **Query phrasing trap:** `"restaurant, <FSA>, Quebec, Canada"` leaks Quebec City (`G1*`) results. Always include the city: `"restaurant, Montreal, QC <FSA>"` (or `Westmount` / `Mount Royal` / `Outremont`).
- **Single-call bilingual extraction:** Outscraper never auto-translates `review_text`. A single `language=fr&region=CA` call returns both French and English reviews verbatim in their original language (verified via overlap check—saves paying twice).
- **`ignoreEmpty=true` is API-only** (missing in the mobile web UI) and worked 100%.
- **No structured sub-ratings:** `review_questions` (Food / Service / Atmosphere) returned `null` on `11,447/11,447` reviews. Classification must rely on review text, `stars`, `date`, and `reviews_per_score`.
- **No combining `cutoff` + `cutoffRating`:** Outscraper's date `cutoff` forces `sort=newest`, overriding `lowest_rating`. Always handle recency locally.

### Sampling caveats (keyword check, 2026-11-22)

- **Mostly a 1★ sample:** Outscraper fills the 20 slots from the lowest rating up. 91% of sampled reviews are 1★, while 1★ is only 41% of the real 1–3★ reviews; 436 of 602 places have nothing but 1★ in their sample. Rates are therefore computed per star level and scaled by each place's real counts in `reviews_per_score` (see *Complaint mix*). Without that, "13/16 low-star reviews" would really mean "13/16 one-star reviews", and small places (whose sample reaches 2–3★) couldn't be compared with busy ones.
- **Not ordered by date:** within a star level, 42% of neighbouring reviews are out of date order. Use `date`, never the position.
- **Old samples:** 86 places have a median review year ≤ 2021. With recency weights, they'll have little evidence left.
- **What people complain about (rough keyword counts):** ~26% mention price, ~26% waits or minutes, 7.3% delivery, 6% tips, 1.1% parking, 0.1% cones/construction. Québécois slang is rare (*écoeurant* 18, *cochon* 7, *pas pire* 5, *capoter* 0): sarcasm and mixed reviews are the real classification risk.
- **Bars look clean:** the places with the fewest food words (Invisible Bar, Pirandello Sport Bar, Bar Brewskis, Café Bar Padula, Bar de la Salle…) have 1★ reviews about bouncers and drinks. Hence the `ate` field and the food-praise rule.
- **Not everything is funny:** ~80 reviews mention racism or discrimination, ~80 mention allergies, and a few contain the reviewer's own ethnic remarks. Hence the `serious` red flag and the quote rules.
- **Review keys:** reviews carry no ID. A review's key is `place_id:index`, its position in `central_mtl_reviews.json.gz`. Never re-sort or rewrite that file.

### Step 4 — Batch LLM classification (NEXT, est. $0.50–$1.50)

Run all 11,447 reviews in `data/resto/central_mtl_reviews.json.gz` (~1.5M input tokens + ~0.8M output tokens) through an offline batch job (e.g. Gemini Flash-Lite Batch API). The API key comes from an environment variable and never enters the repo.

**Before the full batch:**

1. **Gold set:** the owner hand-labels ~60 varied reviews: French and English, 1/2/3★, a bar, a delivery review, sarcasm, slang, and a red flag with food praise (the mouse below).
2. **Pilot:** run 2 prompt variants on the gold set plus ~200 more reviews, compare, fix the rules, then run everything. The run costs about a dollar; redoing it is the real cost.
3. **Quote check in code:** every `quote` must be an exact substring of its review (after whitespace normalization). Models quietly fix typos and accents, and the typos are part of the charm. Retry or set `null` otherwise.
4. **Set-up:** structured (JSON-schema) output, temperature 0. Give the model the place name and cuisine (context: *too spicy* at a Sichuan place) but not its rating. Save the model name, prompt version, date and raw responses with the results, so re-scoring never needs a re-run.
5. **Review text is data:** it is untrusted input, never instructions to the model.

**Mandatory prompt rules (calibrated from our local scan of the real reviews):**

- **Québécois false friends:** *"écoeurant"*, *"malade"* (about food, e.g. *"la bouffe est malade"*), *"cochon"*, *"terrible"* (positive slang), and *"pas pire"* mean **delicious / good**—NOT food poisoning! Conversely, *"tombé malade" / "rendu malade" / "été malade"* IS a `hygiene` red flag. *"Service bête"* means gruff/rude service (`rude`).
- **Sarcasm & negation:** do NOT treat sarcastic praise as positive food sentiment (real example from our data: *"j'ai reçu une véritable brique. Franchement, excellent choix si vous planifiez des rénovations"* → `food` red flag, not `split`; *"The best sushis are those without fish... The fish wasn't fresh"* → `food` red flag).
- **Food praise next to a red flag stays a red flag:** *"Attendez-vous à dîner avec une souris… Certes la nourriture est bonne"* → `hygiene`, with `food_sentiment = 1`.
- **Montreal quirks seen in our data:** voice-to-text `"Hubert"` = Uber Eats (`friction`); Spanish+French bilingual reviews; OQLF / language-policy complaints (`friction`); large-group (10–13 people) complaints and prepayment/mandatory-tip outrage (`entitled`); winter door-draft complaints (`decor`).
- **`serious` before `rude`:** discrimination, harassment, an allergy mishandled or an accessibility problem is `serious`, never `rude` or `entitled`.
- **Price vs food:** "too expensive" alone is `price`; "too expensive for an empty plate" is `food`; "same price, smaller portions than before" is `decline`.
- **Quote rules:** verbatim excerpt ≤ 180 chars in the original language, the funniest or most revealing line; no names of staff or reviewers, no slurs or remarks about anyone's origin; `null` if nothing fits.

**Per-review JSON output schema (flat & cheap).** The model reports observations; judgments are computed locally, so they can be re-tuned for $0:

```json
{
  "primary": "slow",
  "complaints": ["slow", "rude"],
  "red_flags": [],
  "channel": "dine_in",
  "ate": true,
  "change": false,
  "food_sentiment": 1,
  "quotable": 3,
  "quote": "Service bête mais la bouffe est malade."
}
```

- `primary`: the one main reason for the low stars (a complaint tag, a red flag, or `noise`)
- `complaints`: complaint tags; `red_flags`: red-flag tags, `serious` included
- `channel`: `dine_in`, `takeout`, `delivery` or `unknown`
- `ate`: the reviewer ate or ordered food there (`false` for bouncer, drinks or club reviews)
- `change`: the review mentions a new owner, management, chef or menu, in either direction
- `food_sentiment`: `-1` (bad), `0` (not mentioned / neutral), `1` (praised)
- `quotable`: `0` (dull) to `3` (genuinely funny or iconic complaint)
- `quote`: verbatim excerpt ≤ 180 chars in original language, or `null`
- The key `id` (`place_id:index`) is added locally. No `verdict` (it follows from the tags) and no `split` (derived locally).

**Decision point — buy more data?** The premise ignores 5★ reviews; the gap is the 2–3★ reviews (and 4★, where honest food praise lives), which are rare in our sample. Don't buy before the pilot. After classification, count:

- places passing the food-praise rule: if fewer than ~150, buy;
- whether the 2★ and 3★ complaint mixes differ much from 1★: if not, city-wide rates are enough.

If buying: for the ~250 finalists only, the newest ~40 reviews of any star (`sort=newest`), dropping 5★ text on arrival. That brings recent 2–4★ reviews (honest food praise) and a recent-trend signal: a jump in the share of 1–3★ among recent reviews flags a change of hands. At the rate paid so far ($2.13 per 1,000 reviews), about $21. First check whether the API can skip 5★ reviews, and dedupe against the existing sample by text + date.

**Optional verification pass:** with ~$68 left under the $100 cap, run a stronger LLM on the top ~150–250 finalists to double-check sarcasm and Québécois nuance, and pick each place's best quote by comparing its candidates side by side (more reliable than the absolute `quotable` score).

### Step 5 — Local scoring & export (NEXT, $0, freely re-tunable)

**Recency (recent reviews weigh far more):**

- Weight `w = 0.5 ^ (age_in_months / 12)`, a 12-month half-life counted from the snapshot (`2026-11`): 1 year old → 0.5, 2 years → 0.25, 4 years → 0.06. *(Some spots' lowest reviews are from 2016–2019, e.g. Piatto Pieno.)*
- **Change of hands:** when ≥ 2 reviews have `change = true` or a `decline` flag, the earliest of their dates is the change date. Older reviews get a further `× 0.1`, and the card shows *changed hands ~YYYY*.
- `hygiene` and `serious` flags from the last 12 months get `1.5×` penalty weight.

**Hard drop rules (veto):**

- no food praise anywhere (no review with `food_sentiment = 1`);
- most reviews have `ate = false` (bars, clubs, venues);
- too little recent evidence: weighted count (sum of `w`) of non-noise reviews below ~4 (tunable);
- `≥ 2` recent `hygiene` or `serious` flags (or any corroborated poisoning/pest report);
- weighted `food` red-flag share among the worst ~30% of places. Set the cut-off from the distribution after classification, not in advance: food words appear in ~70% of a typical place's sampled reviews, so a fixed 25% could wipe out most of the list;
- `≥ 2` `decline` flags in the last 18 months.

**Complaint mix (per place, per star level):**

- Each review gets one bucket: its most severe red flag if any (`serious` > `hygiene` > `food` > `shady` > `decline`), else its `primary` complaint. Noise is left out (spread proportionally).
- For each star level (1★, 2★, 3★), the recency-weighted share of each bucket, shrunk toward the city-wide share at that level (~5 pseudo-reviews; the city-wide share alone when the place has no sample at that level).
- Share × the place's real count at that level = the estimated number of 1★/2★/3★ reviews per bucket. This feeds *the bill* and *your rating*.

**Your rating (headline, computed in the browser):** start from Google's star counts (5★ counted, never read). Then, per complaint bucket and the user's setting:

- 😐 *don't care* (default): those reviews are removed—*sans le chialage*;
- 👍 *plus*: their complaint is your bonus, so they count as 5★;
- 👎 *minus*: they count as given.

Red flags always count as given. Example: Mam Grillades has 107/10/33/79/318 reviews at 1★…5★ (Google 3.9★). Removing just 80% of its 107 1★ reviews already gives 4.4★. The **gap** (*your rating* − Google rating) is the Gem Score and the default sort. It's a generous estimate: 4–5★ reviews are never checked.

**Early sanity-check benchmarks from our local peek** (hypotheses, not targets: a keyword check found food words in 90% of Fiorellino's and 95% of Piatto Pieno's sampled 1★ reviews):

- *Expected winners:* **Mam Grillades** (3.9★, 0.5 km — slow waits & gruff counter, zero food complaints), **Restaurant Pachamama** (4.2★, 0.6 km — cold seat by the door in winter, *"la bouffe n'est pas pire"*), **ALMA** (4.4★, 1.7 km — tasting-menu prepayment/stiff-service shock), **Taza Flores** (4.4★, 1.9 km), **Fiorellino** (4.1★ — 55-min table turnover rage).
- *Expected vetoes / cautions:* **Meli-Melo Market** (3.8★) and **Resto Los Planes** (4.3★) — each had an attractive service/wait quote, but multiple recent food-quality red flags; **Bistro Chez Alberto** (3.5★) — hilarious service/VLT drama, but has a billing-dispute (`shady`) flag to weigh.

## static dataset schema (`docs/-resto/gems.json`)

Compact, privacy-clean file consumed directly by `index.html`:

```json
{
  "generated": "2026-11",
  "area": "Montréal (Central)",
  "center": [45.5361, -73.6149],
  "items": [
    {
      "id": "ChIJ...",
      "name": "Chez Exemple",
      "hood": "Petite-Italie",
      "cuisine": "Bistro",
      "lat": 45.536,
      "lng": -73.615,
      "km": 0.5,
      "rating": 3.9,
      "stars": [107, 10, 33, 79, 318],
      "mix": { "slow": [45, 3, 10], "rude": [40, 2, 6], "decor": [8, 0, 0], "price": [0, 2, 7], "food": [14, 3, 10] },
      "analyzed": 20,
      "food_praised": 6,
      "changed": null,
      "tags": ["split", "slow", "rude"],
      "quotes": [
        { "stars": 1, "date": "2026-04", "tags": ["rude", "split"], "text": "Service bête mais la bouffe est malade." }
      ],
      "maps": "https://maps.google.com/?cid=..."
    }
  ]
}
```

- `stars`: Google's counts at 1★…5★ (`reviews_per_score`), the base of *your rating*
- `mix`: estimated number of 1★/2★/3★ reviews per bucket (complaint tag or red flag), recency-weighted; the page computes *your rating* and *the bill* from it
- `changed`: estimated change-of-hands month (`YYYY-MM`) or `null`

## URL state (freeze before v1)

- The hash holds names, never list positions: place IDs (`ChIJ…`), tag names with their setting (e.g. `friction+ entitled+ loud-`), sort and filters.
- Unknown tags or IDs are ignored on load, so a regenerated `gems.json` or a new tag never breaks an old link. A place that left the list shows a short *no longer on the list* note.
- Once published, the format can't change (`AGENTS.md`): a breaking change means a new folder.

## humour & voice

- **Laugh at the situation**, never at a person's identity or at someone who got hurt. `serious` reviews are never quoted, and no quote names staff.
- **The headline joke is the rating:** *« Google : 3,9★ — sans le chialage : 4,4★ »*.
- **Already in v1:** the bill, the bold pivot, survival tips, complaint bingo, the glossary.
- **Later — awards (*Les Chialeux d'or*):** computed from tags, e.g. *Longest wait for the best food*, *Coldest seat by the door*, *Most outraged by a reasonable policy*.

## privacy & attribution hygiene

- Strip all reviewer names, profile links, user IDs, and review IDs from both `data/resto/` and `docs/-resto/gems.json`.
- Truncate timestamps to `YYYY-MM`.
- In the published `docs/-resto/gems.json`, keep quotes to short verbatim excerpts (≤ 180 chars), never full review dumps.
- Quotes are checked verbatim in code, never name staff or reviewers, and never come from a review with a red flag (`serious` included).
- `data/resto/classified_reviews.json.gz` holds keys and labels only, no review text.
- Link straight to Google Maps for live status, hours, menus, and full reviews.

## open questions

- **Map choice for v1:** Leaflet (OpenStreetMap, zero key/billing, needs dependency approval) vs. Google Maps JS API (using `docs/_env/` key restricted to `schem.ist`) vs. list-only v1 + Google My Maps CSV?
- **Verification LLM pass:** with ~$68 left under budget, run a second higher-precision LLM pass on the top ~150–250 finalists to sharpen sarcasm handling and pick the funniest quote per spot?
- **Buy more data:** decide after the pilot (see *Decision point* in Step 4).
- **`price` default:** 😐 *don't care* like the other tags, or 👎 *minus* so it lowers the rating unless the user opts out?
- **App title & voice:** keep `resto` as the folder name, and pick a funny bilingual page title, e.g. *Le guide des chialeux // The Grumbler's Guide*, *1★ mais bon // 1★ but good*, *Bougon gourmand*, *1-star gems // perles à 1 étoile* or *bad reviews, good food // mauvais avis, bonne bouffe*.
- **Keep or drop `data/resto/` later:** once `docs/-resto/gems.json` is finalized, decide whether to keep the 2.3 MB gzipped archives in `data/resto/` for re-scoring or trim them. The repo is public: the 11k full texts are off `schem.ist` but each is traceable to its author with one Google search. Option: move the raw files to private storage and keep only the labels here.
