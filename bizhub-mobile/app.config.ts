import { ExpoConfig, ConfigContext } from 'expo/config';

const IS_DEV = process.env.APP_VARIANT === 'development';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';

const BUNDLE_ID = 'com.bizhub.mobile';
const PACKAGE = 'com.bizhub.mobile';

function getAppName(): string {
  if (IS_DEV) return 'BizHub Dev';
  if (IS_PREVIEW) return 'BizHub Preview';
  return 'BizHub';
}

function getBundleId(base: string): string {
  if (IS_DEV) return `${base}.dev`;
  if (IS_PREVIEW) return `${base}.preview`;
  return base;
}

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: getAppName(),
  slug: 'bizhub-mobile',
  version: '1.0.0',
  orientation: 'portrait',
  scheme: 'bizhub',
  userInterfaceStyle: 'automatic',

  icon: './assets/icon.png',
  assetBundlePatterns: ['**/*'],

  splash: {
    image: './assets/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#1a73e8',
  },

  ios: {
    supportsTablet: true,
    bundleIdentifier: getBundleId(BUNDLE_ID),
    buildNumber: '1',
    infoPlist: {
      NSCameraUsageDescription:
        'BizHub uses the camera to scan barcodes and capture product photos.',
      NSPhotoLibraryUsageDescription:
        'BizHub needs access to your photos to upload product images and receipts.',
      NSLocationWhenInUseUsageDescription:
        'BizHub uses your location to tag sales and deliveries.',
      NSFaceIDUsageDescription:
        'BizHub uses Face ID to securely sign you in.',
      ITSAppUsesNonExemptEncryption: false,
    },
    associatedDomains: ['applinks:bizhub.pxxl.click'],
  },

  android: {
    package: getBundleId(PACKAGE),
    versionCode: 1,
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#1a73e8',
    },
    permissions: [
      'CAMERA',
      'READ_EXTERNAL_STORAGE',
      'WRITE_EXTERNAL_STORAGE',
      'ACCESS_FINE_LOCATION',
      'ACCESS_COARSE_LOCATION',
      'USE_BIOMETRIC',
      'USE_FINGERPRINT',
      'POST_NOTIFICATIONS',
    ],
    intentFilters: [
      {
        action: 'VIEW',
        autoVerify: true,
        data: [
          { scheme: 'bizhub' },
          { scheme: 'https', host: 'bizhub.pxxl.click', pathPrefix: '/invoice' },
          { scheme: 'https', host: 'bizhub.pxxl.click', pathPrefix: '/reset-password' },
          { scheme: 'https', host: 'bizhub.pxxl.click', pathPrefix: '/verify-email' },
          { scheme: 'https', host: 'bizhub.pxxl.click', pathPrefix: '/invite' },
        ],
        category: ['BROWSABLE', 'DEFAULT'],
      },
    ],
  },

  web: {
    favicon: './assets/favicon.png',
    bundler: 'metro',
  },

  plugins: [
    'expo-secure-store',
    'expo-font',
    'expo-updates',
    'expo-web-browser',
    [
      'expo-camera',
      {
        cameraPermission:
          'BizHub uses the camera to scan barcodes and capture product photos.',
      },
    ],
    [
      'expo-image-picker',
      {
        photosPermission:
          'BizHub needs access to your photos to upload product images and receipts.',
        cameraPermission:
          'BizHub uses the camera to scan barcodes and capture product photos.',
      },
    ],
    [
      'expo-location',
      {
        locationAlwaysAndWhenInUsePermission:
          'BizHub uses your location to tag sales and deliveries.',
      },
    ],
    [
      'expo-notifications',
      {
        icon: './assets/notification-icon-96.png',
        color: '#1a73e8',
        sounds: [],
      },
    ],
    [
      'expo-local-authentication',
      {
        faceIDPermission: 'BizHub uses Face ID to securely sign you in.',
      },
    ],
    [
      'expo-build-properties',
      {
        android: {
          compileSdkVersion: 35,
          targetSdkVersion: 35,
          buildToolsVersion: '35.0.0',
          minSdkVersion: 24,
        },
        ios: {
          deploymentTarget: '15.1',
        },
      },
    ],
    [
      'expo-splash-screen',
      {
        image: './assets/splash-icon.png',
        imageWidth: 240,
        resizeMode: 'contain',
        backgroundColor: '#1a73e8',
        dark: {
          image: './assets/splash-icon.png',
          backgroundColor: '#0d47a1',
        },
      },
    ],
    'react-native-maps',
  ],

  extra: {
    apiUrl: process.env.EXPO_PUBLIC_API_URL ?? 'https://bizhubserver.pxxl.click/api',
    socketUrl: process.env.EXPO_PUBLIC_SOCKET_URL ?? 'https://bizhubserver.pxxl.click',
    sentryDsn: process.env.EXPO_PUBLIC_SENTRY_DSN ?? '',
    eas: {
      projectId: '',
    },
  },

  updates: {
    fallbackToCacheTimeout: 0,
    url: 'https://u.expo.dev/',
  },

  runtimeVersion: {
    policy: 'appVersion',
  },
});