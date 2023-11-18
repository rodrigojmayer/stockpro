import { createContext, useState, useEffect, useContext } from 'react';
import { FilestackData } from '../types';
import { IsLoadingContext } from './IsLoadingContext';
import { UserContext } from './UserContext';

const INITIAL_FILESTACK = {
  _id: 0,
  id_client: 1,
  filestack_email: '',
  createdAt: '',
  updatedAt: '',
  apikey: '',
  signature: '',
};

type FilestackContextType = {
  filestack: FilestackData;
}; 

export const FilestackContext = createContext<object | undefined>(undefined);

type FilestackProviderProps = {
  children: React.ReactNode;
};

export const FilestackProvider: React.FC<FilestackProviderProps> = ({ children }) => {
  const { user } = useContext<any>(UserContext);
  
  const [filestack, setFilestack] = useState<FilestackData>(INITIAL_FILESTACK);
  const { isLoading, setIsLoading } = useContext<any>(IsLoadingContext);

  useEffect(() => {
    const fetchFilestack = async () => {
      try {
        console.log("user.id_client: ", user.id_client)
        const response = await fetch(`http://localhost:4000/api/filestackEmails/client/${user.id_client}`); 
        console.log("filestack response: ", response)
        if (response.ok) {
          const json = await response.json();
          setFilestack(json);
        } else {
          // setFilestack(INITIAL_FILESTACK);
          // Handle the case where the response is not OK (e.g., show an error message)
        }
      } catch (error) {
        // setFilestack(INITIAL_FILESTACK);
        // Handle any network or fetch-related errors
      } finally {
            setIsLoading((prevLoading:any) => ({
            ...prevLoading,
            filestack: false,
            }));
        }
    };

    if (!isLoading.user) {
      fetchFilestack();
    }
  }, [user]);

  return <FilestackContext.Provider value={{ filestack, setFilestack }}>{children}</FilestackContext.Provider>;
};