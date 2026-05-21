import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api.js';

export interface RiskData {
  ticket: string;
  sum_of_sales_amount: number;
  house_holding_amount: number;
  offloaded_amount: number;
  pending_amount: number;
}

export const useRiskSummary = (adminMaxHold: number, enabled: boolean = true) => {
  return useQuery<RiskData[]>({
    queryKey: ['risk-summary', adminMaxHold],
    queryFn: async () => {
      return await api.get('/risk/summary', {
        params: { admin_max_hold: adminMaxHold },
      });
    },
    enabled: enabled && adminMaxHold > 0,
  });
};
