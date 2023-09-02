import { createContext, useState, useEffect, useContext } from 'react';
import { AccessLevelsData } from '../types';
import { IsLoadingContext } from './IsLoadingContext';

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
  const { isLoading, setIsLoading } = useContext<any>(IsLoadingContext);

  useEffect(() => {
    const fetchAccessLevels = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/accesslevels/`);
        
        if (response.ok) {
          const json = await response.json();
          setAccessLevels(json);
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
  }, []);

  return <AccessLevelsContext.Provider value={{ accessLevels, setAccessLevels }}>{children}</AccessLevelsContext.Provider>;
};