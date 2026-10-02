import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/theme';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { MoneyText } from '@/components/ui/MoneyText';
import { StatRow } from './StatRow';

export interface SummaryCardProps {
  title: string;
  rows: Array<{ label: string; value: string; tone?: 'default' | 'success' | 'danger' }>;
  totalLabel?: string;
  totalValue?: number | string;
  totalTone?: 'default' | 'success' | 'danger';
}

export function SummaryCard({
  title,
  rows,
  totalLabel,
  totalValue,
  totalTone,
}: SummaryCardProps): React.ReactElement {
  const theme = useTheme();

  return (
    <Card padding={16}>
      <Text variant="h4" style={styles.title}>
        {title}
      </Text>
      {rows.map((r, i) => (
        <StatRow key={i} {...r} />
      ))}
      {totalLabel && totalValue !== undefined ? (
        <View
          style={[
            styles.total,
            { borderTopColor: theme.colors.border },
          ]}
        >
          <StatRow label={totalLabel} value={String(totalValue)} emphasized tone={totalTone} />
        </View>
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  title: { marginBottom: 8 },
  total: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});