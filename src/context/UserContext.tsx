import { createContext, useState, useEffect, useContext } from 'react';
import { UserData } from '../types';
import { IsLoadingContext } from './IsLoadingContext';

const INITIAL_USER = {
  id: NaN,
  id_client: NaN,
  name: '',
  user: '',
  pass: '',
  deleted: false,
  enabled: true,
  ordered_fields: [],
};

type UserContextType = {
  user: UserData;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserData>(INITIAL_USER);
  const { isLoading, setIsLoading } = useContext<any>(IsLoadingContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/users/64b1b4b5cc67f2fbd144413c`);
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

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};

// const [getUser, setGetUser] = useState<UserData>( INITIAL_USER)
// const fetchUser = async () => {
// try {
//     const response = await fetch(`http://localhost:4000/api/users/64b1b4b5cc67f2fbd144413c`)
//     if (response.ok) {
//     const json = await response.json()
//     // console.log("userjson: ", json)
//     setGetUser(json)
//     } else {
//     // Handle the case where the response is not OK (e.g., show an error message)
//     }
// } catch (error) {
//     setGetUser(INITIAL_USER)
//     // Handle any network or fetch-related errors
// } finally {
//     // setIsLoading((prevLoading) => ({
//     // ...prevLoading,
//     // user: false,
//     // }));
// }
// }

// fetchUser();
// // }, [])


// // export const UserContext = createContext< any >({
// //     user: getUser
//     // user:{
//     //     id: 1, 
//     //     id_client: 2, 
//     //     name: "Rodrigo", 
//     //     user: "rmayer", 
//     //     pass: "123", 
//     //     deleted: false, 
//     //     enabled: true, 
//     //     ordered_fields:[5, 1,2,3, 4]
//     //   },
//     //   setUser: () =>{}
//     // })
