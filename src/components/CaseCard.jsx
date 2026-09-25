import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

const fmt = s => {
  if (s == null) return null;
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${String(sec).padStart(2, '0')}`;
};

export default function CaseCard({ caseData, onPress, solved, bestTime }) {
  const color =
    caseData.difficulty === 'EASY'
      ? theme.primary
      : caseData.difficulty === 'MEDIUM'
      ? theme.warning
      : theme.danger;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.row}>
        <Text style={styles.title}>CASE #{caseData.id}</Text>
        <Text style={[styles.badge, { color, borderColor: color }]}>
          {caseData.difficulty}
        </Text>
      </View>
      <Text style={styles.name}>{caseData.title}</Text>
      <Text style={styles.brief} numberOfLines={2}>
        {caseData.brief}
      </Text>
      <View style={styles.row}>
        <Text style={styles.reward}>💰 {caseData.reward}</Text>
        <Text style={styles.timer}>⏱ {fmt(caseData.timeLimit)}</Text>
        <Text
          style={[
            styles.status,
            { color: solved ? theme.primary : theme.textDim },
          ]}
        >
          {solved ? `✓ SOLVED · ${fmt(bestTime)}` : '○ OPEN'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.bgCard,
    borderColor: theme.border,
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { color: theme.textDim, fontFamily: theme.mono, fontSize: 12 },
  badge: {
    fontFamily: theme.mono,
    fontSize: 10,
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
  },
  name: {
    color: theme.primary,
    fontFamily: theme.mono,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  brief: { color: theme.text, fontSize: 13, marginTop: 6, lineHeight: 18 },
  reward: { color: theme.secondary, fontFamily: theme.mono, marginTop: 10 },
  timer: { color: theme.textDim, fontFamily: theme.mono, marginTop: 10 },
  status: { fontFamily: theme.mono, fontSize: 12, marginTop: 10 },
});
