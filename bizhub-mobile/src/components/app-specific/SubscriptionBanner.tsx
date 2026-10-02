import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { AlertCircle } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@/theme';
import { Text } from '@/components/ui/Text';
import { useAuth } from '@/stores/authStore';

export function SubscriptionBanner(): React.ReactElement | null {
  const theme = useTheme();
  const invoice = useAuth((s) => s.invoice);
  const navigation = useNavigation();

  if (!invoice || invoice.status !== 'unpaid') return null;

  return (
    <Pressable
      onPress={() => navigation.navigate('Billing' as never)}
      style={[
        styles.wrap,
        {
          backgroundColor: theme.colors.dangerBg,
          borderColor: theme.colors.danger,
        },
      ]}
    >
      <AlertCircle size={18} color={theme.colors.danger} />
      <View style={styles.body}>
        <Text
          variant="bodyMedium"
          style={{ color: theme.colors.danger, fontWeight: '600' }}
        >
          Subscription expired
        </Text>
        <Text variant="caption" style={{ color: theme.colors.danger }}>
          Tap to pay invoice {invoice.invoiceNumber}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    borderRadius: 12,
  },
  body: { flex: 1 },
});