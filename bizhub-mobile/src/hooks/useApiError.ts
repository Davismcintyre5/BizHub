import { AxiosError } from 'axios';
import { useCallback } from 'react';
import { useUi } from '@/stores/uiStore';

interface ServerErrorBody {
  message?: string;
  errors?: Record<string, string[]>;
}

export interface ParsedApiError {
  message: string;
  status?: number;
  fieldErrors?: Record<string, string[]>;
}

export function parseApiError(error: unknown): ParsedApiError {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const body = error.response?.data as ServerErrorBody | undefined;

    if (body?.message) {
      return { message: body.message, status, fieldErrors: body.errors };
    }

    if (status === 401)
      return { message: 'Session expired. Please sign in.', status };
    if (status === 402) return { message: 'Subscription expired.', status };
    if (status === 403)
      return { message: 'You do not have permission.', status };
    if (status === 404) return { message: 'Not found.', status };
    if (status === 422)
      return {
        message: 'Please check the form.',
        status,
        fieldErrors: body?.errors,
      };
    if (status && status >= 500)
      return { message: 'Server error. Try again later.', status };

    if (error.code === 'ECONNABORTED')
      return { message: 'Request timed out.', status };

    return { message: error.message || 'Network error', status };
  }

  if (error instanceof Error) return { message: error.message };
  return { message: 'Something went wrong' };
}

export function useApiError(): {
  parse: (error: unknown) => ParsedApiError;
  toast: (error: unknown) => ParsedApiError;
} {
  const pushToast = useUi((s) => s.pushToast);

  const parse = useCallback((error: unknown) => parseApiError(error), []);

  const toast = useCallback(
    (error: unknown) => {
      const parsed = parseApiError(error);
      pushToast({ kind: 'error', title: 'Error', message: parsed.message });
      return parsed;
    },
    [pushToast]
  );

  return { parse, toast };
}