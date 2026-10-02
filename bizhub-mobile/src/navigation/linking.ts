import type { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import type { RootStackParamList } from '@/types';

const prefix = Linking.createURL('/');

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [prefix, 'bizhub://', 'https://bizhub.pxxl.click'],
  config: {
    screens: {
      Auth: {
        screens: {
          ResetPassword: 'reset-password/:token',
          VerifyEmail: 'verify-email/:token',
        },
      },
      Billing: {
        screens: {
          Invoice: 'invoice/:invoiceNumber',
        },
      },
    },
  },
};