import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import CaseCard from '../components/CaseCard';
import { cases } from '../data/cases';
import { achievements } from '../data/achievements';
import { theme } from '../styles/theme';
import useGameState from '../hooks/useGameState';
import { todayKey } from '../utils/dailyCase';

export default function HomeScreen({ navigation }) {
  const {
    state,
    ready,
    recordSolve,
    wipe,
    consumeNewAchievements,
    newAchievements,
  } = useGameState();

  // Toast-style alert when a new achievement unlocks
  useEffect(() => {
    if (!ready || newAchievements.length === 0) return;
    const pending = consumeNewAchievements();
    if (!pending.length) return;
    const list = pending
      .map(id => achievements.find(a => a.id === id))
      .filter(Boolean);
    const msg = list.map(a => `${a.icon} ${a.title}`).join('\n');
    Alert.alert('🏅 ACHIEVEMENT UNLOCKED', msg, [{ text: 'NICE' }]);
  }, [ready, newAchievements, consumeNewAchievements]);

  if (!ready) {
    return (
      <View style={styles.container}>
        <Text style={styles.banner}>Loading dossier...</Text>
      </View>
    );
  }

  const solvedCount = Object.keys(state.solved).length;
  const today = todayKey();
  const dailyPending = state.daily.lastPlayedDate !== today;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.banner}>🕵️ CYBER DETECTIVE UNIT</Text>
        <View style={styles.statsRow}>
          <Text style={styles.stat}>💰 {state.credits}</Text>
          <Text style={styles.stat}>
            ✅ {solvedCount}/{cases.length}
          </Text>
          <Text style={styles.stat}>
            🏅 {Object.keys(state.unlockedAchievements).length}/
            {achievements.length}
          </Text>
          <Text style={styles.stat}>🔥 {state.daily.streak}d</Text>
        </View>
      </View>

      <View style={styles.navRow}>
        <TouchableOpacity
          style={[styles.navBtn, dailyPending && styles.navBtnAlert]}
          onPress={() => navigation.navigate('Daily')}
        >
          <Text style={styles.navIcon}>📅</Text>
          <Text style={styles.navLabel}>DAILY{dailyPending ? ' •' : ''}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navBtn}
          onPress={() => navigation.navigate('Leaderboard')}
        >
          <Text style={styles.navIcon}>🏁</Text>
          <Text style={styles.navLabel}>RANKS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navBtn}
          onPress={() => navigation.navigate('Achievements')}
        >
          <Text style={styles.navIcon}>🏅</Text>
          <Text style={styles.navLabel}>TROPHIES</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={cases}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <CaseCard
            caseData={item}
            solved={!!state.solved[item.id]}
            bestTime={state.solved[item.id]?.bestTime}
            onPress={() =>
              navigation.navigate('Case', {
                caseData: item,
                gameState: state,
                recordSolve,
              })
            }
          />
        )}
      />

      <TouchableOpacity
        style={styles.resetBtn}
        onPress={() =>
          Alert.alert(
            'Reset Progress?',
            'All credits, cases, achievements and streaks will be wiped.',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Reset', style: 'destructive', onPress: wipe },
            ],
          )
        }
      >
        <Text style={styles.resetText}>RESET PROGRESS</Text>
      </TouchableOpacity>
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
  banner: {
    color: theme.primary,
    fontFamily: theme.mono,
    fontSize: 18,
    fontWeight: 'bold',
  },
  statsRow: { flexDirection: 'row', gap: 14, marginTop: 8, flexWrap: 'wrap' },
  stat: { color: theme.secondary, fontFamily: theme.mono, fontSize: 12 },
  navRow: { flexDirection: 'row', padding: 12, gap: 8 },
  navBtn: {
    flex: 1,
    backgroundColor: theme.bgCard,
    borderColor: theme.border,
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: 'center',
  },
  navBtnAlert: { borderColor: theme.warning, backgroundColor: '#2a2413' },
  navIcon: { fontSize: 20 },
  navLabel: {
    color: theme.primary,
    fontFamily: theme.mono,
    fontSize: 10,
    marginTop: 4,
  },
  resetBtn: {
    borderTopWidth: 1,
    borderTopColor: theme.border,
    padding: 12,
    alignItems: 'center',
  },
  resetText: { color: theme.danger, fontFamily: theme.mono, fontSize: 12 },
});
