import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api.js';
import type { Sale } from './useSales.js';

export interface Batch {
  id: number;
  draw_id: number;
  agent_id: string;
  total_amount: number;
  note?: string;
  created_at: string;
  sales: Sale[];
}

export const useBatches = () => {
  return useQuery({
    queryKey: ['batches'],
    queryFn: async () => {
      return await api.get('/batches/');
    },
  });
};

export const useCreateBatch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { batch_in: Record<string, unknown>, sales_in: Record<string, unknown>[] }) => api.post('/batches/', data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['batches'] }),
  });
};

export const useUpdateBatch = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, note }: { id: number, note: string }) => api.patch(`/batches/${id}?note=${encodeURIComponent(note)}`),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['batches'] }),
    });
};

export const useDeleteBatch = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => api.delete(`/batches/${id}`),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['batches'] }),
    });
};
