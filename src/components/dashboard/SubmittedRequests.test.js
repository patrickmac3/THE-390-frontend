import React from 'react'
import { render, waitFor, screen } from '@testing-library/react'
import DashBoard from './DashBoard'
import { useNavigate } from 'react-router-dom'
import '@testing-library/jest-dom'
// the components that are being mocked
import SendRegistrationButton from '../registrationKey/SendRegistrationButton'
import PropertyContainer from '../property/PropertyContainer'
import Financial from './financial/Financial'
import FinancialPublic from './FinancialPublic'
import SubmittedRequests from './SubmittedRequests'
//needed for dynamically deciding the role of the user per test case
import { useProfile } from '../../utils/hooks/ProfileContext'

// 1) Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // Use the actual react-router-dom module
  useNavigate: jest.fn(), // Provide a Jest mock function for useNavigate
}))
// Mock the implementation of useNavigate
useNavigate.mockImplementation(() => jest.fn())

// 2) Mock the useProfile hook, to by dynamically decided by the test case
jest.mock('../../utils/hooks/ProfileContext')
beforeEach(() => {
  jest.clearAllMocks()
  jest.resetModules()
  jest.resetAllMocks()
  // mock the useProfile hook to return a public role
  useProfile.mockImplementation(() => ({
    role: 'PUBLIC',
    fetchProfileRole: jest.fn().mockImplementation(() => {
      return 'PUBLIC'
    }),
  }))
})
describe('SubmittedRequests component', () => {
  test('renders submitted requests with correct information', () => {
    const { getByText } = render(<SubmittedRequests />)
    expect(getByText('Requests')).toBeInTheDocument()
  })

  test('renders create request button if user is a PUBLIC user', () => {
    const button = screen.queryByText('New Request')
    expect(button).toBeInTheDocument()
  })
})
