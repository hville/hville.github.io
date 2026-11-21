# resto

![resto](readme.svg)

## goals
- Identify "hidden gem" restaurants in the **Montreal area** whose Google Maps ratings are artificially depressed by unfair, misplaced, or non-food-related negative reviews.
- Counteract rating distortion (anchoring, peer pressure, inflated 5-star scores) by treating **1–3 star reviews** as higher-signal, more genuine data.
- Detect misplaced complaints purely from **in-text tone, complaint type, and Google sub-ratings**—no cross-restaurant reviewer history or user profiling required.
- Run strictly as an **offline, one-time batch pipeline under $100 USD total** with **$0 recurring fees** during ongoing use (manual re-runs only if desired later).

## review examples

### Target "Great Bad Reviews" (False-Negative Boosters)
- **Food-vs-Everything-Else Split:** Reviewer praises the food (or leaves a structured Google sub-rating of Food 4–5/5) while docking overall stars for brusque service, slow pacing, noise, cramped seating, or long waits (e.g., *"service bête mais la bouffe est malade"*).
- **Format or Authenticity Mismatch:** Complaints that actually signal a strong culinary identity—too spicy, unfamiliar traditional ingredients, small tasting portions, no substitutions, cash-only policies, or no-reservation queues.
- **External Friction (Montreal-Specific):** Docked stars for street parking, road construction, winter lineups, cold delivery-app orders (e.g., Uber Eats), or language-policy friction rather than the kitchen's output.
- **Disproportionate / Entitled Tone:** Hyperbole over standard policy enforcement (refusing to seat incomplete parties, charging for extra sides, enforcing table turnover) or demanding free comps.

### Hard Disqualifiers (Genuine Red Flags)
- **Core Food Failure:** Repeated complaints about stale/spoiled ingredients, raw or overcooked mains, greasy/bland execution, or obviously frozen/reheated dishes.
- **Hygiene & Safety:** Mentions of food poisoning, uncleanliness, or pests.
- **Recent Decline:** Time-stamped mentions of deterioration (e.g., *"used to be amazing, new owner ruined it"*).

## UI
- **Architecture:** A precomputed static dataset (`montreal_gems.json` / `.csv`) containing ~150–400 ranked Montreal restaurants served to a **$0/month** map frontend.
- **Per-Pin Data:** Restaurant name, lat/lng coordinates, Gem Score, Google overall rating, total review count, complaint-type tags, top verbatim "great bad review" quote(s), and a direct Google Maps URL for live hours, menus, and directions.
- **Zero-Cost Frontend Options (from the same static file):**
  - **Static HTML + Leaflet (OpenStreetMap):** Single self-contained HTML/JSON app (local or GitHub Pages) with custom filters (neighborhood, cuisine, Gem Score slider, complaint-type toggles). Requires no API keys or billing account.
  - **Static HTML + Google Maps JS API:** Same custom filtering over Google's native map tiles. Free up to 10,000 Dynamic Map loads/month (requires a Cloud billing account with a hard daily quota cap set to prevent accidental charges).
  - **Google My Maps (No-code):** Direct CSV import (within limits of 2,000 rows/layer, 10 layers, and 20,000 total data cells). Opens natively in the Google Maps mobile app, with basic layer toggles only.

## getting the data
- **Platform:** **Google Maps** (~4,700 Montreal restaurants, native lowest-first review sorting, and structured Food/Service/Atmosphere sub-ratings).
- **Extraction Provider:** **Outscraper** (pure pay-as-you-go pricing, no monthly subscription).
- **Step 1 — City Directory Scrape (~$12.60):** Scrape metadata for Montreal restaurants (~4,700 places: name, star rating, review count, category, exact lat/lng, Place ID, Maps URL). Pricing: first 500 free, then $3 / 1,000 places. Capturing lat/lng upfront eliminates any downstream Geocoding API cost.
- **Step 2 — Local Pre-Filter ($0):** Filter the directory locally before pulling any reviews to narrow down to ~1,000–1,200 independent candidates:
  - Overall rating between **3.3 and 4.3 stars**
  - At least **30 total reviews**
  - Exclude fast-food chains, coffee kiosks, and permanently closed establishments
- **Step 3 — Targeted 1–3★ Review Scrape (~$58.50):** Fetch only low-star text reviews for the filtered candidates using:
  - `sort=lowest_rating`
  - `cutoffRating=3` (stops automatically above 3 stars)
  - `ignoreEmpty=true` (skips star-only ratings with no text)
  - Cap of ~20 reviews per restaurant (~20,000 reviews total; first 500 free, then $3 / 1,000 reviews).
- **Language Preservation:** Keep `originalText` intact without auto-translation. French, English, and Franglais tone, sarcasm, and Québécois idioms must be evaluated natively by the LLM.

## processing the data
- **Batch LLM Classification (~$1.60–$2.50):** Run all ~20,000 scraped reviews through an offline batch LLM job (e.g., Gemini Batch API Flash-Lite tier at ~$0.125–$0.15 / 1M input and ~$0.75–$1.25 / 1M output tokens) returning structured JSON per review:
  - Classify false-negative booster categories vs. genuine food/hygiene/decline red flags.
  - Factor in Google's native Food/Service/Atmosphere sub-ratings when available.
  - Extract the single most revealing verbatim "great bad review" quote.
- **Optional Verification Pass:** Use part of the remaining ~$25 budget headroom to run a higher-precision LLM pass on the top ~300 finalists to double-check sarcasm and Québécois nuance.
- **Restaurant-Level Aggregation:**
  - Compute a **Gem Ratio / Score** comparing false-negative complaint prevalence against genuine food-execution and hygiene red flags.
  - Enforce a minimum low-star text review floor (~10–15 reviews) to suppress small-sample noise.
  - Apply recency weighting (prioritizing the last 18–24 months) so formerly great restaurants that declined are penalized.
- **Output:** Export final ranked list to static `montreal_gems.json` (and optional `.csv`) for the UI.
- **Estimated Total One-Time Cost:** ~$73–$74 USD (~$26 headroom under the $100 cap; $0 ongoing).

## open questions
- **Scoring Rubric & JSON Schema:** Exact list of complaint categories, severity tags, disqualifier rules, and the strict JSON output schema for the batch LLM prompt.
- **Ranking Formula:** Exact mathematical aggregation combining Gem Ratio, red-flag penalties, review-count confidence weighting, recency decay, and overall star rating.
- **Pre-Filter Boundaries:** Finalizing the geographic bounds of Montreal, exact star-rating window (3.3–4.3 vs. adjusted), minimum review threshold, and chain-exclusion rules.
- **Budget Headroom Allocation (~$25 remaining):** Whether to increase scrape depth from 20 to ~25–28 reviews per restaurant, fund a second high-precision LLM pass on finalists, or keep total spend minimized.
- **Target Frontend Selection:** Deciding between building a custom static HTML map (Leaflet vs. Google Maps JS API) for interactive filtering, generating a Google My Maps CSV for instant mobile use, or exporting artifacts for both.
- **Pilot Calibration:** Whether to run a small pilot batch (~150–200 restaurants) first to verify scraper parameters and tune the LLM scoring prompt before executing the full Montreal run.
