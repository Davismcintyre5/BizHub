import type { Vertical, SubscriptionStatus } from './common';

export type UserRole = 'owner' | 'admin' | 'manager' | 'staff' | 'viewer';

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  vertical: Vertical;
  tenantId: string;
  avatar?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthScope {
  vertical: Vertical;
  permissions: string[];
}

export interface Invoice {
  _id: string;
  invoiceNumber: string;
  amount: number;
  currency: string;
  status: 'unpaid' | 'paid' | 'pending' | 'failed';
  dueDate: string;
  planName: string;
  planId: string;
  periodStart: string;
  periodEnd: string;
  createdAt: string;
}

export interface Subscription {
  _id: string;
  status: SubscriptionStatus;
  planId: string;
  planName: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  autoRenew: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
  businessType: Vertical;
  businessName: string;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}

export interface MeResponse {
  user: AuthUser;
  invoice?: Invoice;
  scope: AuthScope;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface ResetPasswordPayload {
  token: string;
  password: string;
}

export interface VerifyEmailPayload {
  token: string;
}