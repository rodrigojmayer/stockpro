import { createContext, useState, useEffect, useContext } from 'react';
import { AccessLevelsData } from '../types';
import { IsLoadingContext } from './IsLoadingContext';
import { UserContext } from './UserContext';

const INITIAL_ACCESS_LEVEL = {
  id: NaN,
  name: '',
};

// type AccessLevelsContextType = {
//   user: AccessLevelsData;
// };

export const AccessLevelsContext = createContext<object | undefined>(undefined);

type AccessLevelsProviderProps = {
  children: React.ReactNode;
};

export const AccessLevelsProvider: React.FC<AccessLevelsProviderProps> = ({ children }) => {
  const [accessLevels, setAccessLevels] = useState<AccessLevelsData>(INITIAL_ACCESS_LEVEL);
  const { user } = useContext<any>(UserContext)
  const { isLoading, setIsLoading } = useContext<any>(IsLoadingContext);

  useEffect(() => {

    // user.id_access_level

    const fetchAccessLevels = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/accesslevels/`);
        
        if (response.ok) {
          const json = await response.json();
          const json_filtered = json.filter((item:AccessLevelsData) => { 
            // console.log("item.id", item.id)
            // console.log("user ", user)
            // console.log("user id", user.id_access_level)
            return item.id > user.id_access_level})
          setAccessLevels(json_filtered);
        } else {
          setAccessLevels(INITIAL_ACCESS_LEVEL);
          // Handle the case where the response is not OK (e.g., show an error message)
        }
      } catch (error) {
        setAccessLevels(INITIAL_ACCESS_LEVEL);
        // Handle any network or fetch-related errors
      } finally {
            setIsLoading((prevLoading:any) => ({
            ...prevLoading,
            accessLevels: false,
            }));
        }
    };

    fetchAccessLevels();
  }, [user]);

  return <AccessLevelsContext.Provider value={{ accessLevels, setAccessLevels }}>{children}</AccessLevelsContext.Provider>;
};