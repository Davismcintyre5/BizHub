import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Check } from 'lucide-react-native';
import { useTheme } from '@/theme';
import { Text } from './Text';

export interface CheckboxProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
  hint?: string;
  disabled?: boolean;
}

export function Checkbox({
  checked,
  onChange,
  label,
  hint,
  disabled,
}: CheckboxProps): React.ReactElement {
  const theme = useTheme();

  return (
    <Pressable
      disabled={disabled}
      onPress={() => onChange(!checked)}
      style={styles.row}
    >
      <View
        style={[
          styles.box,
          {
            borderColor: checked ? theme.colors.primary : theme.colors.borderStrong,
            backgroundColor: checked ? theme.colors.primary : 'transparent',
            borderRadius: theme.radius.xs,
            opacity: disabled ? 0.5 : 1,
          },
        ]}
      >
        {checked ? <Check size={14} color={theme.colors.onPrimary} strokeWidth={3} /> : null}
      </View>
      {(label || hint) ? (
        <View style={styles.body}>
          {label ? <Text variant="body">{label}</Text> : null}
          {hint ? (
            <Text
              variant="caption"
              color={theme.colors.textMuted}
              style={styles.hint}
            >
              {hint}
            </Text>
          ) : null}
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 6 },
  box: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  body: { flex: 1, marginLeft: 10 },
  hint: { marginTop: 2 },
});