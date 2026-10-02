import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Delete } from 'lucide-react-native';
import { useTheme } from '@/theme';
import { Text } from './Text';

export interface KeypadProps {
  onKey: (key: string) => void;
  onBackspace: () => void;
  onClear?: () => void;
  showDecimal?: boolean;
  showClear?: boolean;
}

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

export function Keypad({
  onKey,
  onBackspace,
  onClear,
  showDecimal = true,
  showClear = false,
}: KeypadProps): React.ReactElement {
  const theme = useTheme();

  const cell = (label: string, onPress: () => void, icon = false) => (
    <Pressable
      key={label}
      onPress={onPress}
      style={({ pressed }) => [
        styles.key,
        {
          backgroundColor: pressed ? theme.colors.surfaceAlt : theme.colors.surface,
          borderColor: theme.colors.border,
          borderRadius: theme.radius.md,
        },
      ]}
    >
      {icon ? (
        <Delete size={22} color={theme.colors.text} />
      ) : (
        <Text variant="h3">{label}</Text>
      )}
    </Pressable>
  );

  return (
    <View style={styles.grid}>
      {KEYS.map((k) => cell(k, () => onKey(k)))}
      {showClear ? cell('C', () => onClear?.()) : showDecimal ? cell('.', () => onKey('.')) : <View style={styles.key} />}
      {cell('0', () => onKey('0'))}
      {cell('del', onBackspace, true)}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  key: {
    width: '31%',
    aspectRatio: 1.6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
});