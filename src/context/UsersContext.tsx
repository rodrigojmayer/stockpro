import { createContext, useState, useEffect, useContext } from 'react';
import { UserData } from '../types';
import { IsLoadingContext } from './IsLoadingContext';

const INITIAL_USERS = [{
  _id: NaN,
  id: NaN,
  id_client: NaN,
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
}];

// type UsersContextType = {
  // user: UserData;
//   setUsers: UserData;
// };

// export const UserContext = createContext<UserContextType | undefined>(undefined);
export const UsersContext = createContext<object | undefined>(undefined);

type UsersProviderProps = {
  children: React.ReactNode;
};

export const UsersProvider: React.FC<UsersProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<UserData[]>(INITIAL_USERS);
  const { isLoading, setIsLoading } = useContext<any>(IsLoadingContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/users/`); 
        
        if (response.ok) {
          const json = await response.json();
          setUsers(json);
        } else {
          setUsers(INITIAL_USERS);
          // Handle the case where the response is not OK (e.g., show an error message)
        }
      } catch (error) {
        setUsers(INITIAL_USERS);
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

  return <UsersContext.Provider value={{ users, setUsers }}>{children}</UsersContext.Provider>;
};