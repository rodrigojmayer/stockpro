import { createContext, useState, useEffect, useContext } from 'react';
import { UserData } from '../types';
import { IsLoadingContext } from './IsLoadingContext';

const INITIAL_USER = {
  _id: NaN,
  id: NaN,
  id_client: 0,
  name: '',
  last_name: '',
  email: '',
  user: '',
  pass: '',
  deleted: false,
  enabled: true,
  ordered_fields: [],
  language: NaN,
  background_color: NaN,
};

type UserContextType = {
  user: UserData;
//   setUser: UserData;
};

// export const UserContext = createContext<UserContextType | undefined>(undefined);
export const UserContext = createContext<object | undefined>(undefined);

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserData>(INITIAL_USER);
  const { isLoading, setIsLoading } = useContext<any>(IsLoadingContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/users/64f39d7973d98cad83d4593f`); //User 1 client 2
        
        if (response.ok) {
          const json = await response.json();
          setUser(json);
        } else {
          setUser(INITIAL_USER);
          // Handle the case where the response is not OK (e.g., show an error message)
        }
      } catch (error) {
        setUser(INITIAL_USER);
        // Handle any network or fetch-related errors
      } finally {
            setIsLoading((prevLoading:any) => ({
            ...prevLoading,
            user: false,
            }));
        }
    };

    fetchUser();
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};