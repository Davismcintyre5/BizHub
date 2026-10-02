import { useCallback } from 'react';
import { useAuth } from '@/stores/authStore';
import type { UserRole } from '@/types';

export interface Permissions {
  role: UserRole | null;
  permissions: string[];
  has: (permission: string) => boolean;
  hasAny: (permissions: string[]) => boolean;
  hasAll: (permissions: string[]) => boolean;
  isOwner: boolean;
  isAdmin: boolean;
  canManage: boolean;
}

export function usePermissions(): Permissions {
  const user = useAuth((s) => s.user);
  const scope = useAuth((s) => s.scope);

  const permissions = scope?.permissions ?? [];
  const role = user?.role ?? null;

  const has = useCallback(
    (permission: string) => permissions.includes(permission),
    [permissions]
  );

  const hasAny = useCallback(
    (list: string[]) => list.some((p) => permissions.includes(p)),
    [permissions]
  );

  const hasAll = useCallback(
    (list: string[]) => list.every((p) => permissions.includes(p)),
    [permissions]
  );

  return {
    role,
    permissions,
    has,
    hasAny,
    hasAll,
    isOwner: role === 'owner',
    isAdmin: role === 'owner' || role === 'admin',
    canManage: role === 'owner' || role === 'admin' || role === 'manager',
  };
}