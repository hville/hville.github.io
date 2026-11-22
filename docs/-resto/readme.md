# resto

![resto](readme.svg)

Discover opinionated Montreal restaurants ignored because of *bad bad reviews*—1–3★ rants where the reviewer is mad about everything except the food.

A 4.8★ spot tries to please everyone. A 3.9★ spot where someone leaves 1 star because *"service bête pis pas de parking, mais bon la bouffe est malade"* is probably worth a visit.

## status & handoff (2026-11-22)

**Where we are:** Data procurement is **done** (total Outscraper spend: **$32.11 USD**, ~$68 headroom left under the $100 cap). A local $0 heuristic peek confirmed strong gems around Little Italy and surfaced key prompt-calibration rules. Ready for LLM classification + UI build in a new thread.

**Saved datasets (in repo at `data/resto/`, outside `docs/` so never published on `schem.ist`):**

- `data/resto/central_mtl_places.json.gz` (~390 KB) — **3,023** unique operational places across 48 Central Montreal FSAs (`$7.60`).
- `data/resto/central_mtl_reviews.json.gz` (~1.9 MB) — **602** cleaned independent restaurants within **6.5 km of Little Italy** (`45.5361, -73.6149`, Jean-Talon Market; ~1h walk + generous overshoot) with **11,447** non-empty original-language 1–3★ text reviews (`10,434` 1★, `635` 2★, `378` 3★; ~69% French / ~31% English; `4,725` from 2025–2026; `$24.51`). Reviewer names, user IDs, review IDs, and links are stripped; dates are truncated to `YYYY-MM`.

**Next steps (pick up here):**

1. **Step 4 — Batch LLM classification (~$0.50–$1.50):** classify all 11,447 reviews in `data/resto/central_mtl_reviews.json.gz` with Gemini Flash-Lite (or similar) using the schema and Montreal/Québécois prompt rules below, saving results to `data/resto/classified_reviews.json.gz`.
2. **Step 5 — Local scoring & export ($0):** apply recency weights + veto rules, tune Gem Score locally, and write compact `docs/-resto/gems.json` (~150–300 ranked spots) plus optional `data/resto/montreal_gems.csv` for Google My Maps.
3. **Step 6 — Build `docs/-resto/index.html`:** simple, funny, bilingual EN/FR mobile-first list + map toggle, complaint-type filter pills, "Surprise me" dice button, and `hash-data.js` shareable URL state.

## goals

- **Discover opinionated gems:** surface Central Montreal restaurants (centered on Little Italy, ~1h walk radius + overshoot) whose Google Maps ratings are artificially depressed by unfair, misplaced, or non-food-related complaints.
- **Simple, funny, mobile-first:** lead with the funniest or most revealing bad-review quote, not a wall of analytics.
- **Signal over noise:** counteract rating inflation (anchoring, peer pressure, polite 5-star scores) by treating **1–3★ reviews** as higher-signal data.
- **Zero user profiling:** classify complaints purely from in-text tone and complaint type—no reviewer history needed.
- **Bilingual UI, verbatim quotes:** all controls switch EN/FR via `data-lang`, while review quotes stay verbatim in their original French, English, or Franglais (auto-translation kills both the joke and the signal).
- **Offline batch, $0 ongoing:** run strictly as an offline, one-time batch pipeline **under $100 USD total** with **$0 recurring fees** (manual re-runs only if desired later).

## taxonomy: great bad reviews vs. real red flags

One shared tag set is used by the LLM classifier, the static JSON, and the UI filter pills.

### Boosters (false-negative signals)

| tag | EN label | FR label | what counts |
| --- | --- | --- | --- |
| `split` | Food praised, rest hated | Bouffe top, reste bof | Reviewer praises the food while docking overall stars for something else (*"service bête mais la bouffe est malade"*). |
| `service` | Brusque / slow service | Service bête ou lent | Blunt or gruff staff, slow pacing, rushed turnover, busy room, long waits. |
| `authentic` | Too authentic | Trop authentique | Too spicy, unfamiliar traditional ingredients, small tasting portions, no substitutions, cash-only, no reservations, tiny opinionated menu/wine list. |
| `friction` | Montreal friction | Cônes, parking & livraison | Street parking, orange cones/construction, winter drafts/lineups, lukewarm Uber Eats/delivery, OQLF / language-policy friction. |
| `entitled` | Main-character syndrome | Client roi froissé | Hyperbole over normal rules: waiting for full party, charging for extras, table time limits, prepayment/tipping outrage, large-group drama, expecting free comps. |
| `vibe` | Zero decor / loud | Zéro déco / bruyant | Cramped tables, noisy room, fluorescent hole-in-the-wall aesthetics. |

