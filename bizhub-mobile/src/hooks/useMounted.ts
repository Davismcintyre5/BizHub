import { useEffect, useRef } from 'react';

export function useMounted(): () => boolean {
  const mounted = useRef(true);

  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);

  return () => mounted.current;
}