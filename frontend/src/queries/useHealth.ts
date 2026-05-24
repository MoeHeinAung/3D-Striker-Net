import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api.js';
import type { SuccessEnvelope } from '../types/base.js';

export interface HealthStatus {
  status: string;
  version: string;
  database: string;
}

export const useHealth = () => {
  return useQuery<SuccessEnvelope<HealthStatus>>({
    queryKey: ['health'],
    queryFn: () => api.get('/health'),
  });
};
