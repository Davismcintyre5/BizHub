import React from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/theme';
import { Input, type InputProps } from '@/components/ui/Input';
import { Text } from '@/components/ui/Text';
import { FormField } from './FormField';

export interface PhoneFieldProps<T extends FieldValues>
  extends Omit<InputProps, 'value' | 'onChangeText' | 'error' | 'keyboardType'> {
  control: Control<T>;
  name: Path<T>;
}

export function PhoneField<T extends FieldValues>({
  control,
  name,
  ...rest
}: PhoneFieldProps<T>): React.ReactElement {
  const theme = useTheme();

  return (
    <View>
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
          <Text variant="bodyMedium">+254</Text>
        </View>
        <View style={styles.flex}>
          <FormField
            control={control}
            name={name}
            keyboardType="phone-pad"
            {...rest}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8 },
  prefix: {
    minWidth: 68,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  flex: { flex: 1 },
});