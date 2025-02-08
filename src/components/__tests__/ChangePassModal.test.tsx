import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChangePassModal from '../ChangePassModal';
import { UserContext } from '../../context/UserContext';
import { LanguageLabelsContext } from '../../context/LanguageLabelsContext';
import { CheckListStockContext } from '../../context/CheckListStockContext';
import { IsLoadingContext } from '../../context/IsLoadingContext';
import { MemoryRouter } from 'react-router-dom';

// Mock context values
const mockUser = { 
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
};

const mockLabels = {
    labelsChangePass: {
        change_password: 'Change Password',
        actual_password: 'Current Password',
        new_password: 'New Password',
        confirm_new_password: 'Confirm New Password',
    },
    labelsSaveChanges: {
        save_changes: "Save changes",

    },
    labelsManageForgottenPass: {
      account_recovery: "Recuperación de cuenta",
      confirm_recovery_email: "Para obtener un código de verificación, primero confirme la dirección de correo electrónico de recuperación",
      email: "Correo electrónico",
      verification_code_sent: "Un código de verificación fué enviado a",
      verification_code: "Código de verificación",
      create_new_password: "Crear una nueva contraseña",
      new_password: "Nueva contraseña",
      confirm_password: "Confirmar contraseña",
      password_changed: "Su contraseña ha sido cambiada exitosamente",
    },
};

const mockCheckListStock = {
    checkListStock: [],
    setCheckListStock: jest.fn(),
};

const mockIsLoading = {
    isLoading: {},
    setIsLoading: jest.fn(),
    openBackdrop: false,
    setOpenBackdrop: jest.fn(),
};

// Required wrapper for contexts
const renderWithContexts = (props = {}) => {
    return render(
        <MemoryRouter>
            <UserContext.Provider value={{ user: mockUser, setUser: jest.fn() }}>
                <LanguageLabelsContext.Provider value={mockLabels}>
                    <CheckListStockContext.Provider value={mockCheckListStock}>
                        <IsLoadingContext.Provider value={mockIsLoading}>
                            <ChangePassModal
                                openChangePassModal={true}
                                closeChangePassModal={jest.fn()}
                                {...props}
                            />
                        </IsLoadingContext.Provider>
                    </CheckListStockContext.Provider>
                </LanguageLabelsContext.Provider>
            </UserContext.Provider>
        </MemoryRouter>
    );
};

describe('ChangePassModal Render', () => {
    it('renders the modal with all fields when openChangePassModal is true', () => {
        renderWithContexts();

        // Check the modal title
        expect(screen.getByText(/change password/i)).toBeInTheDocument();

        // // Check the three password fields
        // expect(screen.getByLabelText(/current password/i)).toBeInTheDocument();
        // expect(screen.getByLabelText(/new password/i)).toBeInTheDocument();
        // expect(screen.getByLabelText(/confirm new password/i)).toBeInTheDocument();
    
        // Check the password fields more precisely
        expect(screen.getByLabelText(/current password/i)).toBeInTheDocument();

        const passwordFields = screen.getAllByLabelText(/new password/i);
        expect(passwordFields).toHaveLength(2); // "New Password" and "Confirm New Password"

        expect(passwordFields[0]).toBeInTheDocument(); // "New Password"
        expect(passwordFields[1]).toBeInTheDocument(); // "Confirm New Password"
    });
});
