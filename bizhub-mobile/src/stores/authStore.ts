import { create } from 'zustand';
import {
  authApi,
  bindAuthEmitter,
  storage,
  TOKEN_KEYS,
  type AuthEvent,
} from '@/api/axios';
import type { AuthScope, AuthUser, Invoice, Vertical } from '@/types';

export type AuthState =
  | 'loading'
  | 'unauthed'
  | 'onboarding'
  | 'expired'
  | 'authed';

interface AuthStore {
  state: AuthState;
  user: AuthUser | null;
  vertical: Vertical | null;
  invoice: Invoice | null;
  scope: AuthScope | null;
  error: string | null;

  bootstrap: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: {
    name: string;
    email: string;
    phone: string;
    password: string;
    businessType: Vertical;
    businessName: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  refreshMe: () => Promise<void>;
  setUser: (user: AuthUser) => void;
  setVertical: (vertical: Vertical) => void;
  clearError: () => void;
}

async function persistSession(
  token: string,
  user: AuthUser,
  scope?: AuthScope,
  invoice?: Invoice
): Promise<void> {
  await storage.set(TOKEN_KEYS.token, token);
  await storage.set(TOKEN_KEYS.user, JSON.stringify(user));
  if (scope) await storage.set(TOKEN_KEYS.scope, JSON.stringify(scope));
  if (invoice)
    await storage.set(TOKEN_KEYS.invoice, JSON.stringify(invoice));
}

async function clearSession(): Promise<void> {
  await storage.remove(TOKEN_KEYS.token);
  await storage.remove(TOKEN_KEYS.user);
  await storage.remove(TOKEN_KEYS.scope);
  await storage.remove(TOKEN_KEYS.invoice);
}

export const useAuth = create<AuthStore>((set, get) => {
  bindAuthEmitter((event: AuthEvent) => {
    switch (event.type) {
      case 'UNAUTHENTICATED':
        set({
          state: 'unauthed',
          user: null,
          vertical: null,
          invoice: null,
          scope: null,
        });
        break;

      case 'SUBSCRIPTION_EXPIRED':
        set({
          state: 'expired',
          user: event.user ?? get().user,
          invoice: event.invoice ?? get().invoice,
          scope: event.scope ?? get().scope,
        });
        break;

      case 'SUBSCRIPTION_REFRESHED':
        set({
          state: 'authed',
          user: event.user,
          vertical: event.user.vertical,
          invoice: event.invoice ?? null,
          scope: event.scope ?? null,
        });
        break;
    }
  });

  return {
    state: 'loading',
    user: null,
    vertical: null,
    invoice: null,
    scope: null,
    error: null,

    async bootstrap() {
      set({ state: 'loading', error: null });

      const token = await storage.get(TOKEN_KEYS.token);
      if (!token) {
        set({ state: 'unauthed' });
        return;
      }

      try {
        const res = await authApi.me();
        const { user, invoice, scope } = res.data.data;

        await persistSession(token, user, scope, invoice);

        set({
          state: invoice?.status === 'unpaid' ? 'expired' : 'authed',
          user,
          vertical: user.vertical,
          invoice: invoice ?? null,
          scope,
        });
      } catch {
        await clearSession();
        set({
          state: 'unauthed',
          user: null,
          vertical: null,
          invoice: null,
          scope: null,
        });
      }
    },

    async login(email, password) {
      set({ error: null });
      try {
        const res = await authApi.login({ email, password });
        const { token, user } = res.data.data;

        await persistSession(token, user);

        const me = await authApi.me();
        const { user: fresh, invoice, scope } = me.data.data;
        await persistSession(token, fresh, scope, invoice);

        set({
          state: invoice?.status === 'unpaid' ? 'expired' : 'authed',
          user: fresh,
          vertical: fresh.vertical,
          invoice: invoice ?? null,
          scope,
          error: null,
        });
      } catch (e) {
        const message =
          (e as { response?: { data?: { message?: string } } })?.response?.data
            ?.message ?? 'Login failed';
        set({ error: message });
        throw e;
      }
    },

    async register(payload) {
      set({ error: null });
      try {
        const res = await authApi.register(payload);
        const { token, user } = res.data.data;

        await persistSession(token, user);

        set({
          state: 'onboarding',
          user,
          vertical: user.vertical,
          error: null,
        });
      } catch (e) {
        const message =
          (e as { response?: { data?: { message?: string } } })?.response?.data
            ?.message ?? 'Registration failed';
        set({ error: message });
        throw e;
      }
    },

    async logout() {
      await clearSession();
      set({
        state: 'unauthed',
        user: null,
        vertical: null,
        invoice: null,
        scope: null,
        error: null,
      });
    },

    async refreshMe() {
      try {
        const res = await authApi.me();
        const { user, invoice, scope } = res.data.data;
        set({
          user,
          vertical: user.vertical,
          invoice: invoice ?? null,
          scope,
          state: invoice?.status === 'unpaid' ? 'expired' : 'authed',
        });
      } catch {
        await get().logout();
      }
    },

    setUser(user) {
      set({ user, vertical: user.vertical });
    },

    setVertical(vertical) {
      set({ vertical });
    },

    clearError() {
      set({ error: null });
    },
  };
});