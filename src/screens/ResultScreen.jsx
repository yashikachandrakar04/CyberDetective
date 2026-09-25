import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { theme } from '../styles/theme';

const fmt = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

export default function ResultScreen({ route, navigation }) {
  const { caseData, elapsed, usedHints, recordSolve } = route.params;
  const [selected, setSelected] = useState(null);
  const [verdict, setVerdict] = useState(null);
  const [breakdown, setBreakdown] = useState(null);

  const submit = () => {
    if (!selected) {
      Alert.alert('Missing', 'Select a suspect first.');
      return;
    }
    const correct = selected === caseData.answer;
    setVerdict(correct ? 'correct' : 'wrong');

    if (correct) {
      const b = recordSolve(caseData, elapsed, usedHints);
      setBreakdown(b);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 16, flex: 1 }}>
        <Text style={styles.header}>WHO IS THE CULPRIT?</Text>
        <Text style={styles.sub}>
          {caseData.title} · time used {fmt(elapsed)}
        </Text>

        {caseData.suspects.map(s => {
          const isSelected = selected === s;
          return (
            <TouchableOpacity
              key={s}
              style={[styles.suspect, isSelected && styles.suspectActive]}
              onPress={() => !verdict && setSelected(s)}
              disabled={!!verdict}
            >
              <Text
                style={[
                  styles.suspectText,
                  isSelected && { color: theme.primary },
                ]}
              >
                {s}
              </Text>
            </TouchableOpacity>
          );
        })}

        {!verdict ? (
          <TouchableOpacity style={styles.btn} onPress={submit}>
            <Text style={styles.btnText}>CONFIRM ACCUSATION</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.resultBox}>
            <Text
              style={[
                styles.verdict,
                { color: verdict === 'correct' ? theme.primary : theme.danger },
              ]}
            >
              {verdict === 'correct' ? '✓ CASE SOLVED' : '✗ WRONG SUSPECT'}
            </Text>
            <Text style={styles.explanation}>
              Correct answer:{' '}
              <Text style={{ color: theme.secondary }}>{caseData.answer}</Text>
            </Text>
            <Text style={styles.explanation}>{caseData.explanation}</Text>

            {breakdown && (
              <View style={styles.payoutBox}>
                <Text style={styles.payoutRow}>
                  Base: <Text style={styles.payoutVal}>+{caseData.reward}</Text>
                </Text>
                <Text style={styles.payoutRow}>
                  Time bonus:{' '}
                  <Text style={styles.payoutVal}>+{breakdown.timeBonus}</Text>
                </Text>
                <Text style={styles.payoutRow}>
                  Hint penalty:{' '}
                  <Text style={{ color: theme.danger }}>
                    -{breakdown.hintPenalty}
                  </Text>
                </Text>
                <Text style={styles.payoutTotal}>
                  TOTAL: +{breakdown.payout} credits
                </Text>
              </View>
            )}

            <TouchableOpacity
              style={styles.btn}
              onPress={() => navigation.popToTop()}
            >
              <Text style={styles.btnText}>BACK TO HQ</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

// ...styles unchanged from previous version (keep them)...
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.bg },
  header: {
    color: theme.primary,
    fontFamily: theme.mono,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sub: {
    color: theme.textDim,
    fontFamily: theme.mono,
    fontSize: 12,
    marginBottom: 20,
  },
  suspect: {
    borderColor: theme.border,
    borderWidth: 1,
    backgroundColor: theme.bgCard,
    borderRadius: 6,
    padding: 16,
    marginBottom: 10,
  },
  suspectActive: { borderColor: theme.primary, backgroundColor: '#0f2a20' },
  suspectText: { color: theme.text, fontFamily: theme.mono, fontSize: 16 },
  btn: {
    backgroundColor: theme.primary,
    padding: 16,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 20,
  },
  btnText: {
    color: theme.bg,
    fontFamily: theme.mono,
    fontWeight: 'bold',
    fontSize: 14,
  },
  resultBox: { marginTop: 20 },
  verdict: {
    fontFamily: theme.mono,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  explanation: {
    color: theme.text,
    fontFamily: theme.mono,
    fontSize: 13,
    marginBottom: 8,
    lineHeight: 20,
  },
  payoutBox: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: theme.border,
    paddingTop: 12,
  },
  payoutRow: {
    color: theme.text,
    fontFamily: theme.mono,
    fontSize: 13,
    marginBottom: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  payoutVal: { color: theme.secondary },
  payoutTotal: {
    color: theme.warning,
    fontFamily: theme.mono,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
});
