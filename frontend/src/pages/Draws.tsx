import { useState } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, TimePicker, Tag, message } from 'antd';
import { useDraws, useCreateDraw, useUpdateDrawStatus } from '../queries/useDraws.js';
import { DrawStatus } from '../types/draw.js';
import type { Draw } from '../types/draw.js';
import styles from '../styles/App.module.scss';
import type { Dayjs } from 'dayjs';

export const DrawsPage = () => {
  const { data, isLoading } = useDraws();
  const createDraw = useCreateDraw();
  const updateStatus = useUpdateDrawStatus();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  interface CreateDrawForm {
      open_date: Dayjs;
      cutoff_time: Dayjs;
      note?: string;
  }

  const handleCreate = async (values: CreateDrawForm) => {
    try {
      await createDraw.mutateAsync({
        open_date: values.open_date.format('YYYY-MM-DDTHH:mm:ss'),
        cutoff_time: values.cutoff_time.format('HH:mm'),
        note: values.note,
      });
      setIsModalVisible(false);
      form.resetFields();
      message.success('Draw created successfully');
    } catch (error: unknown) {
      const messageText = error instanceof Error ? error.message : 'Failed to create draw';
      message.error(messageText);
    }
  };

  const handleStatusChange = async (id: number, status: DrawStatus) => {
    await updateStatus.mutateAsync({ id, status });
    message.success(`Draw status updated to ${status}`);
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Open Date', dataIndex: 'open_date', key: 'open_date' },
    { title: 'Cutoff', dataIndex: 'cutoff_time', key: 'cutoff_time' },
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
        record.status === 'OPEN' && (
          <Button size="small" onClick={() => handleStatusChange(record.id, DrawStatus.CLOSED)}>
            Close
          </Button>
        )
      ),
    },
  ];

  return (
    <div className={styles.bentoItem}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h2>Draws Management</h2>
        <Button type="primary" onClick={() => setIsModalVisible(true)}>Create Draw</Button>
      </div>
      
      <Table 
        dataSource={data?.data || []} 
        columns={columns} 
        rowKey="id" 
        loading={isLoading}
        pagination={false}
      />

      <Modal title="Create New Draw" open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
        <Form form={form} onFinish={handleCreate} layout="vertical">
          <Form.Item name="open_date" label="Open Date" rules={[{ required: true }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item name="cutoff_time" label="Cutoff Time" rules={[{ required: true }]}>
            <TimePicker format="HH:mm" />
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
