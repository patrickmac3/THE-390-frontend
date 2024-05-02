import React from 'react'
import { render, screen } from '@testing-library/react'
import Footer from './Footer'
import '@testing-library/jest-dom'

test('renders footer text', () => {
  render(<Footer />)
  expect(screen.getByText(/Copyright © CondoCare/i)).toBeInTheDocument()
})
