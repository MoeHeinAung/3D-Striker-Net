import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, type SuccessEnvelope } from '../services/api.js';
import { queryKeys } from './queryKeys.js';

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
    queryKey: queryKeys.masterDealers.all,
    queryFn: async () => {
      const res = await api.get<SuccessEnvelope<MasterDealer[]>>('/master-dealers/');
      return res.data.data;
    },
  });
};

export const useCreateMasterDealer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<MasterDealer, 'created_at'>) => {
      const res = await api.post<SuccessEnvelope<MasterDealer>>('/master-dealers/', data);
      return res.data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.masterDealers.all }),
  });
};

export const useUpdateMasterDealer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, data }: { id: string, data: Record<string, unknown> }) => {
            const res = await api.patch<SuccessEnvelope<MasterDealer>>(`/master-dealers/${id}`, data);
            return res.data.data;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.masterDealers.all }),
    });
};

export const useDeleteMasterDealer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const res = await api.delete<SuccessEnvelope<null>>(`/master-dealers/${id}`);
            return res.data.data;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.masterDealers.all }),
    });
};
