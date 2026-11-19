// roadmap.js — the platinum roadmap: story first, the 100% checklist next,
// grind trophies last, with the one possibly-missable trophy flagged up front.
export function renderRoadmap(container, trophies, earned) {
  const story = trophies.filter((t) => t.kind === 'story');
  const storyDone = story.filter((t) => earned.has(t.id)).length;
  const missable = trophies.find((t) => t.missable);
  container.innerHTML = '';
  const intro = document.createElement('p');
  intro.className = 'note';
  intro.textContent = 'PowerPyx rates the list 4/10 and about 200 hours to the Platinum (Push Square says up to 300 hours or more). One playthrough is enough, there is no difficulty setting, and everything is single-player. Cheats disable trophies and saving, so keep them off.';
  container.append(intro);

  const warn = document.createElement('div');
  warn.className = 'warn';
  warn.innerHTML = `<strong>Missable watch — ${missable.name}.</strong> PowerPyx flags the Chapter 1 balcony meditation at Jason's house: after the mission Down to Earth, talk to Lucia in the kitchen in the morning, follow her to the balcony and choose Accept. It may be required for the trophy and it is gone after Chapter 1. Push Square lists no missable trophies. Do it in Chapter 1 and keep a chapter-start save.`;
  container.append(warn);

  const steps = [
    {
      title: 'Step 1 — Story first, 60–80 hours',
      body: `Finish the 5 chapters and enjoy the story. ${storyDone} of ${story.length} story trophies earned so far. Progress toward the 100% checklist already counts while you play, so scan vehicles, study animals and do optional missions as you meet them. Keep a manual save at the start of each chapter: there is no mission replay.`,
    },
    {
      title: 'Step 2 — The 100% checklist, about 100 hours',
      body: 'After the story, open Progress, then Stats, then 100% Completion. It is closer to 60% of everything in the game: any 100 optional missions, 200 of 277 base vehicles scanned, 100 of 255 animals studied, 300 stunts, 70 of 80 challenges, 15 of 18 card sets, all 8 bank vaults, all 39 gang operations and 15 of 18 meditations. Nothing on the checklist is missable.',
    },
    {
      title: 'Step 3 — Grind trophies last',
      body: 'Clean up what is left: Strangers & Freaks strands, the 250 stunts, the 42 shooting-range gold medals, the card sets and WAiNK scans. The Gold A Long Road (100% completion) is usually the last trophy before the Platinum pops.',
    },
  ];
  for (const s of steps) {
    const div = document.createElement('div');
    div.className = 'roadmap-step';
    const h = document.createElement('h3');
    h.textContent = s.title;
    const p = document.createElement('p');
    p.textContent = s.body;
    div.append(h, p);
    container.append(div);
  }

  const tableTitle = document.createElement('h3');
  tableTitle.textContent = '100% Completion checklist at a glance';
  container.append(tableTitle);
  const table = document.createElement('table');
  table.className = 'checklist';
  table.innerHTML = '<thead><tr><th>Checklist item</th><th>Needed</th><th>Of</th></tr></thead><tbody>' +
    '<tr><td>Optional missions</td><td>100</td><td>200+</td></tr>' +
    '<tr><td>Base vehicles scanned</td><td>200</td><td>277</td></tr>' +
    '<tr><td>Animals studied</td><td>100</td><td>255</td></tr>' +
    '<tr><td>Stunts</td><td>300</td><td>397</td></tr>' +
    '<tr><td>Challenges</td><td>70</td><td>80</td></tr>' +
    '<tr><td>Collectible card sets</td><td>15</td><td>18</td></tr>' +
    '<tr><td>Bank vaults</td><td>8</td><td>8</td></tr>' +
    '<tr><td>Illegal gang operations</td><td>39</td><td>39</td></tr>' +
    '<tr><td>Meditations</td><td>15</td><td>18</td></tr></tbody>';
  container.append(table);
  const src = document.createElement('p');
  src.className = 'source';
  src.textContent = 'Roadmap figures: PowerPyx (200 hours, 4/10, 60–80 hour story, checklist counts) and Push Square (300+ hours).';
  container.append(src);
}
