import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apartmentApi } from '@/api/axios';
import { qk } from '@/constants/queryKeys';
import type {
  ApartmentLease,
  ApartmentMaintenance,
  ApartmentPayment,
  ApartmentProperty,
  ApartmentStaff,
  ApartmentTenant,
  ApartmentUnit,
  ListParams,
} from '@/types';
import { useUi } from '@/stores/uiStore';
import { parseApiError } from '@/hooks/useApiError';

export function useProperties(params?: ListParams) {
  return useQuery({
    queryKey: qk.apartment.properties(params),
    queryFn: async () => (await apartmentApi.getProperties(params)).data.data,
  });
}

export function useProperty(id: string) {
  return useQuery({
    queryKey: qk.apartment.property(id),
    queryFn: async () => (await apartmentApi.getProperty(id)).data.data,
    enabled: !!id,
  });
}

export function useCreateProperty() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (data: Partial<ApartmentProperty>) =>
      (await apartmentApi.createProperty(data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['apartment', 'properties'] });
      pushToast({ kind: 'success', title: 'Property created' });
    },
    onError: (e) =>
      pushToast({
        kind: 'error',
        title: 'Error',
        message: parseApiError(e).message,
      }),
  });
}

export function useUpdateProperty() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (args: {
      id: string;
      data: Partial<ApartmentProperty>;
    }) => (await apartmentApi.updateProperty(args.id, args.data)).data.data,
    onSuccess: (_, vars) => {
      void qc.invalidateQueries({ queryKey: ['apartment', 'properties'] });
      void qc.invalidateQueries({
        queryKey: qk.apartment.property(vars.id),
      });
      pushToast({ kind: 'success', title: 'Property updated' });
    },
    onError: (e) =>
      pushToast({
        kind: 'error',
        title: 'Error',
        message: parseApiError(e).message,
      }),
  });
}

export function useDeleteProperty() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (id: string) =>
      (await apartmentApi.deleteProperty(id)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['apartment', 'properties'] });
      pushToast({ kind: 'success', title: 'Property deleted' });
    },
  });
}

export function useUnits(params?: ListParams) {
  return useQuery({
    queryKey: qk.apartment.units(params),
    queryFn: async () => (await apartmentApi.getUnits(params)).data.data,
  });
}

export function useUnit(id: string) {
  return useQuery({
    queryKey: qk.apartment.unit(id),
    queryFn: async () => (await apartmentApi.getUnit(id)).data.data,
    enabled: !!id,
  });
}

export function useCreateUnit() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (data: Partial<ApartmentUnit>) =>
      (await apartmentApi.createUnit(data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['apartment', 'units'] });
      pushToast({ kind: 'success', title: 'Unit created' });
    },
    onError: (e) =>
      pushToast({
        kind: 'error',
        title: 'Error',
        message: parseApiError(e).message,
      }),
  });
}

export function useUpdateUnit() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (args: {
      id: string;
      data: Partial<ApartmentUnit>;
    }) => (await apartmentApi.updateUnit(args.id, args.data)).data.data,
    onSuccess: (_, vars) => {
      void qc.invalidateQueries({ queryKey: ['apartment', 'units'] });
      void qc.invalidateQueries({ queryKey: qk.apartment.unit(vars.id) });
      pushToast({ kind: 'success', title: 'Unit updated' });
    },
  });
}

export function useTenants(params?: ListParams) {
  return useQuery({
    queryKey: qk.apartment.tenants(params),
    queryFn: async () => (await apartmentApi.getTenants(params)).data.data,
  });
}

export function useTenant(id: string) {
  return useQuery({
    queryKey: qk.apartment.tenant(id),
    queryFn: async () => (await apartmentApi.getTenant(id)).data.data,
    enabled: !!id,
  });
}

export function useCreateTenant() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (data: Partial<ApartmentTenant>) =>
      (await apartmentApi.createTenant(data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['apartment', 'tenants'] });
      pushToast({ kind: 'success', title: 'Tenant added' });
    },
    onError: (e) =>
      pushToast({
        kind: 'error',
        title: 'Error',
        message: parseApiError(e).message,
      }),
  });
}

