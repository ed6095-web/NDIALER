import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { colors, typography, spacing } from '../theme';

const BUTTONS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['*', '0', '#'],
];

export default function DialpadScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePress = (value: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setPhoneNumber((prev) => prev + value);
  };

  const handleDelete = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setPhoneNumber((prev) => prev.slice(0, -1));
  };

  const handleCall = () => {
    if (!phoneNumber) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url).catch((err) => {
      console.error('An error occurred', err);
      Alert.alert('Error', 'Calling is not supported on this device.');
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <Text
          style={styles.displayText}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {phoneNumber}
        </Text>
      </View>

      <View style={styles.keypadContainer}>
        {BUTTONS.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((btn) => (
              <TouchableOpacity
                key={btn}
                style={styles.button}
                onPress={() => handlePress(btn)}
                activeOpacity={0.7}
              >
                <Text style={styles.buttonText}>{btn}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        <View style={styles.actionRow}>
          <View style={styles.placeholderButton} />
          <TouchableOpacity
            style={[styles.callButton]}
            onPress={handleCall}
            activeOpacity={0.8}
            disabled={!phoneNumber}
          >
            <Ionicons name="call" size={32} color={colors.background} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDelete}
            onLongPress={() => {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
              setPhoneNumber('');
            }}
            activeOpacity={0.6}
            disabled={!phoneNumber}
          >
            <Ionicons
              name="backspace-outline"
              size={32}
              color={phoneNumber ? colors.textSecondary : 'transparent'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'flex-end',
  },
  displayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  displayText: {
    color: colors.text,
    fontSize: typography.size.dialPad,
    fontWeight: typography.weight.medium,
    textAlign: 'center',
    letterSpacing: 2,
  },
  keypadContainer: {
    paddingBottom: spacing.xxl,
    paddingHorizontal: spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.lg,
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.buttonBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.text,
    fontSize: typography.size.xl,
    fontWeight: typography.weight.regular,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  placeholderButton: {
    width: 80,
    height: 80,
  },
  callButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
