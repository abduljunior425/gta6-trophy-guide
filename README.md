# GTA VI Trophy Guide — All 55 Trophies, Tracker, Roadmap & Spoiler Mode

[![make.fun · gta6-trophy-guide-01](https://make.fun/badge/gta6-trophy-guide-01.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![rank](https://make.fun/badge/gta6-trophy-guide-01/abduljunior425/gta6-trophy-guide/rank.svg)](https://make.fun/bounty/gta6-trophy-guide-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![reward](https://make.fun/badge/gta6-trophy-guide-01/abduljunior425/gta6-trophy-guide/reward.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)

An offline web app for tracking and earning every PlayStation 5 trophy in Grand Theft Auto VI: a checklist that saves your progress, filters by kind and grade, a spoiler mode that masks secret trophies, a platinum roadmap, and a step-by-step guide for each trophy with its sources cited. An entry for the [make.fun bounty](https://make.fun/bounty/gta6-trophy-guide-01).

## What it does

- **Tracker** (`app/src/tracker.js`): tick trophies off and the checklist saves in localStorage, with a progress bar and percentage. Progress can be exported to a JSON file and imported back.
- **Filters** (`app/src/filters.js`): narrow the list by kind — story, missable, collectibles, activities, online — plus grade, text search and earned-only. There are no online trophies (all 55 are single-player), so the online filter shows an empty-state note by design.
- **Spoiler mode** (`app/src/spoiler.js`): hides the names and descriptions of the 28 secret trophies until they are earned, so story beats stay hidden while you play.
- **Trophy detail** (`app/src/detail.js`): click any card for the official name and description, its grade, a step-by-step guide and the cited source, with missable and unconfirmed flags shown.
- **Roadmap** (`app/src/roadmap.js`): three steps to the Platinum — story first (60–80 hours, 5 chapters), the 100% checklist next (Progress > Stats > 100% Completion), grind trophies last (about 200 hours total per PowerPyx) — with the missable trophy flagged and the 100% checklist counts in a table.
- **The list** (`app/data/trophies.json`): exactly 55 trophies — 1 Platinum, 2 Gold, 6 Silver, 46 Bronze; 28 hidden, 27 visible, 0 online.

## Trophy sources and accuracy

Trophy names, descriptions and grades come from the list published on Exophase and mirrored by PlanetGTA6, cross-checked against PSNProfiles and TrueAchievements; Rockstar has published no official trophy list. Names and descriptions were compared with PowerPyx's trophy guide and Push Square's trophy guide (both from 18 November 2026). The guide text is written in the author's own words and cites its sources; it does not copy guide text from other sites.

Three things to know:

- **Unconfirmed secrets:** as of 19 November 2026, no tracker confirms how **Bad Luck, I Guess** or **Ten Pin** unlock. PowerPyx lists both as currently unknown — the first is believed to relate to the Payday Loans store from the prologue, the second is believed to involve kicking enemies from a motorcycle. This guide gives their descriptions only and invents no method. PowerPyx has since confirmed the UFO method for The Truth Is Out There, so that one has a full guide.
- **The one possibly-missable trophy:** **Positive Mental Attitude** (meditate at all 18 spots). PowerPyx flags the Chapter 1 balcony meditation at Jason's house — after the mission Down to Earth, Lucia meditates on the balcony, and it may be required. Push Square lists no missable trophies. The app flags it in the banner, the roadmap and the trophy's own guide.
- **Grade note:** Maximum Withdrawal is Silver in the tracker consensus (PowerPyx, Exophase, PSNProfiles), which is what makes the split 1/2/6/46; Push Square's guide page lists it as Bronze.

## Facts used

Only Rockstar-confirmed facts: released 19 November 2026 on PlayStation 5 and Xbox Series X|S only (no PC version announced); set in the state of Leonida including Vice City; protagonists Jason Duval and Lucia Caminos; six regions (Vice City, Leonida Keys, Grassrivers, Port Gellhorn, Ambrosia, Mount Kalaga); single-player. No GTA Online at launch, no official mission count, no official trophy list from Rockstar. Warning: cheats disable trophies and saving (PowerPyx). There is no mission replay, so keep manual saves at the start of each chapter.

## Run it

```sh
node serve.ts            # serves app/ on http://localhost:8080
```

Open the page in a desktop browser. It works with the network off: every file it loads is under `app/`.

Screenshots are real renders of the running app, taken with a headless browser at 1280×720:

1. `screenshots/1-checklist.jpg` — trophy list with progress, filters and grades (cover)
2. `screenshots/2-detail.jpg` — trophy detail: Positive Mental Attitude, with steps and cited sources
3. `screenshots/3-roadmap.jpg` — platinum roadmap with the missable trophy flagged
4. `screenshots/4-spoiler.jpg` — spoiler mode on, story trophies masked, export/import visible

The scenes are driven by `app/src/shots.js` (`?shot=list|detail|roadmap|spoiler`, see `shots.json`).

## Package it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` (Node 22, standard library only) copies `app/` and `screenshots/` to the output directory and writes `dossier.json` with the vendored make.fun library (`vendor/makefun-frontend.ts`, unchanged).

## License

MIT — see `LICENSE`. Unofficial fan guide, not affiliated with Rockstar Games.
