import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { NightingaleChart } from '../components/NightingaleChart.js';

describe('NightingaleChart', () => {
  it('renders successfully', () => {
    // Note: Since this component fetches data, we are just verifying it mounts correctly.
    // In a full integration test, we'd mock the API/QueryClient.
    const { container } = render(<NightingaleChart drawId={1} />);
    expect(container).toBeDefined();
  });
});
