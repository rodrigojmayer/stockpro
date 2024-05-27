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
        manage_columns: "Administrar columnas",
        custom_fields: "Campos personalizados",
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
      }}
    >
      {children}
    </LanguageLabelsContext.Provider>)
};