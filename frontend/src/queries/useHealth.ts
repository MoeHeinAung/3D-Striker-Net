import { useQuery } from '@tanstack/react-query';
import { api, type SuccessEnvelope } from '../services/api.js';
import { queryKeys } from './queryKeys.js';

export interface HealthStatus {
  status: string;
  version: string;
  database: string;
}

export const useHealth = () => {
  return useQuery<HealthStatus>({
    queryKey: queryKeys.health.all,
    queryFn: async () => {
      const res = await api.get<SuccessEnvelope<HealthStatus>>('/health');
      return res.data.data;
    },
  });
};
