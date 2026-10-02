import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@/theme';
import { Text } from './Text';

export type BadgeTone =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

export interface BadgeProps {
  label: string;
  tone?: BadgeTone;
  dot?: boolean;
  style?: ViewStyle;
}

export function Badge({
  label,
  tone = 'default',
  dot,
  style,
}: BadgeProps): React.ReactElement {
  const theme = useTheme();
  const palette = getTone(theme, tone);

  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: palette.bg,
          borderRadius: theme.radius.full,
        },
        style,
      ]}
    >
      {dot ? (
        <View
          style={[styles.dot, { backgroundColor: palette.fg }]}
        />
      ) : null}
      <Text
        variant="caption"
        style={{
          color: palette.fg,
          fontWeight: '600',
        }}
      >
        {label}
      </Text>
    </View>
  );
}

function getTone(theme: ReturnType<typeof useTheme>, tone: BadgeTone) {
  switch (tone) {
    case 'primary':
      return { bg: theme.colors.primaryLight, fg: theme.colors.primary };
    case 'success':
      return { bg: theme.colors.successBg, fg: theme.colors.success };
    case 'warning':
      return { bg: theme.colors.warningBg, fg: theme.colors.warning };
    case 'danger':
      return { bg: theme.colors.dangerBg, fg: theme.colors.danger };
    case 'info':
      return { bg: theme.colors.infoBg, fg: theme.colors.info };
    default:
      return { bg: theme.colors.surfaceAlt, fg: theme.colors.textSecondary };
  }
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
});