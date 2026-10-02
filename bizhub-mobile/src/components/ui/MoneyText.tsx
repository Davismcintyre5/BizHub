import React from 'react';
import { Text, type TextProps } from './Text';
import { formatMoney } from '@/lib/format';

export interface MoneyTextProps extends Omit<TextProps, 'children'> {
  value: number | string;
  currency?: string;
  sign?: 'none' | 'positive' | 'negative';
}

export function MoneyText({
  value,
  currency = 'KES',
  sign = 'none',
  ...rest
}: MoneyTextProps): React.ReactElement {
  const formatted = formatMoney(value, currency);
  const prefix = sign === 'positive' ? '+ ' : sign === 'negative' ? '− ' : '';
  return <Text {...rest}>{prefix}{formatted}</Text>;
}