import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { BillingStackParamList } from '@/types';
import { ExpiredScreen } from '@/screens/billing/ExpiredScreen';
import { InvoiceScreen } from '@/screens/billing/InvoiceScreen';
import { PayWithMpesaScreen } from '@/screens/billing/PayWithMpesaScreen';
import { RenewalScreen } from '@/screens/billing/RenewalScreen';

const Stack = createNativeStackNavigator<BillingStackParamList>();

export function BillingStack(): React.ReactElement {
  return (
    <Stack.Navigator
      initialRouteName="Expired"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name="Expired" component={ExpiredScreen} />
      <Stack.Screen name="Invoice" component={InvoiceScreen} />
      <Stack.Screen name="PayWithMpesa" component={PayWithMpesaScreen} />
      <Stack.Screen name="Renewal" component={RenewalScreen} />
    </Stack.Navigator>
  );
}