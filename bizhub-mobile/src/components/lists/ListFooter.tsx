import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Spinner } from '@/components/ui/Spinner';
import { Text } from '@/components/ui/Text';
import { useTheme } from '@/theme';

export interface ListFooterProps {
  loading?: boolean;
  hasMore?: boolean;
  endMessage?: string;
}

export function ListFooter({
  loading,
  hasMore,
  endMessage = 'End of list',
}: ListFooterProps): React.ReactElement | null {
  const theme = useTheme();

  if (loading) {
    return (
      <View style={styles.wrap}>
        <Spinner size="small" />
      </View>
    );
  }
  if (!hasMore) {
    return (
      <View style={styles.wrap}>
        <Text variant="caption" color={theme.colors.textMuted}>
          {endMessage}
        </Text>
      </View>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  wrap: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});