export function useUpdateTenant() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (args: {
      id: string;
      data: Partial<ApartmentTenant>;
    }) => (await apartmentApi.updateTenant(args.id, args.data)).data.data,
    onSuccess: (_, vars) => {
      void qc.invalidateQueries({ queryKey: ['apartment', 'tenants'] });
      void qc.invalidateQueries({ queryKey: qk.apartment.tenant(vars.id) });
      pushToast({ kind: 'success', title: 'Tenant updated' });
    },
  });
}

export function useLeases(params?: ListParams) {
  return useQuery({
    queryKey: qk.apartment.leases(params),
    queryFn: async () => (await apartmentApi.getLeases(params)).data.data,
  });
}

export function useLease(id: string) {
  return useQuery({
    queryKey: qk.apartment.lease(id),
    queryFn: async () => (await apartmentApi.getLease(id)).data.data,
    enabled: !!id,
  });
}

export function useCreateLease() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (data: Partial<ApartmentLease>) =>
      (await apartmentApi.createLease(data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['apartment', 'leases'] });
      pushToast({ kind: 'success', title: 'Lease created' });
    },
  });
}

export function useUpdateLease() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (args: {
      id: string;
      data: Partial<ApartmentLease>;
    }) => (await apartmentApi.updateLease(args.id, args.data)).data.data,
    onSuccess: (_, vars) => {
      void qc.invalidateQueries({ queryKey: ['apartment', 'leases'] });
      void qc.invalidateQueries({ queryKey: qk.apartment.lease(vars.id) });
      pushToast({ kind: 'success', title: 'Lease updated' });
    },
  });
}

export function usePayments(params?: ListParams) {
  return useQuery({
    queryKey: qk.apartment.payments(params),
    queryFn: async () => (await apartmentApi.getPayments(params)).data.data,
  });
}

export function useCreatePayment() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (data: Partial<ApartmentPayment>) =>
      (await apartmentApi.createPayment(data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['apartment', 'payments'] });
      pushToast({ kind: 'success', title: 'Payment recorded' });
    },
    onError: (e) =>
      pushToast({
        kind: 'error',
        title: 'Error',
        message: parseApiError(e).message,
      }),
  });
}

export function useMaintenance(params?: ListParams) {
  return useQuery({
    queryKey: qk.apartment.maintenance(params),
    queryFn: async () => (await apartmentApi.getMaintenance(params)).data.data,
  });
}

export function useCreateMaintenance() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (data: Partial<ApartmentMaintenance>) =>
      (await apartmentApi.createMaintenance(data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['apartment', 'maintenance'] });
      pushToast({ kind: 'success', title: 'Ticket created' });
    },
  });
}

export function useUpdateMaintenance() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (args: {
      id: string;
      data: Partial<ApartmentMaintenance>;
    }) => (await apartmentApi.updateMaintenance(args.id, args.data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['apartment', 'maintenance'] });
      pushToast({ kind: 'success', title: 'Ticket updated' });
    },
  });
}

export function useApartmentStaff(params?: ListParams) {
  return useQuery({
    queryKey: qk.apartment.staff(params),
    queryFn: async () => (await apartmentApi.getStaff(params)).data.data,
  });
}

export function useCreateApartmentStaff() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (data: Partial<ApartmentStaff>) =>
      (await apartmentApi.createStaff(data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['apartment', 'staff'] });
      pushToast({ kind: 'success', title: 'Staff added' });
    },
  });
}

export function useUpdateApartmentStaff() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (args: { id: string; data: Partial<ApartmentStaff> }) =>
      (await apartmentApi.updateStaff(args.id, args.data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['apartment', 'staff'] });
      pushToast({ kind: 'success', title: 'Staff updated' });
    },
  });
}

export function useApartmentReports(params?: ListParams) {
  return useQuery({
    queryKey: qk.apartment.reports(params),
    queryFn: async () => (await apartmentApi.getReports(params)).data.data,
  });
}