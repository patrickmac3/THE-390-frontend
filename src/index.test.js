import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './utils/hooks/AuthContext';
import { PropertyProvider } from './utils/hooks/PropertyContext';
import { ProfileProvider } from './utils/hooks/ProfileContext';
import App from './App';
import { act } from 'react-dom/test-utils';
import TestRenderer from 'react-test-renderer'; // ES6

// Mocking the CSS imports as Jest cannot parse CSS.
jest.mock('./index.css', () => {});
jest.mock('./bootstrap.min-3.css', () => {});

describe('Index Component Rendering', () => {
  let container = null;

  beforeEach(() => {
    // Setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    // Cleanup on exiting
    document.body.removeChild(container);
    container = null;
  });

  it('renders without crashing', () => {
    act(() => {
      const root = ReactDOM.createRoot(container);
      root.render(
        <React.StrictMode>
          <AuthProvider>
            <PropertyProvider>
              <ProfileProvider>
                <App />
              </ProfileProvider>
            </PropertyProvider>
          </AuthProvider>
        </React.StrictMode>
      );
    });
  });

  it('renders App and checks for structured tree', () => {
    const testRenderer = TestRenderer.create(
      <React.StrictMode>
        <AuthProvider>
          <PropertyProvider>
            <ProfileProvider>
              <App />
            </ProfileProvider>
          </PropertyProvider>
        </AuthProvider>
      </React.StrictMode>
    );
    expect(testRenderer.toJSON()).toMatchSnapshot(); // This will create a snapshot of your component hierarchy
  });
});
