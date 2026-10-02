import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/theme';
import { Text } from '@/components/ui/Text';

export interface StatRowProps {
  label: string;
  value: string;
  emphasized?: boolean;
  tone?: 'default' | 'success' | 'danger';
}

export function StatRow({
  label,
  value,
  emphasized,
  tone = 'default',
}: StatRowProps): React.ReactElement {
  const theme = useTheme();
  const color =
    tone === 'success'
      ? theme.colors.success
      : tone === 'danger'
      ? theme.colors.danger
      : theme.colors.text;

  return (
    <View style={styles.row}>
      <Text
        variant={emphasized ? 'bodyMedium' : 'body'}
        color={theme.colors.textSecondary}
      >
        {label}
      </Text>
      <Text
        variant={emphasized ? 'h4' : 'bodyMedium'}
        style={{ color }}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
});