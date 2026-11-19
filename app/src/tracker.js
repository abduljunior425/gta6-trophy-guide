// tracker.js — the earned checklist: save it in localStorage, export it to a
// file, and import it back. Nothing here touches the network.
export const STORAGE_KEY = 'gta6-trophy-guide-earned-v1';

export function loadEarned() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const ids = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(ids) ? ids.filter((n) => Number.isInteger(n)) : []);
  } catch {
    return new Set();
  }
}

export function saveEarned(earned) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...earned].sort((a, b) => a - b)));
}

export function toggleEarned(earned, id) {
  if (earned.has(id)) earned.delete(id);
  else earned.add(id);
  saveEarned(earned);
  return earned;
}

export function progressCounts(earned, total) {
  const pct = total === 0 ? 0 : Math.round((earned.size / total) * 100);
  return { earned: earned.size, total, pct };
}

export function renderProgress(earned, total) {
  const { pct } = progressCounts(earned, total);
  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('progress-text').textContent =
    `${earned.size} of ${total} earned · ${pct}%`;
}

export function exportProgress(earned) {
  const payload = { game: 'Grand Theft Auto VI', exportedAt: new Date().toISOString(), earned: [...earned].sort((a, b) => a - b) };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'gta6-trophy-progress.json';
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}

export async function importProgressFile(file) {
  const data = JSON.parse(await file.text());
  const ids = Array.isArray(data) ? data : data.earned;
  if (!Array.isArray(ids)) throw new Error('Not a progress file');
  const earned = new Set(ids.filter((n) => Number.isInteger(n)));
  saveEarned(earned);
  return earned;
}
