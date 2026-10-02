import type { Vertical, PaymentMethod } from '@/types';

export const APP_NAME = 'BizHub';
export const APP_TAGLINE = 'Manage everything. One app.';
export const SUPPORT_EMAIL = 'support@bizhub.pxxl.click';
export const SUPPORT_PHONE = '+254700000000';
export const WEBSITE_URL = 'https://bizhub.pxxl.click';

export const VERTICALS: Record<
  Vertical,
  { label: string; short: string; color: string; icon: string }
> = {
  apartment: {
    label: 'Property Management',
    short: 'Apartment',
    color: '#3b82f6',
    icon: 'Building2',
  },
  cyber: {
    label: 'Cyber Café',
    short: 'Cyber',
    color: '#8b5cf6',
    icon: 'Monitor',
  },
  electro: {
    label: 'Electronics Shop',
    short: 'Electro',
    color: '#f59e0b',
    icon: 'Zap',
  },
  pharma: {
    label: 'Pharmacy',
    short: 'Pharma',
    color: '#10b981',
    icon: 'Pill',
  },
  resto: {
    label: 'Restaurant',
    short: 'Resto',
    color: '#ef4444',
    icon: 'UtensilsCrossed',
  },
};

export const PAYMENT_METHODS: Record<
  PaymentMethod,
  { label: string; icon: string }
> = {
  cash: { label: 'Cash', icon: 'Banknote' },
  mpesa: { label: 'M-Pesa', icon: 'Smartphone' },
  card: { label: 'Card', icon: 'CreditCard' },
  insurance: { label: 'Insurance', icon: 'ShieldCheck' },
  bank: { label: 'Bank Transfer', icon: 'Landmark' },
};

export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;
export const SEARCH_DEBOUNCE_MS = 300;
export const SESSION_REFRESH_INTERVAL_MS = 60_000;
export const MPESA_POLL_INTERVAL_MS = 3_000;
export const MPESA_POLL_MAX_ATTEMPTS = 20;