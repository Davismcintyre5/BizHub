import React, { forwardRef, useState } from 'react';
import {
  TextInput,
  TextInputProps,
  View,
  Pressable,
  StyleSheet,
} from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { useTheme } from '@/theme';
import { Text } from './Text';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  secure?: boolean;
}

export const Input = forwardRef<TextInput, InputProps>(function Input(
  {
    label,
    error,
    hint,
    leftIcon,
    rightIcon,
    secure,
    editable = true,
    ...rest
  },
  ref
): React.ReactElement {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(!!secure);

  const borderColor = error
    ? theme.colors.danger
    : focused
    ? theme.colors.primary
    : theme.colors.border;

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

      <View
        style={[
          styles.field,
          {
            borderColor,
            backgroundColor: editable
              ? theme.colors.surface
              : theme.colors.surfaceAlt,
            borderRadius: theme.radius.md,
          },
        ]}
      >
        {leftIcon ? <View style={styles.leftIcon}>{leftIcon}</View> : null}

        <TextInput
          ref={ref}
          {...rest}
          editable={editable}
          secureTextEntry={hidden}
          onFocus={(e) => {
            setFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            rest.onBlur?.(e);
          }}
          placeholderTextColor={theme.colors.textMuted}
          style={[
            styles.input,
            {
              color: theme.colors.text,
              fontFamily: theme.text.body.fontFamily,
              fontSize: theme.text.body.fontSize,
            },
          ]}
        />

        {secure ? (
          <Pressable
            onPress={() => setHidden((v) => !v)}
            hitSlop={8}
            style={styles.rightIcon}
          >
            {hidden ? (
              <Eye size={18} color={theme.colors.textMuted} />
            ) : (
              <EyeOff size={18} color={theme.colors.textMuted} />
            )}
          </Pressable>
        ) : rightIcon ? (
          <View style={styles.rightIcon}>{rightIcon}</View>
        ) : null}
      </View>

      {error ? (
        <Text
          variant="caption"
          color={theme.colors.danger}
          style={styles.helper}
        >
          {error}
        </Text>
      ) : hint ? (
        <Text
          variant="caption"
          color={theme.colors.textMuted}
          style={styles.helper}
        >
          {hint}
        </Text>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  wrap: { width: '100%' },
  label: { marginBottom: 6 },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    minHeight: 48,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 0,
  },
  leftIcon: { marginRight: 8 },
  rightIcon: { marginLeft: 8 },
  helper: { marginTop: 4 },
});