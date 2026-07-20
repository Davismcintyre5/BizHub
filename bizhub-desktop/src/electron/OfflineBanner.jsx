import { useState, useEffect } from 'react';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';

export function OfflineBanner() {
  const [isOnline, setIsOnline] = useState(true);
  const [pendingCount, setPendingCount] = useState(0);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.isOnline().then(setIsOnline);
      window.electronAPI.getPendingCount().then(setPendingCount);
      window.electronAPI.onOnlineChange((status) => setIsOnline(status));
    } else {
      window.addEventListener('online', () => setIsOnline(true));
      window.addEventListener('offline', () => setIsOnline(false));
    }
    return () => {
      window.removeEventListener('online', () => {});
      window.removeEventListener('offline', () => {});
    };
  }, []);

  const handleSync = async () => {
    setSyncing(true);
    if (window.electronAPI) {
      const result = await window.electronAPI.syncNow();
      setPendingCount(result.pending);
    }
    setSyncing(false);
  };

  if (isOnline && pendingCount === 0) return null;

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 px-4 py-2 text-center text-sm font-medium ${isOnline ? 'bg-yellow-500 text-white' : 'bg-red-500 text-white'}`}
      style={window.electronAPI ? { top: '32px' } : {}}>
      <div className="flex items-center justify-center gap-2">
        {isOnline ? <Wifi size={14} /> : <WifiOff size={14} />}
        <span>
          {isOnline
            ? `${pendingCount} pending action${pendingCount !== 1 ? 's' : ''}. `
            : 'You are offline. Changes will sync when reconnected.'}
        </span>
        {isOnline && pendingCount > 0 && (
          <button onClick={handleSync} disabled={syncing} className="flex items-center gap-1 underline hover:no-underline">
            <RefreshCw size={14} className={syncing ? 'animate-spin' : ''} />
            Sync now
          </button>
        )}
      </div>
    </div>
  );
}