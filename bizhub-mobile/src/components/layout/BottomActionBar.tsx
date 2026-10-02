import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/theme';

export interface BottomActionBarProps {
  children: React.ReactNode;
}

export function BottomActionBar({
  children,
}: BottomActionBarProps): React.ReactElement {
  const theme = useTheme();

  return (
    <SafeAreaView
      edges={['bottom']}
      style={[
        styles.safe,
        {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
        },
      ]}
    >
      <View style={styles.inner}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { borderTopWidth: StyleSheet.hairlineWidth },
  inner: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
});