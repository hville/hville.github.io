# resto

![resto](readme.svg)

Discover opinionated Montreal restaurants ignored because of *bad bad reviews*—1–3★ rants where the reviewer is mad about everything except the food.

A 4.8★ spot tries to please everyone. A 3.9★ spot where someone leaves 1 star because *"service bête pis pas de parking, mais bon la bouffe est malade"* is probably worth a visit.

## goals

- **Discover opinionated gems:** surface Montreal restaurants whose Google Maps ratings are artificially depressed by unfair, misplaced, or non-food-related complaints.
- **Simple, funny, mobile-first:** lead with the funniest or most revealing bad-review quote, not a wall of analytics.
- **Signal over noise:** counteract rating inflation (anchoring, peer pressure, polite 5-star scores) by treating **1–3★ reviews** as higher-signal data.
- **Zero user profiling:** classify complaints purely from in-text tone, complaint type, and Google Food/Service/Atmosphere sub-ratings—no reviewer history needed.
- **Bilingual UI, verbatim quotes:** all controls switch EN/FR via `data-lang`, while review quotes stay verbatim in their original French, English, or Franglais (auto-translation kills both the joke and the signal).
- **Offline batch, $0 ongoing:** run strictly as an offline, one-time batch pipeline **under $100 USD total** with **$0 recurring fees** (manual re-runs only if desired later).

## taxonomy: great bad reviews vs. real red flags

One shared tag set is used by the LLM classifier, the static JSON, and the UI filter pills.

### Boosters (false-negative signals)

| tag | EN label | FR label | what counts |
| --- | --- | --- | --- |
| `split` | Food praised, rest hated | Bouffe top, reste bof | Reviewer praises the food (or leaves Food sub-rating 4–5/5) while docking overall stars for something else (*"service bête mais la bouffe est malade"*). |
| `service` | Brusque / slow service | Service bête ou lent | Blunt or gruff staff, slow pacing, rushed turnover, busy room. |
| `authentic` | Too authentic | Trop authentique | Too spicy, unfamiliar traditional ingredients, small tasting portions, no substitutions, cash-only, no reservations. |
| `friction` | Montreal friction | Cônes, parking & livraison | Street parking, orange cones/construction, winter lineups, lukewarm Uber Eats/delivery, language-policy friction. |
| `entitled` | Main-character syndrome | Client roi froissé | Hyperbole over normal rules: waiting for full party, charging for extras, table limits, no split bills, expecting free comps. |
| `vibe` | Zero decor / loud | Zéro déco / bruyant | Cramped tables, noisy room, fluorescent hole-in-the-wall aesthetics. |

### Hard disqualifiers (genuine red flags)

| tag | what counts |
| --- | --- |
| `food` | Core food failure: stale/spoiled ingredients, raw or overcooked mains, greasy/bland execution, obviously frozen/reheated dishes. |
| `hygiene` | Food poisoning, dirty kitchen/washrooms, or pests (heavy veto). |
| `decline` | Time-stamped deterioration (*"used to be amazing, new owner ruined it"*, obvious shrinkflation). |
| `shady` | Billing or trust issues: wrong charges, sketchy mandatory fees, bait-and-switch. |

### Noise (ignored)

Vague rants with no specifics (*"worst place ever"*), wrong business, or hours/closed confusion.

## v1 (keep it simple)

Build a tight, fun first version before adding complexity.

- **List-first + map toggle:** on a 390px phone screen, a scrollable feed of funny 1-star "badge of honour" cards is faster and funnier than pinching a tiny map (and works even offline or when map tiles are blocked). Pair it with a map view toggle (or side-by-side on desktop).
- **Per-restaurant card / pin:**
  - Name, neighborhood, cuisine, Google overall rating, total review count
  - **Gem Score** + plain-language receipt (e.g. `13/16 low-star reviews weren't about the food`)
  - **Top 1–2 verbatim quotes** (short excerpt ≤ 180 chars, original language, star rating + `YYYY-MM`, no reviewer name)
  - **Complaint-type tags** (the booster tags above)
  - **Direct Google Maps link** for live hours, open/closed status, menu, and directions
