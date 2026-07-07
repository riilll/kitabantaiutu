import { Product } from '../types';
import { PRODUCTS as STATIC_PRODUCTS } from '../data';
import { apiGet, apiPost } from './api';

export const ProductService = {
  getAll: async (): Promise<Product[]> => {
    try {
      // Ambil data dari backend
      const backendProducts = await apiGet<Product[]>('/products');
      // Gabungkan data dari backend dengan data statis
      return [...STATIC_PRODUCTS, ...backendProducts];
    } catch (error) {
      console.warn("Menggunakan data lokal karena gagal mengambil dari backend", error);
      return STATIC_PRODUCTS;
    }
  },

  getById: async (id: number): Promise<Product | undefined> => {
    const all = await ProductService.getAll();
    return all.find(p => p.id === id);
  },

  getByFisherman: async (fishermanId: number): Promise<Product[]> => {
    const all = await ProductService.getAll();
    return all.filter(p => p.fishermanId === fishermanId);
  },

  create: async (data: Omit<Product, 'id'>): Promise<Product> => {
    try {
      const response = await apiPost<{ message: string; data: Product }>('/products', data);
      return response.data;
    } catch (error) {
      console.error("Gagal menambah produk ke backend", error);
      throw error;
    }
  },
};