import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api.js';

export interface OffloadedCreate {
    draw_id: number;
    master_dealer_id: string;
    page_no: number;
    ticket: string;
    amount: number;
}

export const useOffload = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: OffloadedCreate) => api.post('/offloaded/', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['risk'] });
    },
  });
};
