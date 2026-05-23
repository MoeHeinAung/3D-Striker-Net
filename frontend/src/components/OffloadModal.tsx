import { useState } from 'react';
import { Modal, Input, Form, InputNumber } from 'antd';

interface OffloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (values: { masterDealerId: string; maxAmount: number; maxTicket: number }) => void;
}

export const OffloadModal = ({ isOpen, onClose, onConfirm }: OffloadModalProps) => {
  const [masterDealerId, setMasterDealerId] = useState('');
  const [maxAmount, setMaxAmount] = useState<number | null>(null);
  const [maxTicket, setMaxTicket] = useState<number | null>(null);

  const handleConfirm = () => {
    if (masterDealerId && maxAmount && maxTicket) {
      onConfirm({ masterDealerId, maxAmount, maxTicket });
      onClose();
    }
  };

  return (
    <Modal
      title="Global Batch Offload"
      open={isOpen}
      onOk={handleConfirm}
      onCancel={onClose}
    >
      <Form layout="vertical">
        <Form.Item label="Master Dealer ID" required>
          <Input 
            value={masterDealerId} 
            onChange={(e) => setMasterDealerId(e.target.value)}
            placeholder="Enter Master Dealer ID"
          />
        </Form.Item>
        <Form.Item label="Max Amount (per ticket)" required>
          <InputNumber 
            value={maxAmount} 
            onChange={(val) => setMaxAmount(val)}
            placeholder="e.g. 250000"
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item label="Max Ticket (count)" required>
          <InputNumber 
            value={maxTicket} 
            onChange={(val) => setMaxTicket(val)}
            placeholder="e.g. 10"
            style={{ width: '100%' }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
