import type { PaymentMethod } from './common';

export interface CyberComputer {
  _id: string;
  label: string;
  type: 'desktop' | 'laptop' | 'console';
  status: 'available' | 'in_use' | 'maintenance' | 'offline';
  hourlyRate: number;
  specs?: string;
}

export interface CyberSession {
  _id: string;
  computerId: string;
  customerId?: string;
  startTime: string;
  endTime?: string;
  durationMinutes?: number;
  hourlyRate: number;
  amount: number;
  status: 'active' | 'completed' | 'cancelled';
  paymentMethod?: PaymentMethod;
  paid: boolean;
}

export interface CyberCustomer {
  _id: string;
  name: string;
  phone?: string;
  email?: string;
  balance: number;
  loyaltyPoints: number;
  createdAt: string;
}

export interface CyberPackage {
  _id: string;
  name: string;
  hours: number;
  price: number;
  validDays: number;
  active: boolean;
}

export interface CyberService {
  _id: string;
  name: string;
  category: 'printing' | 'scanning' | 'binding' | 'lamination' | 'other';
  price: number;
  unit: 'page' | 'item' | 'job';
}

export interface CyberSale {
  _id: string;
  items: CyberSaleItem[];
  customerId?: string;
  total: number;
  method: PaymentMethod;
  soldAt: string;
}

export interface CyberSaleItem {
  kind: 'session' | 'service' | 'package' | 'product';
  refId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface CyberStaff {
  _id: string;
  name: string;
  role: string;
  phone: string;
  active: boolean;
}