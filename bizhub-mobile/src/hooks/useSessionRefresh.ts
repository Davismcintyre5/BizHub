import { useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useAuth } from '@/stores/authStore';
import { SESSION_REFRESH_INTERVAL_MS } from '@/lib/constants';

export function useSessionRefresh(): void {
  const refreshMe = useAuth((s) => s.refreshMe);
  const state = useAuth((s) => s.state);

  useEffect(() => {
    if (state !== 'authed' && state !== 'expired') return;

    const tick = (): void => {
      void refreshMe();
    };

    const interval = setInterval(tick, SESSION_REFRESH_INTERVAL_MS);

    const sub = AppState.addEventListener('change', (next: AppStateStatus) => {
      if (next === 'active') tick();
    });

    return () => {
      clearInterval(interval);
      sub.remove();
    };
  }, [state, refreshMe]);
}