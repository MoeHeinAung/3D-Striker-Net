import { useState } from 'react';
import { Table, Button, Card, Typography } from 'antd';
import { useWinningTickets, useBlacklistTickets, useDeleteWinningTicket, useDeleteBlacklistTicket } from '../queries/useTickets.js';
import { TicketModal } from '../components/TicketModal.js';

const { Title } = Typography;

export const ReportPage = () => {
  const [ticketModalType, setTicketModalType] = useState<'winning' | 'blacklist' | null>(null);
  const { data: winningTickets } = useWinningTickets(1); // Assuming 1 for active draw
  const { data: blacklistTickets } = useBlacklistTickets();
  const deleteWinning = useDeleteWinningTicket();
  const deleteBlacklist = useDeleteBlacklistTicket();

  return (
    <div style={{ padding: '1rem' }}>
      <Title level={2}>Report & Ticket Management</Title>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <Card title="Winning Tickets" extra={<Button type="primary" onClick={() => setTicketModalType('winning')}>Add Winning</Button>}>
          <Table dataSource={winningTickets} rowKey="id" columns={[
            { title: 'Ticket', dataIndex: 'ticket' },
            { title: 'Type', dataIndex: 'type' },
            { title: 'Amount', dataIndex: 'amount' },
            { title: 'Action', render: (_:any, r:any) => <Button danger onClick={() => deleteWinning.mutate(r.id)}>Delete</Button> }
          ]} />
        </Card>

        <Card title="Blacklist" extra={<Button type="primary" onClick={() => setTicketModalType('blacklist')}>Add Blacklisted</Button>}>
          <Table dataSource={blacklistTickets} rowKey="id" columns={[
            { title: 'Ticket', dataIndex: 'ticket' },
            { title: 'Type', dataIndex: 'type' },
            { title: 'Action', render: (_:any, r:any) => <Button danger onClick={() => deleteBlacklist.mutate(r.id)}>Delete</Button> }
          ]} />
        </Card>
      </div>

      {ticketModalType && (
        <TicketModal 
          visible={!!ticketModalType} 
          onClose={() => setTicketModalType(null)} 
          type={ticketModalType} 
          drawId={1}
        />
      )}
    </div>
  );
};
