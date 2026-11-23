// Build a stratified 60-review gold set from data/resto/central_mtl_reviews.json.gz.
// Usage: node data/resto/make_gold_set.js
//
// Deterministic: the seeded shuffle reproduces Python's random.Random(20261122),
// and the patterns keep Python's regex rules, so re-runs give the exact same
// 60 items across 60 distinct restaurants as the first gold_set.json.
// Never modifies central_mtl_reviews.json.gz (review keys are place_id:index).
// Refuses to overwrite gold_set.json once any item has been labeled.

import {readFileSync, writeFileSync, existsSync} from 'node:fs'
import {gunzipSync} from 'node:zlib'
import {fileURLToPath} from 'node:url'

const REVIEWS_PATH = fileURLToPath(new URL('central_mtl_reviews.json.gz', import.meta.url))
const OUT_PATH = fileURLToPath(new URL('gold_set.json', import.meta.url))
const SEED = 20261122
const SIZE = 60

const GUIDE = {
	instructions: 'Hand-label each item\'s `gold` object using the allowed values below. '
		+ 'Leave `quote` as null if nothing is funny/revealing, if any red flag is present, '
		+ 'or if a usable excerpt would name a staff member or reviewer. '
		+ '`quote` must be a verbatim substring of `text` (<=180 chars) in FR, EN, or ES.',
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

const BLANK_GOLD = {
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
}

// Python regex rules in JS: accented letters are word characters for \b,
// \s is Python's whitespace set, and . stops only at \n.
const WORD = '[\\p{L}\\p{N}_]'
const PY_ESCAPES = {
	b: `(?:(?<=${WORD})(?!${WORD})|(?<!${WORD})(?=${WORD}))`,
	s: '[\\t-\\r\\x1c-\\x20\\x85\\xa0\\u1680\\u2000-\\u200a\\u2028\\u2029\\u202f\\u205f\\u3000]',
}

function py(src, flags = '') {
	let out = '', inClass = false
	for (let i = 0; i < src.length; i++) {
		const c = src[i]
		if (c === '\\') {
			const n = src[++i]
			out += (!inClass && PY_ESCAPES[n]) || '\\' + n
		}
		else if (inClass) {
			out += c
			if (c === ']') inClass = false
		}
		else if (c === '[') {
			out += c
			inClass = true
		}
		else out += c === '.' ? '[^\\n]' : c
	}
	const re = new RegExp(out, 'u' + flags)
	return text => re.test(text)
}

// lengths and strip as in Python: count code points, trim Python whitespace
const len = text => [...text].length
const EDGE_SPACE = new RegExp(`^${PY_ESCAPES.s}+|${PY_ESCAPES.s}+$`, 'gu')
const strip = text => text.replace(EDGE_SPACE, '')
const within = (text, min, max) => min <= len(text) && len(text) <= max

// Python's random.Random(seed) for a seed below 2**32: Mersenne Twister MT19937
function pyRandom(seed) {
	const N = 624, mt = new Uint32Array(N)
	mt[0] = 19650218
	for (let k = 1; k < N; k++) mt[k] = Math.imul(1812433253, mt[k - 1] ^ (mt[k - 1] >>> 30)) + k
	let a = 1
	for (let k = N; k; k--) {
		mt[a] = (mt[a] ^ Math.imul(mt[a - 1] ^ (mt[a - 1] >>> 30), 1664525)) + seed
		if (++a >= N) { mt[0] = mt[N - 1]; a = 1 }
	}
	for (let k = N - 1; k; k--) {
		mt[a] = (mt[a] ^ Math.imul(mt[a - 1] ^ (mt[a - 1] >>> 30), 1566083941)) - a
		if (++a >= N) { mt[0] = mt[N - 1]; a = 1 }
	}
	mt[0] = 0x80000000
	let index = N
	function next() {
		if (index >= N) {
			for (let k = 0; k < N; k++) {
				const y = (mt[k] & 0x80000000) | (mt[(k + 1) % N] & 0x7fffffff)
				mt[k] = mt[(k + 397) % N] ^ (y >>> 1) ^ (y & 1 ? 0x9908b0df : 0)
			}
			index = 0
		}
		let y = mt[index++]
		y ^= y >>> 11
		y ^= (y << 7) & 0x9d2c5680
		y ^= (y << 15) & 0xefc60000
		y ^= y >>> 18
		return y >>> 0
	}
	function below(n) {
		const shift = Math.clz32(n)
		let r
		do r = next() >>> shift
		while (r >= n)
		return r
	}
	function shuffle(list) {
		for (let i = list.length - 1; i > 0; i--) {
			const j = below(i + 1)
			;[list[i], list[j]] = [list[j], list[i]]
		}
	}
	return {next, shuffle}
}

// Ordered [stratum, quota, matcher(place, review)]
const s = {
	slangQc: py(String.raw`(bouffe.{0,20}(malade|pas pire|[eé]c[oœ]urant)|nourriture.{0,20}(pas pire|malade|[eé]c[oœ]urant)|service b[eê]te|\bpas pire\b)`, 'i'),
	gotSick: py(String.raw`(tomb[eé]|rendu|[eé]t[eé])\s+malade`, 'i'),
	sarcasm: py(String.raw`(v[eé]ritable brique|without fish|excellent choix si|best .* if you like|congratulations on|10/10 if you want|5 stars? for.*(wait|rude|cold))`, 'i'),
	pests: py(String.raw`(\bsouris\b|\bmouse\b|\bmice\b|coquerelle|cockroach|\brat\b|intoxication|food poison|tomb[eé] malade|rendu malade)`, 'i'),
	praise: py(String.raw`(nourriture est bonne|bouffe est bonne|food is good|food was good|tr[eè]s bon|delicious|good food|great food)`, 'i'),
	decline: py(String.raw`(auparavant|used to be|avant c.[eé]tait|l.ombre de ce qu|used to love|autrefois|has gone downhill|plus comme avant)`, 'i'),
	changeHands: py(String.raw`(new owner|nouveau propri|chang[eé] de propri|nouvelle administration|nouvelle direction|under new management)`, 'i'),
	tipping: py(String.raw`\b(pourboire obligatoire|mandatory tip|not tipping|assez de tip|22%|20%|18%|gratuity|demande du tip|impos[eé].*tip)\b`, 'i'),
	delivery: py(String.raw`\b(hubert|uber\s*eats|doordash|skipthedishes|livreur|delivery driver)\b`, 'i'),
	language: py(String.raw`\b(oqlf|loi 96|bill 96|refus[eé] de parler.*fran[cç]ais|speak french|bonjour.?hi|en fran[cç]ais)\b`, 'i'),
	venueText: py(String.raw`(bouncer|portier|d[eé]panneur|chambre|room|bowling|karaok|cocktail|bi[eè]re|drinks only|margarita)`, 'i'),
	venueName: py(String.raw`(bar|h[oô]tel|hotel|bowling|mart|taverne|pub|lounge|club|karaok)`, 'i'),
	walkout: py(String.raw`(sommes partis|nous sommes lev[eé]s|walked out|we left|refused to seat|refus[eé] de nous asseoir|full party|tout le groupe)`, 'i'),
	serious: py(String.raw`\b(racis[mt]|discriminat|allergi[ec]|celiac|c[oœ]liaque|harc[eè]lement|harass|wheelchair|fauteuil roulant)\b`, 'i'),
	staffNamed: py(String.raw`(?:\b(serveur|serveuse|waiter|waitress|g[eé]rant|manager|par)\s+)(?!Uber|Ubereats|Doordash|Skip|Google|Montr[eé]al|Canada|Qu[eé]bec|Saint|Sainte|Rue|Jean|Notre|Pour|Mais|Très|Tres|Tout|Nous|Vous|Avec|Sans|Cette|Dans)[A-ZÉÈÊ][a-zàâéèêîôùûç]{2,11}\b`),
	price: py(String.raw`(gen[eè]ve|copenhague|trop cher|overpriced|way too expensive|shrinkflation)`, 'i'),
	authentic: py(String.raw`\b(cash only|comptant seulement|argent comptant|pas de carte|no substitution|too spicy|trop [eé]pic[eé]|tasting menu|menu d[eé]gustation|pas de r[eé]servation)\b`, 'i'),
	decorLoud: py(String.raw`\b(courant d.air|draft|by the door|pr[eè]s de la porte|trop bruyant|too loud|can.t hear|s.entendre parler)\b`, 'i'),
	comedy: py(String.raw`(comment.+4\.|how does this have|don.t understand the (high|good) rating|tape sur notre table|crie sur nous|yelled at us|tiktok|gen[eè]ve)`, 'i'),
	spanish: py(String.raw`\b(comida|servicio|p[eé]simo|muy mala|muy bueno|nunca m[aá]s|no recomiendo|mesero|mesera|restaurante|caro para)\b`, 'i'),
	notSpanish: py(String.raw`\b(tr[eè]s|vraiment|nourriture|bouffe|avec|pour|n[aã]o|muito|esse|prato|fica|saindo)\b`, 'i'),
	noise: py(String.raw`(ferm[eé] alors que|closed when google|wrong address|ancien emplacement|mauvais resto)`, 'i'),
}

const STRATA = [
	['slang_qc', 4, (p, r) => s.slangQc(r.text) && !s.gotSick(r.text) && len(r.text) <= 650],
	['sarcasm', 3, (p, r) => s.sarcasm(r.text)],
	['hygiene_with_praise', 2, (p, r) => s.pests(r.text) && s.praise(r.text) && len(r.text) <= 800],
	['decline_past_praise', 3, (p, r) => s.decline(r.text) && len(r.text) <= 650],
	['change_hands', 2, (p, r) => s.changeHands(r.text) && len(r.text) <= 650],
	['tipping', 4, (p, r) => s.tipping(r.text) && within(r.text, 50, 500)],
	['delivery', 3, (p, r) => s.delivery(r.text) && within(r.text, 60, 500)],
	['language_oqlf', 2, (p, r) => s.language(r.text) && within(r.text, 60, 500)],
	['non_food_venue', 3, (p, r) => s.venueText(r.text) && s.venueName(p.name + ' ' + p.type) && len(r.text) <= 600],
	['walkout', 3, (p, r) => s.walkout(r.text) && within(r.text, 60, 550)],
	['serious', 3, (p, r) => s.serious(r.text) && within(r.text, 60, 600)],
	['staff_named', 2, (p, r) => s.staffNamed(r.text) && within(r.text, 50, 550)],
	['price_boundary', 3, (p, r) => s.price(r.text) && within(r.text, 50, 350)],
	['authentic', 3, (p, r) => s.authentic(r.text) && within(r.text, 50, 500)],
	['decor_loud', 2, (p, r) => s.decorLoud(r.text) && within(r.text, 50, 500)],
	['comedy_owner_meta', 3, (p, r) => s.comedy(r.text) && within(r.text, 50, 500)],
	['spanish', 5, (p, r) => s.spanish(r.text) && !s.notSpanish(r.text) && within(r.text, 40, 500)],
	['polite_2_3_star', 3, (p, r) => (r.stars === 2 || r.stars === 3) && within(r.text, 40, 400)],
	['noise', 2, (p, r) => len(strip(r.text)) <= 45 || s.noise(r.text)],
]

function isLabeled(path) {
	if (!existsSync(path)) return false
	const blank = JSON.stringify(BLANK_GOLD)
	return JSON.parse(readFileSync(path, 'utf8')).items.some(item => JSON.stringify(item.gold) !== blank)
}

function main() {
	if (isLabeled(OUT_PATH)) {
		console.error(`${OUT_PATH} already has labels: not overwriting it. Move it away first to make a fresh set.`)
		process.exit(1)
	}
	const rng = pyRandom(SEED)
	const places = JSON.parse(gunzipSync(readFileSync(REVIEWS_PATH)).toString('utf8'))
	const all = places.flatMap(p => p.reviews.map((r, idx) => ({p, idx, r, id: `${p.id}:${idx}`})))

	const selected = [], usedIds = new Set(), usedPlaces = new Set()
	function pick(stratum, quota, matcher) {
		const cands = all.filter(c => !usedIds.has(c.id) && !usedPlaces.has(c.p.id) && matcher(c.p, c.r))
		rng.shuffle(cands)
		const chosen = cands.slice(0, quota)
		for (const c of chosen) {
			usedIds.add(c.id)
			usedPlaces.add(c.p.id)
			selected.push({stratum, ...c})
		}
		if (chosen.length < quota) console.log(`WARN: stratum ${stratum} only matched ${chosen.length}/${quota}`)
	}

	for (const [stratum, quota, matcher] of STRATA) pick(stratum, quota, matcher)
	const remaining = SIZE - selected.length
	if (remaining > 0) pick('random_baseline', remaining, (p, r) => within(r.text, 40, 600))

	const items = selected.map(({stratum, p, r, id}, i) => ({
		num: i + 1,
		id,
		stratum,
		place: p.name,
		cuisine: p.type,
		stars: r.stars,
		date: r.date,
		text: r.text,
		gold: structuredClone(BLANK_GOLD),
	}))

	const payload = {
		version: 1,
		created: '2026-11-22',
		source: 'data/resto/central_mtl_reviews.json.gz',
		count: items.length,
		guide: GUIDE,
		items,
	}
	writeFileSync(OUT_PATH, JSON.stringify(payload, null, 2) + '\n')
	console.log(`Wrote ${items.length} items across ${usedPlaces.size} places to ${OUT_PATH}`)
}

main()
