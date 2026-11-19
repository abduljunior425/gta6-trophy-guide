// shots.js — screenshot scenes. The ?shot= query picks a view for the
// screenshots: list, detail, roadmap, spoiler. ?seed=N pre-ticks the first N
// visible, non-secret trophies so the cover shows real progress; ?id= picks
// the trophy for the detail scene. This only changes what is shown, never
// the data, and it runs through the same render code as the normal app.
export function applyShotScene(api) {
  const params = new URLSearchParams(location.search);
  const seed = Number(params.get('seed') || 0);
  if (seed > 0) {
    const earned = new Set(api.getEarned());
    for (const t of api.trophies) {
      if (earned.size >= seed) break;
      if (!t.secret) earned.add(t.id);
    }
    api.setEarned(earned);
  }
  const shot = params.get('shot') || 'list';
  if (shot === 'spoiler') {
    api.setSpoiler(true);
  } else if (shot === 'roadmap') {
    api.showRoadmap();
  } else if (shot === 'detail') {
    document.body.classList.add('shot-detail');
    const id = Number(params.get('id') || 28);
    const trophy = api.trophies.find((t) => t.id === id) || api.trophies[0];
    api.showDetail(trophy);
    window.scrollTo(0, 0);
  }
}
