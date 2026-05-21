// Version: 1.0.2
import { api, type SuccessEnvelope } from './api.js';
import type { Draw, DrawCreate } from '../types/draw.js';

export const drawService = {
  list: async () => {
    const res = await api.get<SuccessEnvelope<Draw[]>>('/draws/');
    return res.data.data;
  },
  create: async (data: DrawCreate) => {
    const res = await api.post<SuccessEnvelope<Draw>>('/draws/', data);
    return res.data.data;
  },
  updateStatus: async (id: number, status: string) => {
    const res = await api.patch<SuccessEnvelope<Draw>>(`/draws/${id}`, { status });
    return res.data.data;
  },
  update: async (id: number, data: Partial<Draw>) => {
    const res = await api.patch<SuccessEnvelope<Draw>>(`/draws/${id}`, data);
    return res.data.data;
  },
  delete: async (id: number) => {
    const res = await api.delete<SuccessEnvelope<boolean>>(`/draws/${id}`);
    return res.data.data;
  }
};
