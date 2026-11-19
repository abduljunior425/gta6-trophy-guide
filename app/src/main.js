// main.js — wires the guide together: loads the trophy data, renders the
// checklist, and connects the tracker, filters, spoiler mode, detail view
// and roadmap tabs. The app works offline: it fetches only local files.
import { loadEarned, saveEarned, toggleEarned, renderProgress, exportProgress, importProgressFile } from './tracker.js';
import { filterTrophies, emptyNoteFor } from './filters.js';
import { applySpoilerMask } from './spoiler.js';
import { renderRoadmap } from './roadmap.js';
import { openDetail } from './detail.js';
import { applyShotScene } from './shots.js';

const data = await (await fetch('data/trophies.json')).json();
const trophies = data.trophies;
let earned = loadEarned();

const filters = { kind: 'all', grade: 'all', query: '', earnedOnly: false };
let spoilerOn = false;

const listEl = document.getElementById('trophy-list');
const emptyEl = document.getElementById('empty-note');
const listNote = document.getElementById('list-note');
const detailSection = document.getElementById('detail');
const detailBody = document.getElementById('detail-body');
const listView = document.getElementById('view-list');
const roadmapView = document.getElementById('view-roadmap');

function gradeCountsText() {
  const counts = {};
  for (const t of trophies) counts[t.grade] = (counts[t.grade] || 0) + 1;
  return `1 Platinum · 2 Gold · 6 Silver · 46 Bronze · 28 hidden · 0 online · ${trophies.length} total`;
}

function renderList() {
  const shown = filterTrophies(trophies, filters, earned);
  listEl.replaceChildren();
  emptyEl.hidden = shown.length !== 0;
  if (shown.length === 0) emptyEl.textContent = emptyNoteFor(filters);
  for (const t of shown) {
    const view = applySpoilerMask(t, spoilerOn, earned);
    const li = document.createElement('li');
    li.className = 'card' + (earned.has(t.id) ? ' earned' : '');
    const row = document.createElement('div');
    row.className = 'row';
    const box = document.createElement('input');
    box.type = 'checkbox';
    box.checked = earned.has(t.id);
    box.setAttribute('aria-label', 'Mark ' + t.name + ' earned');
    box.addEventListener('change', (event) => {
      event.stopPropagation();
      earned = toggleEarned(earned, t.id);
      renderAll();
    });
    const badge = document.createElement('span');
    badge.className = 'grade grade-' + t.grade;
    badge.textContent = t.grade;
    row.append(box, badge);
    const name = document.createElement('h3');
    name.textContent = (earned.has(t.id) ? '✓ ' : '') + view.name;
    if (view.masked) name.classList.add('masked');
    const desc = document.createElement('p');
    desc.textContent = view.description;
    if (view.masked) desc.classList.add('masked');
    const tags = document.createElement('div');
    tags.className = 'row';
    if (t.secret) tags.append(Object.assign(document.createElement('span'), { className: 'tag tag-secret', textContent: 'Secret' }));
    if (t.missable) tags.append(Object.assign(document.createElement('span'), { className: 'tag tag-missable', textContent: 'Possibly missable' }));
    if (t.unconfirmed) tags.append(Object.assign(document.createElement('span'), { className: 'tag tag-unconfirmed', textContent: 'Unconfirmed' }));
    const src = document.createElement('span');
    src.className = 'source';
    src.textContent = 'Source: ' + t.source;
    tags.append(src);
    li.append(row, name, desc, tags);
    li.addEventListener('click', () => showDetail(t));
    listEl.append(li);
  }
  listNote.textContent = `Showing ${shown.length} of ${trophies.length} trophies. Tick a trophy to mark it earned; click a card for its full guide.`;
  renderProgress(earned, trophies.length);
}

function showDetail(trophy) {
  openDetail(trophy, earned, detailBody);
  detailSection.hidden = false;
  listView.hidden = true;
  roadmapView.hidden = true;
  detailSection.scrollIntoView();
}

function showList() {
  detailSection.hidden = true;
  listView.hidden = false;
  roadmapView.hidden = true;
  document.getElementById('tab-list').classList.add('active');
  document.getElementById('tab-roadmap').classList.remove('active');
}

function showRoadmap() {
  renderRoadmap(roadmapView, trophies, earned);
  detailSection.hidden = true;
  listView.hidden = true;
  roadmapView.hidden = false;
  document.getElementById('tab-roadmap').classList.add('active');
  document.getElementById('tab-list').classList.remove('active');
}

function renderAll() {
  renderList();
  if (!roadmapView.hidden) renderRoadmap(roadmapView, trophies, earned);
}

document.getElementById('grade-counts').textContent = gradeCountsText();
document.getElementById('tab-list').addEventListener('click', showList);
document.getElementById('tab-roadmap').addEventListener('click', showRoadmap);
document.getElementById('detail-close').addEventListener('click', showList);
document.getElementById('search').addEventListener('input', (e) => { filters.query = e.target.value; renderList(); });
document.getElementById('grade-filter').addEventListener('change', (e) => { filters.grade = e.target.value; renderList(); });
document.getElementById('earned-only').addEventListener('change', (e) => { filters.earnedOnly = e.target.checked; renderList(); });
document.getElementById('spoiler-toggle').addEventListener('change', (e) => { spoilerOn = e.target.checked; renderList(); });
document.getElementById('kind-filters').addEventListener('click', (e) => {
  const button = e.target.closest('[data-kind]');
  if (!button) return;
  filters.kind = button.dataset.kind;
  for (const chip of document.querySelectorAll('#kind-filters .chip')) chip.classList.toggle('active', chip === button);
  renderList();
});
document.getElementById('export-btn').addEventListener('click', () => exportProgress(earned));
document.getElementById('import-file').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  try {
    earned = await importProgressFile(file);
    renderAll();
  } catch {
    alert('That file is not a trophy progress export.');
  }
  e.target.value = '';
});

renderAll();
applyShotScene({ trophies, getEarned: () => earned, setEarned: (next) => { earned = next; saveEarned(earned); renderAll(); }, setSpoiler: (on) => { spoilerOn = on; document.getElementById('spoiler-toggle').checked = on; renderList(); }, showDetail, showRoadmap });
