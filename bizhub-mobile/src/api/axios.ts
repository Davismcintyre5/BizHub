import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import type {
  ApiResponse,
  Paginated,
  ListParams,
  AuthUser,
  AuthScope,
  Invoice,
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  MeResponse,
  ChangePasswordPayload,
  Settings,
  PublicPlan,
  PaymentMethodOption,
  StkPushPayload,
  StkPushResponse,
  MpesaStatusResponse,
  PaymentMethodsQuery,
  LegalDocument,
  ApartmentProperty,
  ApartmentUnit,
  ApartmentTenant,
  ApartmentLease,
  ApartmentPayment,
  ApartmentMaintenance,
  ApartmentStaff,
  CyberComputer,
  CyberSession,
  CyberCustomer,
  CyberPackage,
  CyberService,
  CyberSale,
  CyberStaff,
  ElectroCategory,
  ElectroProduct,
  ElectroSale,
  ElectroRepair,
  ElectroSupplier,
  ElectroWarranty,
  ElectroStaff,
  PharmaCategory,
  PharmaMedicine,
  PharmaSale,
  PharmaPrescription,
  PharmaCustomer,
  PharmaSupplier,
  PharmaAccount,
  PharmaExpiryAlert,
  PharmaAiQuery,
  PharmaAiResponse,
  PharmaStaff,
  RestoMenuItem,
  RestoCategory,
  RestoOrder,
  RestoTable,
  RestoReservation,
  RestoCustomer,
  RestoStockItem,
  RestoSupplier,
  RestoEmployee,
  RestoPayroll,
  RestoExpense,
  RestoTransaction,
} from '@/types';

const API_URL =
  (Constants.expoConfig?.extra?.apiUrl as string | undefined) ??
  'https://bizhubserver.pxxl.click/api';

export const SOCKET_URL =
  (Constants.expoConfig?.extra?.socketUrl as string | undefined) ??
  'https://bizhubserver.pxxl.click';

export const TOKEN_KEYS = {
  token: 'token',
  user: 'user',
  invoice: 'invoice',
  scope: 'scope',
} as const;

export const storage = {
  async get(key: string): Promise<string | null> {
    try {
      return Platform.OS === 'web'
        ? AsyncStorage.getItem(key)
        : SecureStore.getItemAsync(key);
    } catch {
      return null;
    }
  },
  async set(key: string, value: string): Promise<void> {
    try {
      if (Platform.OS === 'web') await AsyncStorage.setItem(key, value);
      else await SecureStore.setItemAsync(key, value);
    } catch {}
  },
  async remove(key: string): Promise<void> {
    try {
      if (Platform.OS === 'web') await AsyncStorage.removeItem(key);
      else await SecureStore.deleteItemAsync(key);
    } catch {}
  },
};

export type AuthEvent =
  | { type: 'UNAUTHENTICATED' }
  | {
      type: 'SUBSCRIPTION_EXPIRED';
      user?: AuthUser;
      invoice?: Invoice;
      scope?: AuthScope;
    }
  | {
      type: 'SUBSCRIPTION_REFRESHED';
      token: string;
      user: AuthUser;
      invoice?: Invoice;
      scope?: AuthScope;
    };

let emitAuthEvent: (event: AuthEvent) => void = () => {};

