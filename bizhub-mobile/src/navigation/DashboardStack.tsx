import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { DashboardStackParamList } from '@/types';
import { DashboardHomeScreen } from '@/screens/common/DashboardHomeScreen';
import { NotificationsScreen } from '@/screens/common/NotificationsScreen';
import { NotificationDetailScreen } from '@/screens/common/NotificationDetailScreen';

const Stack = createNativeStackNavigator<DashboardStackParamList>();

export function DashboardStack(): React.ReactElement {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="DashboardHome" component={DashboardHomeScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen
        name="NotificationDetail"
        component={NotificationDetailScreen}
      />
    </Stack.Navigator>
  );
}