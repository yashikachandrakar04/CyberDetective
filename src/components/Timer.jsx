import React, { useEffect, useRef, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

export default function Timer({ seconds, onExpire, paused }) {
  const [remaining, setRemaining] = useState(seconds);
  const expired = useRef(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(id);
          if (!expired.current) {
            expired.current = true;
            onExpire && onExpire();
          }
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [paused, onExpire]);

  const mm = String(Math.floor(remaining / 60)).padStart(2, '0');
  const ss = String(remaining % 60).padStart(2, '0');
  const low = remaining <= 30;

  return (
    <Text style={[styles.timer, low && styles.low]}>
      ⏱ {mm}:{ss}
    </Text>
  );
}

const styles = StyleSheet.create({
  timer: {
    color: theme.secondary,
    fontFamily: theme.mono,
    fontSize: 18,
    fontWeight: 'bold',
  },
  low: { color: theme.danger },
});