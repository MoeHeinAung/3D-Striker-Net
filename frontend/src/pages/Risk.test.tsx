import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RiskPage from './Risk';

// Mocking useRiskSummary
vi.mock('../queries/useRisk', () => ({
  useRiskSummary: vi.fn(() => ({ data: [], isLoading: false }))
}));

// Mocking the zustand store
const mockSetAdminMaxHold = vi.fn();
vi.mock('../store/uiStore', () => ({
  useUIStore: vi.fn(() => ({
    adminMaxHold: 100,
    setAdminMaxHold: mockSetAdminMaxHold
  }))
}));

describe('RiskPage', () => {
  it('allows entering 0 in the InputNumber field', async () => {
    render(<RiskPage />);
    
    // Find the InputNumber (it's inside an AntD component, usually has an input element)
    const input = screen.getByRole('spinbutton');
    
    // Fire change event with 0
    fireEvent.change(input, { target: { value: 0 } });
    
    // Verify mock was called with 0
    expect(mockSetAdminMaxHold).toHaveBeenCalledWith(0);
  });
});
