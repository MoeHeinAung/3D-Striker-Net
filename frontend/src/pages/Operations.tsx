import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, App, Popconfirm } from 'antd';
import { useSales, useCreateBatchSale, useDeleteSale } from '../queries/useSales.js';
import { useDraws } from '../queries/useDraws.js';
import type { Sale } from '../queries/useSales.js';

export const OperationsPage = () => {
  const { message } = App.useApp();
  const { data: sales, isLoading } = useSales();
  const { data: draws } = useDraws();
  const createBatch = useCreateBatchSale();
  const deleteSale = useDeleteSale();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [formattedSales, setFormattedSales] = useState<{ticket: string, amount: number}[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);

  const activeDraw = Array.isArray(draws) ? draws.find(d => d.status === 'OPEN') : null;

  useEffect(() => {
    form.setFieldsValue({ draw_id: activeDraw?.id });
  }, [activeDraw, form]);

  const runFormatter = (rawInput: string) => {
    if (!rawInput.trim()) {
        setFormattedSales([]);
        setWarnings([]);
        return;
    }

    const lines = rawInput.split('\n');
    const result: {ticket: string, amount: number}[] = [];
    const newWarnings: string[] = [];

    lines.forEach((line, index) => {
        let text = line.trim();
        if (!text) return;

        // Simple parse: ticket - amount
        const parts = text.split('-');
        if (parts.length === 2) {
            result.push({ ticket: parts[0].trim(), amount: parseFloat(parts[1].trim()) });
        } else {
            newWarnings.push(`Line ${index + 1}: Invalid format. Use "ticket - amount"`);
        }
    });

    setFormattedSales(result);
    setWarnings(newWarnings);
  };

  const handleFinish = async (values: any) => {
    try {
      const salesIn = formattedSales.map(s => ({
          draw_id: values.draw_id,
          agent_id: values.agent_id,
          ticket: s.ticket,
          amount: s.amount,
          note: values.note
      }));

      await createBatch.mutateAsync(salesIn);

      message.success('Batch created successfully');
      setIsModalVisible(false);
      form.resetFields();
      setFormattedSales([]);
    } catch (e: any) {
      message.error(e.message || 'Action failed');
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Draw ID', dataIndex: 'draw_id', key: 'draw_id' },
    { title: 'Agent', dataIndex: 'agent_id', key: 'agent_id' },
    { title: 'Ticket', dataIndex: 'ticket', key: 'ticket' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount', render: (amt: number) => `฿${amt.toLocaleString()}` },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Sale) => (
        <Popconfirm title="Delete sale?" onConfirm={() => deleteSale.mutate(record.id)}>
          <Button size="small" danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h2>Operations: Sales</h2>
        <Button type="primary" onClick={() => setIsModalVisible(true)} disabled={!activeDraw}>New Bulk Sale</Button>
      </div>
      
      <Table 
        dataSource={Array.isArray(sales?.data) ? sales.data : []} 
        columns={columns} 
        rowKey="id" 
        loading={isLoading}
      />

      <Modal title="Create New Batch Sale" open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null} width={800}>
        <Form form={form} onFinish={handleFinish} layout="vertical">
            <Form.Item name="draw_id" label="Draw ID"><InputNumber style={{ width: '100%' }} disabled /></Form.Item>
            <Form.Item name="agent_id" label="Agent ID" rules={[{ required: true, len: 3 }]}><Input placeholder="ABC" /></Form.Item>
            <Form.Item label="Bulk Input">
                <Input.TextArea rows={8} placeholder="123 - 1000" onChange={(e) => runFormatter(e.target.value)} />
            </Form.Item>
            <Form.Item label="Output Preview">
                <ul>
                    {formattedSales.map((s, i) => <li key={i}>{s.ticket} : {s.amount}</li>)}
                </ul>
            </Form.Item>
            {warnings.map((w, i) => <div key={i} style={{ color: 'red' }}>{w}</div>)}
            <Form.Item name="note" label="Note"><Input.TextArea /></Form.Item>
            <Button type="primary" block htmlType="submit" disabled={warnings.length > 0 || formattedSales.length === 0}>Submit Batch</Button>
        </Form>
      </Modal>
    </div>
  );
};
