import { Platform, ViewStyle } from 'react-native';
import { palette } from './colors';

export const shadows: Record<string, ViewStyle> = {
  none: {},

  xs: Platform.select<ViewStyle>({
    ios: {
      shadowColor: palette.black,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.04,
      shadowRadius: 2,
    },
    android: { elevation: 1 },
    default: {},
  }),

  sm: Platform.select<ViewStyle>({
    ios: {
      shadowColor: palette.black,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.06,
      shadowRadius: 3,
    },
    android: { elevation: 2 },
    default: {},
  }),

  md: Platform.select<ViewStyle>({
    ios: {
      shadowColor: palette.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 6,
    },
    android: { elevation: 4 },
    default: {},
  }),

  lg: Platform.select<ViewStyle>({
    ios: {
      shadowColor: palette.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
    },
    android: { elevation: 8 },
    default: {},
  }),
};