export function bindAuthEmitter(fn: (event: AuthEvent) => void): void {
  emitAuthEvent = fn;
}

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
});

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      const token = await storage.get(TOKEN_KEYS.token);
      if (token) config.headers.Authorization = `Bearer ${token}`;
    } catch {}
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<{ data?: Record<string, unknown> }>) => {
    const status = error.response?.status;
    const data = error.response?.data?.data as
      | {
          token?: string;
          user?: AuthUser;
          invoice?: Invoice;
          scope?: AuthScope;
        }
      | undefined;

    if (status === 401) {
      await storage.remove(TOKEN_KEYS.token);
      await storage.remove(TOKEN_KEYS.user);
      await storage.remove(TOKEN_KEYS.invoice);
      await storage.remove(TOKEN_KEYS.scope);
      emitAuthEvent({ type: 'UNAUTHENTICATED' });
    }

    if (status === 402 && data?.token && data.user) {
      await storage.set(TOKEN_KEYS.token, data.token);
      await storage.set(TOKEN_KEYS.user, JSON.stringify(data.user));
      if (data.invoice)
        await storage.set(TOKEN_KEYS.invoice, JSON.stringify(data.invoice));
      if (data.scope) await storage.set(TOKEN_KEYS.scope, data.scope);

      emitAuthEvent({
        type: 'SUBSCRIPTION_REFRESHED',
        token: data.token,
        user: data.user,
        invoice: data.invoice,
        scope: data.scope,
      });
    }

    if (status === 402 && !data?.token) {
      emitAuthEvent({
        type: 'SUBSCRIPTION_EXPIRED',
        user: data?.user,
        invoice: data?.invoice,
        scope: data?.scope,
      });
    }

    return Promise.reject(error);
  }
);

export default api;

export const authApi = {
  login: (data: LoginPayload) =>
    api.post<ApiResponse<LoginResponse>>('/farm/auth/login', data),
  register: (data: RegisterPayload) =>
    api.post<ApiResponse<LoginResponse>>('/farm/auth/register', data),
  me: () => api.get<ApiResponse<MeResponse>>('/farm/auth/me'),
  updateProfile: (data: Partial<AuthUser>) =>
    api.put<ApiResponse<AuthUser>>('/farm/auth/profile', data),
  changePassword: (data: ChangePasswordPayload) =>
    api.put<ApiResponse<null>>('/farm/auth/change-password', data),
  forgotPassword: (email: string) =>
    api.post<ApiResponse<null>>('/farm/auth/forgot-password', { email }),
  resetPassword: (token: string, password: string) =>
    api.post<ApiResponse<null>>(`/farm/auth/reset-password/${token}`, {
      password,
    }),
  verifyEmail: (token: string) =>
    api.post<ApiResponse<null>>(`/farm/auth/verify-email/${token}`, {}),
  resendVerification: () =>
    api.post<ApiResponse<null>>('/farm/auth/resend-verification', {}),
};

export const publicApi = {
  getSettings: () => api.get<ApiResponse<Settings>>('/admin/public/settings'),
  getLegal: (type: string) =>
    api.get<ApiResponse<LegalDocument>>(`/public/legal/${type}`),
  getPlans: () => api.get<ApiResponse<PublicPlan[]>>('/public/plans'),
  getInvoice: (invoiceNumber: string) =>
    api.get<ApiResponse<Invoice>>(`/public/payment/invoice/${invoiceNumber}`),
  payStkInvoice: (data: StkPushPayload) =>
    api.post<ApiResponse<StkPushResponse>>('/public/payment/stk-invoice', data),
  checkMpesaStatus: (checkoutRequestId: string) =>
    api.get<ApiResponse<MpesaStatusResponse>>(
      `/public/payment/mpesa-status/${checkoutRequestId}`
    ),
  getPaymentMethods: (params?: PaymentMethodsQuery) =>
    api.get<ApiResponse<PaymentMethodOption[]>>('/public/payment/methods', {
      params,
    }),
};

