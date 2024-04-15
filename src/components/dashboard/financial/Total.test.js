import React from 'react';
import { render } from '@testing-library/react';
import Total from './Total';
import '@testing-library/jest-dom'

describe('Total component', () => {
  test('renders without crashing', () => {
    render(<Total fee={0} />);
  });

  test('displays total fee correctly', () => {
    const fee = 1000; // Mock fee value

    const { getByText } = render(<Total fee={fee} />);

    // Check if the text "Your Total Fees" is rendered
    expect(getByText('Your Total Fees')).toBeInTheDocument();

    // Check if the total fee value is rendered
    expect(getByText(`$${fee}`)).toBeInTheDocument();
  });

});
