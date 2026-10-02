import type { PaymentMethod } from './common';

export interface PharmaCategory {
  _id: string;
  name: string;
  description?: string;
}

export interface PharmaMedicine {
  _id: string;
  name: string;
  genericName?: string;
  barcode?: string;
  categoryId: string;
  unit: 'tablet' | 'capsule' | 'bottle' | 'tube' | 'sachet' | 'pack';
  costPrice: number;
  sellingPrice: number;
  stock: number;
  reorderLevel: number;
  batchNumber?: string;
  expiryDate: string;
  supplierId?: string;
  prescriptionRequired: boolean;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PharmaSale {
  _id: string;
  items: PharmaSaleItem[];
  customerId?: string;
  prescriptionId?: string;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  method: PaymentMethod;
  soldAt: string;
}

export interface PharmaSaleItem {
  medicineId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface PharmaPrescription {
  _id: string;
  customerId: string;
  doctorName: string;
  doctorLicense?: string;
  diagnosis?: string;
  items: PharmaPrescriptionItem[];
  issuedAt: string;
  expiresAt?: string;
  status: 'open' | 'dispensed' | 'expired';
  imageUrl?: string;
}

export interface PharmaPrescriptionItem {
  medicineId: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  dispensed: boolean;
}

export interface PharmaCustomer {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  insuranceProvider?: string;
  insuranceNumber?: string;
  balance: number;
}

export interface PharmaSupplier {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  balance: number;
}

export interface PharmaAccount {
  _id: string;
  name: string;
  type: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
  balance: number;
}

export interface PharmaExpiryAlert {
  medicineId: string;
  name: string;
  batchNumber?: string;
  expiryDate: string;
  daysRemaining: number;
  stock: number;
}

export interface PharmaAiQuery {
  prompt: string;
  context?: Record<string, unknown>;
}

export interface PharmaAiResponse {
  answer: string;
  sources?: string[];
  confidence?: number;
}

export interface PharmaStaff {
  _id: string;
  name: string;
  role: string;
  phone: string;
  licenseNumber?: string;
  active: boolean;
}