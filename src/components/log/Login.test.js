import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axiosInstance from '../../api/axios';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';
import '@testing-library/jest-dom';
import AxiosMockAdapter from 'axios-mock-adapter';



// Create an instance of the mock adapter
const AxiosMock = new AxiosMockAdapter(axiosInstance);

// Mock the useProperty hook
jest.mock('../../utils/hooks/PropertyContext.js');
jest.mock('../../utils/hooks/AuthContext.js');

describe('Login Content and User API', () => {
    it('assert true is true', async () => {
        expect(true).toBe(true);
    });
});