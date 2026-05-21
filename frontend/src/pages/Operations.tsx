import { useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, App, Popconfirm } from 'antd';
import { useSales, useCreateSale, useUpdateSale, useDeleteSale } from '../queries/useSales.js';
import type { Sale } from '../queries/useSales.js';

export const OperationsPage = () => {
  const { message } = App.useApp();
  const { data, isLoading } = useSales();
  const createSale = useCreateSale();
  const updateSale = useUpdateSale();
  const deleteSale = useDeleteSale();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingSale, setEditingSale] = useState<Sale | null>(null);
  const [form] = Form.useForm();

  const handleFinish = async (values: Record<string, unknown>) => {
    try {
      if (editingSale) {
        await updateSale.mutateAsync({ id: editingSale.id, data: values });
        message.success('Sale updated');
      } else {
        const bulkText = values.bulk_input as string;
        const lines = bulkText.split('\n');
        
        for (const line of lines) {
          if (!line.trim()) continue;
          const [ticket, amount] = line.split('-').map(s => s.trim());
          if (ticket && amount) {
            await createSale.mutateAsync({
              draw_id: values.draw_id as number,
              agent_id: values.agent_id as string,
              ticket,
              amount: parseFloat(amount),
              note: values.note as string
            });
          }
        }
        message.success('Sales created');
      }
      setIsModalVisible(false);
      setEditingSale(null);
      form.resetFields();
    } catch (e: unknown) {
      const error = e as { message: string };
      message.error(error.message || 'Action failed');
    }
  };

  const handleDelete = async (id: number) => {
    await deleteSale.mutateAsync(id);
    message.success('Sale deleted');
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Draw', dataIndex: 'draw_id', key: 'draw_id' },
    { title: 'Agent', dataIndex: 'agent_id', key: 'agent_id' },
    { title: 'Ticket', dataIndex: 'ticket', key: 'ticket' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' },
    {
      title: 'Action',
      key: 'action',
      render: (_: unknown, record: Sale) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button size="small" onClick={() => { 
            setEditingSale(record); 
            setIsModalVisible(true);
            form.setFieldsValue(record);
          }}>Edit</Button>
          <Popconfirm title="Delete this sale?" onConfirm={() => handleDelete(record.id)}>
             <Button size="small" danger>Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h2>Operations: Sales</h2>
        <Button type="primary" onClick={() => { setEditingSale(null); form.resetFields(); setIsModalVisible(true); }}>Bulk Sale</Button>
      </div>
      
      <Table 
        dataSource={Array.isArray(data) ? data : []} 
        columns={columns} 
        rowKey="id" 
        loading={isLoading}
        pagination={false}
      />

      <Modal open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
        <Form form={form} onFinish={handleFinish} layout="vertical">
            <Form.Item name="draw_id" label="Draw ID" rules={[{ required: true }]}><InputNumber disabled={!!editingSale} /></Form.Item>
            <Form.Item name="agent_id" label="Agent ID" rules={[{ required: true, len: 3 }]}><Input /></Form.Item>
            <Form.Item name="ticket" label="Ticket (000-999)" rules={[{ required: !editingSale, pattern: /^\d{3}$/ }]}><Input disabled={!!editingSale} /></Form.Item>
            <Form.Item name="amount" label="Amount" rules={[{ required: true }]}><InputNumber /></Form.Item>
            {!editingSale && (
                <Form.Item name="bulk_input" label="Bulk Input (ticket - amount)">
                    <Input.TextArea rows={5} placeholder="123 - 1000&#10;456 - 2000" />
                </Form.Item>
            )}
            <Button type="primary" htmlType="submit">Submit</Button>
        </Form>
      </Modal>
    </div>
  );
};
