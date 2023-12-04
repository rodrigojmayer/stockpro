import { createContext, useState, useEffect, useContext } from 'react';
import { UserData } from '../types';
import { IsLoadingContext } from './IsLoadingContext';

const INITIAL_USER = {
  // _id: NaN,
  
  // _id: "64b1b4b5cc67f2fbd144413c",
  // _id: "656dd92e05106836cd32bd8f",
  // _id: "656e002b05106836cd32bf6f",

  // _id: "656e016c05106836cd32bfb3",
  // _id: "",
  // _id: "",
  // _id: "",
  // _id: "",
  
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
  // new_user: false,
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
  const [gmailUserLogged, setGmailUserLogged] = useState<UserData>(INITIAL_USER);


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
    
    // setIsLoading((prevLoading:any) => ({
    //   ...prevLoading,
    //   user: true,
    // }));
    if(gmailUserLogged.email){
      const fetchUserByEmail = async () => {
        try {
          const response = await fetch(`http://localhost:4000/api/users/email/${gmailUserLogged.email}`);
          console.log("user by email response: ", response)
          if (response.ok) {
            const json = await response.json();
            console.log("user by email json: ", json)
            if(json)
              setUser(json);
            else{
              
              postClient()
            }
          } else {
            console.log("error email not found?: ")
          }
        } catch (error) {
          console.log("error email not found?: ", error)
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

  const postClient = async () => {
    const bodyUser: UserData= {
      ...INITIAL_USER,
      "email": gmailUserLogged.email,
      "name": gmailUserLogged.name,
      "last_name": gmailUserLogged.last_name,
      "user": gmailUserLogged.email?.split("@")[0] || "",
      "pass": "Changethispassforarandompass@2", //////////////////////  FIX
      "deleted": false, 
      "enabled": true, 
      "id_access_level": 4,
      "ordered_fields": [1,2,3,4,5],
      "language": 1,  ///////////////////////////////// FIX
      "background_color": 0,
      "alerts_enabled": false
    }
    // let loadingSuccess: boolean = false
    try {
      const response = await fetch(`http://localhost:4000/api/clients/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the appropriate content-type for my API
          // Add any other requires headers here
        },
        body:JSON.stringify({
          "deleted": false,
          "enabled": true
        })
      })

      // Check if the response status is successful
      if (response.ok) {
        const responseData = await response.json() // parse the response data
        // loadingSuccess = true
        console.log('UserContext response ok postClient responseData: ', responseData)
        console.log('UserContext response ok postClient responseData.id: ', responseData.id)
        bodyUser.id_client = responseData.id
      } else if (response.status === 400) {
        // Handle non-successful responses
        console.error('Request failed: ', response.status, response.statusText)
        const errorData = await response.json()
        console.error('Request failed 2: ', errorData.error)
        // Handle the error here
        if (errorData.errorCode === 'duplicate_product') {
          // setOpenErrorModal(true) // Open the modal for duplicate product error
          // setErrorData(errorData.errorCode)
        }
      }
    } catch (error: unknown) {
      if (typeof error === 'string') {
        // 'error' is now narrowed down to type 'string'
        console.error('Error:', error)
      } else if (error instanceof Error) {
        // 'error' is now narrowed down to type 'Error'
        console.error('Error object:', error.message)
      } else {
        // Handle other cases as needed
      }
    } finally {
      // console.log("loadingSuccess: ", loadingSuccess)
      // setIsLoading((prevLoading: any) => ({
      //   ...prevLoading,
      //   fieldsFetchCreateStock: loadingSuccess,
      // }));
      if(bodyUser.id_client)
        postUser(bodyUser)
    }
  } 


  const postUser = async (bodyUser:UserData) => {
    let loadingSuccess: boolean = false
    try {
      const response = await fetch(`http://localhost:4000/api/users/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the appropriate content-type for my API
          // Add any other requires headers here
        },
        body:JSON.stringify(bodyUser)
      })

      // Check if the response status is successful
      if (response.ok) {
        const responseData = await response.json() // parse the response data
        loadingSuccess = true
        set_IdUserLogged(responseData._id)
      } else if (response.status === 400) {
        // Handle non-successful responses
        console.error('Request failed: ', response.status, response.statusText)
        const errorData = await response.json()
        console.error('Request failed 2: ', errorData.error)
        // Handle the error here
        if (errorData.errorCode === 'duplicate_product') {
          // setOpenErrorModal(true) // Open the modal for duplicate product error
          // setErrorData(errorData.errorCode)
        }
      }
    } catch (error: unknown) {
      if (typeof error === 'string') {
        // 'error' is now narrowed down to type 'string'
        console.error('Error:', error)
      } else if (error instanceof Error) {
        // 'error' is now narrowed down to type 'Error'
        console.error('Error object:', error.message)
      } else {
        // Handle other cases as needed
      }
    } finally {
      // console.log("loadingSuccess: ", loadingSuccess)
      setIsLoading((prevLoading: any) => ({
        ...prevLoading,
        fieldsFetchCreateStock: loadingSuccess,
      }));
    }
  } 
      

  return <UserContext.Provider value={{ user, setUser, setGmailUserLogged }}>{children}</UserContext.Provider>;
};