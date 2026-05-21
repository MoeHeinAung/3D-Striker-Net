import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, App, Popconfirm } from 'antd';
import { useBatches, useCreateBatch, useDeleteBatch } from '../queries/useBatches.js';
import { useDraws } from '../queries/useDraws.js';
import type { Batch } from '../queries/useBatches.js';

export const OperationsPage = () => {
  const { message } = App.useApp();
  const { data: batches, isLoading } = useBatches();
  const { data: draws } = useDraws();
  const createBatch = useCreateBatch();
  const deleteBatch = useDeleteBatch();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [formattedSales, setFormattedSales] = useState<string>('');
  const [warnings, setWarnings] = useState<string[]>([]);

  const activeDraw = Array.isArray(draws) ? draws.find(d => d.status === 'OPEN') : null;

  useEffect(() => {
    form.setFieldsValue({ draw_id: activeDraw?.id });
  }, [activeDraw, form]);

  const runFormatter = (rawInput: string) => {
    if (!rawInput.trim()) {
        setFormattedSales('');
        setWarnings([]);
        return;
    }

    const lines = rawInput.split('\n');
    const result: string[] = [];
    const newWarnings: string[] = [];

    lines.forEach((line, index) => {
        let text = line.trim();
        if (!text) return;

        const prefix = text.substring(0, 3);
        let body = text.substring(3).replace(/[/\~\+\.\=\s]+$/, '');

        const dualMatch = body.match(/(\d+)[Rr\/\s\=\-\.\+\~]+(\d+)/);
        if (dualMatch) {
            result.push(`${prefix} = ${dualMatch[1]}/${dualMatch[2]}`);
            return;
        }

        if (/[Rr®]/.test(body)) {
            const amt = body.replace(/[^0-9]/g, '');
            if(amt) result.push(`${prefix} R ${amt}`);
            else newWarnings.push(`Line ${index + 1}: Could not extract amount.`);
            return;
        }

        const cleanAmt = body.replace(/[^0-9]/g, '');
        if (cleanAmt) result.push(`${prefix} = ${cleanAmt}`);
        else newWarnings.push(`Line ${index + 1}: Invalid format.`);
    });

    setFormattedSales(result.join('\n'));
    setWarnings(newWarnings);
  };

  const handleFinish = async (values: any) => {
    try {
      const lines = formattedSales.split('\n');
      const salesIn = lines.map(line => {
        const [ticket, amount] = line.split('=');
        return { ticket: ticket.trim(), amount: parseFloat(amount.trim()) };
      });

      await createBatch.mutateAsync({
        batch_in: { draw_id: values.draw_id, agent_id: values.agent_id, note: values.note },
        sales_in: salesIn
      });

      message.success('Batch created successfully');
      setIsModalVisible(false);
      form.resetFields();
      setFormattedSales('');
    } catch (e: any) {
      message.error(e.message || 'Action failed');
    }
  };

  const columns = [
    { title: 'Batch #', dataIndex: 'id', key: 'id', render: (id: number) => `BATCH-${id}` },
    { title: 'Draw ID', dataIndex: 'draw_id', key: 'draw_id' },
    { title: 'Agent', dataIndex: 'agent_id', key: 'agent_id' },
    { title: 'Total Amount', dataIndex: 'total_amount', key: 'total_amount', render: (amt: number) => `฿${amt.toLocaleString()}` },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Batch) => (
        <Popconfirm title="Delete entire batch?" onConfirm={() => deleteBatch.mutate(record.id)}>
          <Button size="small" danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h2>Operations: Sales Batches</h2>
        <Button type="primary" onClick={() => setIsModalVisible(true)} disabled={!activeDraw}>New Bulk Sale</Button>
      </div>
      
      <Table 
        dataSource={Array.isArray(batches) ? batches : []} 
        columns={columns} 
        rowKey="id" 
        loading={isLoading}
        expandable={{
          expandedRowRender: (record) => (
            <Table
              dataSource={record.sales}
              pagination={false}
              size="small"
              columns={[
                { title: 'Ticket', dataIndex: 'ticket', key: 'ticket' },
                { title: 'Amount', dataIndex: 'amount', key: 'amount', render: (amt: number) => `฿${amt.toLocaleString()}` },
                { title: 'Note', dataIndex: 'note', key: 'note' },
              ]}
              rowKey="id"
            />
          ),
        }}
      />

      <Modal title="Create New Batch Sale" open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null} width={800} destroyOnHidden={true} forceRender={true}>
        <Form form={form} onFinish={handleFinish} layout="vertical">
            <Form.Item name="draw_id" label="Draw ID"><InputNumber style={{ width: '100%' }} disabled /></Form.Item>
            <Form.Item name="agent_id" label="Agent ID" rules={[{ required: true, len: 3 }]}><Input placeholder="ABC" /></Form.Item>
            <Form.Item label="Bulk Input">
                <Input.TextArea rows={8} placeholder="123 - 1000" onChange={(e) => runFormatter(e.target.value)} />
            </Form.Item>
            <Form.Item label="Formatted Output (Auto)">
                <Input.TextArea rows={4} value={formattedSales} readOnly />
            </Form.Item>
            {warnings.map((w, i) => <div key={i} style={{ color: 'red' }}>{w}</div>)}
            <Form.Item name="note" label="Note"><Input.TextArea /></Form.Item>
            <Button type="primary" block htmlType="submit" disabled={warnings.length > 0 || !formattedSales}>Submit Batch</Button>
        </Form>
      </Modal>
    </div>
  );
};
