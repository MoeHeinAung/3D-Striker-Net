import { useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, DatePicker, TimePicker, Tag, App, Popconfirm } from 'antd';
import { useDraws, useCreateDraw, useUpdateDraw, useDeleteDraw } from '../queries/useDraws.js';
import { DrawStatus } from '../types/draw.js';
import type { Draw } from '../types/draw.js';
import dayjs from 'dayjs';

export const DrawsPage = () => {
  const { message } = App.useApp();
  const { data, isLoading } = useDraws();
  const createDraw = useCreateDraw();
  const updateDraw = useUpdateDraw();
  const deleteDraw = useDeleteDraw();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingDraw, setEditingDraw] = useState<Draw | null>(null);
  const [form] = Form.useForm();

  const handleFinish = async (values: Record<string, unknown>) => {
    try {
      if (editingDraw) {
        await updateDraw.mutateAsync({ id: editingDraw.id, data: values });
        message.success('Draw updated');
      } else {
        await createDraw.mutateAsync({
          open_date: (values.open_date as dayjs.Dayjs).format('YYYY-MM-DDTHH:mm:ss'),
          cutoff_time: (values.cutoff_time as dayjs.Dayjs).format('HH:mm'),
          house_holding_amount: values.house_holding_amount as number,
          note: values.note as string,
        });
        message.success('Draw created');
      }
      setIsModalVisible(false);
      setEditingDraw(null);
      form.resetFields();
    } catch (e: unknown) {
      const error = e as { response?: { data?: { error?: { message: string } } } };
      message.error(error.response?.data?.error?.message || 'Action failed');
    }
  };

  const handleDelete = async (id: number) => {
    await deleteDraw.mutateAsync(id);
    message.success('Draw deleted');
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Open Date', dataIndex: 'open_date', key: 'open_date' },
    { title: 'Cutoff', dataIndex: 'cutoff_time', key: 'cutoff_time' },
    { title: 'Note', dataIndex: 'note', key: 'note' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: DrawStatus) => (
        <Tag color={status === 'OPEN' ? 'green' : status === 'CLOSED' ? 'orange' : 'blue'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: unknown, record: Draw) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button size="small" onClick={() => { 
            setEditingDraw(record); 
            setIsModalVisible(true);
            form.setFieldsValue({
              ...record,
              open_date: record.open_date ? dayjs(record.open_date) : null,
              cutoff_time: record.cutoff_time ? dayjs(record.cutoff_time, 'HH:mm') : null
            });
          }}>Edit</Button>
          <Popconfirm title="Delete this draw?" onConfirm={() => handleDelete(record.id)}>
             <Button size="small" danger>Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
        <h2>Operations: Draws</h2>
        <Button type="primary" className="btn-special" onClick={() => {
          setEditingDraw(null);
          form.resetFields();
          setIsModalVisible(true);
        }}>Create Draw</Button>
      </div>
      
      <Table 
        dataSource={Array.isArray(data) ? data : []} 
        columns={columns} 
        rowKey="id" 
        loading={isLoading}
        pagination={false}
      />

      <Modal 
        title={editingDraw ? "Edit Draw" : "Create New Draw"} 
        open={isModalVisible} 
        onCancel={() => { setIsModalVisible(false); setEditingDraw(null); form.resetFields(); }} 
        footer={null}
      >
        <Form 
          form={form} 
          onFinish={handleFinish} 
          layout="vertical"
        >

          <Form.Item name="open_date" label="Open Date" rules={[{ required: true }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item name="cutoff_time" label="Cutoff Time" rules={[{ required: true }]}>
            <TimePicker format="HH:mm" />
          </Form.Item>
          <Form.Item name="house_holding_amount" label="House Holding Amount">
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="status" label="Status">
             <Input />
          </Form.Item>
          <Form.Item name="note" label="Note">
            <Input.TextArea />
          </Form.Item>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form>
      </Modal>
    </div>
  );
};
