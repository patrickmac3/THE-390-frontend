import React from 'react'
import { render, screen } from '@testing-library/react'
import HomeScreen from './HomeScreen'
import { BrowserRouter as Router } from 'react-router-dom'
import '@testing-library/jest-dom'

test('renders welcome message', () => {
  render(
    <Router>
      <HomeScreen />
    </Router>,
  )

  expect(screen.getByText(/Welcome to CondoCare/i)).toBeInTheDocument()
})
