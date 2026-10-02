import type { PaymentMethod } from './common';

export interface ElectroCategory {
  _id: string;
  name: string;
  parentId?: string;
}

export interface ElectroProduct {
  _id: string;
  name: string;
  sku: string;
  categoryId: string;
  brand?: string;
  model?: string;
  costPrice: number;
  sellingPrice: number;
  stock: number;
  reorderLevel: number;
  serialTracked: boolean;
  imageUrl?: string;
}

export interface ElectroSale {
  _id: string;
  items: ElectroSaleItem[];
  customerId?: string;
  total: number;
  discount: number;
  tax: number;
  method: PaymentMethod;
  soldAt: string;
}

export interface ElectroSaleItem {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  serials?: string[];
}

export interface ElectroRepair {
  _id: string;
  customerId: string;
  deviceName: string;
  serial?: string;
  issue: string;
  diagnosis?: string;
  status: 'received' | 'diagnosed' | 'in_progress' | 'awaiting_parts' | 'completed' | 'delivered';
  estimatedCost?: number;
  finalCost?: number;
  receivedAt: string;
  deliveredAt?: string;
}

export interface ElectroSupplier {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  balance: number;
}

export interface ElectroWarranty {
  _id: string;
  productId: string;
  saleId: string;
  customerId: string;
  serial?: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'claimed';
  notes?: string;
}

export interface ElectroStaff {
  _id: string;
  name: string;
  role: string;
  phone: string;
  active: boolean;
}