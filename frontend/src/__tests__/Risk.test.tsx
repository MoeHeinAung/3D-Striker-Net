import { render, screen } from '@testing-library/react';
import { RiskPage } from '../pages/Risk';
import { useDrawRisk } from '../queries/useRisk';
import { vi, test, expect } from 'vitest';

vi.mock('../queries/useRisk');

test('displays Exceed Amount column in Risk table', () => {
  (useDrawRisk as any).mockReturnValue({
    data: [
      { ticket: '123', holding: 100, offloaded: 50, total_amount: 150, exceed_amount: 25 },
    ],
    isLoading: false,
    error: null,
  });

  render(<RiskPage />);

  const columnHeader = screen.getByText('Exceed Amount');
  expect(columnHeader).toBeInTheDocument();
  
  const cellValue = screen.getByText('25');
  expect(cellValue).toBeInTheDocument();
});
