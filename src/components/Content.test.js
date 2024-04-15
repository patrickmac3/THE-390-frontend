import React from 'react';
import { render, screen } from '@testing-library/react';
import Content from './Content';
import SignUp from './log/SignUp';
import Login from './log/Login';
import '@testing-library/jest-dom'

jest.mock('./log/SignUp', () => () => <div data-testid="signup-component">SignUp Component</div>);
jest.mock('./log/Login', () => () => <div data-testid="login-component">Login Component</div>);

test('renders Content component with SignUp and Login components', () => {
  render(<Content />);
  expect(screen.getByTestId('signup-component')).toBeInTheDocument();
  expect(screen.getByTestId('login-component')).toBeInTheDocument();
});
