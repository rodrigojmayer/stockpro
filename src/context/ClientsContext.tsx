import { createContext, useState, useEffect, useContext, useRef } from 'react';
import { ClientData } from '../types';
import { IsLoadingContext } from './IsLoadingContext';
// import AuthContext from "../context/AuthProvider"
import { UserContext } from './UserContext';

import useWebSocket from 'react-use-websocket'
import useLogout from '../hooks/useLogout';

const INITIAL_CLIENTS = [{
  _id: "",
  id: NaN,
  id_group_filestack: 0,
  client: '',
  deleted: false,
  enabled: true,
}];

// export const ClientContext = createContext<ClientContextType | undefined>(undefined);
export const ClientsContext = createContext<object | undefined>(undefined);

type ClientsProviderProps = {
  children: React.ReactNode;
};

export const ClientsProvider: React.FC<ClientsProviderProps> = ({ children }) => {
  const { user } = useContext<any>(UserContext)
  // const profileString = window.localStorage.getItem('profile');

  const [clients, setClients] = useState<ClientData[]>(INITIAL_CLIENTS)

  const { isLoading,  setIsLoading } = useContext<any>(IsLoadingContext);

  const fetchUserByClient = async () => {
    // console.log("user: ", user)
    try {
      // const response = await fetch(`${import.meta.env.VITE_API_URL_BACKEND}/users/user/${profileStringWithoutQuotes}`)
      const response = await fetch(`${import.meta.env.VITE_API_URL_BACKEND}/clients/`)
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      const json = await response.json();
      // console.log("/*-/*-/*-json: ", json)
      // console.log("/*-/*-/*-response: ", response)
      if(json.client===undefined) json.client = ""
      if(json.id_group_filestack===undefined) json.id_group_filestack = 0
      setClients(json);
      const transformedData = json.map((client: any) => ({
              _id: client._id || null, // Assign null if field is missing
              id: client.id || null,
              deleted: client.deleted ? "True":"False",
              enabled: client.enabled ? "True":"False",
              id_group_filestack: client.id_group_filestack || 0,
              client: client.client || "-",  // Provide default values if fields are missing
            }));
        setClients(transformedData);

    } catch (error: any) {
      // Handle any network or fetch-related errors
      console.error("ClientContext.tsx fetchClientByClient error.message: ", error.message)
      console.error("ClientContext.tsx  fetchClientByClient error.stack: ", error.stack)
    } finally {
      setIsLoading((prevLoading:any) => ({
        ...prevLoading,
        clients: false,
      }));
    }
  }

  useEffect(() => {
    if(user._id) {
      fetchUserByClient()      
    }
  }, [user]);  

  useEffect(() => {
    if (isLoading.clients) {
      fetchUserByClient();
      setIsLoading((prevLoading: any) => ({
          ...prevLoading,
          clients: false,
      }));
    }
  }, [isLoading.clients])
  return (
    <ClientsContext.Provider value={{ INITIAL_CLIENTS, clients  }}>
      {children}
    </ClientsContext.Provider>
  )
};