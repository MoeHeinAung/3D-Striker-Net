import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api.js';

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
    queryKey: ['sales'],
    queryFn: async () => {
      const res = await api.get('/sales/');
      return res.data;
    },
  });
};

export const useCreateSale = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Sale, 'id' | 'created_at'>) => api.post('/sales/', data),
export const useUpdateSale = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number, data: Record<string, unknown> }) => api.patch(`/sales/${id}`, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['sales'] }),
    });
};

export const useDeleteSale = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => api.delete(`/sales/${id}`),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['sales'] }),
    });
};
