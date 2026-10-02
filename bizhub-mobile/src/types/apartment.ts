import type { Address, PaymentMethod } from './common';

export interface ApartmentProperty {
  _id: string;
  name: string;
  address: Address;
  totalUnits: number;
  occupiedUnits: number;
  monthlyRevenue: number;
  createdAt: string;
  updatedAt: string;
}

export interface ApartmentUnit {
  _id: string;
  propertyId: string;
  unitNumber: string;
  type: 'studio' | '1br' | '2br' | '3br' | 'shop' | 'office';
  rent: number;
  deposit: number;
  status: 'vacant' | 'occupied' | 'maintenance';
  tenantId?: string;
}

export interface ApartmentTenant {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  idNumber?: string;
  unitId: string;
  moveInDate: string;
  moveOutDate?: string;
  status: 'active' | 'inactive' | 'evicted';
}

export interface ApartmentLease {
  _id: string;
  tenantId: string;
  unitId: string;
  startDate: string;
  endDate: string;
  rent: number;
  deposit: number;
  status: 'active' | 'expired' | 'terminated';
  documentUrl?: string;
}

export interface ApartmentPayment {
  _id: string;
  tenantId: string;
  unitId: string;
  amount: number;
  method: PaymentMethod;
  reference?: string;
  paidFor: string;
  paidAt: string;
  status: 'paid' | 'pending' | 'late';
}

export interface ApartmentMaintenance {
  _id: string;
  unitId: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  reportedAt: string;
  resolvedAt?: string;
  cost?: number;
}

export interface ApartmentStaff {
  _id: string;
  name: string;
  role: string;
  phone: string;
  email?: string;
  active: boolean;
}