import { Fisherman, FishermanReview } from '../types';
import { FISHERMEN as STATIC_FISHERMEN, FISHERMAN_REVIEWS } from '../data';
import { apiGet, apiPut } from './api';

export const FishermanService = {
  getAll: async (): Promise<Fisherman[]> => {
    try {
      // Ambil data nelayan baru dari backend
      const backendFishermen = await apiGet<Fisherman[]>('/fishermen');
      // Gabungkan data statis bawaan dengan nelayan baru
      return [...STATIC_FISHERMEN, ...backendFishermen];
    } catch (error) {
      console.warn("Backend mati, menggunakan data statis.", error);
      return STATIC_FISHERMEN;
    }
  },

  getById: async (id: number): Promise<Fisherman | undefined> => {
    const all = await FishermanService.getAll();
    return all.find(f => f.id === id);
  },

  getReviews: async (fishermanId: number): Promise<FishermanReview[]> => {
    return Promise.resolve(FISHERMAN_REVIEWS[fishermanId] ?? []);
  },

  search: async (query: string, sort: string): Promise<Fisherman[]> => {
    let results = await FishermanService.getAll();
    if (query) results = results.filter(f =>
      f.name.toLowerCase().includes(query.toLowerCase()) ||
      f.location.toLowerCase().includes(query.toLowerCase())
    );
    if (sort === 'rating') results.sort((a, b) => b.rating - a.rating);
    if (sort === 'experience') results.sort((a, b) => b.experience - a.experience);
    if (sort === 'catches') results.sort((a, b) => b.catches - a.catches);
    else results.sort((a, b) => b.reviewCount - a.reviewCount);
    return results;
  },

  getProfile: async () => {
    return apiGet('/fisherman/profile');
  },

  updateProfile: async (data: Partial<Fisherman>): Promise<Fisherman> => {
    const response = await apiPut<{ message: string; data: Fisherman }>('/fisherman/profile', data);
    return response.data;
  },
};