import  { useCallback, useContext}  from 'react'
import { UserContext } from '../context/UserContext';
import { IsLoadingContext } from '../context/IsLoadingContext';
import { RememberUserData, UserEditData } from '../types';
import AuthContext from "../context/AuthProvider"
import axios from '../api/axios'
import { useLocation, useNavigate } from 'react-router-dom';

export default function useUser () {
  
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { setAuth } = useContext(AuthContext)
  const { INITIAL_USER, user, setUser } = useContext<any>(UserContext)
  const { isLoading, setIsLoading } = useContext<any>(IsLoadingContext);
  // const localStorage = window.localStorage

  // const loginLocalStorage = useCallback((response: any, rememberUser?: RememberUserData) => {
  //     console.log("useUser.tsx login response: ", response)
  //     console.log("useUser.tsx login user: ", user)
  //     // console.log("useUser.tsx login localStorage: ", localStorage)
  //     // console.log("useUser.tsx login rememberUser: ", rememberUser)
  //     localStorage.setItem('profile', JSON.stringify(response.user))
  //     if(rememberUser){
  //         const { user_email, pass } = rememberUser
  //         const selectedFields = { user_email, pass}
  //         console.log("useUser selectedFields: ", selectedFields)
  //         if(rememberUser.enabled)
  //             localStorage.setItem(`remember_profile_${rememberUser.user_email}`, JSON.stringify(selectedFields))
  //         else
  //             localStorage.removeItem(`remember_profile_${rememberUser.user_email}`)
  //     }
  //     setUser(response)
  // }, [setUser, localStorage])

  // const logoutLocalStorage = async  () => {
  //     // localStorage.removeItem('profile')
  //     // console.log("useUser.tsx logout localStorage: ", localStorage)
  //     // console.log("useUser.tsx logout user: ", user)
  //     try {
  //       const response = await axios.get('/logout', {
  //         withCredentials: true
  //       })
  //       // console.log("response: ", response)
  //     } catch (err:any) {
  //       console.log("error: ", err)
  //     // } finally {
  //       // navigate('/')
  //     // navigate(from, { replace: true });
  //     }
  // }

  const loginUser = async (userNameEmail: string, userPass: string, rememberUser?: RememberUserData) => {
    // try {
    //   // const response = await fetch(`http://localhost:4000/api/users/login/`, {
    //   const response = await fetch(`http://localhost:4000/api/auth/`, {
    //     method: 'POST',
    //     credentials: 'include',
    //     headers: {
    //       'Content-Type': 'application/json', // Set the appropriate content-type for my API
    //       // Add any other requires headers here
    //     },
    //     body:JSON.stringify({
    //       "user_email": userNameEmail,
    //       "pass": userPass
    //     })
    //   });
    //   if (response.ok) {
    //     const json = await response.json();
    //     if(json){
    //         loginLocalStorage(json, rememberUser);
    //     }
    //     else{
    //       console.log("error email not found 1?: ")
    //     }
    //   } else {
    //     console.log("error email not found 2?: ", response)
    //   }
    // } catch (error) {
    //   console.log("error email not found?: ", error)
    //   // setUser(INITIAL_USER);
    //   // Handle any network or fetch-related errors
    // } finally {
    //   setIsLoading((prevLoading:any) => ({
    //     ...prevLoading,
    //     user: false,
    //   }));
    //   // setGmailUserLogged(INITIAL_USER)  // Resetting after login to allow later the logout
    // }
  
    try {
      // console.log("useUser before response userNameEmail: ", userNameEmail)

      const response = await axios.post('/auth',
        // JSON.stringify({userNameEmail, userPass}),
        JSON.stringify({
          "user_email": userNameEmail,
          "pass": userPass
        }),
        {
          headers: { 'Content-Type': 'application/json'},
          withCredentials: true
        }
      )
      // console.log("useUser response: ", response)
      // console.log("useUser JSON.stringify(response): ", JSON.stringify(response))
      // console.log("useUser JSON.stringify(response?.data): ", JSON.stringify(response?.data))
      // console.log(JSON.stringify(response))
      const accessToken = response?.data.accessToken
      const _id = response?.data._id
      // const id_client = response?.data._id
      // const ordered_fields = response?.data.ordered_fields
      // const roles = response?.data.roles
      // setAuth({ userNameEmail, userPass, roles, accessToken})
      // setAuth({ userNameEmail, userPass, accessToken, id_client, ordered_fields})
      setAuth({ userNameEmail, accessToken, _id})
      navigate(from, { replace: true });
      // console.log(JSON.stringify(response))
      // if (response.ok) {
      //       const json = await response.json();
      //       if(json){
      //           loginLocalStorage(json, rememberUser);
      //       }
      //       else{
      //         console.log("error email not found 1?: ")
      //       }
      //     } else {
      //       console.log("error email not found 2?: ", response)
      //     }
    } catch (err:any) {
      console.log("error email not found?: ", err)
      //   // setUser(INITIAL_USER);
      //   // Handle any network or fetch-related errors
      if (!err?.response) {
        console.error('No Server Response')
        // setErrMsg('No Server Response')
      } else if (err.response?.status === 400) {
        console.error('Missing Username or Password')
        // setErrMsg('Missing Username or Password')
      } else if (err.response?.status === 401) {
        console.error('Unauthorized')
        // setErrMsg('Unauthorized')
      } else {
        console.error('Login Failed')
        // setErrMsg('Login Failed')
      }
    } finally {
      // navigate('/')
      
      setIsLoading((prevLoading:any) => ({
        ...prevLoading,
        user: true,
      }));
    }

  };

  return {
    isLogged: Boolean(user._id),
    user: user,
    // loginLocalStorage,
    // logoutLocalStorage,
    loginUser
  }
}