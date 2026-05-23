import { render, screen } from '@testing-library/react';
import { RiskPage } from '../pages/Risk';
import { useDrawRisk } from '../queries/useRisk';
import { vi, test, expect } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

vi.mock('../queries/useRisk');

const queryClient = new QueryClient();

test('displays Exceed Amount column in Risk table', () => {
  (useDrawRisk as any).mockReturnValue({
    data: [
      { ticket: '123', holding: 100, offloaded: 50, total_amount: 150, exceed_amount: 25 },
    ],
    isLoading: false,
    error: null,
  });

  render(
    <QueryClientProvider client={queryClient}>
      <RiskPage />
    </QueryClientProvider>
  );

  const columnHeader = screen.getByText('Exceed Amount');
  expect(columnHeader).toBeInTheDocument();
  
  const cellValue = screen.getByText('25');
  expect(cellValue).toBeInTheDocument();
});
