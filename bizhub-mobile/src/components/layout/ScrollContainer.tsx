import React from 'react';
import {
  ScrollView,
  ScrollViewProps,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { useTheme } from '@/theme';

export interface ScrollContainerProps extends ScrollViewProps {
  padded?: boolean;
  bottomInset?: number;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function ScrollContainer({
  children,
  padded = true,
  bottomInset = 24,
  refreshing,
  onRefresh,
  contentContainerStyle,
  ...rest
}: ScrollContainerProps): React.ReactElement {
  const theme = useTheme();

  return (
    <ScrollView
      {...rest}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={!!refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
          />
        ) : undefined
      }
      contentContainerStyle={[
        {
          paddingHorizontal: padded ? theme.spacing.lg : 0,
          paddingBottom: bottomInset,
        },
        contentContainerStyle,
      ]}
    >
      {children}
    </ScrollView>
  );
}

const _styles = StyleSheet.create({});
void _styles;