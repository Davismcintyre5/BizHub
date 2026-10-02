import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { cyberApi } from '@/api/axios';
import { qk } from '@/constants/queryKeys';
import type {
  CyberComputer,
  CyberCustomer,
  CyberPackage,
  CyberSale,
  CyberService,
  CyberSession,
  CyberStaff,
  ListParams,
} from '@/types';
import { useUi } from '@/stores/uiStore';
import { parseApiError } from '@/hooks/useApiError';

export function useComputers(params?: ListParams) {
  return useQuery({
    queryKey: qk.cyber.computers(params),
    queryFn: async () => (await cyberApi.getComputers(params)).data.data,
  });
}

export function useComputer(id: string) {
  return useQuery({
    queryKey: qk.cyber.computer(id),
    queryFn: async () => (await cyberApi.getComputer(id)).data.data,
    enabled: !!id,
  });
}

export function useCreateComputer() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (data: Partial<CyberComputer>) =>
      (await cyberApi.createComputer(data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['cyber', 'computers'] });
      pushToast({ kind: 'success', title: 'Computer added' });
    },
    onError: (e) =>
      pushToast({
        kind: 'error',
        title: 'Error',
        message: parseApiError(e).message,
      }),
  });
}

export function useUpdateComputer() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (args: {
      id: string;
      data: Partial<CyberComputer>;
    }) => (await cyberApi.updateComputer(args.id, args.data)).data.data,
    onSuccess: (_, vars) => {
      void qc.invalidateQueries({ queryKey: ['cyber', 'computers'] });
      void qc.invalidateQueries({ queryKey: qk.cyber.computer(vars.id) });
      pushToast({ kind: 'success', title: 'Computer updated' });
    },
  });
}

export function useDeleteComputer() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (id: string) =>
      (await cyberApi.deleteComputer(id)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['cyber', 'computers'] });
      pushToast({ kind: 'success', title: 'Computer deleted' });
    },
  });
}

export function useSessions(params?: ListParams) {
  return useQuery({
    queryKey: qk.cyber.sessions(params),
    queryFn: async () => (await cyberApi.getSessions(params)).data.data,
  });
}

export function useSession(id: string) {
  return useQuery({
    queryKey: qk.cyber.session(id),
    queryFn: async () => (await cyberApi.getSession(id)).data.data,
    enabled: !!id,
  });
}

export function useStartSession() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (data: Partial<CyberSession>) =>
      (await cyberApi.startSession(data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['cyber', 'sessions'] });
      void qc.invalidateQueries({ queryKey: ['cyber', 'computers'] });
      pushToast({ kind: 'success', title: 'Session started' });
    },
    onError: (e) =>
      pushToast({
        kind: 'error',
        title: 'Error',
        message: parseApiError(e).message,
      }),
  });
}

export function useEndSession() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (id: string) =>
      (await cyberApi.endSession(id)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['cyber', 'sessions'] });
      void qc.invalidateQueries({ queryKey: ['cyber', 'computers'] });
      pushToast({ kind: 'success', title: 'Session ended' });
    },
  });
}

export function useCancelSession() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (id: string) =>
      (await cyberApi.cancelSession(id)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['cyber', 'sessions'] });
      pushToast({ kind: 'info', title: 'Session cancelled' });
    },
  });
}

export function useCyberCustomers(params?: ListParams) {
  return useQuery({
    queryKey: qk.cyber.customers(params),
    queryFn: async () => (await cyberApi.getCustomers(params)).data.data,
  });
}

export function useCyberCustomer(id: string) {
  return useQuery({
    queryKey: qk.cyber.customer(id),
    queryFn: async () => (await cyberApi.getCustomer(id)).data.data,
    enabled: !!id,
  });
}

export function useCreateCyberCustomer() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (data: Partial<CyberCustomer>) =>
      (await cyberApi.createCustomer(data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['cyber', 'customers'] });
      pushToast({ kind: 'success', title: 'Customer added' });
    },
  });
}

