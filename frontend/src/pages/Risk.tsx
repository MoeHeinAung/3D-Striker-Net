import React from 'react';
import { Card, InputNumber, Table, Typography } from 'antd';
import { useRiskSummary } from '../queries/useRisk';
import { useUIStore } from '../store/uiStore';
import styles from '../styles/Layout.module.scss';

const { Title } = Typography;

export const RiskPage: React.FC = () => {
  const { adminMaxHold, setAdminMaxHold } = useUIStore();
  
  const columns = [
    { title: 'Ticket', dataIndex: 'ticket', key: 'ticket' },
    { title: 'Sales Amount', dataIndex: 'sum_of_sales_amount', key: 'sum_of_sales_amount' },
    { title: 'House Holding', dataIndex: 'house_holding_amount', key: 'house_holding_amount' },
    { title: 'Offloaded', dataIndex: 'offloaded_amount', key: 'offloaded_amount' },
    { title: 'Pending', dataIndex: 'pending_amount', key: 'pending_amount' },
  ];

  const { data, isLoading } = useRiskSummary(adminMaxHold);

  return (
    <div className={styles.container}>
      <Title level={2}>Risk Management</Title>
      <Card title="Global Configuration" style={{ marginBottom: 20 }}>
        <Typography.Text>Admin/House Max Hold Amount: </Typography.Text>
        <InputNumber 
          value={adminMaxHold} 
          onChange={(val) => {
            if (val !== null) {
              setAdminMaxHold(val);
            }
          }} 
          min={0}
        />
      </Card>
      
      <Table 
        dataSource={data || []} 
        columns={columns} 
        loading={isLoading}
        rowKey="ticket"
      />
    </div>
  );
};

export default RiskPage;
