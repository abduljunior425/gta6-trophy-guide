// filters.js — narrow the trophy list by kind, grade, text, or earned state.
// Kinds: story, missable, collectible, activity, online. There are no online
// trophies in GTA VI at launch, so the online filter always matches nothing
// and the list shows an empty-state note instead of an empty grid.
export function filterTrophies(trophies, filters, earned) {
  const query = (filters.query || '').trim().toLowerCase();
  return trophies.filter((t) => {
    if (filters.grade !== 'all' && t.grade !== filters.grade) return false;
    if (filters.earnedOnly && !earned.has(t.id)) return false;
    if (filters.kind === 'story' && t.kind !== 'story') return false;
    if (filters.kind === 'missable' && !t.missable) return false;
    if (filters.kind === 'collectible' && t.kind !== 'collectible') return false;
    if (filters.kind === 'activity' && t.kind !== 'activity') return false;
    if (filters.kind === 'online') return false;
    if (query && !(t.name.toLowerCase().includes(query) || t.description.toLowerCase().includes(query))) return false;
    return true;
  });
}

export function emptyNoteFor(filters) {
  if (filters.kind === 'online') {
    return 'No online trophies: all 55 trophies unlock in single-player. GTA VI has no GTA Online at launch, so this filter is empty by design.';
  }
  if (filters.earnedOnly) return 'Nothing earned under this filter yet. Tick a trophy to mark it earned.';
  return 'No trophies match this filter. Clear the search or pick another kind.';
}
