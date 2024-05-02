import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { useAuth } from './utils/hooks/AuthContext.js'
import App from './App'
import ReactDOM from 'react-dom'
import '@testing-library/jest-dom'

// Mock components that are rendered by routes
jest.mock('./screens/HomeScreen.js', () => () => <div>Home Screen Mock</div>)
jest.mock('./components/Header', () => () => <div>Header Mock</div>)
jest.mock('./components/Footer', () => () => <div>Footer Mock</div>)
jest.mock('./screens/HomeScreen', () => () => <div>Home Screen Mock</div>)
jest.mock('./components/log/Login', () => () => <div>Login Form Mock</div>)
jest.mock('./components/log/SignUp', () => () => <div>Sign Up Form Mock</div>)
jest.mock('./components/userProfile/UserProfile', () => () => (
  <div>User Profile Mock</div>
))
jest.mock('./components/dashboard/DashBoard', () => () => (
  <div>Dashboard Mock</div>
))

// Setup a manual mock of useAuth
jest.mock('./utils/hooks/AuthContext', () => ({
  useAuth: jest.fn(),
}))

describe('App Routing', () => {
  beforeEach(() => {
    const checkAuthStateMock = jest.fn()
    useAuth.mockImplementation(() => ({
      authUser: null,
      isLoggedIn: true,
      checkAuthState: checkAuthStateMock,
    }))
  })
  test('nothing', () => {
    expect(true).toBeTruthy()
  })
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
  })
  // Test routing to the home screen
  it('renders the home screen by default', () => {
    render(<App />)
    expect(screen.getByText('Home Screen Mock')).toBeInTheDocument()
  })
  // Test routing to the header
  it('renders the home screen by default', () => {
    render(<App />)
    expect(screen.getByText('Header Mock')).toBeInTheDocument()
  })
})
