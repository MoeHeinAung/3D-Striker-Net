import { useState } from 'react';
import { Table, Button, Card } from 'antd';
import { useWinningTickets, useBlacklistTickets, useDeleteWinningTicket, useDeleteBlacklistTicket } from '../queries/useTickets.js';
import { TicketModal } from '../components/TicketModal.js';
import layoutStyles from '../styles/Layout.module.scss';

export const ReportPage = () => {
  const [ticketModalType, setTicketModalType] = useState<'winning' | 'blacklist' | null>(null);
  const activeDrawId = 1; 
  const { data: winningTickets } = useWinningTickets(activeDrawId);
  const { data: blacklistTickets } = useBlacklistTickets(activeDrawId);
  const deleteWinning = useDeleteWinningTicket();
  const deleteBlacklist = useDeleteBlacklistTicket();

  return (
    <div className={layoutStyles.pageContent}>
      <Card 
        title="Winning Tickets" 
        className={layoutStyles.card}
        style={{ gridColumn: '1 / span 6', gridRow: '1 / span 8' }}
        extra={<Button type="primary" onClick={() => setTicketModalType('winning')}>Add Winning</Button>}
      >
        <Table dataSource={winningTickets} rowKey="id" pagination={{ pageSize: 10 }} columns={[
          { title: 'Ticket', dataIndex: 'ticket' },
          { title: 'Type', dataIndex: 'type' },
          { title: 'Amount', dataIndex: 'amount' },
          { title: 'Action', render: (_:any, r:any) => <Button size="small" danger onClick={() => deleteWinning.mutate({ draw_id: activeDrawId, id: r.id })}>Delete</Button> }
        ]} />
      </Card>

      <Card 
        title="Blacklist" 
        className={layoutStyles.card}
        style={{ gridColumn: '7 / span 6', gridRow: '1 / span 8' }}
        extra={<Button type="primary" onClick={() => setTicketModalType('blacklist')}>Add Blacklisted</Button>}
      >
        <Table dataSource={blacklistTickets} rowKey="id" pagination={{ pageSize: 10 }} columns={[
          { title: 'Ticket', dataIndex: 'ticket' },
          { title: 'Type', dataIndex: 'type' },
          { title: 'Action', render: (_:any, r:any) => <Button size="small" danger onClick={() => deleteBlacklist.mutate({ draw_id: activeDrawId, id: r.id })}>Delete</Button> }
        ]} />
      </Card>

      {ticketModalType && (
        <TicketModal 
          visible={!!ticketModalType} 
          onClose={() => setTicketModalType(null)} 
          type={ticketModalType} 
          drawId={activeDrawId}
        />
      )}
    </div>
  );
};
