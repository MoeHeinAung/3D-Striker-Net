import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';

export interface HealthStatus {
  status: string;
  version: string;
  database: string;
}

export interface SuccessEnvelope<T> {
  success: boolean;
  data: T;
  message: string;
}

export const useHealth = () => {
  return useQuery<SuccessEnvelope<HealthStatus>>({
    queryKey: ['health'],
    queryFn: () => api.get('/health'),
  });
};
