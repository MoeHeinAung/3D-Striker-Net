import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface DashboardMetrics {
  totalSaleAmount: number;
  totalHouseHoldingAmount: number;
  pendingAmount: number;
  offloadedAmount: number;
}

const fetchDashboardMetrics = async (): Promise<DashboardMetrics> => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/dashboard/metrics`);
  return data.data;
};

export const useDashboardMetrics = () => {
  return useQuery({
    queryKey: ['dashboardMetrics'],
    queryFn: fetchDashboardMetrics,
  });
};
