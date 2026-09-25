import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { theme } from '../styles/theme';

export default function ClueScreen({ route }) {
  const { clue } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={styles.icon}>{clue.icon}</Text>
        <Text style={styles.title}>{clue.title}</Text>
        <View style={styles.terminal}>
          <Text style={styles.prompt}>$ cat evidence.log</Text>
          <Text style={styles.content}>{clue.content}</Text>
          <Text style={styles.cursor}>█</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.bg },
  icon: { fontSize: 40, textAlign: 'center', marginVertical: 20 },
  title: {
    color: theme.primary,
    fontFamily: theme.mono,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  terminal: {
    backgroundColor: '#000',
    borderColor: theme.primary,
    borderWidth: 1,
    borderRadius: 6,
    padding: 16,
  },
  prompt: {
    color: theme.secondary,
    fontFamily: theme.mono,
    fontSize: 12,
    marginBottom: 12,
  },
  content: {
    color: theme.primary,
    fontFamily: theme.mono,
    fontSize: 14,
    lineHeight: 22,
  },
  cursor: { color: theme.primary, fontFamily: theme.mono, marginTop: 10 },
});
