import { describe, it, expect } from 'vitest';
import type { Risk } from '../types/risk';

describe('Risk type', () => {
  it('should have the required fields', () => {
    const risk: Risk = {
      draw_id: 1,
      ticket: 'A123',
      total_amount: 100,
      holding: 50,
      offloaded: 50,
      exceed_amount: 10,
    };
    
    expect(risk.draw_id).toBe(1);
    expect(risk.ticket).toBe('A123');
    expect(risk.total_amount).toBe(100);
    expect(risk.holding).toBe(50);
    expect(risk.offloaded).toBe(50);
    expect(risk.exceed_amount).toBe(10);
  });
});
