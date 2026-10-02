import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';
import { EmptyState } from '@/components/ui/EmptyState';

export interface ListEmptyProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function ListEmpty(props: ListEmptyProps): React.ReactElement {
  return (
    <View style={styles.wrap}>
      <EmptyState {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingTop: 32, minHeight: 300 },
});