// Snapshot an itch.io jam's entries and results into src/data/jams/<slug>.json.
//
//   npm run fetch-jam -- gump-jam-3
//
// itch has no official jam api, but the jam page's own entries and results
// views load from two public json endpoints keyed by the jam's numeric id.
// The id only appears on the jam page, so that gets scraped first.
//
// The output is committed rather than fetched at build time, so a deploy
// never depends on itch being up (and the results stop changing once
// voting closes anyway).

import { mkdir, writeFile } from "node:fs/promises";

const slug = process.argv[2];
if (!slug) {
	console.error("usage: npm run fetch-jam -- <jam-slug>   (e.g. gump-jam-3)");
	process.exit(1);
}

const jamUrl = `https://itch.io/jam/${slug}`;

async function get(url, as) {
	const res = await fetch(url);
	if (!res.ok) throw new Error(`${url} -> ${res.status} ${res.statusText}`);
	return as === "json" ? res.json() : res.text();
}

const page = await get(jamUrl, "text");

// new I.ViewJam('#view_jam_123', {"id":419483,"start_date":...,"end_date":...})
const viewJam = page.match(/I\.ViewJam\([^,]+,\s*(\{[^}]*\})\)/);
if (!viewJam) throw new Error(`no jam id on ${jamUrl} -- has itch changed the page?`);
const jam = JSON.parse(viewJam[1]);

const title = page
	.match(/<title>([^<]*)<\/title>/)?.[1]
	.replace(/ - itch\.io$/, "")
	.trim() ?? slug;

const [{ jam_games: entries }, { results }] = await Promise.all([
	get(`https://itch.io/jam/${jam.id}/entries.json`, "json"),
	get(`https://itch.io/jam/${jam.id}/results.json`, "json"),
]);

// results only exist once voting has closed
const resultFor = new Map((results ?? []).map((r) => [r.id, r]));

const games = entries.map(({ game }) => {
	const result = resultFor.get(game.id);
	return {
		id: game.id,
		title: game.title,
		url: game.url,
		description: game.short_text ?? null,
		// results list every contributor; entries only has the submitter
		authors: result?.contributors.map((c) => c.name) ?? [game.user.name],
		cover: game.cover ?? null,
		coverColor: game.cover_color ?? null,
		rank: result?.rank ?? null,
		score: result?.score ?? null,
	};
});

// ranked games first, then anything unranked in submission order
games.sort((a, b) => (a.rank ?? Infinity) - (b.rank ?? Infinity));

// one award per voting criterion. ties share first place, so each award
// can have more than one winner.
const criteria = [...new Set((results ?? []).flatMap((r) => r.criteria.map((c) => c.name)))];
const winners = criteria.map((award) => ({
	award,
	gameIds: (results ?? [])
		.filter((r) => r.criteria.some((c) => c.name === award && c.rank === 1))
		.map((r) => r.id),
}));

const out = {
	slug,
	title,
	url: jamUrl,
	entriesUrl: `${jamUrl}/entries`,
	startDate: jam.start_date,
	endDate: jam.end_date,
	fetchedAt: new Date().toISOString(),
	games,
	winners,
};

const dir = new URL("../src/data/jams/", import.meta.url);
await mkdir(dir, { recursive: true });
const file = new URL(`${slug}.json`, dir);
await writeFile(file, JSON.stringify(out, null, "\t") + "\n");

console.log(`${title}: ${games.length} games, ${winners.length} awards -> ${file.pathname}`);
