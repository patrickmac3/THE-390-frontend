import React from 'react';
import { render } from '@testing-library/react';
import Financial from './FinancialPublic';
import '@testing-library/jest-dom'

describe('Financial component', () => {
  test('renders without crashing', () => {
    render(<Financial />);
  });
  // Test suite for the Financial component
  test('renders Financial Details heading', () => {
    const { getByText } = render(<Financial />);
    expect(getByText('Financial Details')).toBeInTheDocument();
  });

  test('renders accordion sections for each item in accordionData', () => {
    const { getAllByRole } = render(<Financial />);
    const accordionItems = getAllByRole('button');
    expect(accordionItems).toHaveLength(3);
  });

  test('renders total amount in each accordion section', () => {
    const { getAllByText } = render(<Financial />);
    const totalAmounts = getAllByText('$0.00');
    expect(totalAmounts).toHaveLength(15);
  });

  test('renders total amount in the bottom list group item', () => {
    const { getByText } = render(<Financial />);
    expect(getByText('Total: $0.00')).toBeInTheDocument();
  });
});
