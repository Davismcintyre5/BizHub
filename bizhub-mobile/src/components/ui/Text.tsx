import React from 'react';
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
} from 'react-native';
import { useTheme } from '@/theme';
import type { TextVariant } from '@/theme';

export interface TextProps extends RNTextProps {
  variant?: TextVariant;
  color?: string;
  align?: 'left' | 'center' | 'right';
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  children?: React.ReactNode;
}

export function Text({
  variant = 'body',
  color,
  align,
  weight,
  style,
  children,
  ...rest
}: TextProps): React.ReactElement {
  const theme = useTheme();
  const base = theme.text[variant];

  return (
    <RNText
      {...rest}
      style={[
        base,
        { color: color ?? theme.colors.text },
        align && { textAlign: align },
        weight && { fontFamily: theme.text[weight === 'bold' ? 'h3' : 'body'].fontFamily },
        style,
      ]}
    >
      {children}
    </RNText>
  );
}