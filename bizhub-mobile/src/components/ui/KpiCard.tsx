import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';
import { useTheme } from '@/theme';
import { Text } from './Text';

export interface KpiCardProps {
  label: string;
  value: string;
  delta?: string;
  deltaPositive?: boolean;
  icon?: LucideIcon;
  tone?: 'primary' | 'success' | 'warning' | 'danger';
}

export function KpiCard({
  label,
  value,
  delta,
  deltaPositive,
  icon: Icon,
  tone = 'primary',
}: KpiCardProps): React.ReactElement {
  const theme = useTheme();

  const iconBg = {
    primary: theme.colors.primaryLight,
    success: theme.colors.successBg,
    warning: theme.colors.warningBg,
    danger: theme.colors.dangerBg,
  }[tone];

  const iconColor = {
    primary: theme.colors.primary,
    success: theme.colors.success,
    warning: theme.colors.warning,
    danger: theme.colors.danger,
  }[tone];

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          borderRadius: theme.radius.lg,
        },
      ]}
    >
      <View style={styles.row}>
        <Text variant="caption" color={theme.colors.textSecondary}>
          {label}
        </Text>
        {Icon ? (
          <View style={[styles.icon, { backgroundColor: iconBg }]}>
            <Icon size={16} color={iconColor} />
          </View>
        ) : null}
      </View>
      <Text variant="h2" style={styles.value}>
        {value}
      </Text>
      {delta ? (
        <Text
          variant="caption"
          style={{
            color: deltaPositive ? theme.colors.success : theme.colors.danger,
            fontWeight: '600',
          }}
        >
          {delta}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 14,
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  icon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: { marginBottom: 4 },
});