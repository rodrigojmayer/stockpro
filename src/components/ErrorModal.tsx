import { useContext } from 'react';
import { Box,
         Modal, 
         Typography,
        } from '@mui/material';
import { 
         CancelButton, 
        } from './Buttons';
import { useStylesGlobal, modalStyleSaveExternal, modalStyleErrorInternal } from '../Styles'
// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

type ErrorModalProps = {
    openErrorModal: boolean;
    closeErrorModal: (newData?: boolean) => void;
    errorData: string
}
type Language = 0 | 1 | 2 | 3;

type ErrorCode =
  | 'missing_data'
  | 'negative_amount'
  | 'missing_data_user'
  | 'missing_user_name'
  | 'missing_user_access_level'
  | 'missing_user_user'
  | 'missing_user_name_email'
  | 'missing_user_password'
  | 'missing_email'
  | 'confirm_password_must_match'
  | 'missing_terms_and_privacy'
  | 'invalid_email_format'
  | 'email_duplicated'
  | 'user_duplicated'
  | 'user_deleted'
  | 'user_disabled'
  | 'login_failed'
  | 'missing_actual_pass'
  | 'missing_new_pass'
  | 'missing_confirm_new_pass'
  | 'not_confirmed_pass'
  | 'invalid_password'
  | 'email_not_found'
  | 'expired_validation'
  | 'invalid_user_format'
  | 'invalid_pass_format'
  | 'missing_verification_code'
  | 'expired_code_validation'
  | 'invalid_code'
  | 'duplicate_product';

