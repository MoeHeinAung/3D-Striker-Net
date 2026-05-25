import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useDashboardMetrics } from '../queries/dashboardQueries';
import styles from '../styles/Dashboard.module.scss';

// Casting to any to bypass TS JSX strictness for this wrapper
const EChartsWrapper = ReactECharts as any;

export const NightingaleChart: React.FC<{ drawId: number }> = ({ drawId }) => {
  const { data: metrics } = useDashboardMetrics(drawId);

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(20, 25, 40, 0.9)',
      borderColor: '#00F0FF',
      textStyle: { color: '#fff' },
      formatter: '{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      textStyle: { color: '#bac9cc' }
    },
    series: [
      {
        name: 'Risk Distribution',
        type: 'pie',
        radius: ['30%', '80%'],
        center: ['50%', '50%'],
        roseType: 'radius',
        itemStyle: {
          borderRadius: 8,
          borderColor: '#14161C',
          borderWidth: 2
        },
        label: {
          show: true,
          color: '#00F0FF',
          formatter: '{b}\n{d}%',
          fontSize: 12
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold'
          }
        },
        data: metrics ? [
          {
            value: metrics.totalSaleAmount,
            name: 'Total Sale',
            itemStyle: { color: '#00F0FF' }
          },
          {
            value: metrics.totalHouseHoldingAmount,
            name: 'Holding',
            itemStyle: { color: '#00FF9D' }
          },
          {
            value: metrics.pendingAmount,
            name: 'Pending',
            itemStyle: { color: '#FF0055' }
          },
          {
            value: metrics.offloadedAmount,
            name: 'Offloaded',
            itemStyle: { color: '#8A2BE2' }
          },
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
