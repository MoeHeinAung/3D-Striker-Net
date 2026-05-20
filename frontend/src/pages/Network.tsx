import { useState } from 'react';
import { Layout, Tabs, Table, Button, Modal, Form, Input, InputNumber, App, Popconfirm } from 'antd';
import { useAgents, useCreateAgent, useUpdateAgent, useDeleteAgent } from '../queries/useAgents.js';
import { useMasterDealers, useCreateMasterDealer, useUpdateMasterDealer, useDeleteMasterDealer } from '../queries/useMasterDealers.js';
import type { Agent } from '../queries/useAgents.js';
import type { MasterDealer } from '../queries/useMasterDealers.js';

const { Sider, Content } = Layout;

export const NetworkPage = () => {
  const { message } = App.useApp();
  const [activeTab, setActiveTab] = useState('agents');
  const [selectedEntity, setSelectedEntity] = useState<Agent | MasterDealer | null>(null);
  
  const agents = useAgents();
  const dealers = useMasterDealers();
  const createAgent = useCreateAgent();
  const updateAgent = useUpdateAgent();
  const deleteAgent = useDeleteAgent();
  const createDealer = useCreateMasterDealer();
  const updateDealer = useUpdateMasterDealer();
  const deleteDealer = useDeleteMasterDealer();
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const isAgent = activeTab === 'agents';
  const data = isAgent ? (Array.isArray(agents.data) ? agents.data : []) : (Array.isArray(dealers.data) ? dealers.data : []);

  const handleFinish = async (values: Record<string, unknown>) => {
    try {
      if (selectedEntity) {
        if (isAgent) await updateAgent.mutateAsync({ id: selectedEntity.id, data: values });
        else await updateDealer.mutateAsync({ id: selectedEntity.id, data: values });
        message.success('Updated');
      } else {
        if (isAgent) await createAgent.mutateAsync(values as Omit<Agent, 'created_at'>);
        else await createDealer.mutateAsync(values as Omit<MasterDealer, 'created_at'>);
        message.success('Created');
      }
      setIsModalVisible(false);
      setSelectedEntity(null);
      form.resetFields();
    } catch (e: unknown) {
      const error = e as { message: string };
      message.error(error.message || 'Action failed');
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
  ];

  return (
    <Layout style={{ height: '100%', background: 'transparent' }}>
      <Sider width="40%" style={{ background: 'transparent', paddingRight: '1rem' }}>
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          items={[
            { key: 'agents', label: 'Agents' },
            { key: 'dealers', label: 'Master Dealers' }
          ]}
        />
        <Button block type="primary" style={{ marginBottom: '1rem' }} onClick={() => { setSelectedEntity(null); setIsModalVisible(true); }}>
          Create New {isAgent ? 'Agent' : 'Dealer'}
        </Button>
        <Table 
          dataSource={data} 
          columns={columns} 
          rowKey="id" 
          onRow={(record) => ({ onClick: () => setSelectedEntity(record as Agent | MasterDealer) })}
        />
      </Sider>
      <Content style={{ padding: '1rem', background: 'rgba(25, 33, 34, 0.3)' }}>
        {selectedEntity ? (
          <div>
            <h3>{selectedEntity.name} ({selectedEntity.id})</h3>
            <p>Commission: {selectedEntity.commission}</p>
            <p>JP Factor: {selectedEntity.jp_factor}</p>
            <p>SP Factor: {selectedEntity.sp_factor}</p>
            <Button onClick={() => { form.setFieldsValue(selectedEntity); setIsModalVisible(true); }}>Edit</Button>
            <Popconfirm title="Delete?" onConfirm={() => {
                if (isAgent) deleteAgent.mutate(selectedEntity.id);
                else deleteDealer.mutate(selectedEntity.id);
                setSelectedEntity(null);
            }}>
                <Button danger>Delete</Button>
            </Popconfirm>
          </div>
        ) : <p>Select an item to view details</p>}
      </Content>
      <Modal open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
        <Form form={form} onFinish={handleFinish} layout="vertical">
            <Form.Item name="id" label="ID" rules={[{ required: true, len: 3, pattern: /^[a-zA-Z]+$/ }]}><Input /></Form.Item>
            <Form.Item name="name" label="Name" rules={[{ required: true }]}><Input /></Form.Item>
            <Form.Item name="commission" label="Commission" rules={[{ required: true }]}><InputNumber /></Form.Item>
            <Form.Item name="jp_factor" label="JP Factor" rules={[{ required: true }]}><InputNumber /></Form.Item>
            <Form.Item name="sp_factor" label="SP Factor" rules={[{ required: true }]}><InputNumber /></Form.Item>
            <Button type="primary" htmlType="submit">Submit</Button>
        </Form>
      </Modal>
    </Layout>
  );
};
