import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/theme';
import { Text } from '@/components/ui/Text';

export interface FormSectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export function FormSection({
  title,
  description,
  children,
}: FormSectionProps): React.ReactElement {
  const theme = useTheme();

  return (
    <View style={styles.wrap}>
      {title ? (
        <Text variant="h4" style={styles.title}>
          {title}
        </Text>
      ) : null}
      {description ? (
        <Text
          variant="bodySm"
          color={theme.colors.textSecondary}
          style={styles.desc}
        >
          {description}
        </Text>
      ) : null}
      <View style={styles.body}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 24 },
  title: { marginBottom: 4 },
  desc: { marginBottom: 12 },
  body: { gap: 14 },
});