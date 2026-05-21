import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { drawService } from '../services/drawService.js';
import { queryKeys } from './queryKeys.js';

export const useDraws = () => useQuery({ 
    queryKey: queryKeys.draws.all, 
    queryFn: drawService.list 
});

export const useCreateDraw = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: drawService.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.draws.all }),
  });
};

export const useUpdateDraw = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number, data: Record<string, unknown> }) => drawService.update(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.draws.all }),
    });
};

export const useDeleteDraw = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => drawService.delete(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.draws.all }),
    });
};

