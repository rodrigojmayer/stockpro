import { createContext, useEffect, useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export const LanguageLabelsContext = createContext<Object | undefined>(undefined);

type LanguageLabelsProviderProps = {
  children: React.ReactNode;
};
  
// languagechangessearch
export const LanguageLabelsProvider: React.FC<LanguageLabelsProviderProps> = ({ children }) => {
  const { user } = useContext<any>(UserContext);

  const [labelsMainSearch, setLabelsMainSearch] = useState({}); // New state for loading status
  const [labelsMenuOptions, setLabelsMenuOptions] = useState({}); // New state for loading status
  const [labelsTableProducts, setLabelsTableProducts] = useState({}); // New state for loading status
  const [labelsProfile, setLabelsProfile] = useState({}); // New state for loading status
  const [labelsChangePass, setLabelsChangePass] = useState({}); // New state for loading status
  const [labelsPreferences, setLabelsPreferences] = useState({}); // New state for loading status
  const [labelsUsers, setLabelsUsers] = useState({}); // New state for loading status
  const [labelsManageStock, setLabelsManageStock] = useState({}); // New state for loading status
  const [labelsMassiveUpdateStock, setLabelsMassiveUpdateStock] = useState({}); // New state for loading status
  const [labelsManageUser, setLabelsManageUser] = useState({}); // New state for loading status
  const [labelsUpdateAmountStock, setLabelsUpdateAmountStock] = useState({}); // New state for loading status
  const [labelsCustomFields, setLabelsCustomFields] = useState({}); // New state for loading status
  const [labelsSaveChanges, setLabelsSaveChanges] = useState({}); // New state for loading status
  const [labelsLogin, setLabelsLogin] = useState({}); // New state for loading status
  const [labelsSignUp, setLabelsSignUp] = useState({}); // New state for loading status
  const [labelsConfirmTermsAndPrivacy, setLabelsConfirmTermsAndPrivacy] = useState({}); // New state for loading status
  const [labelsManageForgottenPass, setLabelsManageForgottenPass] = useState({}); // New state for loading status
  const [labelsConfirmDeleteModal, setLabelsConfirmDeleteModal] = useState({}); // New state for loading status
  

  useEffect(() => {
    if (user.language === 0) {
      setLabelsMainSearch({
        global_search: "Global search..."
      });
      setLabelsMenuOptions({
        profile: "Profile",
        preferences: "Preferences",
        logout: "Log out",
        users: "Users",
      });
      setLabelsTableProducts({
        alerts_on_top: "Alerts on top",
        manage_columns: "Manage columns",
        custom_fields: "Custom fields",
      });
      setLabelsProfile({
        profile: "Profile",
        name: "Name",
        last_name: "Last name",
        alias: "Alias*",
        email: "Email*",
        alerts_by_email: "Alerts by email",
        change_password: "Change password",
      });
      setLabelsChangePass({
        change_password: "Change Password",
        actual_password: "Actual password*",
        new_password: "New password*",
        confirm_new_password: "Confirm password*",
      });
      setLabelsPreferences({
        preferences: "Preferences", 
        language: "Language", 
        color_mode: "Color mode",  
      });
      setLabelsUsers({
        users: "Users", 
      });
      setLabelsManageStock({
        create_stock: "Create ", 
        edit_stock: "Edit ", 
        main_data: "Main data", 
        name: "Name*", 
        code: "Code", 
        amount: "Amount", 
        measure: "Measure", 
        category: "Category", 
        category_name: "name", 
        sub_category: "Sub-Categ.", 
        secondary_data: "Secondary data", 
        price: "Price", 
        description: "Description", 
        filestack_options: "en", 
        alerts: "Alerts", 
        by_amount: "By amount", 
        by_date: "By date", 
        custom_fields: "Custom fields", 
        messageAmountAlert: "The stock amount will drop below the alert level.",
        messageDateAlert: "The alert date is before current date.",
      });
      setLabelsMassiveUpdateStock({
        massive_upload: "Massive upload", 
      });
      setLabelsManageUser({
        create_user: "Create user", 
        edit_user: "Edit user", 
        access_level: "Access level*", 
        name: "Name", 
        last_name: "Last name", 
        user: "User*", 
        email: "Email*", 
        alerts_by_email: "Alerts by email",
        user_enabled: "User enabled",
        user_disabled: "User disabled",
      });
      setLabelsUpdateAmountStock({
        amount: "Amount",
        messageAmountAlert: "The stock amount will drop below the alert level.",
      });
      setLabelsCustomFields({
        custom_fields: "Custom fields",
      });
      setLabelsSaveChanges({
        save_changes: "Save changes",
      });
      setLabelsLogin({
        login: "Login",
        username_email: "Username or Email",
        password: "Password",
        remember_me: "Remember me",
        or_login_using: "Or login using",
        forgot_password: "Forgot password?",
        sign_up: "Sign up",
        google_login: "en",
      });
      setLabelsSignUp({
        sign_up: "Sign up",
        username: "Username",
        email: "Email",
        password: "Password",
        confirm_password: "Confirm password",
        by_creating_account: "By creating an account you agree to our",
        terms_privacy: "Terms & Privacy",
        already_account: "Already have an account?",
        login: "Login",
      });
      setLabelsConfirmTermsAndPrivacy({
        terms: "EnglishTerms",
      });
      setLabelsManageForgottenPass({
        account_recovery: "Account recovery",
        confirm_recovery_email: "To get a verification code, first confirm the recovery email address",
        email: "Email",
        verification_code_sent: "A verification code was sent to",
        verification_code: "Verification code",
        create_new_password: "Create a new password",
        new_password: "New password",
        confirm_password: "Confirm password",
        password_changed: "Your password has been successfully changed",
      });
      setLabelsConfirmDeleteModal({
        swipe_confirm: "Swipe to confirm the deletion of the",
      });
    } 

    else if (user.language === 1) {
      setLabelsMainSearch({
        global_search: "Búsqueda global..."
      });
      setLabelsMenuOptions({
        profile: "Perfil",
        preferences: "Preferencias",
        logout: "Cerrar sesión",
        users: "Usuarios",
      });
      setLabelsTableProducts({
        alerts_on_top: "Alertas primero",
        manage_columns: "Gestionar campos",
        custom_fields: "Campos propios",
      });
      setLabelsProfile({
        profile: "Perfil",
        name: "Nombre",
        last_name: "Apellido",
        alias: "Alias*",
        email: "Email*",
        alerts_by_email: "Alertas por email",
        change_password: "Cambiar contraseña",
      });
      setLabelsChangePass({
        change_password: "Cambiar Contraseña",
        actual_password: "Contraseña actual*",
        new_password: "Nueva contraseña*",
        confirm_new_password: "Confirmar contraseña*",
      });
      setLabelsPreferences({
        preferences: "Preferencias", 
        language: "Lenguaje", 
        color_mode: "Modo",  
      });
      setLabelsUsers({
        users: "Usuarios", 
      });
      setLabelsManageStock({
        create_stock: "Crear ", 
        edit_stock: "Editar ", 
        main_data: "Datos básicos", 
        name: "Nombre*", 
        code: "Código", 
        amount: "Cantidad", 
        measure: "Medida", 
        category: "Categoría",
        category_name: "name_esp", 
        sub_category: "Sub-Categ.", 
        secondary_data: "Datos extra", 
        price: "Precio", 
        description: "Descripción", 
        filestack_options: "es",
        alerts: "Alertas", 
        by_amount: "Por cantidad", 
        by_date: "Por fecha", 
        custom_fields: "Campos propios", 
        messageAmountAlert: "La cantidad del stock estará por debajo del nivel de alerta.",
        messageDateAlert: "La fecha de alerta es anterior a la fecha actual.",
      });
      setLabelsMassiveUpdateStock({
        massive_upload: "Carga masiva", 
      });
      setLabelsManageUser({
        create_user: "Crear usuario", 
        edit_user: "Editar usuario",
        access_level: "Nivel de acceso*", 
        name: "Nombre", 
        last_name: "Apellido", 
        user: "Usuario*", 
        email: "Email*", 
        alerts_by_email: "Alertas por email",
        user_enabled: "Usuario habilitado",
        user_disabled: "Usuario deshabilitado",
      });
      setLabelsUpdateAmountStock({
        amount: "Cantidad",
        messageAmountAlert: "La cantidad del stock estará por debajo del nivel de alerta.",
      });
      setLabelsCustomFields({
        custom_fields: "Campos propios",
      });
      setLabelsSaveChanges({
        save_changes: "Guardar cambios",
      });
      setLabelsLogin({
        login: "Acceso",
        username_email: "Usuario o correo electrónico",
        password: "Contraseña",
        remember_me: "Recordar usuario",
        or_login_using: "O acceder usando",
        forgot_password: "Olvidé mi contraseña",
        sign_up: "Crear usuario",
        google_login: "es",
      });
      setLabelsSignUp({
        sign_up: "Registrarse",
        username: "Nombre de usuario",
        email: "Correo electrónico",
        password: "Contraseña",
        confirm_password: "Confirmar contraseña",
        by_creating_account: "Al crear una cuenta, aceptas nuestros",
        terms_privacy: "Términos y Privacidad",
        already_account: "¿Ya tienes una cuenta?",
        login: "Iniciar sesión",
      });
      setLabelsConfirmTermsAndPrivacy({
        terms: "SpanishTerms",
      });
      setLabelsManageForgottenPass({
        account_recovery: "Recuperación de cuenta",
        confirm_recovery_email: "Para obtener un código de verificación, primero confirme la dirección de correo electrónico de recuperación",
        email: "Correo electrónico",
        verification_code_sent: "Un código de verificación fué enviado a",
        verification_code: "Código de verificación",
        create_new_password: "Crear una nueva contraseña",
        new_password: "Nueva contraseña",
        confirm_password: "Confirmar contraseña",
        password_changed: "Su contraseña ha sido cambiada exitosamente",
      });
      setLabelsConfirmDeleteModal({
        swipe_confirm: "Desliza para confirmar la eliminación del",
      });
    }

    else if (user.language === 2) {
      setLabelsMainSearch({
        global_search: "Global søgning..."
      });
      setLabelsMenuOptions({
        profile: "Profil",
        preferences: "Præferencer",
        logout: "Log ud",
        users: "Brugere",
      });
      setLabelsTableProducts({
        alerts_on_top: "Alarmer op",
        manage_columns: "Kolonner",
        custom_fields: "Egne felter",
      });
      setLabelsProfile({
        profile: "Profil",
        name: "Navn",
        last_name: "Efternavn",
        alias: "Alias*",
        email: "E-mail*",
        alerts_by_email: "Alarmer via e-mail",
        change_password: "Skift kodeord",
      });
      setLabelsChangePass({
        change_password: "Skift kodeord",
        actual_password: "Faktisk adgangskode*",
        new_password: "Nyt kodeord*",
        confirm_new_password: "Bekræft kodeord*",
      });
      setLabelsPreferences({
        preferences: "Præferencer", 
        language: "Sprog", 
        color_mode: "Farvetilstand",  
      });
      setLabelsUsers({
        users: "Brugere", 
      });
      setLabelsManageStock({
        create_stock: "Skabe ", 
        edit_stock: "Redigere ", 
        main_data: "Hoveddata", 
        name: "Navn*", 
        code: "Kode", 
        amount: "Beløb", 
        measure: "Måle", 
        category: "Kategori", 
        category_name: "name_dan", 
        sub_category: "Underkateg.", 
        secondary_data: "Sekundære data", 
        price: "Pris", 
        description: "Beskrivelse", 
        filestack_options: "da", 
        alerts: "Advarsler", 
        by_amount: "Efter beløb", 
        by_date: "Efter dato", 
        custom_fields: "Egne felter", 
        messageAmountAlert: "Lagerbeløbet vil falde under alarmniveauet.",
        messageDateAlert: "Advarselsdatoen er før den aktuelle dato.",
      });
      setLabelsMassiveUpdateStock({
        massive_upload: "Massiv upload", 
      });
      setLabelsManageUser({
        create_user: "Opret bruger", 
        edit_user: "Rediger bruger", 
        access_level: "Adgangsniveau*", 
        name: "Navn", 
        last_name: "Efternavn", 
        user: "Bruger*", 
        email: "E-mail*", 
        alerts_by_email: "Alarmer af E-mail",
        user_enabled: "Bruger aktiveret",
        user_disabled: "Bruger deaktiveret",
      });
      setLabelsUpdateAmountStock({
        amount: "Beløb",
        messageAmountAlert: "Lagerbeløbet vil falde under alarmniveauet.",
      });
      setLabelsCustomFields({
        custom_fields: "Egne felter",
      });
      setLabelsSaveChanges({
        save_changes: "Gem ændringer",
      });
      setLabelsLogin({
        login: "Log på",
        username_email: "Brugernavn eller E-mail",
        password: "Adgangskode",
        remember_me: "Husk mig",
        or_login_using: "Eller log ind vha",
        forgot_password: "Glemt kodeord?",
        sign_up: "Tilmelde",
        google_login: "da",
      });
      setLabelsSignUp({
        sign_up: "Tilmelde",
        username: "Brugernavn",
        email: "E-mail",
        password: "Adgangskode",
        confirm_password: "Bekræft kodeord",
        by_creating_account: "Ved at oprette en konto accepterer du vores",
        terms_privacy: "Vilkår og privatliv",
        already_account: "Har du allerede en bruger?",
        login: "Log på",
      });
      setLabelsConfirmTermsAndPrivacy({
        terms: "DanishTerms",
      });
      setLabelsManageForgottenPass({
        account_recovery: "Kontogendannelse",
        confirm_recovery_email: "For at få en bekræftelseskode skal du først bekræfte gendannelses-e-mailadressen",
        email: "E-mail",
        verification_code_sent: "En bekræftelseskode blev sendt til",
        verification_code: "Verifikationskode",
        create_new_password: "Opret en ny adgangskode",
        new_password: "Nyt kodeord",
        confirm_password: "Bekræft kodeord",
        password_changed: "Dit kodeord er nu blevet ændret",
      });
      setLabelsConfirmDeleteModal({
        swipe_confirm: "Stryg for at bekræfte sletningen af",
      });
    }
    
    else if (user.language === 3) {
      setLabelsMainSearch({
        global_search: "Ricerca globale..."
      });
      setLabelsMenuOptions({
        profile: "Profilo",
        preferences: "Preferenze",
        logout: "Disconnettersi",
        users: "Utenti",
      });
      setLabelsTableProducts({
        alerts_on_top: "Avvertenze sopra",
        manage_columns: "Gestisci colonne",
        custom_fields: "Campi su misura",
      });
      setLabelsProfile({
        profile: "Profilo",
        name: "Nome",
        last_name: "Cognome",
        alias: "Alias*",
        email: "E-mail*",
        alerts_by_email: "Avvisi via e-mail",
        change_password: "Cambiare la password",
      });
      setLabelsChangePass({
        change_password: "Cambiare la password",
        actual_password: "Password effettiva*",
        new_password: "Nuova password*",
        confirm_new_password: "Conferma password*",
      });
      setLabelsPreferences({
        preferences: "Preferenze", 
        language: "Lingua", 
        color_mode: "Modalità colore",  
      });
      setLabelsUsers({
        users: "Utenti", 
      });
      setLabelsManageStock({
        create_stock: "Creare ", 
        edit_stock: "Modificare ", 
        main_data: "Dati principali", 
        name: "Nome*", 
        code: "Codice", 
        amount: "Quantità", 
        measure: "Misurare", 
        category: "Categoria",
        category_name: "name_ita",  
        sub_category: "Sottocateg.", 
        secondary_data: "Dati secondari", 
        price: "Prezzo", 
        description: "Descrizione", 
        filestack_options: "it", 
        alerts: "Avvisi", 
        by_amount: "Per importo", 
        by_date: "Per data", 
        custom_fields: "Campi su misura", 
        messageAmountAlert: "L'importo delle scorte scenderà al di sotto del livello di avviso.",
        messageDateAlert: "La data dell'avviso è precedente alla data corrente.",
      });
      setLabelsMassiveUpdateStock({
        massive_upload: "Caricamento massiccio", 
      });
      setLabelsManageUser({
        create_user: "Creare un utente", 
        edit_user: "Modifica utente", 
        access_level: "Livello di accesso*", 
        name: "Nome", 
        last_name: "Cognome", 
        user: "Utente*", 
        email: "E-mail*", 
        alerts_by_email: "Avvisi via e-mail",
        user_enabled: "Utente abilitato",
        user_disabled: "Utente disabilitato",
      });
      setLabelsUpdateAmountStock({
        amount: "Quantità",
        messageAmountAlert: "L'importo delle scorte scenderà al di sotto del livello di avviso.",
      });
      setLabelsCustomFields({
        custom_fields: "Campi su misura",
      });
      setLabelsSaveChanges({
        save_changes: "Salvare le modifiche",
      });
      setLabelsLogin({
        login: "Login",
        username_email: "Nome utente o email",
        password: "Parola d'ordine",
        remember_me: "Ricordati di me",
        or_login_using: "Oppure accedi utilizzando",
        forgot_password: "Ha dimenticato la password?",
        sign_up: "Iscrizione",
        google_login: "it",
      });
      setLabelsSignUp({
        sign_up: "Iscrizione",
        username: "Nome utente",
        email: "E-mail",
        password: "Parola d'ordine",
        confirm_password: "Conferma password",
        by_creating_account: "Creando un account accetti il ​​nostro",
        terms_privacy: "Termini e privacy",
        already_account: "Hai già un account?",
        login: "Login",
      });
      setLabelsConfirmTermsAndPrivacy({
        terms: "ItalianTerms",
      });
      setLabelsManageForgottenPass({
        account_recovery: "Recupero dell'account",
        confirm_recovery_email: "Per ottenere un codice di verifica, conferma prima l'indirizzo email di recupero",
        email: "E-mail",
        verification_code_sent: "È stato inviato un codice di verifica a",
        verification_code: "Codice di verifica",
        create_new_password: "Crea una nuova password",
        new_password: "Nuova password",
        confirm_password: "Conferma password",
        password_changed: "La tua password è stata cambiata con successo",
      });
      setLabelsConfirmDeleteModal({
        swipe_confirm: "Scorri per confermare l'eliminazione del",
      });
    } 

  }, [user.language]); 

  return  ( 
    <LanguageLabelsContext.Provider 
      value={{ 
        labelsMainSearch, 
        labelsMenuOptions, 
        labelsTableProducts, 
        labelsProfile, 
        labelsChangePass, 
        labelsPreferences, 
        labelsUsers, 
        labelsManageStock,
        labelsMassiveUpdateStock, 
        labelsManageUser, 
        labelsUpdateAmountStock,
        labelsCustomFields,
        labelsSaveChanges,
        labelsLogin,
        labelsSignUp,
        labelsConfirmTermsAndPrivacy,
        labelsManageForgottenPass,
        labelsConfirmDeleteModal,
      }} 
    > 
      {children} 
    </LanguageLabelsContext.Provider>) 
};