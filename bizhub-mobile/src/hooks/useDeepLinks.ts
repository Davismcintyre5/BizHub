import { useEffect } from 'react';
import * as Linking from 'expo-linking';
import type { NavigationContainerRef } from '@react-navigation/native';
import { navigationRef } from '@/navigation/navigationRef';
import { useAuth } from '@/stores/authStore';

interface ParsedLink {
  path: string;
  params: Record<string, string>;
}

function parseUrl(url: string): ParsedLink | null {
  try {
    const parsed = Linking.parse(url);
    const path = (parsed.path ?? '').replace(/^\/+|\/+$/g, '');
    const params = (parsed.queryParams ?? {}) as Record<string, string>;
    return { path, params };
  } catch {
    return null;
  }
}

function handleLink(
  nav: NavigationContainerRef<Record<string, object | undefined>>,
  link: ParsedLink
): void {
  const [root, second] = link.path.split('/');

  if (root === 'reset-password' && second) {
    nav.navigate('Auth' as never, {
      screen: 'ResetPassword',
      params: { token: second },
    } as never);
    return;
  }

  if (root === 'verify-email' && second) {
    nav.navigate('Auth' as never, {
      screen: 'VerifyEmail',
      params: { token: second },
    } as never);
    return;
  }

  if (root === 'invoice' && second) {
    nav.navigate('Billing' as never, {
      screen: 'Invoice',
      params: { invoiceNumber: second },
    } as never);
    return;
  }
}

export function useDeepLinks(): void {
  const authState = useAuth((s) => s.state);

  useEffect(() => {
    const sub = Linking.addEventListener('url', ({ url }) => {
      if (!navigationRef.isReady()) return;
      const parsed = parseUrl(url);
      if (!parsed) return;
      handleLink(navigationRef, parsed);
    });

    void (async () => {
      const initial = await Linking.getInitialURL();
      if (!initial || !navigationRef.isReady()) return;
      const parsed = parseUrl(initial);
      if (!parsed) return;
      setTimeout(() => handleLink(navigationRef, parsed), 500);
    })();

    return () => sub.remove();
  }, [authState]);
}