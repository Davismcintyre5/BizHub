import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useTheme } from '@/theme';
import { Text } from './Text';

export interface TabItem {
  key: string;
  label: string;
  badge?: number;
}

export interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (key: string) => void;
  scrollable?: boolean;
}

export function Tabs({
  items,
  value,
  onChange,
  scrollable = false,
}: TabsProps): React.ReactElement {
  const theme = useTheme();

  const body = (
    <View
      style={[
        styles.wrap,
        {
          backgroundColor: theme.colors.surfaceAlt,
          borderRadius: theme.radius.md,
          padding: 4,
        },
      ]}
    >
      {items.map((item) => {
        const active = item.key === value;
        return (
          <Pressable
            key={item.key}
            onPress={() => onChange(item.key)}
            style={[
              styles.tab,
              {
                backgroundColor: active ? theme.colors.surface : 'transparent',
                borderRadius: theme.radius.sm,
              },
            ]}
          >
            <Text
              variant="label"
              style={{
                color: active ? theme.colors.text : theme.colors.textSecondary,
                fontWeight: active ? '600' : '500',
              }}
            >
              {item.label}
            </Text>
            {typeof item.badge === 'number' && item.badge > 0 ? (
              <View
                style={[
                  styles.badge,
                  { backgroundColor: theme.colors.primary },
                ]}
              >
                <Text
                  variant="caption"
                  style={{
                    color: theme.colors.onPrimary,
                    fontWeight: '700',
                  }}
                >
                  {item.badge > 99 ? '99+' : item.badge}
                </Text>
              </View>
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );

  if (!scrollable) return body;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingRight: 16 }}
    >
      {body}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  badge: {
    minWidth: 18,
    paddingHorizontal: 5,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
});