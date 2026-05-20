import { useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Tag, App, Popconfirm } from 'antd';
import { useAgents, useCreateAgent, useUpdateAgent, useDeleteAgent } from '../queries/useAgents.js';
import type { Agent } from '../queries/useAgents.js';

export const NetworkPage = () => {
  const { message } = App.useApp();
  const { data, isLoading } = useAgents();
  const createAgent = useCreateAgent();
  const updateAgent = useUpdateAgent();
  const deleteAgent = useDeleteAgent();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [form] = Form.useForm();

  const handleFinish = async (values: any) => {
    try {
      if (editingAgent) {
        await updateAgent.mutateAsync({ id: editingAgent.id, data: values });
        message.success('Agent updated');
      } else {
        await createAgent.mutateAsync(values);
        message.success('Agent created');
      }
      setIsModalVisible(false);
      setEditingAgent(null);
      form.resetFields();
    } catch (e: any) {
      message.error(e.message || 'Action failed');
    }
  };

  const handleDelete = async (id: string) => {
    await deleteAgent.mutateAsync(id);
    message.success('Agent deleted');
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Commission', dataIndex: 'commission', key: 'commission' },
    { title: 'JP Factor', dataIndex: 'jp_factor', key: 'jp_factor' },
    { title: 'SP Factor', dataIndex: 'sp_factor', key: 'sp_factor' },
    { title: 'Note', dataIndex: 'note', key: 'note' },
    {
      title: 'Action',
      key: 'action',
      render: (_: unknown, record: Agent) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button size="small" onClick={() => { 
            setEditingAgent(record); 
            setIsModalVisible(true);
            form.setFieldsValue(record);
          }}>Edit</Button>
          <Popconfirm title="Delete this agent?" onConfirm={() => handleDelete(record.id)}>
             <Button size="small" danger>Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h2>Network: Agents</h2>
        <Button type="primary" onClick={() => {
          setEditingAgent(null);
          form.resetFields();
          setIsModalVisible(true);
        }}>Create Agent</Button>
      </div>
      
      <Table 
        dataSource={Array.isArray(data) ? data : []} 
        columns={columns} 
        rowKey="id" 
        loading={isLoading}
        pagination={false}
      />

      <Modal 
        title={editingAgent ? "Edit Agent" : "Create New Agent"} 
        open={isModalVisible} 
        onCancel={() => { setIsModalVisible(false); setEditingAgent(null); form.resetFields(); }} 
        footer={null}
      >
        <Form 
          form={form} 
          onFinish={handleFinish} 
          layout="vertical"
        >
          <Form.Item name="id" label="ID (3 Letters)" rules={[{ required: true, len: 3, pattern: /^[a-zA-Z]+$/ }]}>
            <Input disabled={!!editingAgent} />
          </Form.Item>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="commission" label="Commission" rules={[{ required: true }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item name="jp_factor" label="JP Factor" rules={[{ required: true }]}>
            <InputNumber step={0.1} />
          </Form.Item>
          <Form.Item name="sp_factor" label="SP Factor" rules={[{ required: true }]}>
            <InputNumber step={0.1} />
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
