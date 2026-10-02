import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ViewStyle,
} from 'react-native';

export interface KeyboardAvoidViewProps {
  children: React.ReactNode;
  offset?: number;
  style?: ViewStyle;
}

export function KeyboardAvoidView({
  children,
  offset = 0,
  style,
}: KeyboardAvoidViewProps): React.ReactElement {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={offset}
      style={[styles.root, style]}
    >
      {children}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});