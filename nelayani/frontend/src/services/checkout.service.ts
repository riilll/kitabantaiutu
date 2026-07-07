import { CartItem, ShippingOption, PaymentOption } from '../types';
import { SHIPPING_OPTIONS, PAYMENT_OPTIONS } from '../data';

export interface CheckoutPayload {
  items: CartItem[];
  shippingOptionId: string;
  paymentMethodId: string;
  address: {
    name: string;
    phone: string;
    email?: string;
    address: string;
    city: string;
    postalCode: string;
    notes?: string;
  };
}

export interface CheckoutResult {
  orderId: string;
  totalPayment: number;
  estimatedArrival: string;
}

export const CheckoutService = {
  getShippingOptions: async (): Promise<ShippingOption[]> => {
    // TODO: return apiGet<ShippingOption[]>('/shipping/options');
    return Promise.resolve(SHIPPING_OPTIONS);
  },

  getPaymentMethods: async (): Promise<PaymentOption[]> => {
    // TODO: return apiGet<PaymentOption[]>('/payment/methods');
    return Promise.resolve(PAYMENT_OPTIONS);
  },

  createOrder: async (payload: CheckoutPayload): Promise<CheckoutResult> => {
    // TODO: return apiPost<CheckoutResult>('/orders', payload);
    return Promise.resolve({
      orderId: `MF-${Math.floor(Math.random() * 9000) + 1000}`,
      totalPayment: payload.items.reduce((s, i) => s + i.product.price * i.kg, 0),
      estimatedArrival: '2-3 hari kerja',
    });
  },
};
