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
      const res = await api.get('/tickets/winning', { params: { draw_id } });
      return res.data.data || [];
    },
    enabled: !!draw_id,
  });
};

export const useCreateWinningTicket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<WinningTicket, 'id'>) => api.post('/tickets/winning', data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['winning_tickets'] }),
  });
};

export const useDeleteWinningTicket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.delete(`/tickets/winning/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['winning_tickets'] }),
  });
};

export const useBlacklistTickets = () => {
  return useQuery({
    queryKey: ['blacklist_tickets'],
    queryFn: async () => {
      const res = await api.get('/tickets/blacklist');
      return res.data.data || [];
    },
  });
};

export const useCreateBlacklistTicket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<BlacklistTicket, 'id'>) => api.post('/tickets/blacklist', data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blacklist_tickets'] }),
  });
};

export const useDeleteBlacklistTicket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.delete(`/tickets/blacklist/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blacklist_tickets'] }),
  });
};
