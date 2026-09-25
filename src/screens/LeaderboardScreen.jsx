import React, { useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import LeaderboardRow from '../components/LeaderboardRow';
import { cases } from '../data/cases';
import { theme } from '../styles/theme';
import useGameState from '../hooks/useGameState';

export default function LeaderboardScreen() {
  const { state } = useGameState();

  const ranked = useMemo(() => {
    const rows = cases
      .filter(c => state.solved[c.id])
      .map(c => ({ caseData: c, record: state.solved[c.id] }))
      .sort((a, b) => a.record.bestTime - b.record.bestTime);

    return rows.map((r, i) => ({ ...r, rank: i + 1 }));
  }, [state.solved]);

  const fastest = ranked[0];
  const avg = ranked.length
    ? Math.round(
        ranked.reduce((s, r) => s + r.record.bestTime, 0) / ranked.length,
      )
    : 0;

  const fmt = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🏁 PERSONAL LEADERBOARD</Text>
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>FASTEST</Text>
            <Text style={styles.statValue}>
              {fastest ? fmt(fastest.record.bestTime) : '—'}
            </Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>AVG TIME</Text>
            <Text style={styles.statValue}>
              {ranked.length ? fmt(avg) : '—'}
            </Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>SOLVED</Text>
            <Text style={styles.statValue}>
              {ranked.length}/{cases.length}
            </Text>
          </View>
        </View>
      </View>

      {ranked.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>
            No cases solved yet.{'\n'}Get to work, Detective.
          </Text>
        </View>
      ) : (
        <FlatList
          data={ranked}
          keyExtractor={item => item.caseData.id.toString()}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <LeaderboardRow
              rank={item.rank}
              caseData={item.caseData}
              record={item.record}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.bg },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  title: {
    color: theme.primary,
    fontFamily: theme.mono,
    fontSize: 16,
    fontWeight: 'bold',
  },
  statsRow: { flexDirection: 'row', marginTop: 12, gap: 16 },
  stat: { flex: 1 },
  statLabel: { color: theme.textDim, fontFamily: theme.mono, fontSize: 10 },
  statValue: {
    color: theme.secondary,
    fontFamily: theme.mono,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 2,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    color: theme.textDim,
    fontFamily: theme.mono,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
  },
});
