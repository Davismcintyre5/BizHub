import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/theme';

export interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  height?: number;
}

export function ProgressBar({
  value,
  max = 100,
  color,
  height = 8,
}: ProgressBarProps): React.ReactElement {
  const theme = useTheme();
  const pct = Math.max(0, Math.min(1, value / max));

  return (
    <View
      style={[
        styles.track,
        {
          height,
          backgroundColor: theme.colors.surfaceAlt,
          borderRadius: height / 2,
        },
      ]}
    >
      <View
        style={{
          width: `${pct * 100}%`,
          height,
          backgroundColor: color ?? theme.colors.primary,
          borderRadius: height / 2,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { width: '100%', overflow: 'hidden' },
});