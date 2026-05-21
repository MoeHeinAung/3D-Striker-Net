// Version: 1.0.2
import { api } from './api.js';
import type { Draw, DrawCreate } from '../types/draw.js';

export const drawService = {
  list: async () => {
    return await api.get<Draw[]>('/draws/');
  },
  create: async (data: DrawCreate) => {
    return await api.post<Draw>('/draws/', data);
  },
  updateStatus: async (id: number, status: string) => {
    return await api.patch<Draw>(`/draws/${id}`, { status });
  },
  update: async (id: number, data: Partial<Draw>) => {
    return await api.patch<Draw>(`/draws/${id}`, data);
  },
  delete: async (id: number) => {
    return await api.delete<boolean>(`/draws/${id}`);
  }
};
