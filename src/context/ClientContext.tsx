import { createContext, useState, useEffect, useContext, useRef } from 'react';
import { ClientData } from '../types';
import { IsLoadingContext } from './IsLoadingContext';
// import AuthContext from "../context/AuthProvider"
import { UserContext } from './UserContext';

import useWebSocket from 'react-use-websocket'
import useLogout from '../hooks/useLogout';

const INITIAL_CLIENT = {
  _id: "",
  id: NaN,
  id_group_filestack: 0,
  client: '',
  deleted: false,
  enabled: true,
};

// export const ClientContext = createContext<ClientContextType | undefined>(undefined);
export const ClientContext = createContext<object | undefined>(undefined);

type ClientProviderProps = {
  children: React.ReactNode;
};

export const ClientProvider: React.FC<ClientProviderProps> = ({ children }) => {
  const { user } = useContext<any>(UserContext)
  // const profileString = window.localStorage.getItem('profile');

  const [client, setClient] = useState<ClientData>(INITIAL_CLIENT)

  const { isLoading,  setIsLoading } = useContext<any>(IsLoadingContext);

  const fetchUserByClient = async () => {
    // console.log("user: ", user)
    try {
      // const response = await fetch(`${import.meta.env.VITE_API_URL_BACKEND}/users/user/${profileStringWithoutQuotes}`)
      const response = await fetch(`${import.meta.env.VITE_API_URL_BACKEND}/clients/id/${user.id_client}`)
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      const json = await response.json();
      // console.log("/*-/*-/*-json: ", json)
      // console.log("/*-/*-/*-response: ", response)
      if(json.name===undefined) json.name = ""
      if(json.last_name===undefined) json.last_name = ""
      setClient(json);

    } catch (error: any) {
      // Handle any network or fetch-related errors
      console.error("ClientContext.tsx fetchClientByClient error.message: ", error.message)
      console.error("ClientContext.tsx  fetchClientByClient error.stack: ", error.stack)
    } finally {
      setIsLoading((prevLoading:any) => ({
        ...prevLoading,
        client: false,
      }));
    }
  }

  useEffect(() => {
    if(user._id) {
      fetchUserByClient()      
    }
  }, [user]);  

  return (
    <ClientContext.Provider value={{ INITIAL_CLIENT, client  }}>
      {children}
    </ClientContext.Provider>
  )
};