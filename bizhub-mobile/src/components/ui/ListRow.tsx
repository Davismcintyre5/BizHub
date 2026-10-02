import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { useTheme } from '@/theme';
import { Text } from './Text';

export interface ListRowProps {
  title: string;
  subtitle?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  onPress?: () => void;
  chevron?: boolean;
  destructive?: boolean;
}

export function ListRow({
  title,
  subtitle,
  left,
  right,
  onPress,
  chevron = false,
  destructive = false,
}: ListRowProps): React.ReactElement {
  const theme = useTheme();
  const textColor = destructive ? theme.colors.danger : theme.colors.text;

  const inner = (
    <View
      style={[
        styles.row,
        { borderBottomColor: theme.colors.border },
      ]}
    >
      {left ? <View style={styles.left}>{left}</View> : null}
      <View style={styles.middle}>
        <Text variant="bodyMedium" style={{ color: textColor }}>
          {title}
        </Text>
        {subtitle ? (
          <Text
            variant="bodySm"
            color={theme.colors.textSecondary}
            style={styles.sub}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>
      {right ? <View style={styles.right}>{right}</View> : null}
      {chevron ? (
        <ChevronRight size={18} color={theme.colors.textMuted} />
      ) : null}
    </View>
  );

  if (!onPress) return inner;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
    >
      {inner}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  left: { marginRight: 12 },
  middle: { flex: 1 },
  sub: { marginTop: 2 },
  right: { marginLeft: 12 },
});