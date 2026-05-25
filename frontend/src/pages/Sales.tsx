import { useState, useRef } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, App, Popconfirm, Card, Typography, Row, Col } from 'antd';
import { useBatches, useCreateBatch, useDeleteBatch } from '../queries/useBatches.js';
import { useDraws } from '../queries/useDraws.js';
import { parseTicketLine, formatParsedTicket, expandTicketPermutations, type ParsedTicket } from '../utils/ticketFormatter.js';
import type { Batch } from '../queries/useBatches.js';
import layoutStyles from '../styles/Layout.module.scss';

const { Text } = Typography;

export const SalesPage = () => {
  const { message } = App.useApp();
  const { data: batches, isLoading } = useBatches();
  const { data: draws } = useDraws();
  const createBatch = useCreateBatch();
  const deleteBatch = useDeleteBatch();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rawInput, setRawInput] = useState('');
  const [formattedSales, setFormattedSales] = useState<(ParsedTicket | null)[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);
  
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const activeDraw = Array.isArray(draws) ? draws.find(d => d.status === 'OPEN') : null;

  const runFormatter = (val: string) => {
    setRawInput(val);
    const lines = val.split('\n');
    const parsed: (ParsedTicket | null)[] = [];
    const newWarnings: string[] = [];

    lines.forEach((line, index) => {
        const result = parseTicketLine(line);
        if (result) {
            if (!result.isValid && !result.isIgnored) {
                newWarnings.push(`Line ${index + 1}: ${result.errorMessage || 'Invalid format'}`);
            }
            parsed.push(result);
        } else {
            parsed.push(null);
        }
    });

    setFormattedSales(parsed);
    setWarnings(newWarnings);
  };

  const handleScroll = (e: any) => {
    if (previewRef.current) {
        previewRef.current.scrollTop = e.target.scrollTop;
    }
  };

  const handleFinish = async (values: any) => {
    try {
      const allSales: { ticket: string; amount: number }[] = [];
      formattedSales.forEach(s => {
        if (s && !s.isIgnored && s.isValid) {
          allSales.push(...expandTicketPermutations(s));
        }
      });

      if (allSales.length === 0) {
        message.warning('No valid sales to submit');
        return;
      }

      const payload = {
        batch_in: {
          draw_id: values.draw_id,
          agent_id: values.agent_id,
          note: values.note,
          total_amount: allSales.reduce((sum, s) => sum + s.amount, 0)
        },
        sales_in: allSales
      };

      await createBatch.mutateAsync(payload);

      message.success('Batch created successfully');
      setIsModalVisible(false);
      setRawInput('');
      setFormattedSales([]);
    } catch (e: any) {
      message.error(e.message || 'Action failed');
    }
  };

  const expandedRowRender = (batch: Batch) => {
    const saleColumns = [
      { title: 'Ticket', dataIndex: 'ticket', key: 'ticket' },
      { title: 'Amount', dataIndex: 'amount', key: 'amount', render: (amt: number) => `฿${amt.toLocaleString()}` },
      { title: 'Created At', dataIndex: 'created_at', key: 'created_at', render: (date: string) => new Date(date).toLocaleString() },
    ];

    return (
      <Table 
        columns={saleColumns} 
        dataSource={batch.sales} 
        pagination={false} 
        rowKey="id" 
        size="small"
      />
    );
  };

  const columns = [
    { title: 'Batch ID', dataIndex: 'id', key: 'id' },
    { title: 'Draw ID', dataIndex: 'draw_id', key: 'draw_id' },
    { title: 'Agent', dataIndex: 'agent_id', key: 'agent_id' },
    { title: 'Total Amount', dataIndex: 'total_amount', key: 'total_amount', render: (amt: number) => <Text strong>฿{amt.toLocaleString()}</Text> },
    { title: 'Tickets Count', key: 'count', render: (_: any, record: Batch) => record.sales?.length || 0 },
    { title: 'Date', dataIndex: 'created_at', key: 'created_at', render: (date: string) => new Date(date).toLocaleString() },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Batch) => (
        <Popconfirm title="Delete this batch and all its sales?" onConfirm={() => deleteBatch.mutate(record.id)}>
          <Button size="small" danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className={layoutStyles.pageContent}>
      <Card 
        className={layoutStyles.card}
        style={{ gridColumn: '1 / -1', gridRow: '1 / span 8' }}
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Sales: Batch Sales</span>
            <Button type="primary" onClick={() => setIsModalVisible(true)} disabled={!activeDraw}>New Bulk Sale</Button>
          </div>
        }
      >
        <Table 
          dataSource={Array.isArray(batches) ? batches : []} 
          columns={columns} 
          rowKey="id" 
          loading={isLoading}
          expandable={{ expandedRowRender }}
          pagination={{ pageSize: 10 }}
          scroll={{ y: 'calc(100vh - 350px)' }}
        />
      </Card>

      <Modal title="Create New Batch Sale" open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null} width={1000}>
        <Form onFinish={handleFinish} layout="vertical" initialValues={{ draw_id: activeDraw?.id }}>
            <Row gutter={16}>
                <Col span={12}><Form.Item name="draw_id" label="Draw ID"><InputNumber style={{ width: '100%' }} disabled /></Form.Item></Col>
                <Col span={12}><Form.Item name="agent_id" label="Agent ID" rules={[{ required: true, len: 3 }]}><Input placeholder="ABC" /></Form.Item></Col>
            </Row>
            
            <Form.Item label="Bulk Editor (Input | Preview)">
                <div style={{ 
                    display: 'flex', 
                    height: '350px', 
                    border: '1px solid #d9d9d9', 
                    borderRadius: '4px',
                    overflow: 'hidden',
                    background: '#000',
                    position: 'relative'
                }}>
                    <textarea 
                        ref={textAreaRef}
                        value={rawInput}
                        onChange={(e) => runFormatter(e.target.value)}
                        onScroll={handleScroll}
                        spellCheck={false}
                        placeholder="123 = 1000\n123 R 1000"
                        style={{ 
                            flex: 1, 
                            border: 'none', 
                            background: 'transparent', 
                            color: '#fff', 
                            padding: '10px', 
                            fontFamily: 'monospace', 
                            fontSize: '14px', 
                            lineHeight: '22px',
                            resize: 'none',
                            outline: 'none',
                            zIndex: 2,
                            whiteSpace: 'pre',
                            overflow: 'auto'
                        }}
                    />
                    <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)', height: '100%', zIndex: 3 }}></div>
                    <div 
                        ref={previewRef}
                        style={{ 
                            flex: 1, 
                            background: '#000', 
                            padding: '10px 0', 
                            fontFamily: 'monospace', 
                            fontSize: '14px', 
                            lineHeight: '22px',
                            overflow: 'hidden',
                            pointerEvents: 'none',
                            zIndex: 1
                        }}
                    >
                        {formattedSales.map((s, i) => (
                            <div key={i} style={{ 
                                height: '22px', 
                                padding: '0 10px',
                                background: (s && !s.isValid && !s.isIgnored) ? 'rgba(255, 0, 0, 0.3)' : 'transparent',
                                color: s?.isIgnored ? '#444' : '#888',
                                whiteSpace: 'nowrap'
                            }}>
                                {s && !s.isIgnored ? formatParsedTicket(s) : (s?.isIgnored ? '--- IGNORED ---' : '')}
                            </div>
                        ))}
                    </div>
                </div>
            </Form.Item>

            {warnings.length > 0 && (
                <div style={{ marginBottom: '1rem', maxHeight: '80px', overflowY: 'auto', background: 'rgba(255,0,0,0.05)', padding: '8px' }}>
                    {warnings.map((w, i) => <div key={i} style={{ color: '#ff4d4f', fontSize: '12px' }}>⚠️ {w}</div>)}
                </div>
            )}

            <Form.Item name="note" label="Batch Note"><Input.TextArea rows={2} /></Form.Item>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
                <Button type="primary" htmlType="submit" disabled={warnings.length > 0 || formattedSales.filter(s => s && !s.isIgnored).length === 0}>
                    Execute Batch Submission
                </Button>
            </div>
        </Form>
      </Modal>
    </div>
  );
};
