import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, type SuccessEnvelope } from '../services/api.js';
import { queryKeys } from './queryKeys.js';

export interface Agent {
  id: string;
  name: string;
  commission: number;
  jp_factor: number;
  sp_factor: number;
  note?: string;
  created_at: string;
}

export const useAgents = () => {
  return useQuery({
    queryKey: queryKeys.agents.all,
    queryFn: async () => {
      const res = await api.get<SuccessEnvelope<Agent[]>>('/agents/');
      return res.data.data;
    },
  });
};

export const useCreateAgent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<Agent, 'created_at'>) => {
      const res = await api.post<SuccessEnvelope<Agent>>('/agents/', data);
      return res.data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.agents.all }),
  });
};

export const useUpdateAgent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, data }: { id: string, data: Record<string, unknown> }) => {
            const res = await api.patch<SuccessEnvelope<Agent>>(`/agents/${id}`, data);
            return res.data.data;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.agents.all }),
    });
};

export const useDeleteAgent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const res = await api.delete<SuccessEnvelope<boolean>>(`/agents/${id}`);
            return res.data.data;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.agents.all }),
    });
};
