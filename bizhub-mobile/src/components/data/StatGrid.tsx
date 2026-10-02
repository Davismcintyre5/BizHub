import React from 'react';
import { View, StyleSheet } from 'react-native';
import { KpiCard, type KpiCardProps } from '@/components/ui/KpiCard';

export interface StatGridProps {
  items: KpiCardProps[];
  columns?: 2 | 3;
}

export function StatGrid({
  items,
  columns = 2,
}: StatGridProps): React.ReactElement {
  const rows: KpiCardProps[][] = [];
  for (let i = 0; i < items.length; i += columns) {
    rows.push(items.slice(i, i + columns));
  }

  return (
    <View style={styles.wrap}>
      {rows.map((row, i) => (
        <View key={i} style={styles.row}>
          {row.map((item, j) => (
            <KpiCard key={j} {...item} />
          ))}
          {row.length < columns
            ? Array.from({ length: columns - row.length }).map((_, k) => (
                <View key={`spacer-${k}`} style={styles.spacer} />
              ))
            : null}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 12 },
  row: { flexDirection: 'row', gap: 12 },
  spacer: { flex: 1 },
});