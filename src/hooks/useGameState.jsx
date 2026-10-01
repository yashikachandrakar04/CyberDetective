import { useCallback, useEffect, useState } from 'react';
import { loadState, saveState, resetState, defaultState } from '../utils/storage';
import { cases } from '../data/cases';
import { checkAchievements } from '../data/achievements';

export default function useGameState() {
  const [state, setState] = useState(defaultState);
  const [ready, setReady] = useState(false);
  const [newAchievements, setNewAchievements] = useState([]);

  useEffect(() => {
    (async () => {
      const s = await loadState();
      setState(s);
      setReady(true);
    })();
  }, []);

  // Persist + auto-scan achievements on every state change
  useEffect(() => {
    if (!ready) return;
    saveState(state);

    const newly = checkAchievements(state, { totalCases: cases.length , cases, });
    if (newly.length) {
      setState((prev) => {
        const unlocked = { ...prev.unlockedAchievements };
        newly.forEach((id) => (unlocked[id] = Date.now()));
        return { ...prev, unlockedAchievements: unlocked };
      });
      setNewAchievements((prev) => [...prev, ...newly]);
    }
  }, [state, ready]);

  const consumeNewAchievements = useCallback(() => {
    const copy = [...newAchievements];
    setNewAchievements([]);
    return copy;
  }, [newAchievements]);

  const recordSolve = useCallback((caseData, timeSeconds, hintsUsed) => {
    const ratio = Math.max(0, 1 - timeSeconds / caseData.timeLimit);
    const timeBonus = Math.round(caseData.reward * 0.5 * ratio);
    const hintPenalty = hintsUsed * Math.round(caseData.reward * 0.1);
    const payout = Math.max(0, caseData.reward + timeBonus - hintPenalty);

    const isPerfect = hintsUsed === 0 && timeSeconds < caseData.timeLimit / 2;

    setState((prev) => {
      const id = caseData.id;
      const existing = prev.solved[id];
      const bestTime =
        existing && existing.bestTime < timeSeconds ? existing.bestTime : timeSeconds;

      return {
        ...prev,
        credits: prev.credits + payout,
        totalSolveTime: prev.totalSolveTime + timeSeconds,
        totalHintsUsed: prev.totalHintsUsed + hintsUsed,
        noHintSolves: prev.noHintSolves + (hintsUsed === 0 ? 1 : 0),
        perfectSolves: prev.perfectSolves + (isPerfect ? 1 : 0),
        solved: {
          ...prev.solved,
          [id]: {
            bestTime,
            hintsUsed,
            solvedAt: Date.now(),
            payout,
          },
        },
      };
    });

    return { payout, timeBonus, hintPenalty };
  }, []);

  const recordDaily = useCallback(
    ({ caseData, solved, timeSeconds, payout }) => {
      setState((prev) => {
        const today = caseData.dateKey;
        const alreadyToday = prev.daily.lastPlayedDate === today;
        const streak = alreadyToday
          ? prev.daily.streak
          : require('../utils/dailyCase').computeStreak(
              prev.daily.lastPlayedDate,
              today,
              prev.daily.streak
            );

        const bestStreak = Math.max(prev.daily.bestStreak, streak);

        // Remove any previous entry for today, then push new
        const filtered = prev.daily.history.filter((h) => h.date !== today);

        return {
          ...prev,
          credits: solved ? prev.credits + payout : prev.credits,
          daily: {
            lastPlayedDate: today,
            streak,
            bestStreak,
            history: [
              ...filtered,
              { date: today, caseId: caseData.baseId, solved, time: timeSeconds, payout },
            ],
          },
        };
      });
    },
    []
  );

  const wipe = useCallback(async () => {
    await resetState();
    setState(defaultState);
    setNewAchievements([]);
  }, []);

  return {
    state,
    ready,
    recordSolve,
    recordDaily,
    wipe,
    newAchievements,
    consumeNewAchievements,
  };
}