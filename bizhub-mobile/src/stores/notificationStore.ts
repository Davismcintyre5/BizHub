import { create } from 'zustand';

export interface NotificationItem {
  _id: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
  data?: Record<string, unknown>;
}

interface NotificationStore {
  items: NotificationItem[];
  unreadCount: number;

  setItems: (items: NotificationItem[]) => void;
  addItem: (item: NotificationItem) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  clear: () => void;
}

function recompute(items: NotificationItem[]): number {
  return items.filter((i) => !i.read).length;
}

export const useNotifications = create<NotificationStore>((set) => ({
  items: [],
  unreadCount: 0,

  setItems(items) {
    set({ items, unreadCount: recompute(items) });
  },

  addItem(item) {
    set((s) => {
      const items = [item, ...s.items];
      return { items, unreadCount: recompute(items) };
    });
  },

  markRead(id) {
    set((s) => {
      const items = s.items.map((i) =>
        i._id === id ? { ...i, read: true } : i
      );
      return { items, unreadCount: recompute(items) };
    });
  },

  markAllRead() {
    set((s) => {
      const items = s.items.map((i) => ({ ...i, read: true }));
      return { items, unreadCount: 0 };
    });
  },

  clear() {
    set({ items: [], unreadCount: 0 });
  },
}));