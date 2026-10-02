import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { Smartphone } from 'lucide-react-native';
import { useTheme } from '@/theme';
import { Text } from '@/components/ui/Text';
import { Spinner } from '@/components/ui/Spinner';
import { Sheet } from '@/components/ui/Sheet';

export interface MpesaWaitingSheetProps {
  visible: boolean;
  phone?: string;
  onClose?: () => void;
}

export function MpesaWaitingSheet({
  visible,
  phone,
  onClose,
}: MpesaWaitingSheetProps): React.ReactElement {
  const theme = useTheme();
  const ref = useRef<BottomSheet>(null);

  useEffect(() => {
    if (visible) ref.current?.snapToIndex(0);
    else ref.current?.close();
  }, [visible]);

  return (
    <Sheet ref={ref} snapPoints={['40%']} onClose={onClose}>
      <View style={styles.body}>
        <View
          style={[
            styles.icon,
            { backgroundColor: theme.colors.primaryLight },
          ]}
        >
          <Smartphone size={28} color={theme.colors.primary} />
        </View>
        <Text variant="h4" align="center" style={styles.title}>
          Waiting for payment
        </Text>
        <Text
          variant="bodySm"
          color={theme.colors.textSecondary}
          align="center"
          style={styles.desc}
        >
          {phone
            ? `Enter your M-Pesa PIN on ${phone} to complete the payment.`
            : 'Enter your M-Pesa PIN to complete the payment.'}
        </Text>
        <View style={styles.spinner}>
          <Spinner size="small" />
        </View>
      </View>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  body: { alignItems: 'center', paddingTop: 8, paddingBottom: 24 },
  icon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: { marginBottom: 8 },
  desc: { paddingHorizontal: 16 },
  spinner: { marginTop: 24 },
});