export const apartmentApi = {
  getProperties: (params?: ListParams) =>
    api.get<ApiResponse<Paginated<ApartmentProperty>>>(
      '/apartment/properties',
      { params }
    ),
  getProperty: (id: string) =>
    api.get<ApiResponse<ApartmentProperty>>(`/apartment/properties/${id}`),
  createProperty: (data: Partial<ApartmentProperty>) =>
    api.post<ApiResponse<ApartmentProperty>>('/apartment/properties', data),
  updateProperty: (id: string, data: Partial<ApartmentProperty>) =>
    api.put<ApiResponse<ApartmentProperty>>(
      `/apartment/properties/${id}`,
      data
    ),
  deleteProperty: (id: string) =>
    api.delete<ApiResponse<null>>(`/apartment/properties/${id}`),

  getUnits: (params?: ListParams) =>
    api.get<ApiResponse<Paginated<ApartmentUnit>>>('/apartment/units', {
      params,
    }),
  getUnit: (id: string) =>
    api.get<ApiResponse<ApartmentUnit>>(`/apartment/units/${id}`),
  createUnit: (data: Partial<ApartmentUnit>) =>
    api.post<ApiResponse<ApartmentUnit>>('/apartment/units', data),
  updateUnit: (id: string, data: Partial<ApartmentUnit>) =>
    api.put<ApiResponse<ApartmentUnit>>(`/apartment/units/${id}`, data),
  deleteUnit: (id: string) =>
    api.delete<ApiResponse<null>>(`/apartment/units/${id}`),

  getTenants: (params?: ListParams) =>
    api.get<ApiResponse<Paginated<ApartmentTenant>>>('/apartment/tenants', {
      params,
    }),
  getTenant: (id: string) =>
    api.get<ApiResponse<ApartmentTenant>>(`/apartment/tenants/${id}`),
  createTenant: (data: Partial<ApartmentTenant>) =>
    api.post<ApiResponse<ApartmentTenant>>('/apartment/tenants', data),
  updateTenant: (id: string, data: Partial<ApartmentTenant>) =>
    api.put<ApiResponse<ApartmentTenant>>(`/apartment/tenants/${id}`, data),
  deleteTenant: (id: string) =>
    api.delete<ApiResponse<null>>(`/apartment/tenants/${id}`),

  getLeases: (params?: ListParams) =>
    api.get<ApiResponse<Paginated<ApartmentLease>>>('/apartment/leases', {
      params,
    }),
  getLease: (id: string) =>
    api.get<ApiResponse<ApartmentLease>>(`/apartment/leases/${id}`),
  createLease: (data: Partial<ApartmentLease>) =>
    api.post<ApiResponse<ApartmentLease>>('/apartment/leases', data),
  updateLease: (id: string, data: Partial<ApartmentLease>) =>
    api.put<ApiResponse<ApartmentLease>>(`/apartment/leases/${id}`, data),

  getPayments: (params?: ListParams) =>
    api.get<ApiResponse<Paginated<ApartmentPayment>>>('/apartment/payments', {
      params,
    }),
  createPayment: (data: Partial<ApartmentPayment>) =>
    api.post<ApiResponse<ApartmentPayment>>('/apartment/payments', data),
  deletePayment: (id: string) =>
    api.delete<ApiResponse<null>>(`/apartment/payments/${id}`),

  getMaintenance: (params?: ListParams) =>
    api.get<ApiResponse<Paginated<ApartmentMaintenance>>>(
      '/apartment/maintenance',
      { params }
    ),
  createMaintenance: (data: Partial<ApartmentMaintenance>) =>
    api.post<ApiResponse<ApartmentMaintenance>>(
      '/apartment/maintenance',
      data
    ),
  updateMaintenance: (id: string, data: Partial<ApartmentMaintenance>) =>
    api.put<ApiResponse<ApartmentMaintenance>>(
      `/apartment/maintenance/${id}`,
      data
    ),

  getStaff: (params?: ListParams) =>
    api.get<ApiResponse<Paginated<ApartmentStaff>>>('/apartment/staff', {
      params,
    }),
  createStaff: (data: Partial<ApartmentStaff>) =>
    api.post<ApiResponse<ApartmentStaff>>('/apartment/staff', data),
  updateStaff: (id: string, data: Partial<ApartmentStaff>) =>
    api.put<ApiResponse<ApartmentStaff>>(`/apartment/staff/${id}`, data),
  deleteStaff: (id: string) =>
    api.delete<ApiResponse<null>>(`/apartment/staff/${id}`),

  getReports: (params?: ListParams) =>
    api.get<ApiResponse<Record<string, unknown>>>('/apartment/reports', {
      params,
    }),
};

