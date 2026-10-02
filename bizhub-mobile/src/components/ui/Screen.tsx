import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import { useTheme } from '@/theme';

export interface ScreenProps {
  children: React.ReactNode;
  edges?: Edge[];
  padded?: boolean;
  style?: ViewStyle;
}

export function Screen({
  children,
  edges = ['top'],
  padded = false,
  style,
}: ScreenProps): React.ReactElement {
  const theme = useTheme();

  return (
    <SafeAreaView
      edges={edges}
      style={[
        styles.safe,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <View
        style={[
          styles.inner,
          padded && { paddingHorizontal: theme.spacing.lg },
          style,
        ]}
      >
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  inner: { flex: 1 },
});