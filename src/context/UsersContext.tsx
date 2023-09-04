import { createContext, useState, useEffect, useContext } from 'react';
import { UserData } from '../types';
import { IsLoadingContext } from './IsLoadingContext';
import { UserContext } from './UserContext';

const INITIAL_USERS = [{
  _id: NaN,
  id: NaN,
  id_client: NaN,
  name: '',
  last_name: '',
  email: '',
  id_access_level: NaN,
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
  const { user } = useContext<any>(UserContext)
  const { isLoading, setIsLoading } = useContext<any>(IsLoadingContext);

  useEffect(() => {
    // console.log("UsersContext.tsx user.id_client: ", user.id_client)
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/users/client/${user.id_client}`); 
        // const response = await fetch(`http://localhost:4000/api/users/client/3`); 
        
        if (response.ok) {
          const json = await response.json();
          const json_filtered = json.filter((item:UserData) => { 
            // console.log("item.id", item.id)
            // console.log("user ", user)
            // console.log("user id", user.id_access_level)
            return (item.id !== user.id && item.id_access_level > user.id_access_level)
            })
          setUsers(json_filtered);
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
  }, [user]);

  return <UsersContext.Provider value={{ users, setUsers }}>{children}</UsersContext.Provider>;
};