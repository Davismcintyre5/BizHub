import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, X } from 'lucide-react-native';
import { useTheme } from '@/theme';
import { Text } from '@/components/ui/Text';

export interface AppHeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  showClose?: boolean;
  left?: React.ReactNode;
  right?: React.ReactNode;
  onBack?: () => void;
  transparent?: boolean;
  center?: boolean;
}

export function AppHeader({
  title,
  subtitle,
  showBack = true,
  showClose = false,
  left,
  right,
  onBack,
  transparent,
  center = false,
}: AppHeaderProps): React.ReactElement {
  const theme = useTheme();
  const navigation = useNavigation();

  const handleBack = (): void => {
    if (onBack) return onBack();
    if (navigation.canGoBack()) navigation.goBack();
  };

  return (
    <View
      style={[
        styles.wrap,
        {
          backgroundColor: transparent ? 'transparent' : theme.colors.background,
          borderBottomColor: transparent ? 'transparent' : theme.colors.border,
        },
      ]}
    >
      <View style={styles.side}>
        {left ??
          (showClose ? (
            <Pressable onPress={handleBack} hitSlop={10} style={styles.iconBtn}>
              <X size={22} color={theme.colors.text} />
            </Pressable>
          ) : showBack ? (
            <Pressable onPress={handleBack} hitSlop={10} style={styles.iconBtn}>
              <ChevronLeft size={26} color={theme.colors.text} />
            </Pressable>
          ) : null)}
      </View>

      <View style={[styles.center, center && { alignItems: 'center' }]}>
        {title ? (
          <Text variant="h4" numberOfLines={1}>
            {title}
          </Text>
        ) : null}
        {subtitle ? (
          <Text
            variant="caption"
            color={theme.colors.textSecondary}
            numberOfLines={1}
            style={styles.subtitle}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>

      <View style={[styles.side, styles.rightSide]}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 56,
    paddingHorizontal: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  side: {
    minWidth: 44,
    height: 44,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  rightSide: {
    alignItems: 'flex-end',
  },
  iconBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: { flex: 1 },
  subtitle: { marginTop: 1 },
});