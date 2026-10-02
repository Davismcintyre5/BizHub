import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useTheme } from '@/theme';

export interface ToggleProps {
  value: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}

export function Toggle({
  value,
  onChange,
  disabled,
}: ToggleProps): React.ReactElement {
  const theme = useTheme();

  return (
    <Pressable
      disabled={disabled}
      onPress={() => onChange(!value)}
      style={[
        styles.track,
        {
          backgroundColor: value ? theme.colors.primary : theme.colors.surfaceAlt,
          opacity: disabled ? 0.5 : 1,
        },
      ]}
    >
      <View
        style={[
          styles.thumb,
          {
            transform: [{ translateX: value ? 20 : 2 }],
            backgroundColor: theme.colors.surface,
          },
        ]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: 44,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
});