export const cyberApi = {
  getComputers: (params?: ListParams) =>
    api.get<ApiResponse<Paginated<CyberComputer>>>('/cyber/computers', {
      params,
    }),
  getComputer: (id: string) =>
    api.get<ApiResponse<CyberComputer>>(`/cyber/computers/${id}`),
  createComputer: (data: Partial<CyberComputer>) =>
    api.post<ApiResponse<CyberComputer>>('/cyber/computers', data),
  updateComputer: (id: string, data: Partial<CyberComputer>) =>
    api.put<ApiResponse<CyberComputer>>(`/cyber/computers/${id}`, data),
  deleteComputer: (id: string) =>
    api.delete<ApiResponse<null>>(`/cyber/computers/${id}`),

  getSessions: (params?: ListParams) =>
    api.get<ApiResponse<Paginated<CyberSession>>>('/cyber/sessions', {
      params,
    }),
  getSession: (id: string) =>
    api.get<ApiResponse<CyberSession>>(`/cyber/sessions/${id}`),
  startSession: (data: Partial<CyberSession>) =>
    api.post<ApiResponse<CyberSession>>('/cyber/sessions', data),
  endSession: (id: string) =>
    api.put<ApiResponse<CyberSession>>(`/cyber/sessions/${id}/end`, {}),
  cancelSession: (id: string) =>
    api.put<ApiResponse<CyberSession>>(`/cyber/sessions/${id}/cancel`, {}),

  getCustomers: (params?: ListParams) =>
    api.get<ApiResponse<Paginated<CyberCustomer>>>('/cyber/customers', {
      params,
    }),
  getCustomer: (id: string) =>
    api.get<ApiResponse<CyberCustomer>>(`/cyber/customers/${id}`),
  createCustomer: (data: Partial<CyberCustomer>) =>
    api.post<ApiResponse<CyberCustomer>>('/cyber/customers', data),
  updateCustomer: (id: string, data: Partial<CyberCustomer>) =>
    api.put<ApiResponse<CyberCustomer>>(`/cyber/customers/${id}`, data),

  getPackages: (params?: ListParams) =>
    api.get<ApiResponse<Paginated<CyberPackage>>>('/cyber/packages', {
      params,
    }),
  createPackage: (data: Partial<CyberPackage>) =>
    api.post<ApiResponse<CyberPackage>>('/cyber/packages', data),
  updatePackage: (id: string, data: Partial<CyberPackage>) =>
    api.put<ApiResponse<CyberPackage>>(`/cyber/packages/${id}`, data),
  deletePackage: (id: string) =>
    api.delete<ApiResponse<null>>(`/cyber/packages/${id}`),

  getServices: (params?: ListParams) =>
    api.get<ApiResponse<Paginated<CyberService>>>('/cyber/services', {
      params,
    }),
  createService: (data: Partial<CyberService>) =>
    api.post<ApiResponse<CyberService>>('/cyber/services', data),
  updateService: (id: string, data: Partial<CyberService>) =>
    api.put<ApiResponse<CyberService>>(`/cyber/services/${id}`, data),
  deleteService: (id: string) =>
    api.delete<ApiResponse<null>>(`/cyber/services/${id}`),

  getSales: (params?: ListParams) =>
    api.get<ApiResponse<Paginated<CyberSale>>>('/cyber/sales', { params }),
  getSale: (id: string) =>
    api.get<ApiResponse<CyberSale>>(`/cyber/sales/${id}`),
  createSale: (data: Partial<CyberSale>) =>
    api.post<ApiResponse<CyberSale>>('/cyber/sales', data),

  getStaff: (params?: ListParams) =>
    api.get<ApiResponse<Paginated<CyberStaff>>>('/cyber/staff', { params }),
  createStaff: (data: Partial<CyberStaff>) =>
    api.post<ApiResponse<CyberStaff>>('/cyber/staff', data),
  updateStaff: (id: string, data: Partial<CyberStaff>) =>
    api.put<ApiResponse<CyberStaff>>(`/cyber/staff/${id}`, data),
  deleteStaff: (id: string) =>
    api.delete<ApiResponse<null>>(`/cyber/staff/${id}`),

  getReports: (params?: ListParams) =>
    api.get<ApiResponse<Record<string, unknown>>>('/cyber/reports', {
      params,
    }),
};

