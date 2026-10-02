import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useThemeStore } from '@/stores/themeStore';
import { buildTheme, type Theme } from './index';

const ThemeContext = createContext<Theme | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const hydrate = useThemeStore((s) => s.hydrate);
  const preference = useThemeStore((s) => s.preference);
  const { useColorScheme } = require('react-native');
  const system = useColorScheme();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const mode: 'light' | 'dark' =
    preference === 'system'
      ? system === 'dark'
        ? 'dark'
        : 'light'
      : preference;

  const theme = useMemo(() => buildTheme(mode), [mode]);

  return (
    <ThemeContext.Provider value={theme}>
      <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
      {children}
    </ThemeContext.Provider>
  );
}

export function useAppTheme(): Theme {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useAppTheme must be used inside ThemeProvider');
  return ctx;
}