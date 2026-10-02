import React, { useState } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { useTheme } from '@/theme';
import { Text } from './Text';
import { Sheet, SheetAction } from './Sheet';

export interface SelectOption<T extends string = string> {
  value: T;
  label: string;
  disabled?: boolean;
}

export interface SelectProps<T extends string = string> {
  label?: string;
  value?: T;
  options: SelectOption<T>[];
  onChange: (value: T) => void;
  placeholder?: string;
  error?: string;
}

export function Select<T extends string = string>({
  label,
  value,
  options,
  onChange,
  placeholder = 'Select an option',
  error,
}: SelectProps<T>): React.ReactElement {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <View style={styles.wrap}>
      {label ? (
        <Text
          variant="label"
          color={theme.colors.textSecondary}
          style={styles.label}
        >
          {label}
        </Text>
      ) : null}

      <Pressable
        onPress={() => setOpen(true)}
        style={[
          styles.field,
          {
            borderColor: error ? theme.colors.danger : theme.colors.border,
            backgroundColor: theme.colors.surface,
            borderRadius: theme.radius.md,
          },
        ]}
      >
        <Text
          variant="body"
          color={selected ? theme.colors.text : theme.colors.textMuted}
        >
          {selected?.label ?? placeholder}
        </Text>
        <ChevronDown size={18} color={theme.colors.textMuted} />
      </Pressable>

      {error ? (
        <Text
          variant="caption"
          color={theme.colors.danger}
          style={styles.helper}
        >
          {error}
        </Text>
      ) : null}

      <Sheet
        ref={undefined}
        title={label ?? 'Choose'}
        snapPoints={['40%', '75%']}
      >
        <View style={{ marginTop: 8 }}>
          {options.map((opt) => (
            <SheetAction
              key={opt.value}
              label={opt.label}
              destructive={false}
              onPress={() => {
                if (opt.disabled) return;
                onChange(opt.value);
                setOpen(false);
              }}
            />
          ))}
        </View>
      </Sheet>

      {open ? null : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: '100%' },
  label: { marginBottom: 6 },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    minHeight: 48,
    paddingHorizontal: 12,
  },
  helper: { marginTop: 4 },
});