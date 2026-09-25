export const achievements = [
  {
    id: 'first_case',
    icon: '🎯',
    title: 'First Contact',
    description: 'Solve your first case.',
    check: (s) => Object.keys(s.solved).length >= 1,
  },
  {
    id: 'three_cases',
    icon: '🕵️',
    title: 'Field Agent',
    description: 'Solve 3 cases.',
    check: (s) => Object.keys(s.solved).length >= 3,
  },
  {
    id: 'all_cases',
    icon: '🏆',
    title: 'Cyber Legend',
    description: 'Solve all available cases.',
    check: (s, ctx) => Object.keys(s.solved).length >= ctx.totalCases,
  },
  {
    id: 'no_hint_5',
    icon: '🧠',
    title: 'Pure Logic',
    description: 'Solve 5 cases without using any hints.',
    check: (s) => s.noHintSolves >= 5,
  },
  {
    id: 'fast_hands',
    icon: '⚡',
    title: 'Fast Hands',
    description: 'Solve any case in under 30 seconds.',
    check: (s) => Object.values(s.solved).some((c) => c.bestTime < 30),
  },
  {
    id: 'speedster',
    icon: '🚀',
    title: 'Speedster',
    description: 'Solve any case in under 15 seconds.',
    check: (s) => Object.values(s.solved).some((c) => c.bestTime < 15),
  },
  {
    id: 'perfect_3',
    icon: '💎',
    title: 'Flawless',
    description: 'Get 3 perfect solves (no hints, under half the time limit).',
    check: (s) => s.perfectSolves >= 3,
  },
  {
    id: 'rich_5000',
    icon: '💰',
    title: 'Well Funded',
    description: 'Accumulate 5,000 credits.',
    check: (s) => s.credits >= 5000,
  },
  {
    id: 'rich_15000',
    icon: '💸',
    title: 'Cyber Tycoon',
    description: 'Accumulate 15,000 credits.',
    check: (s) => s.credits >= 15000,
  },
  {
    id: 'streak_3',
    icon: '🔥',
    title: 'On a Roll',
    description: 'Reach a 3-day daily case streak.',
    check: (s) => s.daily.bestStreak >= 3,
  },
  {
    id: 'streak_7',
    icon: '☄️',
    title: 'Unstoppable',
    description: 'Reach a 7-day daily case streak.',
    check: (s) => s.daily.bestStreak >= 7,
  },
  {
    id: 'daily_5',
    icon: '📅',
    title: 'Daily Grinder',
    description: 'Complete 5 daily cases.',
    check: (s) => s.daily.history.filter((h) => h.solved).length >= 5,
  },
];

/**
 * Returns list of achievement ids that should be newly unlocked.
 */
export function checkAchievements(state, ctx) {
  const unlocked = [];
  for (const a of achievements) {
    if (state.unlockedAchievements[a.id]) continue;
    try {
      if (a.check(state, ctx)) unlocked.push(a.id);
    } catch (e) {
      // ignore individual check errors
    }
  }
  return unlocked;
}