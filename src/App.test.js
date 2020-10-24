import React from 'react';
import { render } from '@testing-library/react';
import Header from './components/Header';

it('render header', () => {
  const { getByText } = render(<Header />);
  const linkElement = getByText(/english/i);

  expect(linkElement).toBeInTheDocument();
});

