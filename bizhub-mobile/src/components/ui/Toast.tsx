import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { useTheme } from '@/theme';
import { Text } from './Text';
import type { Toast as ToastItem, ToastKind } from '@/stores/uiStore';

export interface ToastProps {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}

const ICONS: Record<ToastKind, LucideIcon> = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
};

export function Toast({ toast, onDismiss }: ToastProps): React.ReactElement {
  const theme = useTheme();
  const Icon = ICONS[toast.kind];
  const palette = getTone(theme, toast.kind);

  return (
    <View
      style={[
        styles.wrap,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          borderRadius: theme.radius.lg,
          borderLeftColor: palette,
          borderLeftWidth: 4,
        },
      ]}
    >
      <Icon size={20} color={palette} style={styles.icon} />
      <View style={styles.body}>
        <Text variant="bodyMedium" style={styles.title}>
          {toast.title}
        </Text>
        {toast.message ? (
          <Text
            variant="bodySm"
            color={theme.colors.textSecondary}
            style={styles.message}
          >
            {toast.message}
          </Text>
        ) : null}
      </View>
      <Pressable onPress={() => onDismiss(toast.id)} hitSlop={8}>
        <X size={18} color={theme.colors.textMuted} />
      </Pressable>
    </View>
  );
}

function getTone(theme: ReturnType<typeof useTheme>, kind: ToastKind): string {
  switch (kind) {
    case 'success':
      return theme.colors.success;
    case 'error':
      return theme.colors.danger;
    case 'warning':
      return theme.colors.warning;
    case 'info':
      return theme.colors.info;
  }
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 8,
    borderWidth: 1,
  },
  icon: { marginTop: 1, marginRight: 10 },
  body: { flex: 1, marginRight: 8 },
  title: { fontWeight: '600' },
  message: { marginTop: 2 },
});