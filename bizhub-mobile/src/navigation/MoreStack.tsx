import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { MoreStackParamList } from '@/types';
import { MoreMenuScreen } from '@/screens/common/MoreMenuScreen';
import { ProfileScreen } from '@/screens/common/ProfileScreen';
import { SettingsScreen } from '@/screens/common/SettingsScreen';
import { SubscriptionScreen } from '@/screens/common/SubscriptionScreen';
import { TeamMembersScreen } from '@/screens/common/TeamMembersScreen';
import { ChangePasswordScreen } from '@/screens/common/ChangePasswordScreen';

const Stack = createNativeStackNavigator<MoreStackParamList>();

export function MoreStack(): React.ReactElement {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="MoreMenu" component={MoreMenuScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Subscription" component={SubscriptionScreen} />
      <Stack.Screen name="TeamMembers" component={TeamMembersScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
    </Stack.Navigator>
  );
}