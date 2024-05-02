/*
***************************************************************************************************

This component has multiple dependencies that must be mocked in order to render the component.
The dependencies at the time of writing are:

    ** react hooks **
        1- useNavigate
    ** custom hooks **
        2- useProfile
    ** custom react components **
        3- PropertyContainer
        4- FinancialPublic
        5- Financial
        6- SubmittedRequests
        7- SendRegistrationButton
        8- LargeTitle

***************************************************************************************************
*/

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

// 3) Mock the PropertyContainer component
jest.mock('../property/PropertyContainer')

// 4) Mock the Financial component
jest.mock('./financial/Financial')

// 5) Mock the FinancialPublic component
jest.mock('./FinancialPublic')

// 6) Mock the Request component
jest.mock('./SubmittedRequests')

// 7) Mock the sendRegistrationButton component
jest.mock('../registrationKey/SendRegistrationButton.js')

// 8) Mock the LargeTitle component
// mock is not needed since the title doesn't change for this page

// test cases for company user
describe('DashBoard Component', () => {
  // reset the mocks before each test
  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetModules()
    jest.resetAllMocks()
    // mock the useProfile hook to return a company role
    useProfile.mockImplementation(() => ({
      role: 'COMPANY',
      fetchProfileRole: jest.fn().mockImplementation(() => {
        return 'COMPANY'
      }),
    }))
  })

  it('COMPANY. renders without crashing', () => {
    render(<DashBoard />)
  })

  it('COMPANY. renders the title of the property container as "Your Properties"', async () => {
    render(<DashBoard />)
    await waitFor(() => screen.getByText('Your Properties'))
    expect(screen.getByText('Your Properties')).toBeInTheDocument()
  })

  it('COMPANY. renders the button to add a property', async () => {
    render(<DashBoard />)
    await waitFor(() => screen.getByText('Add Property'))
    expect(screen.getByText('Add Property')).toBeInTheDocument()
  })

  // it renders the send a key button if the user is company
  it('COMPANY. renders children components with functioning component calls', () => {
    render(<DashBoard />)
    //renders for company
    expect(SendRegistrationButton).toHaveBeenCalled()
    expect(PropertyContainer).toHaveBeenCalled()
    expect(Financial).toHaveBeenCalled()
    expect(SubmittedRequests).toHaveBeenCalled()
    //doesn't render for company
    expect(FinancialPublic).not.toHaveBeenCalled()
  })
})

// test cases for public user
describe('DashBoard Component', () => {
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

  it('PUBLIC. renders without crashing', () => {
    render(<DashBoard />)
  })

  it('PUBLIC. renders the title of the property container as "Your Properties', async () => {
    render(<DashBoard />)
    await waitFor(() => screen.getByText('Your Properties'))
    expect(screen.getByText('Your Properties')).toBeInTheDocument()
  })

  it('PUBLIC. DOES NOT renders the button to add a property as a company', () => {
    render(<DashBoard />)
    const button = screen.queryByText('Add Property')
    expect(button).not.toBeInTheDocument()
  })
  // it renders the send a key button if the user is company
  it('PUBLIC. renders children components with functioning component calls', () => {
    render(<DashBoard />)
    //doesn't render for public
    expect(SendRegistrationButton).not.toHaveBeenCalled()
    expect(Financial).not.toHaveBeenCalled()
    //renders for public
    expect(PropertyContainer).toHaveBeenCalled()
    expect(FinancialPublic).toHaveBeenCalled()
    expect(SubmittedRequests).toHaveBeenCalled()
  })
})
