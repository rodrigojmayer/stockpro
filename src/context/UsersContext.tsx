import { createContext, useState, useEffect, useContext } from 'react';
import { UserData } from '../types';
import { IsLoadingContext } from './IsLoadingContext';
import { UserContext } from './UserContext';
import axios from '../api/axios';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const INITIAL_USERS = [{
  _id: '',
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
  alerts_enabled: false,
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
  const axiosPrivate = useAxiosPrivate();
  const { user } = useContext<any>(UserContext)
  const { isLoading, setIsLoading } = useContext<any>(IsLoadingContext);

  useEffect(() => {
    if(user?.id_client){

      // console.log("UsersContext.tsx user.id_client: ", user.id_client)
      // const fetchUser = async () => {
      //   try {
      //     const response = await fetch(`http://localhost:4000/api/users/client/${user.id_client}`); 
      //     // const response = await fetch(`http://localhost:4000/api/users/client/3`); 
          
      //     if (response.ok) {
      //       const json = await response.json();
      //       const json_filtered = json.filter((item:UserData) => { 
      //         // console.log("item.id", item.id)
      //         // console.log("user ", user)
      //         // console.log("user id", user.id_access_level)
      //         return (item._id !== user._id && !item.deleted && item.id_access_level > user.id_access_level)
      //       })
      //       setUsers(json_filtered);
      //     } else {
      //       setUsers(INITIAL_USERS);
      //       // Handle the case where the response is not OK (e.g., show an error message)
      //     }
      //   } catch (error) {
      //     setUsers(INITIAL_USERS);
      //     // Handle any network or fetch-related errors
      //   } finally {
      //         setIsLoading((prevLoading:any) => ({
      //         ...prevLoading,
      //         user: false,
      //         }));
      //     }
      // };
  
      // fetchUser();

      let isMounted = true
      const controller = new AbortController()

      const getUsers = async () => {
        try {
          const response = await axios.get(`/users/client/${user.id_client}`, {
          // const response = await axiosPrivate.get(`/users/client/${user.id_client}`, {
            signal: controller.signal
          })
          console.log(response.data)
          const json = await response.data;
          const json_filtered = json.filter((item:UserData) => { 
            return (item._id !== user._id && !item.deleted && item.id_access_level > user.id_access_level)
          })
          isMounted && setUsers(json_filtered)
        } catch (err) {
          console.error(err)
          setUsers(INITIAL_USERS);
        } finally {
          setIsLoading((prevLoading:any) => ({
            ...prevLoading,
            user: false,
          }));
        }
      }

      getUsers()

      return () => {
        isMounted = false
        controller.abort()
      }
    }
  }, [user]);
  
  useEffect(() => {
    console.log("UsersContext.tsx users: ", users)
}, [users]);

  return (
    <UsersContext.Provider value={{ users, setUsers }}>
      {children}
    </UsersContext.Provider>
  )
};