- **Playful discovery controls:**
  - **Complaint-type pills:** pick the kind of chaos you're willing to tolerate (*Service bête*, *Trop authentique*, *Cônes & parking*, *Client roi froissé*…)
  - **Neighborhood / cuisine** filters + sort (`Gem Score`, `Funniest quote`, `Lowest Google rating`)
  - **"Surprise me" / "Au hasard"** button: picks one random matching gem for tonight's dinner (fits the `schem.ist` dice icon)
- **URL state (`hash-data.js`):** active filters and selected restaurant ID live in `#en/…` or `#fr/…`, so you can text a friend a direct link to one hilarious 1-star gem or a filtered shortlist.
- **Dataset freshness:** show the snapshot date (`generated: YYYY-MM`) clearly so nobody mistakes static data for live hours.
- **Mock-first development ($0):** build and polish the v1 UI against a tiny ~15-restaurant sample `gems.json` first—lock down the humor, mobile ergonomics, and EN/FR copy before spending a dollar on scraping.

## UI & map options ($0/month)

All options read the same precomputed static file (~150–400 ranked restaurants):

- **Static HTML + Leaflet (OpenStreetMap) — recommended for v1:** self-contained page + `gems.json` in `docs/-resto/`, custom filters, no API key or billing account, works identically on `localhost` and GitHub Pages. (Requires owner sign-off to add Leaflet as a dependency per `AGENTS.md`.)
- **Static HTML + Google Maps JS API:** native Google map tiles, free up to 10,000 Dynamic Map loads/month. `docs/_env/` already has a Google Maps key restricted to `schem.ist` (note: won't load on `localhost`, and needs a hard daily quota cap on billing).
- **Google My Maps CSV (bonus export):** emit `montreal_gems.csv` alongside `gems.json` (fits within 2,000 rows/layer, 10 layers, 20,000 cells) so the list also opens natively in the Google Maps phone app with basic layer toggles.

## data pipeline (offline, < $100 one-time)

### Repo hygiene

Everything inside `docs/` is published live on GitHub Pages. Offline scraping scripts, LLM batch runners, and raw scraped review dumps (~20,000 reviews) **must stay outside `docs/`** (local or gitignored). Only the compact, cleaned `docs/-resto/gems.json` (~150–300 KB) is committed to the site.

### Extraction & classification steps

- **Platform:** **Google Maps** (~4,700 Montreal restaurants, native lowest-first review sorting, structured Food/Service/Atmosphere sub-ratings).
- **Extractor:** **Outscraper** (pure pay-as-you-go, no monthly subscription).
- **Step 0 — $0–$1 Pilot (25–50 restaurants):** use Outscraper's free tier (first 500 places + first 500 reviews free) to verify before spending real money:
  - whether structured `Food / Service / Atmosphere` sub-ratings come back reliably for Montreal,
  - whether `cutoffRating=3` stops billing above 3★ (not just post-filtering),
  - how accurately the LLM reads Québécois idioms and sarcasm.
- **Step 1 — City directory scrape (~$12.60):** scrape ~4,700 Montreal places (name, star rating, review count, category, lat/lng, Place ID, Maps URL). First 500 free, then $3 / 1,000 places. Capturing lat/lng upfront eliminates Geocoding API cost. *Checkpoint:* inspect the rating histogram locally before running Step 3.
- **Step 2 — Local pre-filter ($0):** narrow to ~1,000–1,200 independent candidates:
  - Overall rating between **3.3 and 4.3★**
  - At least **30 total reviews**
  - Exclude fast-food/coffee chains, mall food courts, and permanently closed places
- **Step 3 — Targeted 1–3★ review scrape (~$58.50):** fetch low-star text reviews for filtered candidates:
  - `sort=lowest_rating`, `cutoffRating=3`, `ignoreEmpty=true`
  - Cap ~20 reviews/restaurant (~20,000 reviews; first 500 free, then $3 / 1,000)
  - Keep `originalText` intact (no auto-translation)
- **Step 4 — Batch LLM classification (~$1.60–$2.50):** run all ~20,000 reviews through an offline batch job (e.g. Gemini Batch API Flash-Lite at ~$0.125–$0.15 / 1M input and ~$0.75–$1.25 / 1M output tokens).
  - **Québécois false-friend rule (must be in the prompt):** in Quebec French, *"écoeurant"*, *"malade"*, *"cochon"*, *"terrible"* (positive slang), and *"pas pire pantoute"* mean **delicious / great**, not food poisoning or gross; *"service bête"* means gruff/rude service (`service` booster), not unsafe.
  - Per-review JSON schema (flat and cheap to generate):

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
  - **Optional verification pass:** spend part of the ~$25 headroom on a higher-precision model over the top ~300 finalists to double-check sarcasm, Québécois nuance, and final quote selection.
- **Step 5 — Local scoring & export ($0, freely re-tunable):**
  - **Recency weights:** `1.0` (≤ 18 months), `0.6` (18–36 months), `0.3` (> 36 months); `hygiene` and `decline` flags in the last 12 months get `1.5×` penalty weight.
  - **Hard drop rules (veto):**
    - fewer than `8` non-noise 1–3★ text reviews (suppresses small-sample luck),
    - `≥ 2` recent `hygiene` flags (or any corroborated poisoning/pest report),
    - weighted `food` red-flag share `> 25%`,
    - `≥ 2` `decline` flags in the last 18 months.
  - **Baseline Gem Score (0–100):**
    - `booster_rate = W_boosters / (W_boosters + 2 * W_red_flags + 3)` (Bayesian smoothing `k = 3`; red flags penalize 2×)
    - `+ food_praise_bonus` when `food_sentiment == 1` or Google Food sub-rating ≥ 4 inside a ≤ 3★ review (strongest false-negative proof)
    - `+ underdog_bonus` mild boost in the 3.5–4.2★ sweet spot
    - Because aggregation runs locally on the saved LLM JSON, weights can be tuned endlessly for $0.
- **Estimated total one-time cost:** ~$73–$74 USD (~$26 headroom under the $100 cap; **$0 ongoing**).

## static dataset schema (`docs/-resto/gems.json`)

Compact, privacy-clean file consumed directly by `index.html`:

```json
{
  "generated": "2026-11",
  "area": "Montréal",
  "items": [
    {
      "id": "ChIJ...",
      "name": "Chez Exemple",
      "hood": "Rosemont",
      "cuisine": "Bistro",
      "lat": 45.5412,
      "lng": -73.5914,
      "rating": 3.8,
      "reviews": 240,
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

- Strip all reviewer names, profile links, and user IDs before publishing `gems.json`.
- Truncate timestamps to `YYYY-MM` and keep quotes to short verbatim excerpts (≤ 180 chars), never full review dumps.
- Link straight to Google Maps for live status, hours, menus, and full reviews.

## open questions

- **Geographic bounds:** Island of Montreal only, or Greater Montreal (Laval / Longueuil / South Shore)?
- **Map choice for v1:** Leaflet (OpenStreetMap, zero key/billing, needs dependency approval) vs. Google Maps JS API (using `docs/_env/` key restricted to `schem.ist`) vs. list-only v1 + Google My Maps CSV?
- **Pipeline script home:** keep offline scrape/LLM scripts in a repo-root folder (e.g. `scripts/resto/`, with raw data gitignored) or in a separate private scratch repo?
- **Budget headroom (~$25 remaining):** increase scrape depth from 20 to ~25–28 reviews/restaurant, run a second high-precision LLM pass on top ~300 finalists, or keep spend minimized?
- **Pre-filter bounds:** confirm 3.3–4.3★ and ≥ 30 reviews after inspecting the Step 1 directory histogram.
- **App title & voice:** keep `resto` as the folder name, and pick a funny bilingual page title (e.g. *1-star gems // perles à 1 étoile* or *bad reviews, good food // mauvais avis, bonne bouffe*).
