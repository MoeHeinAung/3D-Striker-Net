import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, type SuccessEnvelope } from '../services/api.js';
import { queryKeys } from './queryKeys.js';

export interface Sale {
  id: number;
  draw_id: number;
  agent_id: string;
  ticket: string;
  amount: number;
  note?: string;
  created_at: string;
}

export const useSales = () => {
  return useQuery({
    queryKey: queryKeys.sales.all,
    queryFn: async () => {
      const res = await api.get<SuccessEnvelope<Sale[]>>('/sales/');
      return res.data.data;
    },
  });
};

export const useCreateBatchSale = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: Omit<Sale, 'id' | 'created_at'>[]) => {
            const res = await api.post<SuccessEnvelope<Sale[]>>('/sales/batch', data);
            return res.data.data;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.sales.all }),
    });
};

export const useUpdateSale = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, data }: { id: number, data: Record<string, unknown> }) => {
            const res = await api.patch<SuccessEnvelope<Sale>>(`/sales/${id}`, data);
            return res.data.data;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.sales.all }),
    });
};

export const useDeleteSale = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: number) => {
            const res = await api.delete<SuccessEnvelope<null>>(`/sales/${id}`);
            return res.data.data;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.sales.all }),
    });
};
