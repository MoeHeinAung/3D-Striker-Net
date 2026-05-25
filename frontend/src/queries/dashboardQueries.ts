import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';

export interface RiskMetrics {
  totalSaleAmount: number;
  totalHouseHoldingAmount: number;
  pendingAmount: number;
  offloadedAmount: number;
}

export interface NextDraw {
  cutoffDatetime: string;
}

export const useDashboardMetrics = (drawId: number) => {
  return useQuery({
    queryKey: ['dashboard', 'metrics', drawId],
    queryFn: async () => {
      const res = await api.get(`/dashboard/metrics/${drawId}`);
      return (res.data.data as RiskMetrics) || {
        totalSaleAmount: 0,
        totalHouseHoldingAmount: 0,
        pendingAmount: 0,
        offloadedAmount: 0
      };
    },
    enabled: !!drawId,
  });
};

export const useNextDraw = () => {
  return useQuery({
    queryKey: ['dashboard', 'next-draw'],
    queryFn: async () => {
      const res = await api.get('/dashboard/next-draw');
      return (res.data.data as NextDraw) || null;
    },
  });
};
