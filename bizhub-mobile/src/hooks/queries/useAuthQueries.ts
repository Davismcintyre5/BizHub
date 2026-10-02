import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/api/axios';
import { qk } from '@/constants/queryKeys';
import type { AuthUser, ChangePasswordPayload } from '@/types';
import { useUi } from '@/stores/uiStore';
import { parseApiError } from '@/hooks/useApiError';

export function useMe() {
  return useQuery({
    queryKey: qk.auth.me,
    queryFn: async () => (await authApi.me()).data.data,
    staleTime: 60_000,
  });
}

export function useUpdateProfile() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);

  return useMutation({
    mutationFn: async (data: Partial<AuthUser>) =>
      (await authApi.updateProfile(data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: qk.auth.me });
      pushToast({ kind: 'success', title: 'Profile updated' });
    },
    onError: (e) => {
      pushToast({
        kind: 'error',
        title: 'Error',
        message: parseApiError(e).message,
      });
    },
  });
}

export function useChangePassword() {
  const pushToast = useUi((s) => s.pushToast);

  return useMutation({
    mutationFn: async (data: ChangePasswordPayload) =>
      (await authApi.changePassword(data)).data.data,
    onSuccess: () => {
      pushToast({ kind: 'success', title: 'Password changed' });
    },
    onError: (e) => {
      pushToast({
        kind: 'error',
        title: 'Error',
        message: parseApiError(e).message,
      });
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: async (email: string) =>
      (await authApi.forgotPassword(email)).data.data,
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: async (args: { token: string; password: string }) =>
      (await authApi.resetPassword(args.token, args.password)).data.data,
  });
}

export function useVerifyEmail() {
  return useMutation({
    mutationFn: async (token: string) =>
      (await authApi.verifyEmail(token)).data.data,
  });
}

export function useResendVerification() {
  return useMutation({
    mutationFn: async () => (await authApi.resendVerification()).data.data,
  });
}