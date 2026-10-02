import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useTheme } from '@/theme';
import { Text } from './Text';
import { initials } from '@/lib/format';

export interface AvatarProps {
  name: string;
  uri?: string;
  size?: number;
}

export function Avatar({
  name,
  uri,
  size = 40,
}: AvatarProps): React.ReactElement {
  const theme = useTheme();

  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={[
          styles.base,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: theme.colors.surfaceAlt,
          },
        ]}
      />
    );
  }

  return (
    <View
      style={[
        styles.base,
        styles.center,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: theme.colors.primaryLight,
        },
      ]}
    >
      <Text
        style={{
          color: theme.colors.primary,
          fontWeight: '700',
          fontSize: size * 0.36,
        }}
      >
        {initials(name)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {},
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});