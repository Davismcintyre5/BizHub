import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@/theme';
import { AppHeader, type AppHeaderProps } from './AppHeader';

export interface ScreenContainerProps {
  children: React.ReactNode;
  header?: AppHeaderProps | false;
  edges?: Edge[];
  padded?: boolean;
  footer?: React.ReactNode;
  style?: ViewStyle;
  background?: string;
}

export function ScreenContainer({
  children,
  header,
  edges = ['top'],
  padded = false,
  footer,
  style,
  background,
}: ScreenContainerProps): React.ReactElement {
  const theme = useTheme();

  return (
    <SafeAreaView
      edges={edges}
      style={[
        styles.safe,
        { backgroundColor: background ?? theme.colors.background },
      ]}
    >
      <StatusBar style={theme.isDark ? 'light' : 'dark'} />
      {header !== false ? <AppHeader {...(header ?? {})} /> : null}
      <View
        style={[
          styles.body,
          padded && { paddingHorizontal: theme.spacing.lg },
          style,
        ]}
      >
        {children}
      </View>
      {footer}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  body: { flex: 1 },
});