### Hard disqualifiers (genuine red flags)

| tag | what counts |
| --- | --- |
| `food` | Core food failure: stale/spoiled ingredients, raw or overcooked mains, greasy/bland execution, obviously frozen/reheated dishes, bad/empty portions. |
| `hygiene` | Food poisoning, dirty kitchen/washrooms, or pests (heavy veto). |
| `decline` | Time-stamped deterioration (*"used to be amazing, new owner ruined it"*, obvious shrinkflation). |
| `shady` | Billing or trust issues: wrong charges, sketchy mandatory fees, bait-and-switch. |

### Noise (ignored)

Vague rants with no specifics (*"worst place ever"*), wrong business, or hours/closed confusion.

## v1 (keep it simple)

Build a tight, fun first version before adding complexity.

- **List-first + map toggle:** on a 390px phone screen, a scrollable feed of funny 1-star "badge of honour" cards is faster and funnier than pinching a tiny map (and works even offline or when map tiles are blocked). Pair it with a map view toggle (or side-by-side on desktop).
- **Per-restaurant card / pin:**
  - Name, neighborhood, cuisine, distance from Little Italy (or optional user location), Google overall rating, total review count
  - **Gem Score** + plain-language receipt (e.g. `13/16 low-star reviews weren't about the food`)
  - **Top 1–2 verbatim quotes** (short excerpt ≤ 180 chars, original language, star rating + `YYYY-MM`, no reviewer name)
  - **Complaint-type tags** (the booster tags above)
  - **Direct Google Maps link** for live hours, open/closed status, menu, and directions
- **Playful discovery controls:**
  - **Complaint-type pills:** pick the kind of chaos you're willing to tolerate (*Service bête*, *Trop authentique*, *Cônes & parking*, *Client roi froissé*…)
  - **Neighborhood / cuisine** filters + sort (`Gem Score`, `Funniest quote`, `Closest`, `Lowest Google rating`)
  - **"Surprise me" / "Au hasard"** button: picks one random matching gem for tonight's dinner (fits the `schem.ist` dice icon)
- **URL state (`hash-data.js`):** active filters and selected restaurant ID live in `#en/…` or `#fr/…`, so you can text a friend a direct link to one hilarious 1-star gem or a filtered shortlist.
- **Dataset freshness:** show the snapshot date (`generated: YYYY-MM`) clearly so nobody mistakes static data for live hours.

## UI & map options ($0/month)

All options read the same precomputed static file (~150–300 ranked restaurants):

