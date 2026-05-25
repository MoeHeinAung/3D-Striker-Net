import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { NightingaleChart } from '../components/NightingaleChart.js';

describe('NightingaleChart', () => {
  it('renders successfully', () => {
    const { getByText } = render(<NightingaleChart />);
    expect(getByText('Nightingale Chart Placeholder')).toBeDefined();
  });
});