// languagechangessearch
export default function ErrorModal( props: ErrorModalProps) {
    const { openErrorModal, closeErrorModal, errorData } = props;
    const { classes } = useStylesGlobal();
    const { user } = useContext<any>(UserContext);
    // let title = ""
    // let subTitle = ""
    const navigate = useNavigate()
    // Mising, invalid format, duplicated
    // console.log("user: ", user._id==="")
    const errorMessages: Record<Language, Record<ErrorCode, { title: string; subTitle: string }>> = {

        0: {    // English
            missing_data: {title:  'Missing required data', subTitle: 'Name*'},
            negative_amount: {title:  'Shortfall', subTitle: 'The amount cannot be negative'}, 
            missing_data_user: {title:  'Missing required data', subTitle: 'Alias'},
            missing_user_name: {title: 'Missing required data', subTitle: 'Name*'}, 
            missing_user_access_level: {title: 'Missing required data', subTitle: 'Acess level*'}, 
            missing_user_user: {title: 'Missing required data', subTitle: 'User*'}, 
            missing_user_name_email: {title: 'Missing required data', subTitle: 'Username or Email*'}, 
            missing_user_password: {title: 'Missing required data', subTitle: 'Password*'}, 
            missing_email: {title: 'Missing required data', subTitle: 'Email*'}, 
            confirm_password_must_match: {title: 'Confirm password must match', subTitle: 'Confirm password*'}, 
            missing_terms_and_privacy: {title: 'Must accept terms and privacy', subTitle: 'Terms and privacy*'}, 
            invalid_email_format: {title: 'Invalid email format', subTitle: ''}, 
            email_duplicated: {title: '', subTitle: 'Email address already in use'}, 
            user_duplicated: {title: '', subTitle: 'User already in use'}, 
            user_deleted: {title: '', subTitle: 'User deleted'}, 
            user_disabled: {title: '', subTitle: 'User disabled'}, 
            login_failed: {title: 'Login failed', subTitle: 'User or password incorrect'}, 
            missing_actual_pass: {title: 'Missing required data', subTitle: 'Actual password*'}, 
            missing_new_pass: {title: 'Missing required data', subTitle: 'New password*'}, 
            missing_confirm_new_pass: {title: 'Missing required data', subTitle: 'Confirm new password*'}, 
            not_confirmed_pass: {title: 'There is no coincidence', subTitle: 'The password confirmation does not match'}, 
            invalid_password: {title: '', subTitle: 'Actual password incorrect'}, 
            email_not_found: {title: '', subTitle: 'Email not found'}, 
            expired_validation: {title: 'Invalid activation link', subTitle: 'You can sign up again'}, 
            invalid_user_format: {title: 'Invalid user format', subTitle: 'Contains invalid characters'}, 
            invalid_pass_format: {title: 'Invalid password format', subTitle: 'It must have at least 6 characters'}, 
            missing_verification_code: {title: 'Missing required data', subTitle: 'Verification code*'}, 
            expired_code_validation: {title: 'Expired code validation', subTitle: ''}, 
            invalid_code: {title: 'Invalid code validation', subTitle: ''}, 
            duplicate_product: {title: 'Duplicate product', subTitle: 'There is already a product with that name'}
        },
        1: {    // Español
            missing_data: {title: 'Faltan datos requeridos', subTitle: 'Nombre*'}, 
            negative_amount: {title: 'Déficit', subTitle: 'La cantidad no puede ser negativa'}, 
            missing_data_user: {title: 'Faltan datos requeridos', subTitle: 'Alias*'}, 
            missing_user_name: {title: 'Faltan datos requeridos', subTitle: 'Nombre*'}, 
            missing_user_access_level: {title: 'Faltan datos requeridos', subTitle: 'Nivel de acceso*'}, 
            missing_user_user: {title: 'Faltan datos requeridos', subTitle: 'Usuario*'}, 
            missing_user_name_email: {title: 'Faltan datos requeridos', subTitle: 'Usuario o Email*'}, 
            missing_user_password: {title: 'Faltan datos requeridos', subTitle: 'Contraseña*'}, 
            missing_email: {title: 'Faltan datos requeridos', subTitle: 'Email*'}, 
            confirm_password_must_match: {title: 'No hay coincidencia', subTitle: 'Confirmación de contraseña*'}, 
            missing_terms_and_privacy: {title: 'Debe aceptar los términos de privacidad', subTitle: 'Términos de privacidad*'}, 
            invalid_email_format: {title: 'Formato de email inválido', subTitle: ''}, 
            email_duplicated: {title: '', subTitle: 'Email ya está en uso'}, 
            user_duplicated: {title: '', subTitle: 'Usuario ya está en uso'}, 
            user_deleted: {title: '', subTitle: 'Usuario eliminado'}, 
            user_disabled: {title: '', subTitle: 'Usuario deshabilitado'}, 
            login_failed: {title: 'Acceso fallido', subTitle: 'Usuario o contraseña incorrecta'}, 
            missing_actual_pass: {title: 'Faltan datos requeridos', subTitle: 'Contraseña actual*'}, 
            missing_new_pass: {title: 'Faltan datos requeridos', subTitle: 'Nueva contraseña*'}, 
            missing_confirm_new_pass: {title: 'Faltan datos requeridos', subTitle: 'Confirmación de nueva contraseña*'}, 
            not_confirmed_pass: {title: 'No hay coincidencia', subTitle: 'Confirmación de contraseña debe coincidir'}, 
            invalid_password: {title: '', subTitle: 'Contraseña actual incorrecta'}, 
            email_not_found: {title: '', subTitle: 'Email no encontrado'}, 
            expired_validation: {title: 'Enlace de activación inválido', subTitle: 'Puedes registrarte nuevamente'}, 
            invalid_user_format: {title: 'Formato de usuario inválido', subTitle: 'Contiene caracteres inválidos'}, 
            invalid_pass_format: {title: 'Formato de contraseña inválido', subTitle: 'Debe tener al menos 6 caracteres'}, 
            missing_verification_code: {title: 'Faltan datos requeridos', subTitle: 'Código de verificación*'}, 
            expired_code_validation: {title: 'Código vencido', subTitle: ''}, 
            invalid_code: {title: 'Código inválido', subTitle: ''}, 
            duplicate_product: {title: 'Producto duplicado', subTitle: 'Ya existe un producto con ese nombre'}
        },
        2: {    //Danske
            missing_data: {title: 'Mangler nødvendige data', subTitle: 'Navn*'}, 
            negative_amount: {title: 'Underskud', subTitle: 'Beløbet kan ikke være negativt'}, 
            missing_data_user: {title: 'Mangler nødvendige data', subTitle: 'Alias'}, 
            missing_user_name: {title: 'Mangler nødvendige data', subTitle: 'Navn*'}, 
            missing_user_access_level: {title: 'Mangler nødvendige data', subTitle: 'Adgangsniveau*'}, 
            missing_user_user: {title: 'Mangler nødvendige data', subTitle: 'Bruger*'}, 
            missing_user_name_email: {title: 'Mangler nødvendige data', subTitle: 'Brugernavn eller e-mail*'}, 
            missing_user_password: {title: 'Mangler nødvendige data', subTitle: 'Adgangskode*'}, 
            missing_email: {title: 'Mangler nødvendige data', subTitle: 'E-mail*'}, 
            confirm_password_must_match: {title: 'Bekræft adgangskoden skal matche', subTitle: 'Bekræft kodeord*'}, 
            missing_terms_and_privacy: {title: 'Skal acceptere vilkår og privatliv', subTitle: 'Vilkår og privatliv*'}, 
            invalid_email_format: {title: 'Ugyldigt e-mail-format', subTitle: ''}, 
            email_duplicated: {title: '', subTitle: 'Email adressen er allerede i brug'}, 
            user_duplicated: {title: '', subTitle: 'Bruger er allerede i brug'}, 
            user_deleted: {title: '', subTitle: 'Bruger slettet'}, 
            user_disabled: {title: '', subTitle: 'Bruger deaktiveret'}, 
            login_failed: {title: 'Login mislykkedes', subTitle: 'Bruger eller adgangskode er forkert'}, 
            missing_actual_pass: {title: 'Mangler nødvendige data', subTitle: 'Faktisk adgangskode*'}, 
            missing_new_pass: {title: 'Mangler nødvendige data', subTitle: 'Nyt kodeord*'}, 
            missing_confirm_new_pass: {title: 'Mangler nødvendige data', subTitle: 'Bekræft ny adgangskode*'}, 
            not_confirmed_pass: {title: 'Der er ingen tilfældighed', subTitle: 'Adgangskodebekræftelsen stemmer ikke overens'}, 
            invalid_password: {title: '', subTitle: 'Faktisk adgangskode forkert'}, 
            email_not_found: {title: '', subTitle: 'E-mail ikke fundet'}, 
            expired_validation: {title: 'Ugyldigt aktiveringslink', subTitle: 'Du kan tilmelde dig igen'}, 
            invalid_user_format: {title: 'Ugyldigt brugerformat', subTitle: 'Indeholder ugyldige tegn'}, 
            invalid_pass_format: {title: 'Ugyldigt kodeordsformat', subTitle: 'Den skal have mindst 6 tegn'}, 
            missing_verification_code: {title: 'Mangler nødvendige data', subTitle: 'Verifikationskode*'}, 
            expired_code_validation: {title: 'Udløbet kodevalidering', subTitle: ''}, 
            invalid_code: {title: 'Ugyldig kodevalidering', subTitle: 'You can sign up again'}, 
            duplicate_product: {title: 'Duplikatprodukt', subTitle: 'Der findes allerede et produkt med det navn'}
        },
        3: {    //Italiano
            missing_data: {title: 'Dati richiesti mancanti', subTitle: 'Nome*'}, 
            negative_amount: {title: 'Carenza', subTitle: "L'importo non può essere negativo"}, 
            missing_data_user: {title: 'Dati richiesti mancanti', subTitle: 'Alias'}, 
            missing_user_name: {title: 'Dati richiesti mancanti', subTitle: 'Nome*'}, 
            missing_user_access_level: {title: 'Dati richiesti mancanti', subTitle: 'Livello di accesso*'}, 
            missing_user_user: {title: 'Dati richiesti mancanti', subTitle: 'Utente*'}, 
            missing_user_name_email: {title: 'Dati richiesti mancanti', subTitle: 'Nome utente o email*'}, 
            missing_user_password: {title: 'Dati richiesti mancanti', subTitle: "Parola d'ordine*"}, 
            missing_email: {title: 'Dati richiesti mancanti', subTitle: 'E-mail*'}, 
            confirm_password_must_match: {title: 'La password di conferma deve corrispondere', subTitle: 'Conferma password*'}, 
            missing_terms_and_privacy: {title: 'È necessario accettare i termini e la privacy', subTitle: 'Termini e privacy*'}, 
            invalid_email_format: {title: 'Formato email non valido', subTitle: ''}, 
            email_duplicated: {title: '', subTitle: 'Indirizzo email già in uso'}, 
            user_duplicated: {title: '', subTitle: 'Utente già in uso'}, 
            user_deleted: {title: '', subTitle: 'Utente eliminato'}, 
            user_disabled: {title: '', subTitle: 'Utente disabilitato'}, 
            login_failed: {title: 'Accesso non riuscito', subTitle: 'Utente o password errati'}, 
            missing_actual_pass: {title: 'Dati richiesti mancanti', subTitle: 'Password effettiva*'}, 
            missing_new_pass: {title: 'Dati richiesti mancanti', subTitle: 'Nuova password*'}, 
            missing_confirm_new_pass: {title: 'Dati richiesti mancanti', subTitle: 'Conferma la nuova password*'}, 
            not_confirmed_pass: {title: "Non c'è alcuna coincidenza", subTitle: 'La conferma della password non corrisponde'}, 
            invalid_password: {title: '', subTitle: 'Password effettiva errata'}, 
            email_not_found: {title: '', subTitle: 'E-mail non trovata'}, 
            expired_validation: {title: 'Collegamento di attivazione non valido', subTitle: 'Puoi iscriverti di nuovo'}, 
            invalid_user_format: {title: 'Formato utente non valido', subTitle: 'Contiene caratteri non validi'}, 
            invalid_pass_format: {title: 'Formato della password invalido', subTitle: 'Deve contenere almeno 6 caratteri'}, 
            missing_verification_code: {title: 'Dati richiesti mancanti', subTitle: 'Codice di verifica*'}, 
            expired_code_validation: {title: 'Convalida del codice scaduta', subTitle: ''}, 
            invalid_code: {title: 'Convalida del codice non valida', subTitle: ''}, 
            duplicate_product: {title: 'Prodotto duplicato', subTitle: 'Esiste già un prodotto con quel nome'}
        }
    }
    const lang = user.language as Language;
    const code = errorData as ErrorCode;
    const { title, subTitle } = errorMessages[lang][code] ?? { title: '', subTitle: '' };

    const handleCloseErrorModal = () => {

        closeErrorModal()            
        if (errorData === "expired_validation") {
            navigate('/signup')
        }
    }

    return (
        <Modal
        className={classes.modal_external_background}
        open={openErrorModal} 
        onClose={() => handleCloseErrorModal()}
        > 
            <form
                onKeyDown={(e:any) => {
                    if (e.key === "Enter" || e.code === "Space") {
                        e.preventDefault();
                        handleCloseErrorModal();
                        e.stopPropagation() 
                    }
                }}
            >
                <Box sx={modalStyleSaveExternal}>
                    <Box 
                        sx={{ ...modalStyleErrorInternal }}
                        className={`${classes[`_${user.background_color}main_background_color` as keyof typeof classes]} ${classes[`_${user.background_color}modal_color` as keyof typeof classes]}`}
                    >
                        <Typography align="center" variant="h6" >
                            {title}
                        </Typography>
                        <Typography align="center" >
                            {subTitle}
                        </Typography>
                        <Box className={classes.finishButtons}>
                            <CancelButton
                            clicked={() => handleCloseErrorModal()}
                            />
                        </Box> 
                    </Box>
                </Box>
            </form>
        </Modal>
    )
}