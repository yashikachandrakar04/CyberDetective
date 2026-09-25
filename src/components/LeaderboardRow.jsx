import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

const fmt = s => {
  if (s == null) return '—';
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${String(sec).padStart(2, '0')}`;
};

export default function LeaderboardRow({ rank, caseData, record }) {
  const medal =
    rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`;
  return (
    <View style={styles.row}>
      <Text style={styles.rank}>{medal}</Text>
      <View style={{ flex: 1 }}>
        <Text style={styles.title} numberOfLines={1}>
          {caseData.title}
        </Text>
        <Text style={styles.meta}>
          {caseData.difficulty} · 💰 {record.payout} · 💡 {record.hintsUsed}
        </Text>
      </View>
      <Text style={styles.time}>⏱ {fmt(record.bestTime)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: theme.bgCard,
    borderColor: theme.border,
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 8,
  },
  rank: {
    color: theme.warning,
    fontFamily: theme.mono,
    fontSize: 16,
    width: 40,
  },
  title: {
    color: theme.text,
    fontFamily: theme.mono,
    fontSize: 14,
    fontWeight: 'bold',
  },
  meta: {
    color: theme.textDim,
    fontFamily: theme.mono,
    fontSize: 11,
    marginTop: 2,
  },
  time: {
    color: theme.primary,
    fontFamily: theme.mono,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
