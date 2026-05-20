// Version: 1.0.1
import { api } from './api.js';
import type { Draw, DrawCreate } from '../types/draw.js';

export interface SuccessEnvelope<T> {
  success: boolean;
  data: T;
  message: string;
}

export const drawService = {
  list: async () => {
    const res = await api.get<SuccessEnvelope<Draw[]>>('/draws/');
    return res.data;
  },
  create: async (data: DrawCreate) => {
    const res = await api.post<SuccessEnvelope<Draw>>('/draws/', data);
    return res.data;
  },
  updateStatus: async (id: number, status: string) => {
    const res = await api.patch<SuccessEnvelope<Draw>>(`/draws/${id}`, { status });
    return res.data;
  }
};
