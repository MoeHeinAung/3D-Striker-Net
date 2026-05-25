import { useState } from 'react';
import { Tabs, Table, Button, Modal, Form, Input, InputNumber, App, Popconfirm, Card } from 'antd';
import { useAgents, useCreateAgent, useUpdateAgent, useDeleteAgent } from '../queries/useAgents.js';
import { useMasterDealers, useCreateMasterDealer, useUpdateMasterDealer, useDeleteMasterDealer } from '../queries/useMasterDealers.js';
import type { Agent } from '../queries/useAgents.js';
import type { MasterDealer } from '../queries/useMasterDealers.js';
import layoutStyles from '../styles/Layout.module.scss';

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
    { title: 'ID', dataIndex: 'id', key: 'id', sorter: (a: Agent | MasterDealer, b: Agent | MasterDealer) => a.id.localeCompare(b.id) },
    { title: 'Name', dataIndex: 'name', key: 'name', sorter: (a: Agent | MasterDealer, b: Agent | MasterDealer) => a.name.localeCompare(b.name) },
  ];

  return (
    <div className={layoutStyles.pageContent}>
      <Card 
        className={layoutStyles.card}
        style={{ gridColumn: '1 / span 5', gridRow: '1 / span 8' }}
        title={
          <Tabs 
            activeKey={activeTab} 
            onChange={setActiveTab}
            items={[
              { key: 'agents', label: 'Agents' },
              { key: 'dealers', label: 'Master Dealers' }
            ]}
          />
        }
        extra={<Button type="primary" onClick={() => { setSelectedEntity(null); setIsModalVisible(true); }}>New</Button>}
      >
        <Table 
          dataSource={data} 
          columns={columns} 
          rowKey="id" 
          pagination={{ pageSize: 8 }}
          onRow={(record) => ({ onClick: () => setSelectedEntity(record as Agent | MasterDealer) })}
        />
      </Card>

      <Card 
        className={layoutStyles.card}
        style={{ gridColumn: '6 / span 7', gridRow: '1 / span 8' }}
        title="Entity Details"
      >
        {selectedEntity ? (
          <div>
            <h3>{selectedEntity.name} ({selectedEntity.id})</h3>
            <p>Commission: {selectedEntity.commission}</p>
            <p>JP Factor: {selectedEntity.jp_factor}</p>
            <p>SP Factor: {selectedEntity.sp_factor}</p>
            <div style={{ display: 'flex', gap: '10px' }}>
                <Button onClick={() => { form.setFieldsValue(selectedEntity); setIsModalVisible(true); }}>Edit</Button>
                <Popconfirm title="Delete?" onConfirm={() => {
                    if (isAgent) deleteAgent.mutate(selectedEntity.id);
                    else deleteDealer.mutate(selectedEntity.id);
                    setSelectedEntity(null);
                }}>
                    <Button danger>Delete</Button>
                </Popconfirm>
            </div>
          </div>
        ) : <p>Select an item to view details</p>}
      </Card>

      <Modal open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
        <Form form={form} onFinish={handleFinish} layout="vertical">
            <Form.Item name="id" label="ID" rules={[{ required: true, len: 3, pattern: /^[a-zA-Z]+$/ }]}><Input /></Form.Item>
            <Form.Item name="name" label="Name" rules={[{ required: true }]}><Input /></Form.Item>
            <Form.Item name="commission" label="Commission" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item>
            <Form.Item name="jp_factor" label="JP Factor" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item>
            <Form.Item name="sp_factor" label="SP Factor" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item>
            <Button type="primary" htmlType="submit">Submit</Button>
        </Form>
      </Modal>
    </div>
  );
};
