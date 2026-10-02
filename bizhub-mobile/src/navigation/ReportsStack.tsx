import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { ReportsStackParamList } from '@/types';
import { ReportsHomeScreen } from '@/screens/common/ReportsHomeScreen';
import { ReportDetailScreen } from '@/screens/common/ReportDetailScreen';

const Stack = createNativeStackNavigator<ReportsStackParamList>();

export function ReportsStack(): React.ReactElement {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="ReportsHome" component={ReportsHomeScreen} />
      <Stack.Screen name="ReportDetail" component={ReportDetailScreen} />
    </Stack.Navigator>
  );
}