import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './bootstrap.min-3.css'
import { AuthProvider } from './utils/hooks/AuthContext';
import { ProfileProvider } from './utils/hooks/ProfileContext';
import { PropertyProvider } from './utils/hooks/PropertyContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

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
