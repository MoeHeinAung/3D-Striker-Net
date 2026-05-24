import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api.js';
import type { SuccessEnvelope } from '../types/base.js';

export interface WinningTicket {
  id: number;
  draw_id: number;
  ticket: string;
  type: 'JACKPOT' | 'MINOR';
  amount?: number;
}

export interface BlacklistTicket {
  id: number;
  draw_id: number;
  ticket: string;
  type: 'HALF' | 'BLOCK';
}

export const useWinningTickets = (draw_id?: number) => {
  return useQuery({
    queryKey: ['winning_tickets', draw_id],
    queryFn: async () => {
      if (!draw_id) return [];
      const res = await api.get<any, SuccessEnvelope<WinningTicket[]>>(`/draws/${draw_id}/winning-tickets`);
      return res.data || [];
    },
    enabled: !!draw_id,
  });
};

export const useCreateWinningTicket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<WinningTicket, 'id'>) => api.post(`/draws/${data.draw_id}/winning-tickets`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['winning_tickets'] }),
  });
};

export const useDeleteWinningTicket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { draw_id: number; id: number }) => api.delete(`/draws/${data.draw_id}/winning-tickets/${data.id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['winning_tickets'] }),
  });
};

export const useBlacklistTickets = (draw_id?: number) => {
  return useQuery({
    queryKey: ['blacklist_tickets', draw_id],
    queryFn: async () => {
      if (!draw_id) return [];
      const res = await api.get<any, SuccessEnvelope<BlacklistTicket[]>>(`/draws/${draw_id}/blacklist-tickets`);
      return res.data || [];
    },
    enabled: !!draw_id,
  });
};

export const useCreateBlacklistTicket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<BlacklistTicket, 'id'>) => api.post(`/draws/${data.draw_id}/blacklist-tickets`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blacklist_tickets'] }),
  });
};

export const useDeleteBlacklistTicket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { draw_id: number; id: number }) => api.delete(`/draws/${data.draw_id}/blacklist-tickets/${data.id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blacklist_tickets'] }),
  });
};
