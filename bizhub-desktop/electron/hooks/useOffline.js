import { useState, useEffect, useCallback } from 'react';

export function useOffline() {
  const [isOnline, setIsOnline] = useState(true);
  const [pendingCount, setPendingCount] = useState(0);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.isOnline().then(setIsOnline);
      window.electronAPI.getPendingCount().then(setPendingCount);
      window.electronAPI.onOnlineChange((status) => setIsOnline(status));
    } else {
      setIsOnline(navigator.onLine);
      const handleOnline = () => setIsOnline(true);
      const handleOffline = () => setIsOnline(false);
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);
      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }
  }, []);

  const syncNow = useCallback(async () => {
    if (!window.electronAPI) return;
    setSyncing(true);
    const result = await window.electronAPI.syncNow();
    setPendingCount(result.pending);
    setSyncing(false);
    return result;
  }, []);

  const queueAction = useCallback(async (action) => {
    if (!window.electronAPI) return;
    await window.electronAPI.queueAction(action);
    setPendingCount(prev => prev + 1);
  }, []);

  return { isOnline, pendingCount, syncing, syncNow, queueAction };
}