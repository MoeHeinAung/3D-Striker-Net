import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

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
      const { data } = await axios.get(`${API_URL}/risk/summary`, {
        params: { admin_max_hold: adminMaxHold },
      });
      return data;
    },
    enabled: enabled && adminMaxHold > 0,
  });
};
