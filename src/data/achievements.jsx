export const achievements = [
  {
    id: 'first_case',
    icon: '🎯',
    title: 'First Contact',
    description: 'Solve your first case.',
    check: s => Object.keys(s.solved).length >= 1,
  },
  {
    id: 'three_cases',
    icon: '🕵️',
    title: 'Field Agent',
    description: 'Solve 3 cases.',
    check: s => Object.keys(s.solved).length >= 3,
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
    check: s => s.noHintSolves >= 5,
  },
  {
    id: 'fast_hands',
    icon: '⚡',
    title: 'Fast Hands',
    description: 'Solve any case in under 30 seconds.',
    check: s => Object.values(s.solved).some(c => c.bestTime < 30),
  },
  {
    id: 'speedster',
    icon: '🚀',
    title: 'Speedster',
    description: 'Solve any case in under 15 seconds.',
    check: s => Object.values(s.solved).some(c => c.bestTime < 15),
  },
  {
    id: 'perfect_3',
    icon: '💎',
    title: 'Flawless',
    description: 'Get 3 perfect solves (no hints, under half the time limit).',
    check: s => s.perfectSolves >= 3,
  },
  {
    id: 'rich_5000',
    icon: '💰',
    title: 'Well Funded',
    description: 'Accumulate 5,000 credits.',
    check: s => s.credits >= 5000,
  },
  {
    id: 'rich_15000',
    icon: '💸',
    title: 'Cyber Tycoon',
    description: 'Accumulate 15,000 credits.',
    check: s => s.credits >= 15000,
  },
  {
    id: 'streak_3',
    icon: '🔥',
    title: 'On a Roll',
    description: 'Reach a 3-day daily case streak.',
    check: s => s.daily.bestStreak >= 3,
  },
  {
    id: 'streak_7',
    icon: '☄️',
    title: 'Unstoppable',
    description: 'Reach a 7-day daily case streak.',
    check: s => s.daily.bestStreak >= 7,
  },
  {
    id: 'daily_5',
    icon: '📅',
    title: 'Daily Grinder',
    description: 'Complete 5 daily cases.',
    check: s => s.daily.history.filter(h => h.solved).length >= 5,
  },
  {
    id: 'case_10',
    icon: '🎖️',
    title: 'Veteran',
    description: 'Solve 10 cases.',
    check: s => Object.keys(s.solved).length >= 10,
  },
  {
    id: 'case_15',
    icon: '⭐',
    title: 'Elite Detective',
    description: 'Solve 15 cases.',
    check: s => Object.keys(s.solved).length >= 15,
  },
  {
    id: 'case_20',
    icon: '👑',
    title: 'Chief of Cyber Ops',
    description: 'Solve all 20 cases.',
    check: (s, ctx) => Object.keys(s.solved).length >= ctx.totalCases,
  },
  {
    id: 'hard_5',
    icon: '🔴',
    title: 'Hard Mode Hero',
    description: 'Solve 5 HARD cases.',
    check: (s, ctx) =>
      Object.keys(s.solved).filter(id => {
        const c = ctx.cases.find(x => x.id === id);
        return c && c.difficulty === 'HARD';
      }).length >= 5,
  },
  {
    id: 'rich_50000',
    icon: '🏦',
    title: 'Shadow Banker',
    description: 'Accumulate 50,000 credits.',
    check: s => s.credits >= 50000,
  },
  {
    id: 'no_hint_15',
    icon: '🧩',
    title: 'Mind Reader',
    description: 'Solve 15 cases without hints.',
    check: s => s.noHintSolves >= 15,
  },
  {
    id: 'perfect_10',
    icon: '💠',
    title: 'Perfect Ten',
    description: 'Get 10 perfect solves.',
    check: s => s.perfectSolves >= 10,
  },
  {
    id: 'speed_under_10',
    icon: '💨',
    title: 'Blink',
    description: 'Solve any case in under 10 seconds.',
    check: s => Object.values(s.solved).some(c => c.bestTime < 10),
  },
  {
    id: 'case_25',
    icon: '🎓',
    title: 'Master Detective',
    description: 'Solve 25 cases.',
    check: s => Object.keys(s.solved).length >= 25,
  },
  {
    id: 'case_30',
    icon: '🛡️',
    title: 'Legendary Analyst',
    description: 'Solve all 30 cases.',
    check: (s, ctx) => Object.keys(s.solved).length >= ctx.totalCases,
  },
  {
    id: 'hard_10',
    icon: '⚔️',
    title: 'Hard Mode Master',
    description: 'Solve 10 HARD cases.',
    check: (s, ctx) =>
      Object.keys(s.solved).filter(id => {
        const c = ctx.cases.find(x => x.id === id);
        return c && c.difficulty === 'HARD';
      }).length >= 10,
  },
  {
    id: 'rich_100000',
    icon: '👑',
    title: 'Cyber Emperor',
    description: 'Accumulate 100,000 credits.',
    check: s => s.credits >= 100000,
  },
  {
    id: 'no_hint_25',
    icon: '🧙',
    title: 'Solo Genius',
    description: 'Solve 25 cases without hints.',
    check: s => s.noHintSolves >= 25,
  },
  {
    id: 'perfect_20',
    icon: '🌟',
    title: 'Flawless Twenty',
    description: 'Get 20 perfect solves.',
    check: s => s.perfectSolves >= 20,
  },
  {
    id: 'speed_under_5',
    icon: '🌀',
    title: 'Time Bender',
    description: 'Solve any case in under 5 seconds.',
    check: s => Object.values(s.solved).some(c => c.bestTime < 5),
  },
  {
    id: 'avg_under_60',
    icon: '⏱️',
    title: 'Quick Thinker',
    description: 'Maintain an average solve time under 60 seconds.',
    check: s => {
      const count = Object.keys(s.solved).length;
      return count >= 5 && s.totalSolveTime / count < 60;
    },
  },
  {
    id: 'streak_14',
    icon: '🌠',
    title: 'Fortnight Fighter',
    description: 'Reach a 14-day daily case streak.',
    check: s => s.daily.bestStreak >= 14,
  },
  {
    id: 'daily_30',
    icon: '📆',
    title: 'Daily Devotee',
    description: 'Complete 30 daily cases.',
    check: s => s.daily.history.filter(h => h.solved).length >= 30,
  },
  {
    id: 'case_40',
    icon: '🏅',
    title: 'Field Commander',
    description: 'Solve 40 cases.',
    check: s => Object.keys(s.solved).length >= 40,
  },
  {
    id: 'case_50',
    icon: '🏛️',
    title: 'Director of Cyber Ops',
    description: 'Solve all 50 cases.',
    check: (s, ctx) => Object.keys(s.solved).length >= ctx.totalCases,
  },
  {
    id: 'hard_15',
    icon: '🗡️',
    title: 'Hard Mode Elite',
    description: 'Solve 15 HARD cases.',
    check: (s, ctx) =>
      Object.keys(s.solved).filter(id => {
        const c = ctx.cases.find(x => x.id === id);
        return c && c.difficulty === 'HARD';
      }).length >= 15,
  },
  {
    id: 'hard_20',
    icon: '🏴',
    title: 'Hard Mode Legend',
    description: 'Solve 20 HARD cases.',
    check: (s, ctx) =>
      Object.keys(s.solved).filter(id => {
        const c = ctx.cases.find(x => x.id === id);
        return c && c.difficulty === 'HARD';
      }).length >= 20,
  },
  {
    id: 'rich_250000',
    icon: '💎',
    title: 'Cyber Oligarch',
    description: 'Accumulate 250,000 credits.',
    check: s => s.credits >= 250000,
  },
  {
    id: 'no_hint_40',
    icon: '🔮',
    title: 'Pure Oracle',
    description: 'Solve 40 cases without hints.',
    check: s => s.noHintSolves >= 40,
  },
  {
    id: 'perfect_35',
    icon: '🌌',
    title: 'Perfect Storm',
    description: 'Get 35 perfect solves.',
    check: s => s.perfectSolves >= 35,
  },
  {
    id: 'speed_under_3',
    icon: '⚡',
    title: 'Lightning Mind',
    description: 'Solve any case in under 3 seconds.',
    check: s => Object.values(s.solved).some(c => c.bestTime < 3),
  },
  {
    id: 'streak_30',
    icon: '🌞',
    title: 'Month of Dedication',
    description: 'Reach a 30-day daily case streak.',
    check: s => s.daily.bestStreak >= 30,
  },
  {
    id: 'daily_100',
    icon: '🏆',
    title: 'Centurion',
    description: 'Complete 100 daily cases.',
    check: s => s.daily.history.filter(h => h.solved).length >= 100,
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
