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

export const useUpdateDraw = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number, data: any }) => drawService.update(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['draws'] }),
    });
};

export const useDeleteDraw = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => drawService.delete(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['draws'] }),
    });
};

