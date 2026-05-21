import { api, type SuccessEnvelope } from './api.js';

export interface RiskData {
  ticket: string;
  sum_of_sales_amount: number;
  house_holding_amount: number;
  offloaded_amount: number;
  pending_amount: number;
}

export const riskService = {
  getSummary: async (adminMaxHold: number): Promise<RiskData[]> => {
    const response = await api.get<SuccessEnvelope<RiskData[]>>('/risk/summary', {
      params: { admin_max_hold: adminMaxHold },
    });
    return response.data.data;
  },
  
  // Placeholder for future implementation
  calculateRisk: async (): Promise<unknown> => {
    return null;
  },
  
  // Placeholder for future implementation
  createOffload: async (): Promise<unknown> => {
    return null;
  }
};
