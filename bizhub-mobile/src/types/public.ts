import type { Invoice, PaymentMethod } from './auth';

export interface Settings {
  siteName: string;
  logoUrl?: string;
  supportEmail: string;
  supportPhone: string;
  currency: string;
  timezone: string;
}

export interface PublicPlan {
  _id: string;
  name: string;
  price: number;
  currency: string;
  interval: 'monthly' | 'yearly';
  features: string[];
  vertical: string;
}

export interface PaymentMethodOption {
  id: PaymentMethod;
  label: string;
  icon?: string;
  enabled: boolean;
}

export interface StkPushPayload {
  invoiceNumber: string;
  phone: string;
}

export interface StkPushResponse {
  checkoutRequestId: string;
  merchantRequestId: string;
  customerMessage: string;
}

export interface MpesaStatusResponse {
  status: 'pending' | 'success' | 'failed' | 'cancelled';
  message?: string;
  receipt?: string;
  invoice?: Invoice;
}

export interface PaymentMethodsQuery {
  amount?: number;
  currency?: string;
  invoiceNumber?: string;
}

export interface LegalDocument {
  type: 'terms' | 'privacy' | 'refund';
  title: string;
  content: string;
  updatedAt: string;
}