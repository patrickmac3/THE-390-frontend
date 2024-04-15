import React from 'react';
import { render, screen } from '@testing-library/react';
import UserInfo from './UserInfo'; // Adjust the import path according to your project structure
import { useProfile } from '../../utils/hooks/ProfileContext'; // Adjust this import path too
import '@testing-library/jest-dom';
// Mock the useProfile hook
jest.mock('../../utils/hooks/ProfileContext', () => ({
    useProfile: jest.fn()
}));

describe('UserInfo', () => {
    it('displays the user first name', () => {
        // Setup the mock return value for useProfile
        useProfile.mockReturnValue({
            profileInfo: {
                first_name: 'John',
                last_name: 'Doe',
                email: 'john.doe@example.com'
            }
        });

        // Render the component
        render(<UserInfo />);

        // Check if the user's first name is displayed correctly
        expect(screen.getByText('Welcome John')).toBeInTheDocument();
    });

    // Add more tests here if needed, for example, to handle cases where profileInfo might be incomplete or null
});
