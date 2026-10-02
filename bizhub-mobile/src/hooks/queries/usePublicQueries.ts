import { useMutation, useQuery } from '@tanstack/react-query';
import { publicApi } from '@/api/axios';
import { qk } from '@/constants/queryKeys';
import type { PaymentMethodsQuery, StkPushPayload } from '@/types';

export function useSettings() {
  return useQuery({
    queryKey: qk.public.settings,
    queryFn: async () => (await publicApi.getSettings()).data.data,
    staleTime: 30 * 60_000,
  });
}

export function useLegal(type: string) {
  return useQuery({
    queryKey: qk.public.legal(type),
    queryFn: async () => (await publicApi.getLegal(type)).data.data,
    staleTime: 60 * 60_000,
    enabled: !!type,
  });
}

export function usePublicPlans() {
  return useQuery({
    queryKey: qk.public.plans,
    queryFn: async () => (await publicApi.getPlans()).data.data,
    staleTime: 30 * 60_000,
  });
}

export function useInvoice(invoiceNumber: string) {
  return useQuery({
    queryKey: qk.public.invoice(invoiceNumber),
    queryFn: async () => (await publicApi.getInvoice(invoiceNumber)).data.data,
    enabled: !!invoiceNumber,
  });
}

export function usePaymentMethods(params?: PaymentMethodsQuery) {
  return useQuery({
    queryKey: ['public', 'payment-methods', params] as const,
    queryFn: async () => (await publicApi.getPaymentMethods(params)).data.data,
    enabled: !!params?.invoiceNumber,
    staleTime: 5 * 60_000,
  });
}

export function useStkPush() {
  return useMutation({
    mutationFn: async (data: StkPushPayload) =>
      (await publicApi.payStkInvoice(data)).data.data,
  });
}

export function useMpesaStatus(checkoutRequestId: string | null) {
  return useQuery({
    queryKey: checkoutRequestId
      ? qk.public.mpesaStatus(checkoutRequestId)
      : (['public', 'mpesa-status', 'idle'] as const),
    queryFn: async () => {
      if (!checkoutRequestId) throw new Error('No checkout request id');
      return (await publicApi.checkMpesaStatus(checkoutRequestId)).data.data;
    },
    enabled: !!checkoutRequestId,
    refetchInterval: (query) =>
      query.state.data?.status === 'pending' ? 3_000 : false,
  });
}