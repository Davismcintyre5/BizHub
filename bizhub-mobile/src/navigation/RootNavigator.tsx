import React from 'react';
import { useAuth } from '@/stores/authStore';
import { SplashScreen } from '@/screens/splash/SplashScreen';
import { AuthStack } from './AuthStack';
import { OnboardingStack } from './OnboardingStack';
import { BillingStack } from './BillingStack';
import { VerticalNavigator } from './VerticalNavigator';

export function RootNavigator(): React.ReactElement | null {
  const state = useAuth((s) => s.state);
  const vertical = useAuth((s) => s.vertical);

  if (state === 'loading') return <SplashScreen />;
  if (state === 'unauthed') return <AuthStack />;
  if (state === 'onboarding') return <OnboardingStack />;
  if (state === 'expired') return <BillingStack />;

  if (state === 'authed' && vertical) {
    return <VerticalNavigator vertical={vertical} />;
  }

  return <SplashScreen />;
}