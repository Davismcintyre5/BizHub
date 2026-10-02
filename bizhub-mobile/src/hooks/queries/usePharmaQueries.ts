import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { pharmaApi } from '@/api/axios';
import { qk } from '@/constants/queryKeys';
import type {
  ListParams,
  PharmaAccount,
  PharmaAiQuery,
  PharmaCategory,
  PharmaCustomer,
  PharmaMedicine,
  PharmaPrescription,
  PharmaSale,
  PharmaStaff,
  PharmaSupplier,
} from '@/types';
import { useUi } from '@/stores/uiStore';
import { parseApiError } from '@/hooks/useApiError';

export function usePharmaCategories(params?: ListParams) {
  return useQuery({
    queryKey: qk.pharma.categories(params),
    queryFn: async () => (await pharmaApi.getCategories(params)).data.data,
  });
}

export function useCreatePharmaCategory() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (data: Partial<PharmaCategory>) =>
      (await pharmaApi.createCategory(data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['pharma', 'categories'] });
      pushToast({ kind: 'success', title: 'Category created' });
    },
  });
}

export function useUpdatePharmaCategory() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (args: { id: string; data: Partial<PharmaCategory> }) =>
      (await pharmaApi.updateCategory(args.id, args.data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['pharma', 'categories'] });
      pushToast({ kind: 'success', title: 'Category updated' });
    },
  });
}

export function useDeletePharmaCategory() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (id: string) =>
      (await pharmaApi.deleteCategory(id)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['pharma', 'categories'] });
      pushToast({ kind: 'success', title: 'Category deleted' });
    },
  });
}

export function useMedicines(params?: ListParams) {
  return useQuery({
    queryKey: qk.pharma.medicines(params),
    queryFn: async () => (await pharmaApi.getMedicines(params)).data.data,
  });
}

export function useMedicine(id: string) {
  return useQuery({
    queryKey: qk.pharma.medicine(id),
    queryFn: async () => (await pharmaApi.getMedicine(id)).data.data,
    enabled: !!id,
  });
}

export function useMedicineByBarcode(barcode: string) {
  return useQuery({
    queryKey: qk.pharma.medicineByBarcode(barcode),
    queryFn: async () =>
      (await pharmaApi.getMedicineByBarcode(barcode)).data.data,
    enabled: !!barcode,
  });
}

export function useCreateMedicine() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (data: Partial<PharmaMedicine>) =>
      (await pharmaApi.createMedicine(data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['pharma', 'medicines'] });
      pushToast({ kind: 'success', title: 'Medicine added' });
    },
    onError: (e) =>
      pushToast({
        kind: 'error',
        title: 'Error',
        message: parseApiError(e).message,
      }),
  });
}

export function useUpdateMedicine() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (args: {
      id: string;
      data: Partial<PharmaMedicine>;
    }) => (await pharmaApi.updateMedicine(args.id, args.data)).data.data,
    onSuccess: (_, vars) => {
      void qc.invalidateQueries({ queryKey: ['pharma', 'medicines'] });
      void qc.invalidateQueries({ queryKey: qk.pharma.medicine(vars.id) });
      pushToast({ kind: 'success', title: 'Medicine updated' });
    },
  });
}

export function useDeleteMedicine() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (id: string) =>
      (await pharmaApi.deleteMedicine(id)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['pharma', 'medicines'] });
      pushToast({ kind: 'success', title: 'Medicine deleted' });
    },
  });
}

export function useExpiryAlerts(params?: ListParams) {
  return useQuery({
    queryKey: qk.pharma.expiryAlerts(params),
    queryFn: async () => (await pharmaApi.getExpiryAlerts(params)).data.data,
  });
}

export function usePharmaSales(params?: ListParams) {
  return useQuery({
    queryKey: qk.pharma.sales(params),
    queryFn: async () => (await pharmaApi.getSales(params)).data.data,
  });
}

export function usePharmaSale(id: string) {
  return useQuery({
    queryKey: qk.pharma.sale(id),
    queryFn: async () => (await pharmaApi.getSale(id)).data.data,
    enabled: !!id,
  });
}

export function useCreatePharmaSale() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (data: Partial<PharmaSale>) =>
      (await pharmaApi.createSale(data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['pharma', 'sales'] });
      void qc.invalidateQueries({ queryKey: ['pharma', 'medicines'] });
      pushToast({ kind: 'success', title: 'Sale recorded' });
    },
    onError: (e) =>
      pushToast({
        kind: 'error',
        title: 'Error',
        message: parseApiError(e).message,
      }),
  });
}

export function useDeletePharmaSale() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (id: string) =>
      (await pharmaApi.deleteSale(id)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['pharma', 'sales'] });
      pushToast({ kind: 'success', title: 'Sale deleted' });
    },
  });
}

