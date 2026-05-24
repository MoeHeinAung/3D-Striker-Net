import { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Button, Select } from 'antd';
import { useCreateWinningTicket, useCreateBlacklistTicket } from '../queries/useTickets';

interface TicketModalProps {
  visible: boolean;
  onClose: () => void;
  type: 'winning' | 'blacklist';
  drawId?: number;
}

export const TicketModal = ({ visible, onClose, type, drawId }: TicketModalProps) => {
  const [form] = Form.useForm();
  const createWinning = useCreateWinningTicket();
  const createBlacklist = useCreateBlacklistTicket();

  useEffect(() => {
    if (visible) {
      form.resetFields();
    }
  }, [visible, form]);

  const handleFinish = async (values: any) => {
    if (!drawId) {
      console.error("No drawId provided to TicketModal");
      return;
    }

    const payload = { ...values, draw_id: drawId };
    console.log("Submitting payload:", payload);

    try {
      if (type === 'winning') {
        await createWinning.mutateAsync(payload);
      } else {
        await createBlacklist.mutateAsync(payload);
      }
      form.resetFields();
      onClose();
    } catch (error) {
      console.error("Failed to create ticket:", error);
    }
  };

  return (
    <Modal 
      title={`Add ${type === 'winning' ? 'Winning' : 'Blacklist'} Ticket`} 
      open={visible} 
      onCancel={onClose} 
      footer={null}
      destroyOnClose
    >
      <Form form={form} onFinish={handleFinish} layout="vertical" preserve={false}>
        <Form.Item name="ticket" label="Ticket (3 digits)" rules={[{ required: true, pattern: /^\d{3}$/ }]}>
          <Input maxLength={3} />
        </Form.Item>
        
        {type === 'winning' && (
          <>
            <Form.Item name="type" label="Type" rules={[{ required: true }]}>
              <Select placeholder="Select type">
                <Select.Option value="JACKPOT">JACKPOT</Select.Option>
                <Select.Option value="MINOR">MINOR</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="amount" label="Amount (Optional)">
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </>
        )}

        {type === 'blacklist' && (
          <Form.Item name="type" label="Type" rules={[{ required: true }]}>
            <Select placeholder="Select type">
              <Select.Option value="HALF">HALF</Select.Option>
              <Select.Option value="BLOCK">BLOCK</Select.Option>
            </Select>
          </Form.Item>
        )}

        <Button type="primary" htmlType="submit" block>Submit</Button>
      </Form>
    </Modal>
  );
};
