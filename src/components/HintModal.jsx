import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

export default function HintModal({
  visible,
  hint,
  cost,
  credits,
  onBuy,
  onClose,
}) {
  const canAfford = credits >= cost;
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.box}>
          <Text style={styles.title}>💡 REQUEST HINT</Text>
          {hint ? (
            <>
              <Text style={styles.hint}>{hint}</Text>
              <TouchableOpacity style={styles.btn} onPress={onClose}>
                <Text style={styles.btnText}>GOT IT</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.cost}>
                Cost:{' '}
                <Text style={{ color: theme.warning }}>{cost} credits</Text>
              </Text>
              <Text style={styles.balance}>Your balance: {credits}</Text>
              <TouchableOpacity
                style={[styles.btn, !canAfford && { opacity: 0.4 }]}
                disabled={!canAfford}
                onPress={onBuy}
              >
                <Text style={styles.btnText}>
                  {canAfford ? 'UNLOCK HINT' : 'NOT ENOUGH CREDITS'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onClose}>
                <Text style={styles.cancel}>Cancel</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    padding: 24,
  },
  box: {
    backgroundColor: theme.bgCard,
    borderColor: theme.warning,
    borderWidth: 1,
    borderRadius: 8,
    padding: 20,
  },
  title: {
    color: theme.warning,
    fontFamily: theme.mono,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  hint: {
    color: theme.text,
    fontFamily: theme.mono,
    fontSize: 14,
    lineHeight: 22,
  },
  cost: {
    color: theme.text,
    fontFamily: theme.mono,
    fontSize: 14,
    marginBottom: 4,
  },
  balance: {
    color: theme.textDim,
    fontFamily: theme.mono,
    fontSize: 12,
    marginBottom: 16,
  },
  btn: {
    backgroundColor: theme.primary,
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 12,
  },
  btnText: { color: theme.bg, fontFamily: theme.mono, fontWeight: 'bold' },
  cancel: {
    color: theme.textDim,
    fontFamily: theme.mono,
    fontSize: 13,
    textAlign: 'center',
    marginTop: 12,
  },
});
