import { Form, Input, InputNumber, Button } from 'antd';

interface SaleFormProps {
  form: any;
  onFinish: (values: any) => void;
  runFormatter: (rawInput: string) => void;
  formattedSales: string;
  warnings: string[];
}

export const SaleForm = ({ form, onFinish, runFormatter, formattedSales, warnings }: SaleFormProps) => (
  <Form form={form} onFinish={onFinish} layout="vertical">
    <Form.Item name="draw_id" label="Draw ID">
      <InputNumber style={{ width: '100%' }} disabled />
    </Form.Item>
    <Form.Item name="agent_id" label="Agent ID" rules={[{ required: true, len: 3 }]}>
      <Input placeholder="ABC" />
    </Form.Item>
    <Form.Item label="Bulk Input">
      <Input.TextArea rows={8} placeholder="123 - 1000" onChange={(e) => runFormatter(e.target.value)} />
    </Form.Item>
    <Form.Item label="Formatted Output (Auto)">
      <Input.TextArea rows={4} value={formattedSales} readOnly />
    </Form.Item>
    {warnings.map((w, i) => <div key={i} style={{ color: 'red' }}>{w}</div>)}
    <Form.Item name="note" label="Note">
      <Input.TextArea />
    </Form.Item>
    <Button type="primary" block htmlType="submit" disabled={warnings.length > 0 || !formattedSales}>
      Submit Sales
    </Button>
  </Form>
);
