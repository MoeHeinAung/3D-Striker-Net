import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';

export const useDrawRisk = (drawId: number) => {
  return useQuery({
    queryKey: ['risk', drawId],
    queryFn: () => api.get(`/sales/risk/${drawId}`).then(res => res.data ?? []),
    enabled: !!drawId,
  });
};