export function usePrescriptions(params?: ListParams) {
  return useQuery({
    queryKey: qk.pharma.prescriptions(params),
    queryFn: async () => (await pharmaApi.getPrescriptions(params)).data.data,
  });
}

export function usePrescription(id: string) {
  return useQuery({
    queryKey: qk.pharma.prescription(id),
    queryFn: async () => (await pharmaApi.getPrescription(id)).data.data,
    enabled: !!id,
  });
}

export function useCreatePrescription() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (data: Partial<PharmaPrescription>) =>
      (await pharmaApi.createPrescription(data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['pharma', 'prescriptions'] });
      pushToast({ kind: 'success', title: 'Prescription saved' });
    },
  });
}

export function useUpdatePrescription() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (args: {
      id: string;
      data: Partial<PharmaPrescription>;
    }) => (await pharmaApi.updatePrescription(args.id, args.data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['pharma', 'prescriptions'] });
      pushToast({ kind: 'success', title: 'Prescription updated' });
    },
  });
}

export function usePharmaCustomers(params?: ListParams) {
  return useQuery({
    queryKey: qk.pharma.customers(params),
    queryFn: async () => (await pharmaApi.getCustomers(params)).data.data,
  });
}

export function useCreatePharmaCustomer() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (data: Partial<PharmaCustomer>) =>
      (await pharmaApi.createCustomer(data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['pharma', 'customers'] });
      pushToast({ kind: 'success', title: 'Customer added' });
    },
  });
}

export function useUpdatePharmaCustomer() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (args: { id: string; data: Partial<PharmaCustomer> }) =>
      (await pharmaApi.updateCustomer(args.id, args.data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['pharma', 'customers'] });
      pushToast({ kind: 'success', title: 'Customer updated' });
    },
  });
}

export function usePharmaSuppliers(params?: ListParams) {
  return useQuery({
    queryKey: qk.pharma.suppliers(params),
    queryFn: async () => (await pharmaApi.getSuppliers(params)).data.data,
  });
}

export function useCreatePharmaSupplier() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (data: Partial<PharmaSupplier>) =>
      (await pharmaApi.createSupplier(data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['pharma', 'suppliers'] });
      pushToast({ kind: 'success', title: 'Supplier added' });
    },
  });
}

export function useUpdatePharmaSupplier() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (args: { id: string; data: Partial<PharmaSupplier> }) =>
      (await pharmaApi.updateSupplier(args.id, args.data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['pharma', 'suppliers'] });
      pushToast({ kind: 'success', title: 'Supplier updated' });
    },
  });
}

export function useDeletePharmaSupplier() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (id: string) =>
      (await pharmaApi.deleteSupplier(id)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['pharma', 'suppliers'] });
      pushToast({ kind: 'success', title: 'Supplier deleted' });
    },
  });
}

export function usePharmaAccounts(params?: ListParams) {
  return useQuery({
    queryKey: qk.pharma.accounts(params),
    queryFn: async () => (await pharmaApi.getAccounts(params)).data.data,
  });
}

export function useCreatePharmaAccount() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (data: Partial<PharmaAccount>) =>
      (await pharmaApi.createAccount(data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['pharma', 'accounts'] });
      pushToast({ kind: 'success', title: 'Account created' });
    },
  });
}

export function useUpdatePharmaAccount() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (args: { id: string; data: Partial<PharmaAccount> }) =>
      (await pharmaApi.updateAccount(args.id, args.data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['pharma', 'accounts'] });
      pushToast({ kind: 'success', title: 'Account updated' });
    },
  });
}

export function usePharmaStaff(params?: ListParams) {
  return useQuery({
    queryKey: qk.pharma.staff(params),
    queryFn: async () => (await pharmaApi.getStaff(params)).data.data,
  });
}

export function useCreatePharmaStaff() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (data: Partial<PharmaStaff>) =>
      (await pharmaApi.createStaff(data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['pharma', 'staff'] });
      pushToast({ kind: 'success', title: 'Staff added' });
    },
  });
}

export function useUpdatePharmaStaff() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (args: { id: string; data: Partial<PharmaStaff> }) =>
      (await pharmaApi.updateStaff(args.id, args.data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['pharma', 'staff'] });
      pushToast({ kind: 'success', title: 'Staff updated' });
    },
  });
}

export function useDeletePharmaStaff() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (id: string) =>
      (await pharmaApi.deleteStaff(id)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['pharma', 'staff'] });
      pushToast({ kind: 'success', title: 'Staff removed' });
    },
  });
}

export function usePharmaAi() {
  return useMutation({
    mutationFn: async (data: PharmaAiQuery) =>
      (await pharmaApi.aiQuery(data)).data.data,
  });
}

export function usePharmaReports(params?: ListParams) {
  return useQuery({
    queryKey: qk.pharma.reports(params),
    queryFn: async () => (await pharmaApi.getReports(params)).data.data,
  });
}