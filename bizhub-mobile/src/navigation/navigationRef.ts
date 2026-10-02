import { createNavigationContainerRef } from '@react-navigation/native';
import type { RootStackParamList } from '@/types';

export const navigationRef =
  createNavigationContainerRef<RootStackParamList>();

export function navigate<K extends keyof RootStackParamList>(
  name: K,
  params?: RootStackParamList[K]
): void {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as never, params as never);
  }
}

export function reset(state: Parameters<typeof navigationRef.reset>[0]): void {
  if (navigationRef.isReady()) {
    navigationRef.reset(state);
  }
}