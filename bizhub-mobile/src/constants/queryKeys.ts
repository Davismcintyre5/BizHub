import type { ListParams } from '@/types';

export const qk = {
  auth: {
    me: ['auth', 'me'] as const,
    subscription: ['auth', 'subscription'] as const,
  },

  public: {
    settings: ['public', 'settings'] as const,
    plans: ['public', 'plans'] as const,
    legal: (type: string) => ['public', 'legal', type] as const,
    invoice: (invoiceNumber: string) =>
      ['public', 'invoice', invoiceNumber] as const,
    mpesaStatus: (checkoutRequestId: string) =>
      ['public', 'mpesa-status', checkoutRequestId] as const,
  },

  apartment: {
    properties: (p?: ListParams) => ['apartment', 'properties', p] as const,
    property: (id: string) => ['apartment', 'properties', id] as const,
    units: (p?: ListParams) => ['apartment', 'units', p] as const,
    unit: (id: string) => ['apartment', 'units', id] as const,
    tenants: (p?: ListParams) => ['apartment', 'tenants', p] as const,
    tenant: (id: string) => ['apartment', 'tenants', id] as const,
    leases: (p?: ListParams) => ['apartment', 'leases', p] as const,
    lease: (id: string) => ['apartment', 'leases', id] as const,
    payments: (p?: ListParams) => ['apartment', 'payments', p] as const,
    maintenance: (p?: ListParams) => ['apartment', 'maintenance', p] as const,
    staff: (p?: ListParams) => ['apartment', 'staff', p] as const,
    reports: (p?: ListParams) => ['apartment', 'reports', p] as const,
  },

  cyber: {
    computers: (p?: ListParams) => ['cyber', 'computers', p] as const,
    computer: (id: string) => ['cyber', 'computers', id] as const,
    sessions: (p?: ListParams) => ['cyber', 'sessions', p] as const,
    session: (id: string) => ['cyber', 'sessions', id] as const,
    customers: (p?: ListParams) => ['cyber', 'customers', p] as const,
    customer: (id: string) => ['cyber', 'customers', id] as const,
    packages: (p?: ListParams) => ['cyber', 'packages', p] as const,
    services: (p?: ListParams) => ['cyber', 'services', p] as const,
    sales: (p?: ListParams) => ['cyber', 'sales', p] as const,
    sale: (id: string) => ['cyber', 'sales', id] as const,
    staff: (p?: ListParams) => ['cyber', 'staff', p] as const,
    reports: (p?: ListParams) => ['cyber', 'reports', p] as const,
  },

  electro: {
    categories: (p?: ListParams) => ['electro', 'categories', p] as const,
    products: (p?: ListParams) => ['electro', 'products', p] as const,
    product: (id: string) => ['electro', 'products', id] as const,
    sales: (p?: ListParams) => ['electro', 'sales', p] as const,
    sale: (id: string) => ['electro', 'sales', id] as const,
    repairs: (p?: ListParams) => ['electro', 'repairs', p] as const,
    repair: (id: string) => ['electro', 'repairs', id] as const,
    suppliers: (p?: ListParams) => ['electro', 'suppliers', p] as const,
    warranties: (p?: ListParams) => ['electro', 'warranties', p] as const,
    staff: (p?: ListParams) => ['electro', 'staff', p] as const,
    reports: (p?: ListParams) => ['electro', 'reports', p] as const,
  },

  pharma: {
    categories: (p?: ListParams) => ['pharma', 'categories', p] as const,
    medicines: (p?: ListParams) => ['pharma', 'medicines', p] as const,
    medicine: (id: string) => ['pharma', 'medicines', id] as const,
    medicineByBarcode: (barcode: string) =>
      ['pharma', 'medicines', 'barcode', barcode] as const,
    expiryAlerts: (p?: ListParams) =>
      ['pharma', 'medicines', 'expiry', p] as const,
    sales: (p?: ListParams) => ['pharma', 'sales', p] as const,
    sale: (id: string) => ['pharma', 'sales', id] as const,
    prescriptions: (p?: ListParams) =>
      ['pharma', 'prescriptions', p] as const,
    prescription: (id: string) => ['pharma', 'prescriptions', id] as const,
    customers: (p?: ListParams) => ['pharma', 'customers', p] as const,
    suppliers: (p?: ListParams) => ['pharma', 'suppliers', p] as const,
    accounts: (p?: ListParams) => ['pharma', 'accounts', p] as const,
    staff: (p?: ListParams) => ['pharma', 'staff', p] as const,
    reports: (p?: ListParams) => ['pharma', 'reports', p] as const,
  },

  resto: {
    categories: (p?: ListParams) => ['resto', 'categories', p] as const,
    menuItems: (p?: ListParams) => ['resto', 'menu', p] as const,
    menuItem: (id: string) => ['resto', 'menu', id] as const,
    tables: (p?: ListParams) => ['resto', 'tables', p] as const,
    orders: (p?: ListParams) => ['resto', 'orders', p] as const,
    order: (id: string) => ['resto', 'orders', id] as const,
    reservations: (p?: ListParams) => ['resto', 'reservations', p] as const,
    customers: (p?: ListParams) => ['resto', 'customers', p] as const,
    stock: (p?: ListParams) => ['resto', 'stock', p] as const,
    suppliers: (p?: ListParams) => ['resto', 'suppliers', p] as const,
    employees: (p?: ListParams) => ['resto', 'employees', p] as const,
    payroll: (p?: ListParams) => ['resto', 'payroll', p] as const,
    expenses: (p?: ListParams) => ['resto', 'expenses', p] as const,
    transactions: (p?: ListParams) => ['resto', 'transactions', p] as const,
    reports: (p?: ListParams) => ['resto', 'reports', p] as const,
  },
} as const;