import { Modal, Form, Input, InputNumber, Button } from 'antd';
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

  const handleFinish = async (values: any) => {
    if (type === 'winning') {
      await createWinning.mutateAsync({ ...values, draw_id: drawId });
    } else {
      await createBlacklist.mutateAsync(values);
    }
    form.resetFields();
    onClose();
  };

  return (
    <Modal title={`Add ${type === 'winning' ? 'Winning' : 'Blacklist'} Ticket`} open={visible} onCancel={onClose} footer={null}>
      <Form form={form} onFinish={handleFinish} layout="vertical">
        <Form.Item name="ticket" label="Ticket (3 digits)" rules={[{ required: true, pattern: /^\d{3}$/ }]}>
          <Input maxLength={3} />
        </Form.Item>
        {type === 'winning' && (
          <Form.Item name="amount" label="Amount" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        )}
        {type === 'blacklist' && (
          <Form.Item name="reason" label="Reason">
            <Input />
          </Form.Item>
        )}
        <Button type="primary" htmlType="submit" block>Submit</Button>
      </Form>
    </Modal>
  );
};
