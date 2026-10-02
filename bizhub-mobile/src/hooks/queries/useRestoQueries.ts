import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { restoApi } from '@/api/axios';
import { qk } from '@/constants/queryKeys';
import type {
  ListParams,
  RestoCategory,
  RestoCustomer,
  RestoEmployee,
  RestoExpense,
  RestoMenuItem,
  RestoOrder,
  RestoPayroll,
  RestoReservation,
  RestoStockItem,
  RestoSupplier,
  RestoTable,
  RestoTransaction,
} from '@/types';
import { useUi } from '@/stores/uiStore';
import { parseApiError } from '@/hooks/useApiError';

export function useRestoCategories(params?: ListParams) {
  return useQuery({
    queryKey: qk.resto.categories(params),
    queryFn: async () => (await restoApi.getCategories(params)).data.data,
  });
}

export function useCreateRestoCategory() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (data: Partial<RestoCategory>) =>
      (await restoApi.createCategory(data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['resto', 'categories'] });
      pushToast({ kind: 'success', title: 'Category created' });
    },
  });
}

export function useUpdateRestoCategory() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (args: { id: string; data: Partial<RestoCategory> }) =>
      (await restoApi.updateCategory(args.id, args.data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['resto', 'categories'] });
      pushToast({ kind: 'success', title: 'Category updated' });
    },
  });
}

export function useDeleteRestoCategory() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (id: string) =>
      (await restoApi.deleteCategory(id)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['resto', 'categories'] });
      pushToast({ kind: 'success', title: 'Category deleted' });
    },
  });
}

export function useMenuItems(params?: ListParams) {
  return useQuery({
    queryKey: qk.resto.menuItems(params),
    queryFn: async () => (await restoApi.getMenuItems(params)).data.data,
  });
}

export function useMenuItem(id: string) {
  return useQuery({
    queryKey: qk.resto.menuItem(id),
    queryFn: async () => (await restoApi.getMenuItem(id)).data.data,
    enabled: !!id,
  });
}

export function useCreateMenuItem() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (data: Partial<RestoMenuItem>) =>
      (await restoApi.createMenuItem(data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['resto', 'menu'] });
      pushToast({ kind: 'success', title: 'Menu item added' });
    },
    onError: (e) =>
      pushToast({
        kind: 'error',
        title: 'Error',
        message: parseApiError(e).message,
      }),
  });
}

export function useUpdateMenuItem() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (args: { id: string; data: Partial<RestoMenuItem> }) =>
      (await restoApi.updateMenuItem(args.id, args.data)).data.data,
    onSuccess: (_, vars) => {
      void qc.invalidateQueries({ queryKey: ['resto', 'menu'] });
      void qc.invalidateQueries({ queryKey: qk.resto.menuItem(vars.id) });
      pushToast({ kind: 'success', title: 'Menu item updated' });
    },
  });
}

export function useDeleteMenuItem() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (id: string) =>
      (await restoApi.deleteMenuItem(id)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['resto', 'menu'] });
      pushToast({ kind: 'success', title: 'Menu item deleted' });
    },
  });
}

export function useTables(params?: ListParams) {
  return useQuery({
    queryKey: qk.resto.tables(params),
    queryFn: async () => (await restoApi.getTables(params)).data.data,
  });
}

export function useUpdateTable() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (args: { id: string; data: Partial<RestoTable> }) =>
      (await restoApi.updateTable(args.id, args.data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['resto', 'tables'] });
      pushToast({ kind: 'success', title: 'Table updated' });
    },
  });
}

export function useOrders(params?: ListParams) {
  return useQuery({
    queryKey: qk.resto.orders(params),
    queryFn: async () => (await restoApi.getOrders(params)).data.data,
  });
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: qk.resto.order(id),
    queryFn: async () => (await restoApi.getOrder(id)).data.data,
    enabled: !!id,
  });
}

export function useCreateOrder() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (data: Partial<RestoOrder>) =>
      (await restoApi.createOrder(data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['resto', 'orders'] });
      void qc.invalidateQueries({ queryKey: ['resto', 'tables'] });
      pushToast({ kind: 'success', title: 'Order created' });
    },
    onError: (e) =>
      pushToast({
        kind: 'error',
        title: 'Error',
        message: parseApiError(e).message,
      }),
  });
}

export function useUpdateOrder() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (args: { id: string; data: Partial<RestoOrder> }) =>
      (await restoApi.updateOrder(args.id, args.data)).data.data,
    onSuccess: (_, vars) => {
      void qc.invalidateQueries({ queryKey: ['resto', 'orders'] });
      void qc.invalidateQueries({ queryKey: qk.resto.order(vars.id) });
      pushToast({ kind: 'success', title: 'Order updated' });
    },
  });
}

export function useUpdateOrderStatus() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (args: { id: string; status: RestoOrder['status'] }) =>
      (await restoApi.updateOrderStatus(args.id, args.status)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['resto', 'orders'] });
      pushToast({ kind: 'success', title: 'Order status updated' });
    },
  });
}

export function useDeleteOrder() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (id: string) =>
      (await restoApi.deleteOrder(id)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['resto', 'orders'] });
      pushToast({ kind: 'success', title: 'Order deleted' });
    },
  });
}

export function useReservations(params?: ListParams) {
  return useQuery({
    queryKey: qk.resto.reservations(params),
    queryFn: async () => (await restoApi.getReservations(params)).data.data,
  });
}

export function useCreateReservation() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (data: Partial<RestoReservation>) =>
      (await restoApi.createReservation(data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['resto', 'reservations'] });
      pushToast({ kind: 'success', title: 'Reservation created' });
    },
  });
}

