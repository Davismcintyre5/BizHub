import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { useTheme } from '@/theme';
import { Text } from './Text';

export interface AccordionItem {
  key: string;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  defaultOpen?: string;
}

export function Accordion({
  items,
  defaultOpen,
}: AccordionProps): React.ReactElement {
  const theme = useTheme();
  const [open, setOpen] = useState<string | null>(defaultOpen ?? null);

  return (
    <View>
      {items.map((item, idx) => {
        const isOpen = open === item.key;
        return (
          <View
            key={item.key}
            style={[
              styles.item,
              idx > 0 && {
                borderTopWidth: StyleSheet.hairlineWidth,
                borderTopColor: theme.colors.border,
              },
            ]}
          >
            <Pressable
              onPress={() => setOpen(isOpen ? null : item.key)}
              style={styles.header}
            >
              <View style={{ flex: 1 }}>
                <Text variant="bodyMedium">{item.title}</Text>
                {item.subtitle ? (
                  <Text
                    variant="caption"
                    color={theme.colors.textSecondary}
                    style={styles.sub}
                  >
                    {item.subtitle}
                  </Text>
                ) : null}
              </View>
              <ChevronDown
                size={18}
                color={theme.colors.textMuted}
                style={{
                  transform: [{ rotate: isOpen ? '180deg' : '0deg' }],
                }}
              />
            </Pressable>
            {isOpen ? <View style={styles.content}>{item.content}</View> : null}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  item: { paddingVertical: 12 },
  header: { flexDirection: 'row', alignItems: 'center' },
  sub: { marginTop: 2 },
  content: { marginTop: 12 },
});