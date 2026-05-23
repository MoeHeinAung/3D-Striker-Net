import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api.js';

export interface WinningTicket {
  id: number;
  draw_id: number;
  ticket: string;
  amount: number;
}

export interface BlacklistTicket {
  id: number;
  ticket: string;
  reason?: string;
}

export const useWinningTickets = (draw_id?: number) => {
  return useQuery({
    queryKey: ['winning_tickets', draw_id],
    queryFn: async () => {
      const res = await api.get('/winning-tickets/', { params: { draw_id } });
      return res.data.data;
    },
    enabled: !!draw_id,
  });
};

export const useCreateWinningTicket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<WinningTicket, 'id'>) => api.post('/winning-tickets/', data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['winning_tickets'] }),
  });
};

export const useDeleteWinningTicket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.delete(`/winning-tickets/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['winning_tickets'] }),
  });
};

export const useBlacklistTickets = () => {
  return useQuery({
    queryKey: ['blacklist_tickets'],
    queryFn: async () => {
      const res = await api.get('/blacklist-tickets/');
      return res.data.data;
    },
  });
};

export const useCreateBlacklistTicket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<BlacklistTicket, 'id'>) => api.post('/blacklist-tickets/', data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blacklist_tickets'] }),
  });
};

export const useDeleteBlacklistTicket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.delete(`/blacklist-tickets/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blacklist_tickets'] }),
  });
};
