# resto data

Working data for the draft app [`docs/-resto/`](../../docs/-resto/readme.md). It is not published on schem.ist (only `docs/` is), but this repository is public.

## files

- `central_mtl_places.json.gz`: 3,023 Central Montreal places from Google Maps listings (name, address, coordinates, rating, star counts).
- `central_mtl_reviews.json.gz`: 11,447 one- to three-star reviews of 602 restaurants, in their original language.
- `make_gold_set.js` & `gold_set.json`: deterministic stratified 60-review sample (60 distinct places) drawn from `central_mtl_reviews.json.gz` for hand-labeling before the pilot LLM run.

## provenance

- **Source:** Google Maps place listings and public reviews, collected in November 2026 through Outscraper, a third-party data service.
- **Cleaned:** reviewer names, user IDs, review IDs and links removed; dates cut to `YYYY-MM`.
- **Authorship:** each review text belongs to its author.

## purpose

Non-commercial research for a hobby site: sort the complaints in low-star reviews to find restaurants with good food and unfair ratings. The site publishes only short excerpts (180 characters at most), each linked to the place's Google Maps page. No ads, nothing sold.

## removal on request

If you wrote one of these reviews, or represent a listed restaurant, and want something removed, open an issue on this repository. It will be removed promptly.

## en bref (français)

Données de travail du projet `docs/-resto/`, absentes du site schem.ist mais visibles dans ce dépôt public. Source : fiches et avis publics Google Maps, recueillis en novembre 2026 avec Outscraper. Noms des auteurs, identifiants et liens retirés ; dates réduites au mois. Chaque avis appartient à son auteur. Usage non commercial : le site ne publie que de courts extraits (180 caractères au plus) liés à la fiche Google Maps. Pour faire retirer un avis ou un restaurant, ouvrez une *issue* dans ce dépôt : ce sera fait rapidement.
