import React from 'react';
import {
  Pressable,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { useTheme } from '@/theme';
import { Text } from './Text';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = true,
  icon,
  iconRight,
  style,
  textStyle,
}: ButtonProps): React.ReactElement {
  const theme = useTheme();
  const isDisabled = disabled || loading;

  const height =
    size === 'sm'
      ? theme.sizes.buttonSm
      : size === 'lg'
      ? theme.sizes.buttonLg
      : theme.sizes.buttonMd;

  const paddingH = size === 'sm' ? 12 : size === 'lg' ? 24 : 18;
  const fontSize = size === 'sm' ? 13 : size === 'lg' ? 17 : 15;

  const palette = getPalette(theme, variant, isDisabled);

  return (
    <Pressable
      onPress={isDisabled ? undefined : onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        {
          height,
          paddingHorizontal: paddingH,
          backgroundColor: palette.bg,
          borderColor: palette.border,
          borderWidth: variant === 'outline' ? 1.5 : 0,
          borderRadius: theme.radius.lg,
          width: fullWidth ? '100%' : undefined,
          opacity: pressed && !isDisabled ? 0.85 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={palette.text} size="small" />
      ) : (
        <View style={styles.content}>
          {icon ? <View style={styles.iconLeft}>{icon}</View> : null}
          <Text
            style={[
              {
                color: palette.text,
                fontFamily: theme.text.button.fontFamily,
                fontSize,
              },
              textStyle,
            ]}
          >
            {label}
          </Text>
          {iconRight ? <View style={styles.iconRight}>{iconRight}</View> : null}
        </View>
      )}
    </Pressable>
  );
}

function getPalette(
  theme: ReturnType<typeof useTheme>,
  variant: ButtonVariant,
  disabled: boolean
): { bg: string; border: string; text: string } {
  if (disabled) {
    return {
      bg: theme.colors.surfaceAlt,
      border: theme.colors.border,
      text: theme.colors.textMuted,
    };
  }
  switch (variant) {
    case 'primary':
      return {
        bg: theme.colors.primary,
        border: theme.colors.primary,
        text: theme.colors.onPrimary,
      };
    case 'secondary':
      return {
        bg: theme.colors.primaryLight,
        border: theme.colors.primaryLight,
        text: theme.colors.primary,
      };
    case 'outline':
      return {
        bg: 'transparent',
        border: theme.colors.borderStrong,
        text: theme.colors.text,
      };
    case 'ghost':
      return {
        bg: 'transparent',
        border: 'transparent',
        text: theme.colors.primary,
      };
    case 'danger':
      return {
        bg: theme.colors.danger,
        border: theme.colors.danger,
        text: theme.colors.onPrimary,
      };
  }
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLeft: { marginRight: 8 },
  iconRight: { marginLeft: 8 },
});