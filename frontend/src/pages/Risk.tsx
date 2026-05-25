import { useState } from 'react';
import { Table, Button, Card } from 'antd';
import { useDrawRisk } from '../queries/useRisk.js';
import { useOffload } from '../queries/useOffloaded.js';
import { useUIStore } from '../store/uiStore.js';
import { OffloadModal } from '../components/OffloadModal.js';
import { type Risk } from '../types/risk.js';

const formatTicket = (ticket: string) => ticket;

export const RiskPage = () => {
  const drawId = 1; 
  const { data: riskData, isLoading, error } = useDrawRisk(drawId);
  const { mutate: offload } = useOffload();
  const { offloadPageNo, incrementOffloadPageNo } = useUIStore();
  
  const [modalOpen, setModalOpen] = useState(false);

  const handleBatchOffload = (values: { masterDealerId: string; maxAmount: number; maxTicket: number }) => {
    if (!riskData) return;

    const eligibleTickets = riskData
      .filter((r: Risk) => r.exceed_amount > 0)
      .sort((a: Risk, b: Risk) => b.exceed_amount - a.exceed_amount);

    const selectedTickets = eligibleTickets.slice(0, values.maxTicket);

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
    <>
      <div style={{ gridColumn: '1 / span 8' }}>
        <h1 style={{ margin: 0 }}>Risk Data for Draw {drawId}</h1>
      </div>
      <div style={{ gridColumn: '9 / span 4', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <Button type="primary" size="large" onClick={() => setModalOpen(true)}>
          Offload Batch
        </Button>
      </div>
      
      <div style={{ gridColumn: '1 / -1', gridRow: '2 / span 7', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <Card 
          className="card" 
          style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }} 
          styles={{ body: { flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: 0, padding: 0 } }}
        >
          <Table 
            className="scroll-container"
            dataSource={riskData} 
            columns={columns} 
            rowKey="ticket" 
            size="small"
            pagination={{ pageSize: 10, position: ['bottomLeft'] }}
            style={{ flexGrow: 1, overflow: 'auto' }}
          />
        </Card>
      </div>
      <OffloadModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onConfirm={handleBatchOffload}
      />
    </>
  );
};
