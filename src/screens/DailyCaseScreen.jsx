import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import Timer from '../components/Timer';
import HintModal from '../components/HintModal';
import { getDailyCase, todayKey } from '../utils/dailyCase';
import { theme } from '../styles/theme';
import useGameState from '../hooks/useGameState';

const fmt = s =>
  `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

export default function DailyCaseScreen({ navigation }) {
  const { state, recordDaily, recordSolve } = useGameState();
  const daily = useMemo(() => getDailyCase(), []);
  const today = todayKey();

  const todayEntry = state.daily.history.find(h => h.date === today);
  const alreadyDone = !!todayEntry;

  const [timeUp, setTimeUp] = useState(false);
  const [selected, setSelected] = useState(null);
  const [verdict, setVerdict] = useState(null);
  const [hintVisible, setHintVisible] = useState(false);
  const [hintRevealed, setHintRevealed] = useState(false);
  const [usedHints, setUsedHints] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [payout, setPayout] = useState(0);

  const startRef = React.useRef(Date.now());
  const [running, setRunning] = useState(!alreadyDone);

  const submit = () => {
    if (!selected) {
      Alert.alert('Missing', 'Select a suspect first.');
      return;
    }
    const time = Math.floor((Date.now() - startRef.current) / 1000);
    const correct = selected === daily.answer;
    setVerdict(correct ? 'correct' : 'wrong');
    setRunning(false);

    let earned = 0;
    if (correct) {
      const { payout: p } = recordSolve(daily, time, usedHints);
      earned = p;
    }
    recordDaily({
      caseData: daily,
      solved: correct,
      timeSeconds: time,
      payout: earned,
    });
    setPayout(earned);
  };

  const buyHint = () => {
    if (state.credits < daily.hintCost) return;
    // spend via recordSolve-independent path: we simply track hints; cost deducted at end
    setUsedHints(n => n + 1);
    setHintRevealed(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={styles.streakBox}>
          <Text style={styles.streakLabel}>CURRENT STREAK</Text>
          <Text style={styles.streakValue}>🔥 {state.daily.streak} days</Text>
          <Text style={styles.streakBest}>Best: {state.daily.bestStreak}</Text>
        </View>

        <View style={styles.topRow}>
          <Text style={styles.label}>DAILY · {today}</Text>
          {running && (
            <Timer
              seconds={daily.timeLimit}
              paused={!running}
              onExpire={() => {
                setTimeUp(true);
                setRunning(false);
                recordDaily({
                  caseData: daily,
                  solved: false,
                  timeSeconds: daily.timeLimit,
                  payout: 0,
                });
                Alert.alert(
                  '⏰ TIME UP',
                  'Daily case failed. Try again tomorrow.',
                );
              }}
            />
          )}
        </View>

        <Text style={styles.title}>{daily.title}</Text>
        <Text style={styles.brief}>{daily.brief}</Text>

        <View style={styles.rewardRow}>
          <Text style={styles.reward}>💰 {daily.reward}</Text>
          <Text style={styles.bonus}>+50% DAILY BONUS</Text>
        </View>

        {alreadyDone && !verdict && (
          <View style={styles.doneBanner}>
            <Text style={styles.doneText}>
              ✅ Today's case {todayEntry.solved ? 'SOLVED' : 'FAILED'} ·{' '}
              {fmt(todayEntry.time)}
            </Text>
            <Text style={styles.doneSub}>
              Come back tomorrow for a new case.
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={[styles.hintBtn, hintRevealed && { opacity: 0.4 }]}
          disabled={hintRevealed || !running}
          onPress={() => setHintVisible(true)}
        >
          <Text style={styles.hintText}>💡 HINT ({daily.hintCost} cr)</Text>
        </TouchableOpacity>

        <Text style={styles.sectionHeader}>// EVIDENCE</Text>
        {daily.clues.map(clue => (
          <View key={clue.id} style={styles.clueBox}>
            <Text style={styles.clueIcon}>{clue.icon}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.clueTitle}>{clue.title}</Text>
              <Text style={styles.clueContent}>{clue.content}</Text>
            </View>
          </View>
        ))}

        <Text style={styles.sectionHeader}>// WHO DID IT?</Text>
        {daily.suspects.map(s => {
          const isSel = selected === s;
          return (
            <TouchableOpacity
              key={s}
              style={[styles.suspect, isSel && styles.suspectActive]}
              disabled={!!verdict || !running}
              onPress={() => setSelected(s)}
            >
              <Text
                style={[styles.suspectText, isSel && { color: theme.primary }]}
              >
                {s}
              </Text>
            </TouchableOpacity>
          );
        })}

        {!verdict && running && (
          <TouchableOpacity style={styles.btn} onPress={submit}>
            <Text style={styles.btnText}>SUBMIT ANSWER</Text>
          </TouchableOpacity>
        )}

        {verdict && (
          <View style={styles.resultBox}>
            <Text
              style={[
                styles.verdict,
                { color: verdict === 'correct' ? theme.primary : theme.danger },
              ]}
            >
              {verdict === 'correct' ? '✓ DAILY SOLVED' : '✗ WRONG'}
            </Text>
            <Text style={styles.explanation}>{daily.explanation}</Text>
            {verdict === 'correct' && (
              <Text style={styles.payout}>+{payout} credits earned</Text>
            )}
            <TouchableOpacity
              style={styles.btn}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.btnText}>BACK TO HQ</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <HintModal
        visible={hintVisible}
        hint={hintRevealed ? daily.hint : null}
        cost={daily.hintCost}
        credits={state.credits}
        onBuy={buyHint}
        onClose={() => setHintVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.bg },
  streakBox: {
    backgroundColor: theme.bgCard,
    borderColor: theme.warning,
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
  },
  streakLabel: { color: theme.textDim, fontFamily: theme.mono, fontSize: 10 },
  streakValue: {
    color: theme.warning,
    fontFamily: theme.mono,
    fontSize: 22,
    fontWeight: 'bold',
  },
  streakBest: {
    color: theme.textDim,
    fontFamily: theme.mono,
    fontSize: 11,
    marginTop: 2,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: { color: theme.textDim, fontFamily: theme.mono, fontSize: 12 },
  title: {
    color: theme.primary,
    fontFamily: theme.mono,
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 8,
  },
  brief: { color: theme.text, marginTop: 12, lineHeight: 20 },
  rewardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 12,
  },
  reward: { color: theme.secondary, fontFamily: theme.mono, fontSize: 16 },
  bonus: { color: theme.warning, fontFamily: theme.mono, fontSize: 11 },
  doneBanner: {
    marginTop: 16,
    padding: 12,
    borderColor: theme.primary,
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: '#0f2a20',
  },
  doneText: { color: theme.primary, fontFamily: theme.mono, fontSize: 13 },
  doneSub: {
    color: theme.textDim,
    fontFamily: theme.mono,
    fontSize: 11,
    marginTop: 4,
  },
  hintBtn: {
    backgroundColor: theme.warning,
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 16,
  },
  hintText: {
    color: theme.bg,
    fontFamily: theme.mono,
    fontWeight: 'bold',
    fontSize: 12,
  },
  sectionHeader: {
    color: theme.secondary,
    fontFamily: theme.mono,
    marginTop: 20,
    marginBottom: 8,
  },
  clueBox: {
    flexDirection: 'row',
    backgroundColor: '#000',
    borderColor: theme.border,
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
    marginBottom: 8,
  },
  clueIcon: { fontSize: 20, marginRight: 12 },
  clueTitle: {
    color: theme.primary,
    fontFamily: theme.mono,
    fontSize: 12,
    fontWeight: 'bold',
  },
  clueContent: {
    color: theme.text,
    fontFamily: theme.mono,
    fontSize: 11,
    marginTop: 4,
    lineHeight: 16,
  },
  suspect: {
    borderColor: theme.border,
    borderWidth: 1,
    backgroundColor: theme.bgCard,
    borderRadius: 6,
    padding: 14,
    marginBottom: 8,
  },
  suspectActive: { borderColor: theme.primary, backgroundColor: '#0f2a20' },
  suspectText: { color: theme.text, fontFamily: theme.mono, fontSize: 15 },
  btn: {
    backgroundColor: theme.primary,
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 16,
  },
  btnText: { color: theme.bg, fontFamily: theme.mono, fontWeight: 'bold' },
  resultBox: { marginTop: 16 },
  verdict: {
    fontFamily: theme.mono,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  explanation: {
    color: theme.text,
    fontFamily: theme.mono,
    fontSize: 12,
    lineHeight: 18,
  },
  payout: {
    color: theme.warning,
    fontFamily: theme.mono,
    fontSize: 14,
    marginTop: 10,
    fontWeight: 'bold',
  },
});
