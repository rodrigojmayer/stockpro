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
  id_access_level: NaN,
  user: '',
  pass: '',
  deleted: false,
  enabled: true,
  ordered_fields: [],
  language: NaN,
  background_color: NaN,
  alerts_enabled: false,
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
  const [_IdUserLogged, set_IdUserLogged] = useState<string|number>(INITIAL_USER._id);
  const [gmailUserLogged, setGmailUserLogged] = useState<string>(INITIAL_USER.email);


  useEffect(() => {
    console.log("_IdUserLogged: ", _IdUserLogged)
    if(_IdUserLogged){
      const fetchUser = async () => {
        try {
          const response = await fetch(`http://localhost:4000/api/users/${_IdUserLogged}`);
          // const response = await fetch(`http://localhost:4000/api/users/64b1b4b5cc67f2fbd144413c`); //User 1 client 2 id_access_level 1 superadmin
          // const response = await fetch(`http://localhost:4000/api/users/64b6c0553204de99e630a0ac`); //User 2 client 3 id_access_level 2 admin
          // const response = await fetch(`http://localhost:4000/api/users/64f63b7773d98cad83d45fc2`); //User - test client 3 id_access_level 3 superuser
          // const response = await fetch(`http://localhost:4000/api/users/64f704d073d98cad83d461c8`); //User - test client 3 id_access_level 4 user
          
          console.log("user response: ", response)
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
    }

  }, [_IdUserLogged]);

  
  useEffect(() => {
    console.log("gmailUserLogged: ", gmailUserLogged)
    
    setIsLoading((prevLoading:any) => ({
      ...prevLoading,
      user: true,
    }));
      if(gmailUserLogged){
      const fetchUserByEmail = async () => {
        try {
          const response = await fetch(`http://localhost:4000/api/users/email/${gmailUserLogged}`);
          
          console.log("user by email response: ", response)
          if (response.ok) {
            const json = await response.json();
            setUser(json);
          } 
        } catch (error) {
          // setUser(INITIAL_USER);
          // Handle any network or fetch-related errors
        } finally {
              setIsLoading((prevLoading:any) => ({
              ...prevLoading,
              user: false,
              }));
          }
      };
      fetchUserByEmail();
    }

  }, [gmailUserLogged]);

  // useEffect(() => {
  //   console.log("UserContext.tsx user.id_client: ", user)
  // }, [user]);

  return <UserContext.Provider value={{ user, setUser, setGmailUserLogged }}>{children}</UserContext.Provider>;
};