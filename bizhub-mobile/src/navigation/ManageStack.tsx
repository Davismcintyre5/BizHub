import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { ManageStackParamList } from '@/types';
import { ManageHomeScreen } from '@/screens/common/ManageHomeScreen';
import { DetailScreen } from '@/screens/common/DetailScreen';
import { FormScreen } from '@/screens/common/FormScreen';

const Stack = createNativeStackNavigator<ManageStackParamList>();

export function ManageStack(): React.ReactElement {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="ManageHome" component={ManageHomeScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen
        name="Form"
        component={FormScreen}
        options={{ presentation: 'modal' }}
      />
    </Stack.Navigator>
  );
}