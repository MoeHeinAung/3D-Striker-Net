import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { drawService } from '../services/drawService.js';

export const useDraws = () => useQuery({ 
    queryKey: ['draws'], 
    queryFn: drawService.list 
});

export const useCreateDraw = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: drawService.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['draws'] }),
  });
};

export const useUpdateDrawStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, status }: { id: number, status: string }) => drawService.updateStatus(id, status),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['draws'] }),
    });
};
