import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { Bell } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@/theme';
import { Text } from '@/components/ui/Text';
import { useNotifications } from '@/stores/notificationStore';

export function NotificationBell(): React.ReactElement {
  const theme = useTheme();
  const unread = useNotifications((s) => s.unreadCount);
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate('Notifications' as never)}
      hitSlop={10}
      style={styles.btn}
    >
      <Bell size={22} color={theme.colors.text} />
      {unread > 0 ? (
        <View
          style={[styles.badge, { backgroundColor: theme.colors.danger }]}
        >
          <Text
            variant="caption"
            style={{
              color: theme.colors.onPrimary,
              fontWeight: '700',
              fontSize: 10,
            }}
          >
            {unread > 9 ? '9+' : unread}
          </Text>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 6,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});