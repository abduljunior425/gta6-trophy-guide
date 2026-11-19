// spoiler.js — spoiler mode hides secret (story) trophies until they are
// earned. A hidden trophy shows a masked name and description; the earned
// checkbox still works so a player can tick one off without reading it.
export function isSpoilerHidden(trophy, spoilerOn, earned) {
  return spoilerOn && trophy.secret && !earned.has(trophy.id);
}

export function applySpoilerMask(trophy, spoilerOn, earned) {
  if (!isSpoilerHidden(trophy, spoilerOn, earned)) {
    return { name: trophy.name, description: trophy.description, masked: false };
  }
  return { name: 'Hidden story trophy', description: 'Hidden until earned — turn spoiler mode off, or tick it earned, to reveal it.', masked: true };
}
