import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import {
  Banknote,
  Smartphone,
  CreditCard,
  ShieldCheck,
  Landmark,
} from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { useTheme } from '@/theme';
import { Text } from '@/components/ui/Text';
import type { PaymentMethod } from '@/types';

export interface PaymentMethodPickerProps {
  value: PaymentMethod;
  onChange: (m: PaymentMethod) => void;
  methods?: PaymentMethod[];
}

const ICONS: Record<PaymentMethod, LucideIcon> = {
  cash: Banknote,
  mpesa: Smartphone,
  card: CreditCard,
  insurance: ShieldCheck,
  bank: Landmark,
};

const LABELS: Record<PaymentMethod, string> = {
  cash: 'Cash',
  mpesa: 'M-Pesa',
  card: 'Card',
  insurance: 'Insurance',
  bank: 'Bank',
};

export function PaymentMethodPicker({
  value,
  onChange,
  methods = ['cash', 'mpesa', 'card', 'insurance'],
}: PaymentMethodPickerProps): React.ReactElement {
  const theme = useTheme();

  return (
    <View style={styles.grid}>
      {methods.map((m) => {
        const Icon = ICONS[m];
        const active = m === value;
        return (
          <Pressable
            key={m}
            onPress={() => onChange(m)}
            style={[
              styles.tile,
              {
                borderColor: active ? theme.colors.primary : theme.colors.border,
                backgroundColor: active
                  ? theme.colors.primaryLight
                  : theme.colors.surface,
                borderRadius: theme.radius.md,
              },
            ]}
          >
            <Icon
              size={22}
              color={active ? theme.colors.primary : theme.colors.textSecondary}
            />
            <Text
              variant="label"
              style={{
                color: active ? theme.colors.primary : theme.colors.text,
                fontWeight: '600',
                marginTop: 6,
              }}
            >
              {LABELS[m]}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tile: {
    flex: 1,
    minWidth: '22%',
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
  },
});