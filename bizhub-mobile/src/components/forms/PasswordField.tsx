import React from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/theme';
import { Input, type InputProps } from '@/components/ui/Input';
import { Text } from '@/components/ui/Text';
import { passwordStrength } from '@/lib/validators';
import { FormField } from './FormField';

export interface PasswordFieldProps<T extends FieldValues>
  extends Omit<InputProps, 'value' | 'onChangeText' | 'error' | 'secure'> {
  control: Control<T>;
  name: Path<T>;
  showStrength?: boolean;
}

export function PasswordField<T extends FieldValues>({
  control,
  name,
  showStrength,
  ...rest
}: PasswordFieldProps<T>): React.ReactElement {
  const theme = useTheme();

  return (
    <View>
      <FormField control={control} name={name} secure {...rest} />
      {showStrength ? (
        <Controller_Strength control={control} name={name} />
      ) : null}
    </View>
  );
}

function Controller_Strength<T extends FieldValues>({
  control,
  name,
}: {
  control: Control<T>;
  name: Path<T>;
}): React.ReactElement | null {
  const theme = useTheme();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const val = typeof field.value === 'string' ? field.value : '';
        if (!val) return null;
        const { score, label } = passwordStrength(val);
        const tones = [
          theme.colors.danger,
          theme.colors.danger,
          theme.colors.warning,
          theme.colors.success,
          theme.colors.success,
        ];
        const color = tones[score];
        return (
          <View style={styles.strengthRow}>
            <View style={styles.bars}>
              {[0, 1, 2, 3].map((i) => (
                <View
                  key={i}
                  style={[
                    styles.bar,
                    {
                      backgroundColor:
                        i < score ? color : theme.colors.surfaceAlt,
                    },
                  ]}
                />
              ))}
            </View>
            <Text variant="caption" style={{ color }}>
              {label}
            </Text>
          </View>
        );
      }}
    />
  );
}

import { Controller } from 'react-hook-form';

const styles = StyleSheet.create({
  strengthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
  },
  bars: { flexDirection: 'row', gap: 4, flex: 1 },
  bar: { flex: 1, height: 4, borderRadius: 2 },
});