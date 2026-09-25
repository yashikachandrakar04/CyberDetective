import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = '@cyber_detective_state_v2';

export const defaultState = {
  credits: 0,
  solved: {},              // { [caseId]: { bestTime, hintsUsed, solvedAt, payout } }
  totalHintsUsed: 0,
  totalSolveTime: 0,       // seconds across all solves (for average)
  sessionsPlayed: 0,
  noHintSolves: 0,         // solves with 0 hints
  perfectSolves: 0,        // solves under half of timeLimit with 0 hints
  unlockedAchievements: {}, // { [id]: unlockedAt timestamp }
  daily: {
    lastPlayedDate: null,   // 'YYYY-MM-DD'
    streak: 0,
    bestStreak: 0,
    history: [],            // [{ date, caseId, solved, time, payout }]
  },
};

export async function loadState() {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw);
    return {
      ...defaultState,
      ...parsed,
      daily: { ...defaultState.daily, ...(parsed.daily || {}) },
    };
  } catch (e) {
    console.warn('loadState failed', e);
    return defaultState;
  }
}

export async function saveState(state) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('saveState failed', e);
  }
}

export async function resetState() {
  await AsyncStorage.removeItem(KEY);
}