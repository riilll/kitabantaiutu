import { UserRole } from '../types';

export interface LoginCredentials {
  email: string;
  password: string;
  role: UserRole;
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: 'fisherman' | 'buyer';
  // Fisherman-specific
  fishingPort?: string;
  fishingArea?: string;
  fishermanId?: string;
  // Buyer-specific
  address?: string;
  city?: string;
}

export const AuthService = {
  login: async (credentials: LoginCredentials): Promise<{ token: string; role: UserRole }> => {
    // TODO: return apiPost<{ token: string; role: UserRole }>('/auth/login', credentials);
    return Promise.resolve({ token: 'mock-token-' + Date.now(), role: credentials.role });
  },

  register: async (data: RegisterData): Promise<{ token: string; role: UserRole }> => {
    // TODO: return apiPost<{ token: string; role: UserRole }>('/auth/register', data);
    return Promise.resolve({ token: 'mock-token-' + Date.now(), role: data.role });
  },

  logout: async (): Promise<void> => {
    // TODO: return apiPost('/auth/logout', {});
    localStorage.removeItem('nelayani_token');
    return Promise.resolve();
  },

  getProfile: async (): Promise<{ name: string; email: string; role: UserRole }> => {
    // TODO: return apiGet('/auth/profile');
    return Promise.resolve({ name: 'Ahmad Fauzi', email: 'ahmad@email.com', role: 'buyer' });
  },
};
