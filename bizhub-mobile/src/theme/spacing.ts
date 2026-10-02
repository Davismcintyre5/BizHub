export const spacing = {
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
} as const;

export const radius = {
  none: 0,
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  full: 9999,
} as const;

export const sizes = {
  iconXs: 14,
  iconSm: 18,
  iconMd: 22,
  iconLg: 28,
  iconXl: 36,

  buttonSm: 36,
  buttonMd: 44,
  buttonLg: 52,

  inputSm: 40,
  inputMd: 48,
  inputLg: 56,

  avatarSm: 32,
  avatarMd: 40,
  avatarLg: 56,
  avatarXl: 80,

  tabBarHeight: 60,
  headerHeight: 56,
} as const;

export type Spacing = keyof typeof spacing;
export type Radius = keyof typeof radius;