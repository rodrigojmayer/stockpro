import { createContext, useState, useEffect, useContext } from 'react';
import { EmailData } from '../types';
import { IsLoadingContext } from './IsLoadingContext';
import { UserContext } from './UserContext';

const INITIAL_EMAILS = [{
  _id: '',
  id_client: NaN,
  email: '',
  edited: false,
  error: '',
}];

// type UsersContextType = {
  // user: UserData;
//   setUsers: UserData;
// };

// export const UserContext = createContext<UserContextType | undefined>(undefined);
export const EmailsContext = createContext<object | undefined>(undefined);

type EmailsProviderProps = {
  children: React.ReactNode;
};

export const EmailsProvider: React.FC<EmailsProviderProps> = ({ children }) => {
  const [emails, setEmails] = useState<EmailData[]>(INITIAL_EMAILS);
  const { user } = useContext<any>(UserContext)
  const { isLoading, setIsLoading } = useContext<any>(IsLoadingContext);

  useEffect(() => {
    // console.log("EmailsContext.tsx user.id_client: ", user.id_client)

    const fetchEmailsClient = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/emails/client/${user.id_client}`); 
        // const response = await fetch(`http://localhost:4000/api/users/client/3`); 
        
        if (response.ok) {
          const json = await response.json();
          const json_filtered = json.filter((item:EmailData) => { 
            // console.log("item.id", item.id)
            // console.log("user ", user)
            // console.log("user id", user.id_access_level)
            return (!item.deleted)
            }).map((obj: EmailData) => ({
              ...obj,
              error: '',
            }))
            // console.log("json ", json)

            setEmails(json_filtered);
        } else {
          setEmails(INITIAL_EMAILS);
          // Handle the case where the response is not OK (e.g., show an error message)
        }
      } catch (error) {
        setEmails(INITIAL_EMAILS);
        // Handle any network or fetch-related errors
      } finally {
            setIsLoading((prevLoading:any) => ({
            ...prevLoading,
            user: false,
            }));
        }
    };
    if(user.id_client){
      fetchEmailsClient();
    }
  }, [user]);
  
  // useEffect(() => {
    // console.log("UsersContext.tsx users: ", users)
// }, [users]);

  return (
    <EmailsContext.Provider value={{ emails, setEmails }}>
      {children}
    </EmailsContext.Provider>
  )
};