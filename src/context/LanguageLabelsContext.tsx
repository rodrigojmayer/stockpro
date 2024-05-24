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
      })
    } else if (user.language === 1) {
      setLabelsMainSearch({
        global_search: "Búsqueda global..."
      });
      setLabelsMenuOptions({
        profile: "Perfil",
        preferences: "Preferencias",
        logout: "Cerrar sesión",
        users: "Usuarios",
      })
    }
  }, [user.language]);

  return  (
    <LanguageLabelsContext.Provider value={{ labelsMainSearch, labelsMenuOptions }}>
      {children}
    </LanguageLabelsContext.Provider>)
};