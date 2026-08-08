import { useState, useEffect } from 'react';

export function useAppVersion() {
  const [version, setVersion] = useState('1.0.0');
  const [isElectron, setIsElectron] = useState(false);

  useEffect(() => {
    // Check if running in Electron
    if (window.electronAPI) {
      setIsElectron(true);
      window.electronAPI.getVersion()
        .then(v => setVersion(v))
        .catch(() => {
          // Fallback to env variable
          setVersion(import.meta.env.VITE_APP_VERSION || '1.0.0');
        });
    } else {
      // Browser fallback
      setVersion(import.meta.env.VITE_APP_VERSION || '1.0.0');
    }
  }, []);

  return { version, isElectron };
}