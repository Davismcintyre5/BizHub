import { useEffect, useRef } from 'react';
import { useAuth } from '@/stores/authStore';

export function useBootstrap(): { ready: boolean } {
  const bootstrap = useAuth((s) => s.bootstrap);
  const state = useAuth((s) => s.state);
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    void bootstrap();
  }, [bootstrap]);

  return { ready: state !== 'loading' };
}