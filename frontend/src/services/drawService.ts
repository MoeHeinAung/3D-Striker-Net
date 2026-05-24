// Version: 1.0.1
import { api } from './api.js';
import type { Draw, DrawCreate } from '../types/draw.js';
import type { SuccessEnvelope } from '../types/base.js';

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
  },
  update: async (id: number, data: Partial<Draw>) => {
    const res = await api.patch<SuccessEnvelope<Draw>>(`/draws/${id}`, data);
    return res.data;
  },
  delete: async (id: number) => {
    const res = await api.delete<SuccessEnvelope<boolean>>(`/draws/${id}`);
    return res.data;
  }
};
