import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, type SuccessEnvelope } from '../services/api.js';
import type { Sale } from './useSales.js';
import { queryKeys } from './queryKeys.js';

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
    queryKey: queryKeys.batches.all,
    queryFn: async () => {
      const res = await api.get<SuccessEnvelope<Batch[]>>('/batches/');
      return res.data.data;
    },
  });
};

export const useCreateBatch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { batch_in: Record<string, unknown>, sales_in: Record<string, unknown>[] }) => {
      const res = await api.post<SuccessEnvelope<Batch>>('/batches/', data);
      return res.data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.batches.all }),
  });
};

export const useUpdateBatch = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, note }: { id: number, note: string }) => {
            const res = await api.patch<SuccessEnvelope<Batch>>(`/batches/${id}?note=${encodeURIComponent(note)}`);
            return res.data.data;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.batches.all }),
    });
};

export const useDeleteBatch = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: number) => {
            const res = await api.delete<SuccessEnvelope<null>>(`/batches/${id}`);
            return res.data.data;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.batches.all }),
    });
};
