export const palette = {
  blue50: '#eff6ff',
  blue100: '#dbeafe',
  blue200: '#bfdbfe',
  blue300: '#93c5fd',
  blue400: '#60a5fa',
  blue500: '#3b82f6',
  blue600: '#1a73e8',
  blue700: '#1d4ed8',
  blue800: '#0d47a1',
  blue900: '#1e3a5f',

  teal50: '#f0fdfa',
  teal500: '#0d9488',
  teal600: '#0f766e',

  green50: '#ecfdf5',
  green500: '#10b981',
  green600: '#059669',
  green700: '#047857',

  red50: '#fef2f2',
  red500: '#ef4444',
  red600: '#dc2626',
  red700: '#b91c1c',

  amber50: '#fffbeb',
  amber500: '#f59e0b',
  amber600: '#d97706',

  purple50: '#faf5ff',
  purple500: '#8b5cf6',
  purple600: '#7c3aed',

  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
  gray900: '#111827',
  gray950: '#030712',

  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
} as const;

export interface ThemeColors {
  background: string;
  surface: string;
  surfaceAlt: string;
  border: string;
  borderStrong: string;

  text: string;
  textSecondary: string;
  textMuted: string;
  textInverse: string;

  primary: string;
  primaryDark: string;
  primaryLight: string;
  onPrimary: string;

  success: string;
  successBg: string;
  warning: string;
  warningBg: string;
  danger: string;
  dangerBg: string;
  info: string;
  infoBg: string;

  overlay: string;
  skeleton: string;
}

export const lightColors: ThemeColors = {
  background: palette.gray50,
  surface: palette.white,
  surfaceAlt: palette.gray100,
  border: palette.gray200,
  borderStrong: palette.gray300,

  text: palette.gray900,
  textSecondary: palette.gray600,
  textMuted: palette.gray400,
  textInverse: palette.white,

  primary: palette.blue600,
  primaryDark: palette.blue800,
  primaryLight: palette.blue100,
  onPrimary: palette.white,

  success: palette.green600,
  successBg: palette.green50,
  warning: palette.amber600,
  warningBg: palette.amber50,
  danger: palette.red600,
  dangerBg: palette.red50,
  info: palette.blue600,
  infoBg: palette.blue50,

  overlay: 'rgba(0,0,0,0.5)',
  skeleton: palette.gray200,
};

export const darkColors: ThemeColors = {
  background: palette.gray950,
  surface: palette.gray900,
  surfaceAlt: palette.gray800,
  border: palette.gray800,
  borderStrong: palette.gray700,

  text: palette.gray50,
  textSecondary: palette.gray300,
  textMuted: palette.gray500,
  textInverse: palette.gray900,

  primary: palette.blue500,
  primaryDark: palette.blue700,
  primaryLight: palette.blue900,
  onPrimary: palette.white,

  success: palette.green500,
  successBg: '#052e1b',
  warning: palette.amber500,
  warningBg: '#3b2a05',
  danger: palette.red500,
  dangerBg: '#3b0b0b',
  info: palette.blue500,
  infoBg: '#0b1f3b',

  overlay: 'rgba(0,0,0,0.7)',
  skeleton: palette.gray800,
};