export function useUpdateReservation() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (args: {
      id: string;
      data: Partial<RestoReservation>;
    }) => (await restoApi.updateReservation(args.id, args.data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['resto', 'reservations'] });
      pushToast({ kind: 'success', title: 'Reservation updated' });
    },
  });
}

export function useRestoCustomers(params?: ListParams) {
  return useQuery({
    queryKey: qk.resto.customers(params),
    queryFn: async () => (await restoApi.getCustomers(params)).data.data,
  });
}

export function useCreateRestoCustomer() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (data: Partial<RestoCustomer>) =>
      (await restoApi.createCustomer(data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['resto', 'customers'] });
      pushToast({ kind: 'success', title: 'Customer added' });
    },
  });
}

export function useUpdateRestoCustomer() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (args: { id: string; data: Partial<RestoCustomer> }) =>
      (await restoApi.updateCustomer(args.id, args.data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['resto', 'customers'] });
      pushToast({ kind: 'success', title: 'Customer updated' });
    },
  });
}

export function useRestoStock(params?: ListParams) {
  return useQuery({
    queryKey: qk.resto.stock(params),
    queryFn: async () => (await restoApi.getStock(params)).data.data,
  });
}

export function useCreateRestoStockItem() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (data: Partial<RestoStockItem>) =>
      (await restoApi.createStockItem(data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['resto', 'stock'] });
      pushToast({ kind: 'success', title: 'Stock item added' });
    },
  });
}

export function useUpdateRestoStockItem() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (args: { id: string; data: Partial<RestoStockItem> }) =>
      (await restoApi.updateStockItem(args.id, args.data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['resto', 'stock'] });
      pushToast({ kind: 'success', title: 'Stock item updated' });
    },
  });
}

export function useDeleteRestoStockItem() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (id: string) =>
      (await restoApi.deleteStockItem(id)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['resto', 'stock'] });
      pushToast({ kind: 'success', title: 'Stock item deleted' });
    },
  });
}

export function useRestoSuppliers(params?: ListParams) {
  return useQuery({
    queryKey: qk.resto.suppliers(params),
    queryFn: async () => (await restoApi.getSuppliers(params)).data.data,
  });
}

export function useCreateRestoSupplier() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (data: Partial<RestoSupplier>) =>
      (await restoApi.createSupplier(data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['resto', 'suppliers'] });
      pushToast({ kind: 'success', title: 'Supplier added' });
    },
  });
}

export function useUpdateRestoSupplier() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (args: { id: string; data: Partial<RestoSupplier> }) =>
      (await restoApi.updateSupplier(args.id, args.data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['resto', 'suppliers'] });
      pushToast({ kind: 'success', title: 'Supplier updated' });
    },
  });
}

export function useRestoEmployees(params?: ListParams) {
  return useQuery({
    queryKey: qk.resto.employees(params),
    queryFn: async () => (await restoApi.getEmployees(params)).data.data,
  });
}

export function useCreateRestoEmployee() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (data: Partial<RestoEmployee>) =>
      (await restoApi.createEmployee(data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['resto', 'employees'] });
      pushToast({ kind: 'success', title: 'Employee added' });
    },
  });
}

export function useUpdateRestoEmployee() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (args: { id: string; data: Partial<RestoEmployee> }) =>
      (await restoApi.updateEmployee(args.id, args.data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['resto', 'employees'] });
      pushToast({ kind: 'success', title: 'Employee updated' });
    },
  });
}

export function useDeleteRestoEmployee() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (id: string) =>
      (await restoApi.deleteEmployee(id)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['resto', 'employees'] });
      pushToast({ kind: 'success', title: 'Employee removed' });
    },
  });
}

export function useRestoPayroll(params?: ListParams) {
  return useQuery({
    queryKey: qk.resto.payroll(params),
    queryFn: async () => (await restoApi.getPayroll(params)).data.data,
  });
}

export function useCreateRestoPayroll() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (data: Partial<RestoPayroll>) =>
      (await restoApi.createPayroll(data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['resto', 'payroll'] });
      pushToast({ kind: 'success', title: 'Payroll entry created' });
    },
  });
}

export function useMarkPayrollPaid() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (id: string) =>
      (await restoApi.markPayrollPaid(id)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['resto', 'payroll'] });
      pushToast({ kind: 'success', title: 'Payroll marked as paid' });
    },
  });
}

export function useRestoExpenses(params?: ListParams) {
  return useQuery({
    queryKey: qk.resto.expenses(params),
    queryFn: async () => (await restoApi.getExpenses(params)).data.data,
  });
}

export function useCreateRestoExpense() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (data: Partial<RestoExpense>) =>
      (await restoApi.createExpense(data)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['resto', 'expenses'] });
      pushToast({ kind: 'success', title: 'Expense recorded' });
    },
  });
}

export function useDeleteRestoExpense() {
  const qc = useQueryClient();
  const pushToast = useUi((s) => s.pushToast);
  return useMutation({
    mutationFn: async (id: string) =>
      (await restoApi.deleteExpense(id)).data.data,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['resto', 'expenses'] });
      pushToast({ kind: 'success', title: 'Expense deleted' });
    },
  });
}

export function useRestoTransactions(params?: ListParams) {
  return useQuery({
    queryKey: qk.resto.transactions(params),
    queryFn: async () => (await restoApi.getTransactions(params)).data.data,
  });
}

export function useRestoReports(params?: ListParams) {
  return useQuery({
    queryKey: qk.resto.reports(params),
    queryFn: async () => (await restoApi.getReports(params)).data.data,
  });
}