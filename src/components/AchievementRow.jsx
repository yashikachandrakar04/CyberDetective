import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

export default function AchievementRow({ achievement, unlockedAt }) {
  const unlocked = !!unlockedAt;
  return (
    <View style={[styles.row, !unlocked && styles.locked]}>
      <Text style={[styles.icon, !unlocked && { opacity: 0.25 }]}>
        {achievement.icon}
      </Text>
      <View style={{ flex: 1 }}>
        <Text style={[styles.title, !unlocked && { color: theme.textDim }]}>
          {achievement.title}
        </Text>
        <Text style={styles.desc}>{achievement.description}</Text>
        {unlocked && (
          <Text style={styles.date}>
            Unlocked {new Date(unlockedAt).toLocaleDateString()}
          </Text>
        )}
      </View>
      <Text
        style={[
          styles.status,
          { color: unlocked ? theme.primary : theme.textDim },
        ]}
      >
        {unlocked ? '✓' : '🔒'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    backgroundColor: theme.bgCard,
    borderColor: theme.border,
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 8,
  },
  locked: { backgroundColor: '#0d1229', borderColor: '#161e3e' },
  icon: { fontSize: 28, marginRight: 14 },
  title: {
    color: theme.primary,
    fontFamily: theme.mono,
    fontSize: 14,
    fontWeight: 'bold',
  },
  desc: {
    color: theme.text,
    fontFamily: theme.mono,
    fontSize: 11,
    marginTop: 3,
  },
  date: {
    color: theme.textDim,
    fontFamily: theme.mono,
    fontSize: 10,
    marginTop: 4,
  },
  status: { fontFamily: theme.mono, fontSize: 18, marginLeft: 8 },
});
