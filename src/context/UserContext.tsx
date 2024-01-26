import { createContext, useState, useEffect, useContext } from 'react';
import { UserData } from '../types';
import { IsLoadingContext } from './IsLoadingContext';
import useUser from '../hooks/useUser';
import axios from '../api/axios'
import AuthContext from "../context/AuthProvider"

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
  const { auth } = useContext(AuthContext)
  // const profileString = window.localStorage.getItem('profile');

  const [user, setUser] = useState<UserData>(INITIAL_USER)

  const { isLoading,  setIsLoading } = useContext<any>(IsLoadingContext);
  const [_IdUserLogged, set_IdUserLogged] = useState<string|number>(INITIAL_USER._id);
  const [gmailUserLogged, setGmailUserLogged] = useState<UserData>(INITIAL_USER);



  // useEffect(() => {
  //   let isMounted = true
  //   const controller = new AbortController()
    
  //   const getUsers = async () => {
  //     try {
  //       const response = await axios.get('/users', {
  //         signal: controller.signal
  //       })
  //       console.log("axios response.data: ", response.data)
  //       isMounted && setUser(response.data)
  //     } catch (err) {
  //       console.error(err)
  //     }
  //   }

  //   getUsers()

  //   return () => {
  //     isMounted = false
  //     controller.abort()
  //   }
  // }, [])
  const fetchUserByUser = async () => {
    try {
      // const profileStringWithoutQuotes = profileString.replace(/['"]+/g, '');
      // const profileStringWithoutQuotes = user.user.replace(/['"]+/g, '');


      // loginUser(userNameEmail, userPass, rememberUser)



      // const response = await fetch(`http://localhost:4000/api/users/user/${profileStringWithoutQuotes}`)
      const response = await fetch(`http://localhost:4000/api/users/${auth._id}`)
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      const json = await response.json();
      // console.log("/*-/*-/*-json: ", json)
      // console.log("/*-/*-/*-response: ", response)
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
    console.log("/*-/*-/*-Loading.fieldsFetchEditUsersFieldsOrder: ", isLoading.fieldsFetchEditUsersFieldsOrder)
    if(auth.accessToken && isLoading.fieldsFetchEditUsersFieldsOrder) {
      fetchUserByUser()   
        setIsLoading((prevLoading: any) => ({
          ...prevLoading,
          fieldsFetchEditUsersFieldsOrder: false,
      }));   
    }
  }, [isLoading.fieldsFetchEditUsersFieldsOrder]); 

  return (
    <UserContext.Provider value={{ INITIAL_USER, user, setUser, setGmailUserLogged, gmailUserLogged, _IdUserLogged, set_IdUserLogged  }}>
      {children}
    </UserContext.Provider>
  )
};