- **Static HTML + Leaflet (OpenStreetMap) — recommended for v1:** self-contained page + `gems.json` in `docs/-resto/`, custom filters, no API key or billing account, works identically on `localhost` and GitHub Pages. (Requires owner sign-off to add Leaflet as a dependency per `AGENTS.md`.)
- **Static HTML + Google Maps JS API:** native Google map tiles, free up to 10,000 Dynamic Map loads/month. `docs/_env/` already has a Google Maps key restricted to `schem.ist` (note: won't load on `localhost`, and needs a hard daily quota cap on billing).
- **Google My Maps CSV (bonus export):** emit `data/resto/montreal_gems.csv` alongside `docs/-resto/gems.json` (fits within 2,000 rows/layer, 10 layers, 20,000 cells) so the list also opens natively in the Google Maps phone app with basic layer toggles.

## methodology & data pipeline (verified 2026-11-22)

### Repo hygiene

Everything inside `docs/` is published live on GitHub Pages. Non-published datasets live in `data/resto/` at the repo root (gzip-compressed, zero API keys, zero reviewer PII). Only the compact final `docs/-resto/gems.json` (~150–300 KB) is committed inside `docs/`.

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

### Step 4 — Batch LLM classification (NEXT, est. $0.50–$1.50)

Run all 11,447 reviews in `data/resto/central_mtl_reviews.json.gz` (~1.5M input tokens + ~0.8M output tokens) through an offline batch job (e.g. Gemini Flash-Lite Batch API).

**Mandatory prompt rules (calibrated from our local scan of the real reviews):**

- **Québécois false friends:** *"écoeurant"*, *"malade"* (about food, e.g. *"la bouffe est malade"*), *"cochon"*, *"terrible"* (positive slang), and *"pas pire"* mean **delicious / good**—NOT food poisoning! Conversely, *"tombé malade" / "rendu malade" / "été malade"* IS a `hygiene` red flag. *"Service bête"* means gruff/rude service (`service` booster).
- **Sarcasm & negation:** do NOT treat sarcastic praise as positive food sentiment (real example from our data: *"j'ai reçu une véritable brique. Franchement, excellent choix si vous planifiez des rénovations"* → `food` red flag, not `split`; *"The best sushis are those without fish... The fish wasn't fresh"* → `food` red flag).
- **Montreal quirks seen in our data:** voice-to-text `"Hubert"` = Uber Eats (`friction`); Spanish+French bilingual reviews; OQLF / language-policy complaints (`friction`); large-group (10–13 people) complaints and prepayment/mandatory-tip outrage (`entitled`); winter door-draft complaints (`friction` / `vibe`).
- **Per-review JSON output schema (flat & cheap):**

  ```json
  {
    "verdict": "booster | red_flag | mixed | noise",
    "boosters": ["split", "service"],
    "red_flags": [],
    "food_sentiment": 1,
    "quotable": 3,
    "quote": "Service bête mais la bouffe est malade."
  }
  ```

  - `food_sentiment`: `-1` (bad), `0` (not mentioned / neutral), `1` (praised)
  - `quotable`: `0` (dull) to `3` (genuinely funny or iconic complaint)
  - `quote`: verbatim excerpt ≤ 180 chars in original language, or `null`
- **Optional verification pass:** with ~$68 left under the $100 cap, we can easily afford a stronger LLM pass on the top ~150–250 finalists to double-check sarcasm, Québécois nuance, and final quote selection.

### Step 5 — Local scoring & export (NEXT, $0, freely re-tunable)

- **Recency weights:** `1.0` (≤ 18 months), `0.6` (18–36 months), `0.3` (> 36 months); `hygiene` and `decline` flags in the last 12 months get `1.5×` penalty weight. *(Important: our local scan showed some spots' lowest reviews are from 2016–2019, e.g. Piatto Pieno, so recency weighting is essential.)*
- **Hard drop rules (veto):**
  - fewer than `8` non-noise 1–3★ text reviews,
  - `≥ 2` recent `hygiene` flags (or any corroborated poisoning/pest report),
  - weighted `food` red-flag share `> 25%`,
  - `≥ 2` `decline` flags in the last 18 months.
- **Baseline Gem Score (0–100):**
  - `booster_rate = W_boosters / (W_boosters + 2 * W_red_flags + 3)` (Bayesian smoothing `k = 3`; red flags penalize 2×)
  - `+ food_praise_bonus` when `food_sentiment == 1` inside a ≤ 3★ review
  - `+ underdog_bonus` mild boost in the 3.5–4.2★ sweet spot
- **Early sanity-check benchmarks from our local peek:**
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
      "reviews": 547,
      "score": 88,
      "stats": { "boosters": 13, "red_flags": 1, "analyzed": 16, "food_praised": 6 },
      "tags": ["split", "service", "friction"],
      "quotes": [
        { "stars": 1, "date": "2026-04", "tags": ["split", "service"], "text": "Service bête mais la bouffe est malade." }
      ],
      "maps": "https://maps.google.com/?cid=..."
    }
  ]
}
```

## privacy & attribution hygiene

- Strip all reviewer names, profile links, user IDs, and review IDs from both `data/resto/` and `docs/-resto/gems.json`.
- Truncate timestamps to `YYYY-MM`.
- In the published `docs/-resto/gems.json`, keep quotes to short verbatim excerpts (≤ 180 chars), never full review dumps.
- Link straight to Google Maps for live status, hours, menus, and full reviews.

## open questions

- **Map choice for v1:** Leaflet (OpenStreetMap, zero key/billing, needs dependency approval) vs. Google Maps JS API (using `docs/_env/` key restricted to `schem.ist`) vs. list-only v1 + Google My Maps CSV?
- **Verification LLM pass:** with ~$68 left under budget, run a second higher-precision LLM pass on the top ~150–250 finalists to sharpen sarcasm handling and pick the funniest quote per spot?
- **App title & voice:** keep `resto` as the folder name, and pick a funny bilingual page title (e.g. *1-star gems // perles à 1 étoile* or *bad reviews, good food // mauvais avis, bonne bouffe*).
- **Keep or drop `data/resto/` later:** once `docs/-resto/gems.json` is finalized, decide whether to keep the 2.3 MB gzipped archives in `data/resto/` for re-scoring or trim them.
