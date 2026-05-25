import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { CountdownTimer } from '../components/CountdownTimer.js';

describe('CountdownTimer', () => {
  it('renders successfully', () => {
    const { getByText } = render(<CountdownTimer />);
    expect(getByText('00:00:00')).toBeDefined();
  });
});