export function useUpdateCyberCustomer() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (args: { id: string; data: Partial<CyberCustomer> }) =>
      (await cyberApi.updateCustomer(args.id, args.data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['cyber', 'customers'] });
      pushToast({ kind: 'success', title: 'Customer updated' });
    },
  });
}

export function usePackages(params?: ListParams) {
  return useQuery({
    queryKey: qk.cyber.packages(params),
    queryFn: async () => (await cyberApi.getPackages(params)).data.data,
  });
}

export function useCreatePackage() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (data: Partial<CyberPackage>) =>
      (await cyberApi.createPackage(data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['cyber', 'packages'] });
      pushToast({ kind: 'success', title: 'Package created' });
    },
  });
}

export function useUpdatePackage() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (args: { id: string; data: Partial<CyberPackage> }) =>
      (await cyberApi.updatePackage(args.id, args.data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['cyber', 'packages'] });
      pushToast({ kind: 'success', title: 'Package updated' });
    },
  });
}

export function useDeletePackage() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (id: string) =>
      (await cyberApi.deletePackage(id)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['cyber', 'packages'] });
      pushToast({ kind: 'success', title: 'Package deleted' });
    },
  });
}

export function useServices(params?: ListParams) {
  return useQuery({
    queryKey: qk.cyber.services(params),
    queryFn: async () => (await cyberApi.getServices(params)).data.data,
  });
}

export function useCreateService() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (data: Partial<CyberService>) =>
      (await cyberApi.createService(data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['cyber', 'services'] });
      pushToast({ kind: 'success', title: 'Service created' });
    },
  });
}

export function useUpdateService() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (args: { id: string; data: Partial<CyberService> }) =>
      (await cyberApi.updateService(args.id, args.data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['cyber', 'services'] });
      pushToast({ kind: 'success', title: 'Service updated' });
    },
  });
}

export function useDeleteService() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (id: string) =>
      (await cyberApi.deleteService(id)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['cyber', 'services'] });
      pushToast({ kind: 'success', title: 'Service deleted' });
    },
  });
}

export function useCyberSales(params?: ListParams) {
  return useQuery({
    queryKey: qk.cyber.sales(params),
    queryFn: async () => (await cyberApi.getSales(params)).data.data,
  });
}

export function useCyberSale(id: string) {
  return useQuery({
    queryKey: qk.cyber.sale(id),
    queryFn: async () => (await cyberApi.getSale(id)).data.data,
    enabled: !!id,
  });
}

export function useCreateCyberSale() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (data: Partial<CyberSale>) =>
      (await cyberApi.createSale(data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['cyber', 'sales'] });
      void qc.invalidateQueries({ queryKey: ['cyber', 'sessions'] });
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

export function useCyberStaff(params?: ListParams) {
  return useQuery({
    queryKey: qk.cyber.staff(params),
    queryFn: async () => (await cyberApi.getStaff(params)).data.data,
  });
}

export function useCreateCyberStaff() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (data: Partial<CyberStaff>) =>
      (await cyberApi.createStaff(data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['cyber', 'staff'] });
      pushToast({ kind: 'success', title: 'Staff added' });
    },
  });
}

export function useUpdateCyberStaff() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (args: { id: string; data: Partial<CyberStaff> }) =>
      (await cyberApi.updateStaff(args.id, args.data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['cyber', 'staff'] });
      pushToast({ kind: 'success', title: 'Staff updated' });
    },
  });
}

export function useDeleteCyberStaff() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (id: string) =>
      (await cyberApi.deleteStaff(id)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['cyber', 'staff'] });
      pushToast({ kind: 'success', title: 'Staff removed' });
    },
  });
}

export function useCyberReports(params?: ListParams) {
  return useQuery({
    queryKey: qk.cyber.reports(params),
    queryFn: async () => (await cyberApi.getReports(params)).data.data,
  });
}