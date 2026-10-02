import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { OnboardingStackParamList } from '@/types';
import { BusinessSetupScreen } from '@/screens/onboarding/BusinessSetupScreen';
import { InviteTeamScreen } from '@/screens/onboarding/InviteTeamScreen';
import { SetupCompleteScreen } from '@/screens/onboarding/SetupCompleteScreen';

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export function OnboardingStack(): React.ReactElement {
  return (
    <Stack.Navigator
      initialRouteName="BusinessSetup"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="BusinessSetup" component={BusinessSetupScreen} />
      <Stack.Screen name="InviteTeam" component={InviteTeamScreen} />
      <Stack.Screen name="SetupComplete" component={SetupCompleteScreen} />
    </Stack.Navigator>
  );
}