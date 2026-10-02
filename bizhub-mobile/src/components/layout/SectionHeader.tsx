import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { useTheme } from '@/theme';
import { Text } from '@/components/ui/Text';

export interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function SectionHeader({
  title,
  actionLabel,
  onAction,
}: SectionHeaderProps): React.ReactElement {
  const theme = useTheme();

  return (
    <View style={styles.wrap}>
      <Text variant="h4" style={styles.title}>
        {title}
      </Text>
      {actionLabel && onAction ? (
        <Pressable onPress={onAction} hitSlop={8} style={styles.action}>
          <Text
            variant="label"
            style={{ color: theme.colors.primary }}
          >
            {actionLabel}
          </Text>
          <ChevronRight size={16} color={theme.colors.primary} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
  },
  title: { flex: 1 },
  action: { flexDirection: 'row', alignItems: 'center', gap: 2 },
});