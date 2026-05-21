import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api.js';

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
    queryKey: ['agents'],
    queryFn: async () => {
      return await api.get('/agents/');
    },
  });
};

export const useCreateAgent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Agent, 'created_at'>) => api.post('/agents/', data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['agents'] }),
  });
};

export const useUpdateAgent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string, data: Record<string, unknown> }) => api.patch(`/agents/${id}`, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['agents'] }),
    });
};

export const useDeleteAgent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => api.delete(`/agents/${id}`),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['agents'] }),
    });
};
