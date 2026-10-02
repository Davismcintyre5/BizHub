import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';
import { useTheme } from '@/theme';
import { Text } from './Text';
import { Button } from './Button';

export interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps): React.ReactElement {
  const theme = useTheme();

  return (
    <View style={styles.wrap}>
      {Icon ? (
        <View
          style={[
            styles.iconWrap,
            { backgroundColor: theme.colors.surfaceAlt },
          ]}
        >
          <Icon size={28} color={theme.colors.textMuted} />
        </View>
      ) : null}

      <Text variant="h4" align="center" style={styles.title}>
        {title}
      </Text>

      {description ? (
        <Text
          variant="bodySm"
          color={theme.colors.textSecondary}
          align="center"
          style={styles.desc}
        >
          {description}
        </Text>
      ) : null}

      {actionLabel && onAction ? (
        <View style={styles.action}>
          <Button label={actionLabel} onPress={onAction} fullWidth={false} />
        </View>
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
  action: { marginTop: 4 },
});