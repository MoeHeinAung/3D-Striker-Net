import { useQuery } from '@tanstack/react-query';
import { api, type SuccessEnvelope } from '../services/api.js';

export interface HealthStatus {
  status: string;
  version: string;
  database: string;
}

export const useHealth = () => {
  return useQuery<HealthStatus>({
    queryKey: ['health'],
    queryFn: async () => {
      const res = await api.get<SuccessEnvelope<HealthStatus>>('/health');
      return res.data.data;
    },
  });
};
