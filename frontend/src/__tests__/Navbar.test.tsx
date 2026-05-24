import { render, screen } from '@testing-library/react';
import { Navbar } from '../components/Navbar';
import { BrowserRouter } from 'react-router-dom';

test('renders all navigation items correctly', () => {
  render(<BrowserRouter><Navbar /></BrowserRouter>);
  
  // Left items
  expect(screen.getByText(/Draws/i)).toBeInTheDocument();
  expect(screen.getByText(/Partners/i)).toBeInTheDocument();
  expect(screen.getByText(/Sales/i)).toBeInTheDocument();
  
  // Logo / Dashboard
  expect(screen.getByText(/3D-STRIKER-NET/i)).toBeInTheDocument();
  
  // Right items
  expect(screen.getByText(/Risk/i)).toBeInTheDocument();
  expect(screen.getByText(/Report/i)).toBeInTheDocument();
  expect(screen.getByText(/Settings/i)).toBeInTheDocument();
});