export const electroApi = {
  getCategories: (params?: ListParams) =>
    api.get<ApiResponse<Paginated<ElectroCategory>>>('/electro/categories', {
      params,
    }),
  createCategory: (data: Partial<ElectroCategory>) =>
    api.post<ApiResponse<ElectroCategory>>('/electro/categories', data),
  updateCategory: (id: string, data: Partial<ElectroCategory>) =>
    api.put<ApiResponse<ElectroCategory>>(
      `/electro/categories/${id}`,
      data
    ),
  deleteCategory: (id: string) =>
    api.delete<ApiResponse<null>>(`/electro/categories/${id}`),

  getProducts: (params?: ListParams) =>
    api.get<ApiResponse<Paginated<ElectroProduct>>>('/electro/products', {
      params,
    }),
  getProduct: (id: string) =>
    api.get<ApiResponse<ElectroProduct>>(`/electro/products/${id}`),
  createProduct: (data: Partial<ElectroProduct>) =>
    api.post<ApiResponse<ElectroProduct>>('/electro/products', data),
  updateProduct: (id: string, data: Partial<ElectroProduct>) =>
    api.put<ApiResponse<ElectroProduct>>(`/electro/products/${id}`, data),
  deleteProduct: (id: string) =>
    api.delete<ApiResponse<null>>(`/electro/products/${id}`),

  getSales: (params?: ListParams) =>
    api.get<ApiResponse<Paginated<ElectroSale>>>('/electro/sales', {
      params,
    }),
  getSale: (id: string) =>
    api.get<ApiResponse<ElectroSale>>(`/electro/sales/${id}`),
  createSale: (data: Partial<ElectroSale>) =>
    api.post<ApiResponse<ElectroSale>>('/electro/sales', data),
  deleteSale: (id: string) =>
    api.delete<ApiResponse<null>>(`/electro/sales/${id}`),

  getRepairs: (params?: ListParams) =>
    api.get<ApiResponse<Paginated<ElectroRepair>>>('/electro/repairs', {
      params,
    }),
  getRepair: (id: string) =>
    api.get<ApiResponse<ElectroRepair>>(`/electro/repairs/${id}`),
  createRepair: (data: Partial<ElectroRepair>) =>
    api.post<ApiResponse<ElectroRepair>>('/electro/repairs', data),
  updateRepair: (id: string, data: Partial<ElectroRepair>) =>
    api.put<ApiResponse<ElectroRepair>>(`/electro/repairs/${id}`, data),

  getSuppliers: (params?: ListParams) =>
    api.get<ApiResponse<Paginated<ElectroSupplier>>>('/electro/suppliers', {
      params,
    }),
  createSupplier: (data: Partial<ElectroSupplier>) =>
    api.post<ApiResponse<ElectroSupplier>>('/electro/suppliers', data),
  updateSupplier: (id: string, data: Partial<ElectroSupplier>) =>
    api.put<ApiResponse<ElectroSupplier>>(
      `/electro/suppliers/${id}`,
      data
    ),
  deleteSupplier: (id: string) =>
    api.delete<ApiResponse<null>>(`/electro/suppliers/${id}`),

  getWarranties: (params?: ListParams) =>
    api.get<ApiResponse<Paginated<ElectroWarranty>>>('/electro/warranties', {
      params,
    }),
  createWarranty: (data: Partial<ElectroWarranty>) =>
    api.post<ApiResponse<ElectroWarranty>>('/electro/warranties', data),
  updateWarranty: (id: string, data: Partial<ElectroWarranty>) =>
    api.put<ApiResponse<ElectroWarranty>>(
      `/electro/warranties/${id}`,
      data
    ),

  getStaff: (params?: ListParams) =>
    api.get<ApiResponse<Paginated<ElectroStaff>>>('/electro/staff', {
      params,
    }),
  createStaff: (data: Partial<ElectroStaff>) =>
    api.post<ApiResponse<ElectroStaff>>('/electro/staff', data),
  updateStaff: (id: string, data: Partial<ElectroStaff>) =>
    api.put<ApiResponse<ElectroStaff>>(`/electro/staff/${id}`, data),
  deleteStaff: (id: string) =>
    api.delete<ApiResponse<null>>(`/electro/staff/${id}`),

  getReports: (params?: ListParams) =>
    api.get<ApiResponse<Record<string, unknown>>>('/electro/reports', {
      params,
    }),
};

