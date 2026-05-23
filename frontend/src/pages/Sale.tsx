import { useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, App, Popconfirm } from 'antd';
import { useBatches, useCreateBatch, useUpdateBatch, useDeleteBatch } from '../queries/useBatches.js';
import type { Batch } from '../queries/useBatches.js';

export const SalePage = () => {
  const { message } = App.useApp();
  const { data: batches, isLoading } = useBatches();
  const createBatch = useCreateBatch();
  const updateBatch = useUpdateBatch();
  const deleteBatch = useDeleteBatch();
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingBatch, setEditingBatch] = useState<Batch | null>(null);
  const [form] = Form.useForm();

  const handleFinish = async (values: Record<string, unknown>) => {
    try {
      if (editingBatch) {
        await updateBatch.mutateAsync({ id: editingBatch.id, note: values.note as string });
        message.success('Batch updated');
      } else {
        const bulkText = values.bulk_input as string;
        const lines = bulkText.split('\n');
        const salesIn: Record<string, unknown>[] = [];
        
        for (const line of lines) {
          if (!line.trim()) continue;
          const [ticket, amount] = line.split('-').map(s => s.trim());
          if (ticket && amount) {
            salesIn.push({ ticket, amount: parseFloat(amount), note: values.note as string });
          }
        }
        await createBatch.mutateAsync({
          batch_in: { draw_id: values.draw_id as number, agent_id: values.agent_id as string, note: values.note as string },
          sales_in: salesIn
        });
        message.success('Batch created');
      }
      setIsModalVisible(false);
      setEditingBatch(null);
      form.resetFields();
    } catch (e: unknown) {
      const error = e as { message: string };
      message.error(error.message || 'Action failed');
    }
  };

  const columns = [
    { title: 'Batch #', dataIndex: 'id', key: 'id', render: (id: number) => `BATCH-${id}`, sorter: (a: Batch, b: Batch) => a.id - b.id },
    { title: 'Draw ID', dataIndex: 'draw_id', key: 'draw_id', sorter: (a: Batch, b: Batch) => a.draw_id - b.draw_id },
    { title: 'Agent', dataIndex: 'agent_id', key: 'agent_id', sorter: (a: Batch, b: Batch) => a.agent_id.localeCompare(b.agent_id) },
    { title: 'Total', dataIndex: 'total_amount', key: 'total_amount', render: (amt: number) => `฿${amt.toLocaleString()}`, sorter: (a: Batch, b: Batch) => a.total_amount - b.total_amount },
    {
      title: 'Action',
      key: 'action',
      render: (_: unknown, record: Batch) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button size="small" onClick={() => { setEditingBatch(record); form.setFieldsValue(record); setIsModalVisible(true); }}>Edit</Button>
          <Popconfirm title="Delete batch?" onConfirm={() => deleteBatch.mutate(record.id)}>
            <Button size="small" danger>Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h2>Sales Management</h2>
        <Button type="primary" onClick={() => { setEditingBatch(null); form.resetFields(); setIsModalVisible(true); }}>New Bulk Sale</Button>
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

      <Modal title={editingBatch ? "Edit Batch" : "Create Batch Sale"} open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
        <Form form={form} onFinish={handleFinish} layout="vertical">
            {!editingBatch && (
                <>
                    <Form.Item name="draw_id" label="Draw ID" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item>
                    <Form.Item name="agent_id" label="Agent ID" rules={[{ required: true, len: 3 }]}><Input placeholder="ABC" /></Form.Item>
                    <Form.Item name="bulk_input" label="Bulk Input (ticket - amount)" rules={[{ required: true }]}>
                        <Input.TextArea rows={8} placeholder="123 - 1000&#10;456 - 2000" />
                    </Form.Item>
                </>
            )}
            <Form.Item name="note" label="Batch Note"><Input.TextArea /></Form.Item>
            <Button type="primary" block htmlType="submit">Submit</Button>
        </Form>
      </Modal>
    </div>
  );
};
