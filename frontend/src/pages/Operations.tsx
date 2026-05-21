import { useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, App, Popconfirm, Card, Typography } from 'antd';
import { useBatches, useCreateBatch, useDeleteBatch } from '../queries/useBatches.js';
import { useDraws } from '../queries/useDraws.js';
import { parseTicketLine, formatParsedTicket, expandTicketPermutations, type ParsedTicket } from '../utils/ticketFormatter.js';
import type { Batch } from '../queries/useBatches.js';
import type { Sale } from '../queries/useSales.js';

const { Text } = Typography;

export const OperationsPage = () => {
  const { message } = App.useApp();
  const { data: batches, isLoading } = useBatches();
  const { data: draws } = useDraws();
  const createBatch = useCreateBatch();
  const deleteBatch = useDeleteBatch();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formattedSales, setFormattedSales] = useState<ParsedTicket[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);

  const activeDraw = Array.isArray(draws) ? draws.find(d => d.status === 'OPEN') : null;

  const runFormatter = (rawInput: string) => {
    const lines = rawInput.split('\n');
    const parsed: ParsedTicket[] = [];
    const newWarnings: string[] = [];

    lines.forEach((line, index) => {
        const result = parseTicketLine(line);
        if (result) {
            if (!result.isValid) {
                newWarnings.push(`Line ${index + 1}: ${result.errorMessage || 'Invalid format'}`);
            }
            parsed.push(result);
        }
    });

    setFormattedSales(parsed);
    setWarnings(newWarnings);
  };

  const handleFinish = async (values: any) => {
    try {
      // Expand permutations for all parsed tickets
      const allSales: { ticket: string; amount: number }[] = [];
      formattedSales.forEach(s => {
        allSales.push(...expandTicketPermutations(s));
      });

      const payload = {
        batch_in: {
          draw_id: values.draw_id,
          agent_id: values.agent_id,
          note: values.note,
          total_amount: allSales.reduce((sum, s) => sum + s.amount, 0)
        },
        sales_in: allSales
      };

      await createBatch.mutateAsync(payload);

      message.success('Batch and sales created successfully');
      setIsModalVisible(false);
      setFormattedSales([]);
    } catch (e: any) {
      message.error(e.message || 'Action failed');
    }
  };

  const expandedRowRender = (batch: Batch) => {
    const saleColumns = [
      { title: 'Ticket', dataIndex: 'ticket', key: 'ticket' },
      { title: 'Amount', dataIndex: 'amount', key: 'amount', render: (amt: number) => `฿${amt.toLocaleString()}` },
      { title: 'Created At', dataIndex: 'created_at', key: 'created_at', render: (date: string) => new Date(date).toLocaleString() },
    ];

    return (
      <Table 
        columns={saleColumns} 
        dataSource={batch.sales} 
        pagination={false} 
        rowKey="id" 
        size="small"
      />
    );
  };

  const columns = [
    { title: 'Batch ID', dataIndex: 'id', key: 'id' },
    { title: 'Draw ID', dataIndex: 'draw_id', key: 'draw_id' },
    { title: 'Agent', dataIndex: 'agent_id', key: 'agent_id' },
    { title: 'Total Amount', dataIndex: 'total_amount', key: 'total_amount', render: (amt: number) => <Text strong>฿{amt.toLocaleString()}</Text> },
    { title: 'Tickets Count', key: 'count', render: (_: any, record: Batch) => record.sales?.length || 0 },
    { title: 'Date', dataIndex: 'created_at', key: 'created_at', render: (date: string) => new Date(date).toLocaleString() },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Batch) => (
        <Popconfirm title="Delete this batch and all its sales?" onConfirm={() => deleteBatch.mutate(record.id)}>
          <Button size="small" danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div style={{ padding: '1rem' }}>
      <Card 
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Operations: Batch Sales</span>
            <Button type="primary" onClick={() => setIsModalVisible(true)} disabled={!activeDraw}>New Bulk Sale</Button>
          </div>
        }
      >
        <Table 
          dataSource={Array.isArray(batches) ? batches : []} 
          columns={columns} 
          rowKey="id" 
          loading={isLoading}
          expandable={{ expandedRowRender }}
        />
      </Card>

      <Modal title="Create New Batch Sale" open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null} width={800}>
        <Form onFinish={handleFinish} layout="vertical" initialValues={{ draw_id: activeDraw?.id }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <Form.Item name="draw_id" label="Draw ID"><InputNumber style={{ width: '100%' }} disabled /></Form.Item>
                <Form.Item name="agent_id" label="Agent ID" rules={[{ required: true, len: 3 }]}><Input placeholder="ABC" /></Form.Item>
            </div>
            
            <Form.Item label="Bulk Input (Ticket - Amount)">
                <Input.TextArea 
                  rows={8} 
                  placeholder="Examples:\n123 = 1000\n123 R 1000\n123 = 2000/1000" 
                  onChange={(e) => runFormatter(e.target.value)} 
                />
            </Form.Item>

            <Form.Item label="Output Preview">
                <div style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px', maxHeight: '200px', overflowY: 'auto' }}>
                    {formattedSales.length === 0 && <Text type="secondary">Waiting for input...</Text>}
                    {formattedSales.map((s, i) => (
                        <div key={i}>
                            <Text code>{formatParsedTicket(s)}</Text>
                        </div>
                    ))}
                </div>
            </Form.Item>

            {warnings.length > 0 && (
                <div style={{ marginBottom: '1rem' }}>
                    {warnings.map((w, i) => <div key={i} style={{ color: 'red' }}>⚠️ {w}</div>)}
                </div>
            )}

            <Form.Item name="note" label="Batch Note"><Input.TextArea /></Form.Item>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
                <Button type="primary" htmlType="submit" disabled={warnings.length > 0 || formattedSales.length === 0}>
                    Submit Batch ({formattedSales.length} lines)
                </Button>
            </div>
        </Form>
      </Modal>
    </div>
  );
};
