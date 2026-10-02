import type { NavigatorScreenParams } from '@react-navigation/native';
import type { Vertical } from './common';

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  ResetPassword: { token: string };
  VerifyEmail: { token: string };
};

export type OnboardingStackParamList = {
  BusinessSetup: undefined;
  InviteTeam: undefined;
  SetupComplete: undefined;
};

export type BillingStackParamList = {
  Expired: undefined;
  Invoice: { invoiceNumber: string };
  PayWithMpesa: { invoiceNumber: string; amount: number };
  Renewal: undefined;
};

export type DashboardStackParamList = {
  DashboardHome: undefined;
  Notifications: undefined;
  NotificationDetail: { id: string };
};

export type ManageStackParamList = {
  ManageHome: undefined;
  Detail: { id: string; kind: string };
  Form: { id?: string; kind: string };
};

export type ReportsStackParamList = {
  ReportsHome: undefined;
  ReportDetail: { id: string };
};

export type MoreStackParamList = {
  MoreMenu: undefined;
  Profile: undefined;
  Settings: undefined;
  Subscription: undefined;
  TeamMembers: undefined;
  ChangePassword: undefined;
};

export type VerticalTabParamList = {
  Dashboard: NavigatorScreenParams<DashboardStackParamList>;
  Core: undefined;
  Manage: NavigatorScreenParams<ManageStackParamList>;
  Reports: NavigatorScreenParams<ReportsStackParamList>;
  More: NavigatorScreenParams<MoreStackParamList>;
};

export type RootStackParamList = {
  Splash: undefined;
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Onboarding: NavigatorScreenParams<OnboardingStackParamList>;
  Billing: NavigatorScreenParams<BillingStackParamList>;
  App: { vertical: Vertical };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}