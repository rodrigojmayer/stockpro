import { createContext, useEffect, useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export const LanguageLabelsContext = createContext<Object | undefined>(undefined);

type LanguageLabelsProviderProps = {
  children: React.ReactNode;
};
  
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
  const [labelsManageUser, setLabelsManageUser] = useState({}); // New state for loading status
  const [labelsUpdateAmountStock, setLabelsUpdateAmountStock] = useState({}); // New state for loading status
  const [labelsCustomFields, setLabelsCustomFields] = useState({}); // New state for loading status
  const [labelsSaveChanges, setLabelsSaveChanges] = useState({}); // New state for loading status
  

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
        sub_category: "Sub-Categ.", 
        secondary_data: "Secondary data", 
        price: "Price", 
        description: "Description",  
        alerts: "Alerts", 
        by_amount: "By amount", 
        by_date: "By date", 
        custom_fields: "Custom fields", 
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
      });
      setLabelsCustomFields({
        custom_fields: "Custom fields",
      });
      setLabelsSaveChanges({
        save_changes: "Save changes",
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
        sub_category: "Sub-Categ.", 
        secondary_data: "Datos extra", 
        price: "Precio", 
        description: "Descripción",  
        alerts: "Alertas", 
        by_amount: "Por cantidad", 
        by_date: "Por fecha", 
        custom_fields: "Campos propios", 
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
      });
      setLabelsCustomFields({
        custom_fields: "Campos propios",
      });
      setLabelsSaveChanges({
        save_changes: "Guardar cambios",
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
        labelsManageUser, 
        labelsUpdateAmountStock,
        labelsCustomFields,
        labelsSaveChanges,
      }} 
    > 
      {children} 
    </LanguageLabelsContext.Provider>) 
};