export const pharmaApi = {
  getCategories: (params?: ListParams) =>
    api.get<ApiResponse<Paginated<PharmaCategory>>>('/pharma/categories', {
      params,
    }),
  createCategory: (data: Partial<PharmaCategory>) =>
    api.post<ApiResponse<PharmaCategory>>('/pharma/categories', data),
  updateCategory: (id: string, data: Partial<PharmaCategory>) =>
    api.put<ApiResponse<PharmaCategory>>(`/pharma/categories/${id}`, data),
  deleteCategory: (id: string) =>
    api.delete<ApiResponse<null>>(`/pharma/categories/${id}`),

  getMedicines: (params?: ListParams) =>
    api.get<ApiResponse<Paginated<PharmaMedicine>>>('/pharma/medicines', {
      params,
    }),
  getMedicine: (id: string) =>
    api.get<ApiResponse<PharmaMedicine>>(`/pharma/medicines/${id}`),
  getMedicineByBarcode: (barcode: string) =>
    api.get<ApiResponse<PharmaMedicine>>(
      `/pharma/medicines/barcode/${barcode}`
    ),
  createMedicine: (data: Partial<PharmaMedicine>) =>
    api.post<ApiResponse<PharmaMedicine>>('/pharma/medicines', data),
  updateMedicine: (id: string, data: Partial<PharmaMedicine>) =>
    api.put<ApiResponse<PharmaMedicine>>(`/pharma/medicines/${id}`, data),
  deleteMedicine: (id: string) =>
    api.delete<ApiResponse<null>>(`/pharma/medicines/${id}`),

  getExpiryAlerts: (params?: ListParams) =>
    api.get<ApiResponse<PharmaExpiryAlert[]>>('/pharma/medicines/expiry', {
      params,
    }),

  getSales: (params?: ListParams) =>
    api.get<ApiResponse<Paginated<PharmaSale>>>('/pharma/sales', { params }),
  getSale: (id: string) =>
    api.get<ApiResponse<PharmaSale>>(`/pharma/sales/${id}`),
  createSale: (data: Partial<PharmaSale>) =>
    api.post<ApiResponse<PharmaSale>>('/pharma/sales', data),
  deleteSale: (id: string) =>
    api.delete<ApiResponse<null>>(`/pharma/sales/${id}`),

  getPrescriptions: (params?: ListParams) =>
    api.get<ApiResponse<Paginated<PharmaPrescription>>>(
      '/pharma/prescriptions',
      { params }
    ),
  getPrescription: (id: string) =>
    api.get<ApiResponse<PharmaPrescription>>(`/pharma/prescriptions/${id}`),
  createPrescription: (data: Partial<PharmaPrescription>) =>
    api.post<ApiResponse<PharmaPrescription>>('/pharma/prescriptions', data),
  updatePrescription: (id: string, data: Partial<PharmaPrescription>) =>
    api.put<ApiResponse<PharmaPrescription>>(
      `/pharma/prescriptions/${id}`,
      data
    ),

  getCustomers: (params?: ListParams) =>
    api.get<ApiResponse<Paginated<PharmaCustomer>>>('/pharma/customers', {
      params,
    }),
  createCustomer: (data: Partial<PharmaCustomer>) =>
    api.post<ApiResponse<PharmaCustomer>>('/pharma/customers', data),
  updateCustomer: (id: string, data: Partial<PharmaCustomer>) =>
    api.put<ApiResponse<PharmaCustomer>>(
      `/pharma/customers/${id}`,
      data
    ),

  getSuppliers: (params?: ListParams) =>
    api.get<ApiResponse<Paginated<PharmaSupplier>>>('/pharma/suppliers', {
      params,
    }),
  createSupplier: (data: Partial<PharmaSupplier>) =>
    api.post<ApiResponse<PharmaSupplier>>('/pharma/suppliers', data),
  updateSupplier: (id: string, data: Partial<PharmaSupplier>) =>
    api.put<ApiResponse<PharmaSupplier>>(`/pharma/suppliers/${id}`, data),
  deleteSupplier: (id: string) =>
    api.delete<ApiResponse<null>>(`/pharma/suppliers/${id}`),

  getAccounts: (params?: ListParams) =>
    api.get<ApiResponse<Paginated<PharmaAccount>>>('/pharma/accounts', {
      params,
    }),
  createAccount: (data: Partial<PharmaAccount>) =>
    api.post<ApiResponse<PharmaAccount>>('/pharma/accounts', data),
  updateAccount: (id: string, data: Partial<PharmaAccount>) =>
    api.put<ApiResponse<PharmaAccount>>(`/pharma/accounts/${id}`, data),

  getStaff: (params?: ListParams) =>
    api.get<ApiResponse<Paginated<PharmaStaff>>>('/pharma/staff', {
      params,
    }),
  createStaff: (data: Partial<PharmaStaff>) =>
    api.post<ApiResponse<PharmaStaff>>('/pharma/staff', data),
  updateStaff: (id: string, data: Partial<PharmaStaff>) =>
    api.put<ApiResponse<PharmaStaff>>(`/pharma/staff/${id}`, data),
  deleteStaff: (id: string) =>
    api.delete<ApiResponse<null>>(`/pharma/staff/${id}`),

  aiQuery: (data: PharmaAiQuery) =>
    api.post<ApiResponse<PharmaAiResponse>>('/pharma/ai/query', data),

  getReports: (params?: ListParams) =>
    api.get<ApiResponse<Record<string, unknown>>>('/pharma/reports', {
      params,
    }),
};

