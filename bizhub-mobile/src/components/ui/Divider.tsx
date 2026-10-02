import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@/theme';

export interface DividerProps {
  vertical?: boolean;
  spacing?: number;
  style?: ViewStyle;
}

export function Divider({
  vertical,
  spacing = 0,
  style,
}: DividerProps): React.ReactElement {
  const theme = useTheme();

  return (
    <View
      style={[
        vertical
          ? { width: 1, height: '100%', marginHorizontal: spacing }
          : { height: 1, width: '100%', marginVertical: spacing },
        { backgroundColor: theme.colors.border },
        style,
      ]}
    />
  );
}

const _styles = StyleSheet.create({});
void _styles;