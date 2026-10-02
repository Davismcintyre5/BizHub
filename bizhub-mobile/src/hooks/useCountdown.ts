import { useEffect, useRef, useState } from 'react';

export function useCountdown(seconds: number): {
  remaining: number;
  active: boolean;
  start: () => void;
  reset: () => void;
} {
  const [remaining, setRemaining] = useState(0);
  const [active, setActive] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = (): void => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    setActive(false);
  };

  const start = (): void => {
    stop();
    setRemaining(seconds);
    setActive(true);
  };

  const reset = (): void => {
    stop();
    setRemaining(0);
  };

  useEffect(() => {
    if (!active) return;
    timerRef.current = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          stop();
          return 0;
        }
        return r - 1;
      });
    }, 1000);

    return stop;
  }, [active]);

  return { remaining, active, start, reset };
}