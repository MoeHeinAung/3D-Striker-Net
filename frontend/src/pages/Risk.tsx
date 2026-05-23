import { Table } from 'antd';
import { useDrawRisk } from '../queries/useRisk';

// Since 'ticketFormatter' doesn't exist, we use a simple identity function for now
const formatTicket = (ticket: string) => ticket;

export const RiskPage = () => {
  const drawId = 1; // Assuming a drawId of 1 for demonstration
  const { data: riskData, isLoading, error } = useDrawRisk(drawId);

  const columns = [
    {
      title: 'Ticket',
      dataIndex: 'ticket',
      key: 'ticket',
      render: (ticket: string) => formatTicket(ticket),
    },
    {
      title: 'Holding',
      dataIndex: 'holding',
      key: 'holding',
      render: (holding?: number) => (holding ?? 0).toLocaleString(),
    },
    {
      title: 'Offloaded',
      dataIndex: 'offloaded',
      key: 'offloaded',
      render: (offloaded?: number) => (offloaded ?? 0).toLocaleString(),
    },
    {
      title: 'Total Amount',
      dataIndex: 'total_amount',
      key: 'total_amount',
      render: (amount?: number) => (amount ?? 0).toLocaleString(),
    },
    {
      title: 'Exceed Amount',
      dataIndex: 'exceed_amount',
      key: 'exceed_amount',
      render: (amount?: number) => (amount ?? 0).toLocaleString(),
    },
  ];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading risk data</div>;
  if (!Array.isArray(riskData)) return <div>No data available</div>;

  return (
    <div style={{ padding: '24px' }}>
      <h1>Risk Data for Draw {drawId}</h1>
      <Table 
        dataSource={riskData} 
        columns={columns} 
        rowKey="ticket" 
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};
