import { useQuery } from '@tanstack/react-query';
import { api, type SuccessEnvelope } from '../services/api.js';

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
      const res = await api.get<SuccessEnvelope<RiskData[]>>('/risk/summary', {
        params: { admin_max_hold: adminMaxHold },
      });
      return res.data.data;
    },
    enabled: enabled && adminMaxHold > 0,
  });
};
