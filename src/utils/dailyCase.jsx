import { cases } from '../data/cases';

export function todayKey() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/**
 * Deterministic hash so every player gets the same case on the same day.
 */
function hashDate(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function getDailyCase(dateStr = todayKey()) {
  const h = hashDate(dateStr);
  const idx = h % cases.length;
  const base = cases[idx];

  // Daily variant: shorter time + bonus reward
  return {
    ...base,
    id: `daily-${dateStr}`,
    title: `[DAILY] ${base.title}`,
    reward: Math.round(base.reward * 1.5),
    timeLimit: Math.max(60, Math.round(base.timeLimit * 0.75)),
    isDaily: true,
    baseId: base.id,
    dateKey: dateStr,
  };
}

/**
 * Compute new streak given last played date.
 */
export function computeStreak(lastDate, today, currentStreak) {
  if (!lastDate) return 1;
  if (lastDate === today) return currentStreak;

  const last = new Date(lastDate + 'T00:00:00');
  const now = new Date(today + 'T00:00:00');
  const diffDays = Math.round((now - last) / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return currentStreak + 1;
  return 1; // streak broken
}