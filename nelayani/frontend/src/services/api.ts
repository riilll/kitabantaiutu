// Base API configuration for backend integration

// Mengarahkan BASE_URL ke backend lokal (http://localhost:5000/api)
export const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export async function apiGet<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function apiPost<T>(endpoint: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function apiPut<T>(endpoint: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function apiDelete(endpoint: string): Promise<void> {
  const res = await fetch(`${BASE_URL}${endpoint}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
}