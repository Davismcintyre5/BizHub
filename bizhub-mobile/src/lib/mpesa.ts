import { publicApi } from '@/api/axios';
import {
  MPESA_POLL_INTERVAL_MS,
  MPESA_POLL_MAX_ATTEMPTS,
} from './constants';
import type { MpesaStatusResponse, StkPushResponse } from '@/types';

export async function initiateStkPush(
  invoiceNumber: string,
  phone: string
): Promise<StkPushResponse> {
  const res = await publicApi.payStkInvoice({ invoiceNumber, phone });
  return res.data.data;
}

export async function pollMpesaStatus(
  checkoutRequestId: string,
  onUpdate?: (status: MpesaStatusResponse) => void
): Promise<MpesaStatusResponse> {
  for (let i = 0; i < MPESA_POLL_MAX_ATTEMPTS; i++) {
    await new Promise((r) => setTimeout(r, MPESA_POLL_INTERVAL_MS));

    const res = await publicApi.checkMpesaStatus(checkoutRequestId);
    const status = res.data.data;

    onUpdate?.(status);

    if (status.status !== 'pending') return status;
  }

  return { status: 'failed', message: 'Payment confirmation timed out' };
}