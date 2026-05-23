import { useState } from 'react';
import { Table, Button, Space } from 'antd';
import { useDrawRisk } from '../queries/useRisk';
import { useOffload } from '../queries/useOffloaded';
import { useUIStore } from '../store/uiStore';
import { OffloadModal } from '../components/OffloadModal';
import { type Risk } from '../types/risk';

const formatTicket = (ticket: string) => ticket;

export const RiskPage = () => {
  const drawId = 1; 
  const { data: riskData, isLoading, error } = useDrawRisk(drawId);
  const { mutate: offload } = useOffload();
  const { offloadPageNo, incrementOffloadPageNo } = useUIStore();
  
  const [modalOpen, setModalOpen] = useState(false);

  const handleBatchOffload = (values: { masterDealerId: string; maxAmount: number; maxTicket: number }) => {
    if (!riskData) return;

    // 1. Identify eligible tickets
    const eligibleTickets = riskData
      .filter((r: Risk) => r.exceed_amount > 0)
      .sort((a: Risk, b: Risk) => b.exceed_amount - a.exceed_amount);

    // 2. Select subset up to maxTicket
    const selectedTickets = eligibleTickets.slice(0, values.maxTicket);

    // 3. Execute offload for each
    selectedTickets.forEach((ticketData: Risk) => {
      const offloadAmount = Math.min(ticketData.exceed_amount, values.maxAmount);
      
      offload({
        draw_id: drawId,
        master_dealer_id: values.masterDealerId,
        page_no: offloadPageNo,
        ticket: ticketData.ticket,
        amount: offloadAmount,
      }, {
        onSuccess: () => {
          incrementOffloadPageNo();
        }
      });
    });
  };

  const columns = [
    { title: 'Ticket', dataIndex: 'ticket', key: 'ticket', render: formatTicket, sorter: (a: Risk, b: Risk) => a.ticket.localeCompare(b.ticket) },
    { title: 'Holding', dataIndex: 'holding', key: 'holding', render: (val?: number) => (val ?? 0).toLocaleString(), sorter: (a: Risk, b: Risk) => (a.holding ?? 0) - (b.holding ?? 0) },
    { title: 'Offloaded', dataIndex: 'offloaded', key: 'offloaded', render: (val?: number) => (val ?? 0).toLocaleString(), sorter: (a: Risk, b: Risk) => (a.offloaded ?? 0) - (b.offloaded ?? 0) },
    { title: 'Total Amount', dataIndex: 'total_amount', key: 'total_amount', render: (val?: number) => (val ?? 0).toLocaleString(), sorter: (a: Risk, b: Risk) => (a.total_amount ?? 0) - (b.total_amount ?? 0) },
    { title: 'Exceed Amount', dataIndex: 'exceed_amount', key: 'exceed_amount', render: (val?: number) => (val ?? 0).toLocaleString(), sorter: (a: Risk, b: Risk) => (a.exceed_amount ?? 0) - (b.exceed_amount ?? 0) },
  ];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading risk data</div>;

  return (
    <div style={{ padding: '24px' }}>
      <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
        <h1>Risk Data for Draw {drawId}</h1>
        <Button type="primary" size="large" onClick={() => setModalOpen(true)}>
          Offload Batch
        </Button>
      </Space>
      
      <Table 
        dataSource={riskData} 
        columns={columns} 
        rowKey="ticket" 
        pagination={{ pageSize: 10 }}
      />
      <OffloadModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onConfirm={handleBatchOffload}
      />
    </div>
  );
};
