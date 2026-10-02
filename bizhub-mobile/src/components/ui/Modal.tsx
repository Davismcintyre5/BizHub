import React from 'react';
import {
  Modal as RNModal,
  View,
  StyleSheet,
  Pressable,
  ModalProps as RNModalProps,
} from 'react-native';
import { useTheme } from '@/theme';
import { Text } from './Text';

export interface ModalProps extends Omit<RNModalProps, 'children'> {
  title?: string;
  onClose?: () => void;
  children: React.ReactNode;
}

export function Modal({
  title,
  onClose,
  children,
  visible,
  ...rest
}: ModalProps): React.ReactElement {
  const theme = useTheme();

  return (
    <RNModal
      {...rest}
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        style={[styles.overlay, { backgroundColor: theme.colors.overlay }]}
        onPress={onClose}
      >
        <Pressable
          onPress={(e) => e.stopPropagation()}
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.surface,
              borderRadius: theme.radius.xl,
            },
          ]}
        >
          {title ? (
            <View style={styles.header}>
              <Text variant="h4">{title}</Text>
            </View>
          ) : null}
          {children}
        </Pressable>
      </Pressable>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 480,
    padding: 20,
  },
  header: { marginBottom: 12 },
});