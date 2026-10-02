import React, { forwardRef, useCallback, useMemo } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { useTheme } from '@/theme';
import { Text } from './Text';

export interface SheetProps {
  title?: string;
  snapPoints?: string[];
  onClose?: () => void;
  children: React.ReactNode;
}

export const Sheet = forwardRef<BottomSheet, SheetProps>(function Sheet(
  { title, snapPoints, onClose, children },
  ref
): React.ReactElement {
  const theme = useTheme();
  const points = useMemo(() => snapPoints ?? ['50%'], [snapPoints]);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
      />
    ),
    []
  );

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={points}
      enablePanDownToClose
      onClose={onClose}
      backdropComponent={renderBackdrop}
      backgroundStyle={{
        backgroundColor: theme.colors.surface,
        borderTopLeftRadius: theme.radius['2xl'],
        borderTopRightRadius: theme.radius['2xl'],
      }}
      handleIndicatorStyle={{
        backgroundColor: theme.colors.borderStrong,
      }}
    >
      <BottomSheetView style={styles.content}>
        {title ? (
          <View style={styles.header}>
            <Text variant="h4">{title}</Text>
          </View>
        ) : null}
        {children}
      </BottomSheetView>
    </BottomSheet>
  );
});

export interface SheetActionProps {
  label: string;
  onPress: () => void;
  destructive?: boolean;
}

export function SheetAction({
  label,
  onPress,
  destructive,
}: SheetActionProps): React.ReactElement {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.action,
        { borderBottomColor: theme.colors.border },
        { opacity: pressed ? 0.6 : 1 },
      ]}
    >
      <Text
        variant="bodyMedium"
        style={{
          color: destructive ? theme.colors.danger : theme.colors.text,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  header: {
    paddingBottom: 12,
  },
  action: {
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});