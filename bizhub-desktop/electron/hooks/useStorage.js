import { useState, useCallback } from 'react';

export function useStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    if (window.electronAPI) {
      return window.electronAPI.storeGet(key) ?? initialValue;
    }
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const set = useCallback((newValue) => {
    setValue(newValue);
    if (window.electronAPI) {
      window.electronAPI.storeSet(key, newValue);
    } else {
      localStorage.setItem(key, JSON.stringify(newValue));
    }
  }, [key]);

  const remove = useCallback(() => {
    setValue(initialValue);
    if (window.electronAPI) {
      window.electronAPI.storeDelete(key);
    } else {
      localStorage.removeItem(key);
    }
  }, [key, initialValue]);

  return [value, set, remove];
}