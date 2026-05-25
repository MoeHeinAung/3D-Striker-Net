import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useDashboardMetrics } from '../queries/dashboardQueries';
import styles from '../styles/Dashboard.module.scss';

// Casting to any to bypass TS JSX strictness for this wrapper
const EChartsWrapper = ReactECharts as any;

export const NightingaleChart: React.FC<{ drawId: number }> = ({ drawId }) => {
  const { data: metrics } = useDashboardMetrics(drawId);

  const option = {
    tooltip: { trigger: 'item' },
    series: [
      {
        name: 'Risk Distribution',
        type: 'pie',
        radius: [20, 100],
        roseType: 'area',
        itemStyle: { borderRadius: 5 },
        data: metrics ? [
          { value: metrics.totalSaleAmount, name: 'Total Sale' },
          { value: metrics.totalHouseHoldingAmount, name: 'Holding' },
          { value: metrics.pendingAmount, name: 'Pending' },
          { value: metrics.offloadedAmount, name: 'Offloaded' },
        ] : [],
      },
    ],
  };

  return (
    <div className={styles.nightingaleChart}>
      <EChartsWrapper option={option} style={{ height: '300px', width: '100%' }} />
    </div>
  );
};
