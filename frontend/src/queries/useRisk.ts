import { useQuery } from '@tanstack/react-query';
import { riskService, type RiskData } from '../services/riskService.js';
import { queryKeys } from './queryKeys.js';

export const useRiskSummary = (adminMaxHold: number, enabled: boolean = true) => {
  return useQuery<RiskData[]>({
    queryKey: queryKeys.risk.summary(adminMaxHold),
    queryFn: () => riskService.getSummary(adminMaxHold),
    enabled: enabled && adminMaxHold > 0,
  });
};
