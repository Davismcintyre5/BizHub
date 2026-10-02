import { useColorScheme } from 'react-native';
import { lightColors, darkColors, palette, type ThemeColors } from './colors';
import { useThemeStore } from '@/stores/themeStore';
import { spacing, radius, sizes } from './spacing';
import { text, fontFamily, fontSize, lineHeight } from './typography';
import { shadows } from './shadows';

export { palette, lightColors, darkColors };
export type { ThemeColors };
export { spacing, radius, sizes };
export { text, fontFamily, fontSize, lineHeight };
export { shadows };

export interface Theme {
  colors: ThemeColors;
  spacing: typeof spacing;
  radius: typeof radius;
  sizes: typeof sizes;
  text: typeof text;
  shadows: typeof shadows;
  isDark: boolean;
}

export function buildTheme(mode: 'light' | 'dark'): Theme {
  return {
    colors: mode === 'dark' ? darkColors : lightColors,
    spacing,
    radius,
    sizes,
    text,
    shadows,
    isDark: mode === 'dark',
  };
}

export function useTheme(): Theme {
  const system = useColorScheme();
  const preference = useThemeStore((s) => s.preference);

  const mode: 'light' | 'dark' =
    preference === 'system'
      ? system === 'dark'
        ? 'dark'
        : 'light'
      : preference;

  return buildTheme(mode);
}