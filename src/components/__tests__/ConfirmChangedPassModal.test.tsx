import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ConfirmChangedPassModal from '../ConfirmChangedPassModal';
import { UserContext } from '../../context/UserContext';
import { LanguageLabelsContext } from '../../context/LanguageLabelsContext';

// Mock the contexts your component uses
const mockUserContext = {
    user: {
        _id: '123abc',
        id: 1,
        id_client: 1,
        name: 'Test',
        last_name: 'User',
        email: 'test@example.com',
        id_access_level: 2,
        user: 'testuser',
        pass: 'password123',
        deleted: false,
        enabled: true,
        ordered_fields: [],
        language: 0,
        background_color: 0, 
        alerts_enabled: true,
    },
};

const mockLabelsContext = {
    labelsManageForgottenPass: {
        password_changed: 'Your password has been successfully changed.',
    },
};

describe('ConfirmChangedPassModal', () => {
    it('renders when open is true', () => {
        render(
            <UserContext.Provider value={mockUserContext}>
                <LanguageLabelsContext.Provider value={mockLabelsContext}>
                    <ConfirmChangedPassModal
                        openConfirmChangedPassModal={true}
                        closeConfirmChangedPassModal={jest.fn()}
                    />
                </LanguageLabelsContext.Provider>
            </UserContext.Provider>
        );

        expect(
            screen.getByText(/your password has been successfully changed/i)
        ).toBeInTheDocument();
    });
});