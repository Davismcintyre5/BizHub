import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AlertTriangle } from 'lucide-react-native';
import { useTheme } from '@/theme';
import { Text } from './Text';
import { Button } from './Button';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Something went wrong',
  message,
  onRetry,
}: ErrorStateProps): React.ReactElement {
  const theme = useTheme();

  return (
    <View style={styles.wrap}>
      <View
        style={[styles.iconWrap, { backgroundColor: theme.colors.dangerBg }]}
      >
        <AlertTriangle size={28} color={theme.colors.danger} />
      </View>

      <Text variant="h4" align="center" style={styles.title}>
        {title}
      </Text>

      {message ? (
        <Text
          variant="bodySm"
          color={theme.colors.textSecondary}
          align="center"
          style={styles.desc}
        >
          {message}
        </Text>
      ) : null}

      {onRetry ? (
        <Button label="Try again" onPress={onRetry} fullWidth={false} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 48,
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: { marginBottom: 6 },
  desc: { marginBottom: 20 },
});