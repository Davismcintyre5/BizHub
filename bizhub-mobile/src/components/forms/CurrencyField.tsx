import React from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/theme';
import { Input, type InputProps } from '@/components/ui/Input';
import { Text } from '@/components/ui/Text';
import { FormField } from './FormField';

export interface CurrencyFieldProps<T extends FieldValues>
  extends Omit<InputProps, 'value' | 'onChangeText' | 'error' | 'keyboardType'> {
  control: Control<T>;
  name: Path<T>;
  currency?: string;
}

export function CurrencyField<T extends FieldValues>({
  control,
  name,
  currency = 'KSh',
  ...rest
}: CurrencyFieldProps<T>): React.ReactElement {
  const theme = useTheme();

  return (
    <View style={styles.row}>
      <View
        style={[
          styles.prefix,
          {
            borderColor: theme.colors.border,
            backgroundColor: theme.colors.surface,
            borderRadius: theme.radius.md,
          },
        ]}
      >
        <Text variant="bodyMedium">{currency}</Text>
      </View>
      <View style={styles.flex}>
        <FormField
          control={control}
          name={name}
          keyboardType="decimal-pad"
          {...rest}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8, alignItems: 'flex-start' },
  prefix: {
    minWidth: 60,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  flex: { flex: 1 },
});