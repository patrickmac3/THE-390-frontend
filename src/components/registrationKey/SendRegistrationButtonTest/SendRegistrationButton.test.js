/*
file dependencies:
* custome hooks:
    - useProperty
* react components:
    - axiosInstance
*/

import React from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SendRegistrationButton from '../SendRegistrationButton.js';
import axiosInstance from '../../../api/axios.js';
import '@testing-library/jest-dom';

// Mocking modules
jest.mock('../../../api/axios', () => ({
    get: jest.fn(),
    post: jest.fn(),
}));

jest.mock('../../../utils/hooks/PropertyContext', () => ({
    useProperty: () => ({
        properties: require('./mockresponse.json'),
    })
}));

describe('SendRegistrationButton', () => {
    beforeEach(() => {
        axiosInstance.get.mockResolvedValue({
            data: { /* ... your mock data ... */ },
        });

        axiosInstance.post.mockResolvedValue({
            data: { /* ... your mock response data ... */ },
        });
    });
    //default test that always is true
    it('true is true', () => {
        expect(true).toBe(true);
    });

    //test to check if the button is rendered
    it('renders the button correctly', () => {
        render(<SendRegistrationButton />);
        const button = screen.getByText('Send a Key');
        expect(button).toBeInTheDocument();
    });
});

