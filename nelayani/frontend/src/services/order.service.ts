import { OrderData } from '../types';
import { ORDERS_DATA, REVENUE_DATA } from '../data';

export const OrderService = {
  getMyOrders: async (): Promise<OrderData[]> => {
    // TODO: return apiGet<OrderData[]>('/orders/me');
    return Promise.resolve(ORDERS_DATA);
  },

  getById: async (id: string): Promise<OrderData | undefined> => {
    // TODO: return apiGet<OrderData>(`/orders/${id}`);
    return Promise.resolve(ORDERS_DATA.find(o => o.id === id));
  },

  getFishermanRevenue: async (): Promise<{ month: string; revenue: number }[]> => {
    // TODO: return apiGet('/fisherman/revenue');
    return Promise.resolve(REVENUE_DATA);
  },

  getFishermanOrders: async (): Promise<OrderData[]> => {
    // TODO: return apiGet<OrderData[]>('/fisherman/orders');
    return Promise.resolve(ORDERS_DATA);
  },

  updateStatus: async (id: string, status: string): Promise<OrderData> => {
    // TODO: return apiPut<OrderData>(`/orders/${id}/status`, { status });
    const order = ORDERS_DATA.find(o => o.id === id)!;
    return Promise.resolve({ ...order, status });
  },
};
