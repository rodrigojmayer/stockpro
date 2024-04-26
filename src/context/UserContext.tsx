import { createContext, useState, useEffect, useContext, useRef } from 'react';
import { UserData } from '../types';
import { IsLoadingContext } from './IsLoadingContext';
import AuthContext from "../context/AuthProvider"

import useWebSocket from 'react-use-websocket'
import useLogout from '../hooks/useLogout';

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
  const { auth, setAuth } = useContext(AuthContext)
  const logout = useLogout();
  // const profileString = window.localStorage.getItem('profile');

  const [user, setUser] = useState<UserData>(INITIAL_USER)

  const { isLoading,  setIsLoading } = useContext<any>(IsLoadingContext);
  const [_IdUserLogged, set_IdUserLogged] = useState<string|number>(INITIAL_USER._id);
  const [gmailUserLogged, setGmailUserLogged] = useState<UserData>(INITIAL_USER);

  const WS_URL = import.meta.env.VITE_WS_URL
  // console.log("user.user: ", user.user)
  const { sendJsonMessage, lastJsonMessage } = useWebSocket<any>(WS_URL, {
      queryParams: { username: user.user }
  })
  // const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL)

  useEffect(() => {
    if(lastJsonMessage?.forceLogout ){
      logout()
      lastJsonMessage.forceLogout = false
    }

  }, [lastJsonMessage?.forceLogout])

  const fetchUserByUser = async () => {
    try {
      // const response = await fetch(`${import.meta.env.VITE_API_URL_BACKEND}/users/user/${profileStringWithoutQuotes}`)
      const response = await fetch(`${import.meta.env.VITE_API_URL_BACKEND}/users/${auth._id}`)
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      const json = await response.json();
      // console.log("/*-/*-/*-json: ", json)
      // console.log("/*-/*-/*-response: ", response)
      if(json.name===undefined) json.name = ""
      if(json.last_name===undefined) json.last_name = ""
      setUser(json);

      // if (response.ok) {
      //   const json = await response.json()
      //   setUser(json)
      // } else {
      //   console.error("UserContext.tsx fetchUserByUser else: ")
      // // Handle the case where the response is not OK (e.g., show an error message)
      // }
    } catch (error: any) {
      // Handle any network or fetch-related errors
      console.error("UserContext.tsx fetchUserByUser error.message: ", error.message)
      console.error("UserContext.tsx  fetchUserByUser error.stack: ", error.stack)
    } finally {
      setIsLoading((prevLoading:any) => ({
        ...prevLoading,
        user: false,
      }));
    }
  }

  useEffect(() => {
    // console.log("/*-/*-/*-auth._id: ", auth._id)
    // console.log("/*-/*-/*-auth.accessToken: ", auth.accessToken)
    if(auth.accessToken) {
      fetchUserByUser()      
    }
  }, [auth]); 

  useEffect(() => {
    // console.log("/*-/*-/*-Loading.fieldsFetchEditUsersFieldsOrder: ", isLoading.fieldsFetchEditUsersFieldsOrder)
    if(auth.accessToken && isLoading.fieldsFetchEditUsersFieldsOrder) {
      fetchUserByUser()   
        setIsLoading((prevLoading: any) => ({
          ...prevLoading,
          fieldsFetchEditUsersFieldsOrder: false,
      }));   
    }
  }, [isLoading.fieldsFetchEditUsersFieldsOrder]); 

  return (
    <UserContext.Provider value={{ INITIAL_USER, user, setUser, setGmailUserLogged, gmailUserLogged, _IdUserLogged, set_IdUserLogged, sendJsonMessage, lastJsonMessage  }}>
      {children}
    </UserContext.Provider>
  )
};