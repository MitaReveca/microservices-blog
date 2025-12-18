import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // <-- добавь эту строку
import App from '../App';

test('renders Create Post heading', () => {
  render(<App />);
  const heading = screen.getByText(/Create Post/i);
  expect(heading).toBeInTheDocument();
});

test('renders Posts heading', () => {
  render(<App />);
  const heading = screen.getByText(/Posts/i);
  expect(heading).toBeInTheDocument();
});
