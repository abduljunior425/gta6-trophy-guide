// detail.js — the trophy detail view: official name and description, grade,
// step-by-step guide, cited source, and the missable / unconfirmed flags.
import { isSpoilerHidden } from './spoiler.js';

export function openDetail(trophy, earned, bodyEl) {
  bodyEl.innerHTML = '';
  const title = document.createElement('h2');
  title.textContent = trophy.name;
  const grade = document.createElement('p');
  const badge = document.createElement('span');
  badge.className = 'grade grade-' + trophy.grade;
  badge.textContent = trophy.grade;
  grade.append(badge, document.createTextNode('  ' + (trophy.secret ? 'Secret trophy · ' : '') + trophy.kind));
  const official = document.createElement('p');
  official.className = 'official';
  official.textContent = 'Official description: “' + trophy.description + '”';
  bodyEl.append(title, grade, official);

  if (trophy.missable) {
    const warn = document.createElement('p');
    warn.className = 'warn';
    warn.textContent = 'Possibly missable. PowerPyx flags the Chapter 1 balcony meditation; Push Square lists no missable trophies. See the guide below and keep a Chapter 1 save.';
    bodyEl.append(warn);
  }
  if (trophy.unconfirmed) {
    const warn = document.createElement('p');
    warn.className = 'warn';
    warn.textContent = 'Unconfirmed — description only. No tracker confirms how this trophy unlocks yet, so this guide gives no method rather than inventing one.';
    bodyEl.append(warn);
  }

  const guideTitle = document.createElement('h3');
  guideTitle.textContent = 'How to unlock it';
  const guide = document.createElement('p');
  guide.textContent = trophy.guide;
  const stepsTitle = document.createElement('h3');
  stepsTitle.textContent = 'Step by step';
  const steps = document.createElement('ol');
  for (const step of trophy.steps) {
    const li = document.createElement('li');
    li.textContent = step;
    steps.append(li);
  }
  const source = document.createElement('p');
  source.className = 'source';
  source.textContent = 'Source: ' + trophy.source + '. Guide text is written for this guide; official names and descriptions are shown as published.';
  const earnedLine = document.createElement('p');
  earnedLine.textContent = earned.has(trophy.id) ? 'Status: earned ✓' : 'Status: not earned yet.';
  bodyEl.append(guideTitle, guide, stepsTitle, steps, source, earnedLine);
}

export function detailIsSpoilerHidden(trophy, spoilerOn, earned) {
  return isSpoilerHidden(trophy, spoilerOn, earned);
}
