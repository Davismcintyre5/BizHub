import { create } from 'zustand';

export type ToastKind = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  kind: ToastKind;
  title: string;
  message?: string;
  durationMs?: number;
}

interface UiStore {
  toasts: Toast[];
  globalLoading: boolean;
  globalLoadingMessage: string | null;

  pushToast: (toast: Omit<Toast, 'id'>) => string;
  dismissToast: (id: string) => void;
  clearToasts: () => void;

  showLoading: (message?: string) => void;
  hideLoading: () => void;
}

export const useUi = create<UiStore>((set) => ({
  toasts: [],
  globalLoading: false,
  globalLoadingMessage: null,

  pushToast(toast) {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    set((s) => ({ toasts: [...s.toasts, { ...toast, id }] }));
    return id;
  },

  dismissToast(id) {
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
  },

  clearToasts() {
    set({ toasts: [] });
  },

  showLoading(message) {
    set({ globalLoading: true, globalLoadingMessage: message ?? null });
  },

  hideLoading() {
    set({ globalLoading: false, globalLoadingMessage: null });
  },
}));