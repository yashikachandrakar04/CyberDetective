import React, { useEffect, useRef, useState } from 'react';
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
import { theme } from '../styles/theme';

export default function CaseScreen({ route, navigation }) {
  const { caseData, gameState, recordSolve } = route.params;

  // ---- state ------------------------------------------------------------
  const [timeUp, setTimeUp] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);
  const [hintRevealed, setHintRevealed] = useState(false);
  const [usedHints, setUsedHints] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [credits, setCredits] = useState(gameState?.credits ?? 0);

  const tickRef = useRef(null);

  // ---- timer tick -------------------------------------------------------
  useEffect(() => {
    if (timeUp) return;
    tickRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(tickRef.current);
  }, [timeUp]);

  const onExpire = () => {
    setTimeUp(true);
    clearInterval(tickRef.current);
    Alert.alert('⏰ TIME UP', 'The suspect escaped. Case failed.', [
      { text: 'BACK TO HQ', onPress: () => navigation.popToTop() },
    ]);
  };

  // ---- hint purchase ----------------------------------------------------
  const buyHint = () => {
    if (credits < caseData.hintCost) return;
    setCredits((c) => c - caseData.hintCost);
    setUsedHints((n) => n + 1);
    setHintRevealed(true);
  };

  // ---- navigation to verdict -------------------------------------------
  const goToVerdict = () => {
    clearInterval(tickRef.current);
    navigation.navigate('Result', {
      caseData,
      elapsed,
      usedHints,
      recordSolve,
    });
  };

  // ---- render -----------------------------------------------------------
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={styles.topRow}>
          <Text style={styles.label}>CASE FILE #{caseData.id}</Text>
          <Timer
            seconds={caseData.timeLimit}
            paused={timeUp}
            onExpire={onExpire}
          />
        </View>

        <Text style={styles.title}>{caseData.title}</Text>
        <Text style={styles.brief}>{caseData.brief}</Text>

        <View style={styles.hintRow}>
          <Text style={styles.credits}>💰 {credits}</Text>
          <TouchableOpacity
            style={[styles.hintBtn, (hintRevealed || timeUp) && { opacity: 0.4 }]}
            disabled={hintRevealed || timeUp}
            onPress={() => setHintVisible(true)}>
            <Text style={styles.hintText}>
              💡 HINT ({caseData.hintCost} cr)
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionHeader}>// EVIDENCE ({caseData.clues.length})</Text>

        {caseData.clues.map((clue) => (
          <TouchableOpacity
            key={clue.id}
            style={styles.clueBtn}
            disabled={timeUp}
            onPress={() => navigation.navigate('Clue', { clue })}>
            <Text style={styles.clueIcon}>{clue.icon}</Text>
            <Text style={styles.clueTitle}>{clue.title}</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={[styles.accuseBtn, timeUp && { opacity: 0.4 }]}
          disabled={timeUp}
          onPress={goToVerdict}>
          <Text style={styles.accuseText}>⚖️ MAKE ACCUSATION</Text>
        </TouchableOpacity>
      </ScrollView>

      <HintModal
        visible={hintVisible}
        hint={hintRevealed ? caseData.hint : null}
        cost={caseData.hintCost}
        credits={credits}
        onBuy={buyHint}
        onClose={() => setHintVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.bg },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: theme.textDim,
    fontFamily: theme.mono,
    fontSize: 12,
  },

  title: {
    color: theme.primary,
    fontFamily: theme.mono,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 6,
  },
  brief: {
    color: theme.text,
    marginTop: 12,
    lineHeight: 20,
  },

  hintRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  credits: {
    color: theme.secondary,
    fontFamily: theme.mono,
    fontSize: 14,
  },
  hintBtn: {
    backgroundColor: theme.warning,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
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
    marginTop: 24,
    marginBottom: 8,
  },

  clueBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.bgCard,
    borderColor: theme.border,
    borderWidth: 1,
    borderRadius: 6,
    padding: 14,
    marginBottom: 8,
  },
  clueIcon: { fontSize: 20, marginRight: 12 },
  clueTitle: {
    flex: 1,
    color: theme.text,
    fontFamily: theme.mono,
    fontSize: 14,
  },
  chevron: {
    color: theme.primary,
    fontSize: 22,
    fontFamily: theme.mono,
  },

  accuseBtn: {
    backgroundColor: theme.danger,
    padding: 16,
    borderRadius: 6,
    marginTop: 24,
    alignItems: 'center',
  },
  accuseText: {
    color: '#fff',
    fontFamily: theme.mono,
    fontWeight: 'bold',
    fontSize: 16,
  },
});