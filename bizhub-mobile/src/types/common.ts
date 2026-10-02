export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  token?: string;
}

export interface Paginated<T> {
  items: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ListParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: 'asc' | 'desc';
  from?: string;
  to?: string;
  status?: string;
}

export type Vertical = 'apartment' | 'cyber' | 'electro' | 'pharma' | 'resto';

export type SubscriptionStatus = 'active' | 'expired' | 'pending' | 'trial';

export type PaymentMethod = 'cash' | 'mpesa' | 'card' | 'insurance' | 'bank';

export interface IdName {
  _id: string;
  name: string;
}

export interface Address {
  street?: string;
  city?: string;
  county?: string;
  country?: string;
  postalCode?: string;
  coordinates?: { lat: number; lng: number };
}