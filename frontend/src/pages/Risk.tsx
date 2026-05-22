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
      title: 'Total Amount',
      dataIndex: 'total_amount',
      key: 'total_amount',
      render: (amount: number) => amount.toLocaleString(),
    },
  ];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading risk data</div>;

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
