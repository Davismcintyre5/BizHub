import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@/theme';
import { useNotifications } from '@/stores/notificationStore';
import { verticalConfigs } from './verticalConfigs';
import type { Vertical } from '@/types';

const Tab = createBottomTabNavigator();

export function VerticalNavigator({
  vertical,
}: {
  vertical: Vertical;
}): React.ReactElement {
  const theme = useTheme();
  const unread = useNotifications((s) => s.unreadCount);
  const config = verticalConfigs[vertical];

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          height: theme.sizes.tabBarHeight + 12,
          paddingTop: 6,
          paddingBottom: 6,
        },
        tabBarLabelStyle: {
          fontFamily: theme.text.label.fontFamily,
          fontSize: 11,
        },
      }}
    >
      {config.tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <Tab.Screen
            key={tab.name}
            name={tab.name}
            component={tab.component}
            options={{
              tabBarLabel: tab.label,
              tabBarIcon: ({ color, size }) => (
                <Icon size={size ?? 22} color={color} />
              ),
              tabBarBadge:
                tab.name === 'Dashboard' && unread > 0 ? unread : undefined,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}