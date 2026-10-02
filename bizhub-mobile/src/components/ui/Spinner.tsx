import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { useTheme } from '@/theme';
import { Text } from './Text';

export interface SpinnerProps {
  size?: 'small' | 'large';
  label?: string;
  fullScreen?: boolean;
}

export function Spinner({
  size = 'large',
  label,
  fullScreen = false,
}: SpinnerProps): React.ReactElement {
  const theme = useTheme();

  if (!fullScreen && !label) {
    return <ActivityIndicator size={size} color={theme.colors.primary} />;
  }

  return (
    <View
      style={[
        styles.wrap,
        fullScreen && { flex: 1, backgroundColor: theme.colors.background },
      ]}
    >
      <ActivityIndicator size={size} color={theme.colors.primary} />
      {label ? (
        <Text
          variant="bodySm"
          color={theme.colors.textSecondary}
          style={styles.label}
        >
          {label}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  label: { marginTop: 12 },
});