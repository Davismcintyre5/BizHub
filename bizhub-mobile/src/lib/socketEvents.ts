export const SOCKET_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  ERROR: 'error',
  NOTIFICATION: 'notification',
  SALE_CREATED: 'sale:created',
  SESSION_STARTED: 'session:started',
  SESSION_ENDED: 'session:ended',
  ORDER_CREATED: 'order:created',
  ORDER_UPDATED: 'order:updated',
  PAYMENT_RECEIVED: 'payment:received',
  INVENTORY_UPDATED: 'inventory:updated',
} as const;

export type SocketEvent = (typeof SOCKET_EVENTS)[keyof typeof SOCKET_EVENTS];