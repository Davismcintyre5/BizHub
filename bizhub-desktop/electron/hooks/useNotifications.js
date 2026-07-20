import { useCallback } from 'react';

export function useNotifications() {
  const notify = useCallback((title, body) => {
    if (window.electronAPI) {
      return window.electronAPI.notify(title, body);
    }
    // Fallback: browser notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body });
      return { success: true };
    }
    return { success: false, error: 'Notifications not available' };
  }, []);

  const requestPermission = useCallback(async () => {
    if (window.electronAPI) return { success: true };
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return { success: permission === 'granted' };
    }
    return { success: false };
  }, []);

  return { notify, requestPermission };
}