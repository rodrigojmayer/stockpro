import { createContext, useState, useEffect, useContext } from 'react';
import { UserData } from '../types';
import { IsLoadingContext } from './IsLoadingContext';
import useUser from '../hooks/useUser';

const INITIAL_USER = {
  _id: "",
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

// export const UserContext = createContext<UserContextType | undefined>(undefined);
export const UserContext = createContext<object | undefined>(undefined);

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  // const [user, setUser] = useState<UserData>(INITIAL_USER);
  const profileString = window.localStorage.getItem('profile');
  const [user, setUser] = useState<UserData>(
    profileString ? 
      () => JSON.parse(profileString)
    :
      INITIAL_USER
  )

  const { setIsLoading } = useContext<any>(IsLoadingContext);
  const [_IdUserLogged, set_IdUserLogged] = useState<string|number>(INITIAL_USER._id);
  const [gmailUserLogged, setGmailUserLogged] = useState<UserData>(INITIAL_USER);

  useEffect(() => {
    console.log("/*-/*-/*-profileString: ", profileString)
    if(profileString) {
      setUser(JSON.parse(profileString))
      setIsLoading((prevLoading:any) => ({
        ...prevLoading,
        user: false,
      }));
    }
  }, []); 

  return <UserContext.Provider value={{ INITIAL_USER, user, setUser, setGmailUserLogged, gmailUserLogged, _IdUserLogged, set_IdUserLogged  }}>{children}</UserContext.Provider>;
};