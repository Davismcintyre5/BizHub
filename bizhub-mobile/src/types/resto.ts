import type { PaymentMethod } from './common';

export interface RestoMenuItem {
  _id: string;
  name: string;
  categoryId: string;
  description?: string;
  price: number;
  cost: number;
  available: boolean;
  imageUrl?: string;
  prepTimeMinutes?: number;
}

export interface RestoCategory {
  _id: string;
  name: string;
  order: number;
}

export interface RestoOrder {
  _id: string;
  orderNumber: string;
  type: 'dine_in' | 'takeaway' | 'delivery';
  tableId?: string;
  customerId?: string;
  items: RestoOrderItem[];
  subtotal: number;
  discount: number;
  tax: number;
  serviceCharge: number;
  total: number;
  status: 'open' | 'preparing' | 'ready' | 'served' | 'paid' | 'cancelled';
  paymentMethod?: PaymentMethod;
  notes?: string;
  createdAt: string;
  paidAt?: string;
}

export interface RestoOrderItem {
  menuItemId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  notes?: string;
}

export interface RestoTable {
  _id: string;
  label: string;
  capacity: number;
  status: 'available' | 'occupied' | 'reserved' | 'cleaning';
  currentOrderId?: string;
}

export interface RestoReservation {
  _id: string;
  customerName: string;
  phone: string;
  tableId?: string;
  partySize: number;
  reservedFor: string;
  status: 'pending' | 'confirmed' | 'seated' | 'no_show' | 'cancelled';
  notes?: string;
}

export interface RestoCustomer {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  totalOrders: number;
  loyaltyPoints: number;
}

export interface RestoStockItem {
  _id: string;
  name: string;
  unit: string;
  quantity: number;
  reorderLevel: number;
  costPerUnit: number;
}

export interface RestoSupplier {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  balance: number;
}

export interface RestoEmployee {
  _id: string;
  name: string;
  role: 'manager' | 'chef' | 'waiter' | 'cashier' | 'cleaner';
  phone: string;
  salary: number;
  active: boolean;
  hiredAt: string;
}

export interface RestoPayroll {
  _id: string;
  employeeId: string;
  periodStart: string;
  periodEnd: string;
  grossPay: number;
  deductions: number;
  netPay: number;
  paid: boolean;
  paidAt?: string;
}

export interface RestoExpense {
  _id: string;
  category: string;
  description: string;
  amount: number;
  method: PaymentMethod;
  incurredAt: string;
  receiptUrl?: string;
}

export interface RestoTransaction {
  _id: string;
  kind: 'sale' | 'expense' | 'payroll' | 'purchase' | 'other';
  amount: number;
  description: string;
  method: PaymentMethod;
  refId?: string;
  occurredAt: string;
}