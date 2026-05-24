import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api.js';
import type { SuccessEnvelope } from '../types/base.js';

export const useDrawRisk = (drawId: number) => {
  return useQuery({
    queryKey: ['risk', drawId],
    queryFn: async () => {
      const res = await api.get<any, SuccessEnvelope<any[]>>(`/sales/risk/${drawId}`);
      return res.data || [];
    },
    enabled: !!drawId,
  });
};