export const restoApi = {
  getCategories: (params?: ListParams) =>
    api.get<ApiResponse<Paginated<RestoCategory>>>('/resto/categories', {
      params,
    }),
  createCategory: (data: Partial<RestoCategory>) =>
    api.post<ApiResponse<RestoCategory>>('/resto/categories', data),
  updateCategory: (id: string, data: Partial<RestoCategory>) =>
    api.put<ApiResponse<RestoCategory>>(`/resto/categories/${id}`, data),
  deleteCategory: (id: string) =>
    api.delete<ApiResponse<null>>(`/resto/categories/${id}`),

  getMenuItems: (params?: ListParams) =>
    api.get<ApiResponse<Paginated<RestoMenuItem>>>('/resto/menu', { params }),
  getMenuItem: (id: string) =>
    api.get<ApiResponse<RestoMenuItem>>(`/resto/menu/${id}`),
  createMenuItem: (data: Partial<RestoMenuItem>) =>
    api.post<ApiResponse<RestoMenuItem>>('/resto/menu', data),
  updateMenuItem: (id: string, data: Partial<RestoMenuItem>) =>
    api.put<ApiResponse<RestoMenuItem>>(`/resto/menu/${id}`, data),
  deleteMenuItem: (id: string) =>
    api.delete<ApiResponse<null>>(`/resto/menu/${id}`),

  getTables: (params?: ListParams) =>
    api.get<ApiResponse<Paginated<RestoTable>>>('/resto/tables', { params }),
  updateTable: (id: string, data: Partial<RestoTable>) =>
    api.put<ApiResponse<RestoTable>>(`/resto/tables/${id}`, data),

  getOrders: (params?: ListParams) =>
    api.get<ApiResponse<Paginated<RestoOrder>>>('/resto/orders', { params }),
  getOrder: (id: string) =>
    api.get<ApiResponse<RestoOrder>>(`/resto/orders/${id}`),
  createOrder: (data: Partial<RestoOrder>) =>
    api.post<ApiResponse<RestoOrder>>('/resto/orders', data),
  updateOrder: (id: string, data: Partial<RestoOrder>) =>
    api.put<ApiResponse<RestoOrder>>(`/resto/orders/${id}`, data),
  updateOrderStatus: (id: string, status: RestoOrder['status']) =>
    api.put<ApiResponse<RestoOrder>>(`/resto/orders/${id}/status`, { status }),
  deleteOrder: (id: string) =>
    api.delete<ApiResponse<null>>(`/resto/orders/${id}`),

  getReservations: (params?: ListParams) =>
    api.get<ApiResponse<Paginated<RestoReservation>>>(
      '/resto/reservations',
      { params }
    ),
  createReservation: (data: Partial<RestoReservation>) =>
    api.post<ApiResponse<RestoReservation>>('/resto/reservations', data),
  updateReservation: (id: string, data: Partial<RestoReservation>) =>
    api.put<ApiResponse<RestoReservation>>(
      `/resto/reservations/${id}`,
      data
    ),

  getCustomers: (params?: ListParams) =>
    api.get<ApiResponse<Paginated<RestoCustomer>>>('/resto/customers', {
      params,
    }),
  createCustomer: (data: Partial<RestoCustomer>) =>
    api.post<ApiResponse<RestoCustomer>>('/resto/customers', data),
  updateCustomer: (id: string, data: Partial<RestoCustomer>) =>
    api.put<ApiResponse<RestoCustomer>>(`/resto/customers/${id}`, data),

  getStock: (params?: ListParams) =>
    api.get<ApiResponse<Paginated<RestoStockItem>>>('/resto/stock', {
      params,
    }),
  createStockItem: (data: Partial<RestoStockItem>) =>
    api.post<ApiResponse<RestoStockItem>>('/resto/stock', data),
  updateStockItem: (id: string, data: Partial<RestoStockItem>) =>
    api.put<ApiResponse<RestoStockItem>>(`/resto/stock/${id}`, data),
  deleteStockItem: (id: string) =>
    api.delete<ApiResponse<null>>(`/resto/stock/${id}`),

  getSuppliers: (params?: ListParams) =>
    api.get<ApiResponse<Paginated<RestoSupplier>>>('/resto/suppliers', {
      params,
    }),
  createSupplier: (data: Partial<RestoSupplier>) =>
    api.post<ApiResponse<RestoSupplier>>('/resto/suppliers', data),
  updateSupplier: (id: string, data: Partial<RestoSupplier>) =>
    api.put<ApiResponse<RestoSupplier>>(`/resto/suppliers/${id}`, data),

  getEmployees: (params?: ListParams) =>
    api.get<ApiResponse<Paginated<RestoEmployee>>>('/resto/employees', {
      params,
    }),
  createEmployee: (data: Partial<RestoEmployee>) =>
    api.post<ApiResponse<RestoEmployee>>('/resto/employees', data),
  updateEmployee: (id: string, data: Partial<RestoEmployee>) =>
    api.put<ApiResponse<RestoEmployee>>(`/resto/employees/${id}`, data),
  deleteEmployee: (id: string) =>
    api.delete<ApiResponse<null>>(`/resto/employees/${id}`),

  getPayroll: (params?: ListParams) =>
    api.get<ApiResponse<Paginated<RestoPayroll>>>('/resto/payroll', {
      params,
    }),
  createPayroll: (data: Partial<RestoPayroll>) =>
    api.post<ApiResponse<RestoPayroll>>('/resto/payroll', data),
  markPayrollPaid: (id: string) =>
    api.put<ApiResponse<RestoPayroll>>(`/resto/payroll/${id}/paid`, {}),

  getExpenses: (params?: ListParams) =>
    api.get<ApiResponse<Paginated<RestoExpense>>>('/resto/expenses', {
      params,
    }),
  createExpense: (data: Partial<RestoExpense>) =>
    api.post<ApiResponse<RestoExpense>>('/resto/expenses', data),
  deleteExpense: (id: string) =>
    api.delete<ApiResponse<null>>(`/resto/expenses/${id}`),

  getTransactions: (params?: ListParams) =>
    api.get<ApiResponse<Paginated<RestoTransaction>>>(
      '/resto/transactions',
      { params }
    ),

  getReports: (params?: ListParams) =>
    api.get<ApiResponse<Record<string, unknown>>>('/resto/reports', {
      params,
    }),
};