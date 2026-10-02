import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { electroApi } from '@/api/axios';
import { qk } from '@/constants/queryKeys';
import type {
  ElectroCategory,
  ElectroProduct,
  ElectroRepair,
  ElectroSale,
  ElectroStaff,
  ElectroSupplier,
  ElectroWarranty,
  ListParams,
} from '@/types';
import { useUi } from '@/stores/uiStore';
import { parseApiError } from '@/hooks/useApiError';

export function useElectroCategories(params?: ListParams) {
  return useQuery({
    queryKey: qk.electro.categories(params),
    queryFn: async () => (await electroApi.getCategories(params)).data.data,
  });
}

export function useCreateElectroCategory() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (data: Partial<ElectroCategory>) =>
      (await electroApi.createCategory(data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['electro', 'categories'] });
      pushToast({ kind: 'success', title: 'Category created' });
    },
  });
}

export function useUpdateElectroCategory() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (args: {
      id: string;
      data: Partial<ElectroCategory>;
    }) => (await electroApi.updateCategory(args.id, args.data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['electro', 'categories'] });
      pushToast({ kind: 'success', title: 'Category updated' });
    },
  });
}

export function useDeleteElectroCategory() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (id: string) =>
      (await electroApi.deleteCategory(id)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['electro', 'categories'] });
      pushToast({ kind: 'success', title: 'Category deleted' });
    },
  });
}

export function useElectroProducts(params?: ListParams) {
  return useQuery({
    queryKey: qk.electro.products(params),
    queryFn: async () => (await electroApi.getProducts(params)).data.data,
  });
}

export function useElectroProduct(id: string) {
  return useQuery({
    queryKey: qk.electro.product(id),
    queryFn: async () => (await electroApi.getProduct(id)).data.data,
    enabled: !!id,
  });
}

export function useCreateElectroProduct() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (data: Partial<ElectroProduct>) =>
      (await electroApi.createProduct(data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['electro', 'products'] });
      pushToast({ kind: 'success', title: 'Product added' });
    },
    onError: (e) =>
      pushToast({
        kind: 'error',
        title: 'Error',
        message: parseApiError(e).message,
      }),
  });
}

export function useUpdateElectroProduct() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (args: {
      id: string;
      data: Partial<ElectroProduct>;
    }) => (await electroApi.updateProduct(args.id, args.data)).data.data,
    onSuccess: (_, vars) => {
      void qc.invalidateQueries({ queryKey: ['electro', 'products'] });
      void qc.invalidateQueries({ queryKey: qk.electro.product(vars.id) });
      pushToast({ kind: 'success', title: 'Product updated' });
    },
  });
}

export function useDeleteElectroProduct() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (id: string) =>
      (await electroApi.deleteProduct(id)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['electro', 'products'] });
      pushToast({ kind: 'success', title: 'Product deleted' });
    },
  });
}

export function useElectroSales(params?: ListParams) {
  return useQuery({
    queryKey: qk.electro.sales(params),
    queryFn: async () => (await electroApi.getSales(params)).data.data,
  });
}

export function useElectroSale(id: string) {
  return useQuery({
    queryKey: qk.electro.sale(id),
    queryFn: async () => (await electroApi.getSale(id)).data.data,
    enabled: !!id,
  });
}

export function useCreateElectroSale() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (data: Partial<ElectroSale>) =>
      (await electroApi.createSale(data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['electro', 'sales'] });
      void qc.invalidateQueries({ queryKey: ['electro', 'products'] });
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

export function useDeleteElectroSale() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (id: string) =>
      (await electroApi.deleteSale(id)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['electro', 'sales'] });
      pushToast({ kind: 'success', title: 'Sale deleted' });
    },
  });
}

export function useRepairs(params?: ListParams) {
  return useQuery({
    queryKey: qk.electro.repairs(params),
    queryFn: async () => (await electroApi.getRepairs(params)).data.data,
  });
}

export function useRepair(id: string) {
  return useQuery({
    queryKey: qk.electro.repair(id),
    queryFn: async () => (await electroApi.getRepair(id)).data.data,
    enabled: !!id,
  });
}

export function useCreateRepair() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (data: Partial<ElectroRepair>) =>
      (await electroApi.createRepair(data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['electro', 'repairs'] });
      pushToast({ kind: 'success', title: 'Repair logged' });
    },
  });
}

export function useUpdateRepair() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (args: { id: string; data: Partial<ElectroRepair> }) =>
      (await electroApi.updateRepair(args.id, args.data)).data.data,
    onSuccess: (_, vars) => {
      void qc.invalidateQueries({ queryKey: ['electro', 'repairs'] });
      void qc.invalidateQueries({ queryKey: qk.electro.repair(vars.id) });
      pushToast({ kind: 'success', title: 'Repair updated' });
    },
  });
}

export function useElectroSuppliers(params?: ListParams) {
  return useQuery({
    queryKey: qk.electro.suppliers(params),
    queryFn: async () => (await electroApi.getSuppliers(params)).data.data,
  });
}

export function useCreateElectroSupplier() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (data: Partial<ElectroSupplier>) =>
      (await electroApi.createSupplier(data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['electro', 'suppliers'] });
      pushToast({ kind: 'success', title: 'Supplier added' });
    },
  });
}

export function useUpdateElectroSupplier() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (args: {
      id: string;
      data: Partial<ElectroSupplier>;
    }) => (await electroApi.updateSupplier(args.id, args.data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['electro', 'suppliers'] });
      pushToast({ kind: 'success', title: 'Supplier updated' });
    },
  });
}

export function useDeleteElectroSupplier() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (id: string) =>
      (await electroApi.deleteSupplier(id)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['electro', 'suppliers'] });
      pushToast({ kind: 'success', title: 'Supplier deleted' });
    },
  });
}

export function useWarranties(params?: ListParams) {
  return useQuery({
    queryKey: qk.electro.warranties(params),
    queryFn: async () => (await electroApi.getWarranties(params)).data.data,
  });
}

export function useCreateWarranty() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (data: Partial<ElectroWarranty>) =>
      (await electroApi.createWarranty(data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['electro', 'warranties'] });
      pushToast({ kind: 'success', title: 'Warranty created' });
    },
  });
}

export function useUpdateWarranty() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (args: {
      id: string;
      data: Partial<ElectroWarranty>;
    }) => (await electroApi.updateWarranty(args.id, args.data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['electro', 'warranties'] });
      pushToast({ kind: 'success', title: 'Warranty updated' });
    },
  });
}

export function useElectroStaff(params?: ListParams) {
  return useQuery({
    queryKey: qk.electro.staff(params),
    queryFn: async () => (await electroApi.getStaff(params)).data.data,
  });
}

export function useCreateElectroStaff() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (data: Partial<ElectroStaff>) =>
      (await electroApi.createStaff(data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['electro', 'staff'] });
      pushToast({ kind: 'success', title: 'Staff added' });
    },
  });
}

export function useUpdateElectroStaff() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (args: { id: string; data: Partial<ElectroStaff> }) =>
      (await electroApi.updateStaff(args.id, args.data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['electro', 'staff'] });
      pushToast({ kind: 'success', title: 'Staff updated' });
    },
  });
}

export function useDeleteElectroStaff() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (id: string) =>
      (await electroApi.deleteStaff(id)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['electro', 'staff'] });
      pushToast({ kind: 'success', title: 'Staff removed' });
    },
  });
}

export function useElectroReports(params?: ListParams) {
  return useQuery({
    queryKey: qk.electro.reports(params),
    queryFn: async () => (await electroApi.getReports(params)).data.data,
  });
}