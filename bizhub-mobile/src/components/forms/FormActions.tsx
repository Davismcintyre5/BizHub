import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from '@/components/ui/Button';

export interface FormActionsProps {
  submitLabel?: string;
  cancelLabel?: string;
  onSubmit: () => void;
  onCancel?: () => void;
  loading?: boolean;
  disabled?: boolean;
  destructive?: boolean;
}

export function FormActions({
  submitLabel = 'Save',
  cancelLabel,
  onSubmit,
  onCancel,
  loading,
  disabled,
  destructive,
}: FormActionsProps): React.ReactElement {
  return (
    <View style={styles.wrap}>
      {cancelLabel && onCancel ? (
        <Button
          label={cancelLabel}
          variant="outline"
          onPress={onCancel}
          fullWidth={false}
          style={styles.cancel}
        />
      ) : null}
      <Button
        label={submitLabel}
        variant={destructive ? 'danger' : 'primary'}
        onPress={onSubmit}
        loading={loading}
        disabled={disabled}
        style={styles.submit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  cancel: { flex: 1 },
  submit: { flex: 2 },
});