import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api.js';

export interface MasterDealer {
  id: string;
  name: string;
  commission: number;
  jp_factor: number;
  sp_factor: number;
  note?: string;
  created_at: string;
}

export const useMasterDealers = () => {
  return useQuery({
    queryKey: ['master-dealers'],
    queryFn: async () => {
      return await api.get('/master-dealers/');
    },
  });
};

export const useCreateMasterDealer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<MasterDealer, 'created_at'>) => api.post('/master-dealers/', data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['master-dealers'] }),
  });
};

export const useUpdateMasterDealer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string, data: Record<string, unknown> }) => api.patch(`/master-dealers/${id}`, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['master-dealers'] }),
    });
};

export const useDeleteMasterDealer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => api.delete(`/master-dealers/${id}`),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['master-dealers'] }),
    });
};
