import React, { useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import AchievementRow from '../components/AchievementRow';
import { achievements } from '../data/achievements';
import { theme } from '../styles/theme';
import useGameState from '../hooks/useGameState';

export default function AchievementsScreen() {
  const { state } = useGameState();

  const rows = useMemo(() => {
    // Unlocked first, then locked
    const unlocked = [];
    const locked = [];
    for (const a of achievements) {
      const when = state.unlockedAchievements[a.id];
      (when ? unlocked : locked).push({ achievement: a, unlockedAt: when });
    }
    unlocked.sort((a, b) => b.unlockedAt - a.unlockedAt);
    return [...unlocked, ...locked];
  }, [state.unlockedAchievements]);

  const total = achievements.length;
  const got = Object.keys(state.unlockedAchievements).length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🏅 ACHIEVEMENTS</Text>
        <Text style={styles.sub}>
          {got} / {total} unlocked
        </Text>
        <View style={styles.bar}>
          <View style={[styles.fill, { width: `${(got / total) * 100}%` }]} />
        </View>
      </View>

      <FlatList
        data={rows}
        keyExtractor={item => item.achievement.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <AchievementRow
            achievement={item.achievement}
            unlockedAt={item.unlockedAt}
          />
        )}
      />
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
  sub: {
    color: theme.textDim,
    fontFamily: theme.mono,
    fontSize: 12,
    marginTop: 4,
  },
  bar: {
    height: 6,
    backgroundColor: theme.border,
    borderRadius: 3,
    marginTop: 10,
    overflow: 'hidden',
  },
  fill: { height: 6, backgroundColor: theme.primary },
});
