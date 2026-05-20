import { useState } from 'react';
import { Layout, Table, Button, Modal, Form, Input, InputNumber, App } from 'antd';
import { useSales, useCreateSale } from '../queries/useSales.js';

export const OperationsPage = () => {
  const { message } = App.useApp();
  const { data, isLoading } = useSales();
  const createSale = useCreateSale();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleFinish = async (values: Record<string, unknown>) => {
    try {
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
      setIsModalVisible(false);
      form.resetFields();
    } catch (e: unknown) {
      const error = e as { message: string };
      message.error(error.message || 'Action failed');
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Draw', dataIndex: 'draw_id', key: 'draw_id' },
    { title: 'Agent', dataIndex: 'agent_id', key: 'agent_id' },
    { title: 'Ticket', dataIndex: 'ticket', key: 'ticket' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h2>Operations: Sales</h2>
        <Button type="primary" onClick={() => setIsModalVisible(true)}>Bulk Sale</Button>
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
            <Form.Item name="draw_id" label="Draw ID" rules={[{ required: true }]}><InputNumber /></Form.Item>
            <Form.Item name="agent_id" label="Agent ID" rules={[{ required: true, len: 3 }]}><Input /></Form.Item>
            <Form.Item name="bulk_input" label="Bulk Input (ticket - amount)" rules={[{ required: true }]}>
                <Input.TextArea rows={5} placeholder="123 - 1000&#10;456 - 2000" />
            </Form.Item>
            <Button type="primary" htmlType="submit">Submit</Button>
        </Form>
      </Modal>
    </div>
  );
};
