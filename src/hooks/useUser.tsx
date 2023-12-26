import  { useCallback, useContext}  from 'react'
import { UserContext } from '../context/UserContext';
import { IsLoadingContext } from '../context/IsLoadingContext';
import { RememberUserData, UserEditData } from '../types';

export default function useUser () {
    const { INITIAL_USER, user, setUser } = useContext<any>(UserContext)
    const { isLoading, setIsLoading } = useContext<any>(IsLoadingContext);
    const localStorage = window.localStorage

    const loginLocalStorage = useCallback((response: any, rememberUser?: RememberUserData) => {
        console.log("useUser.tsx login response: ", response)
        console.log("useUser.tsx login user: ", user)
        console.log("useUser.tsx login localStorage: ", localStorage)
        console.log("useUser.tsx login rememberUser: ", rememberUser)
        localStorage.setItem('profile', JSON.stringify(response.user))
        if(rememberUser){
            const { user_email, pass } = rememberUser
            const selectedFields = { user_email, pass}
            console.log("useUser selectedFields: ", selectedFields)
            if(rememberUser.enabled)
                localStorage.setItem(`remember_profile_${rememberUser.user_email}`, JSON.stringify(selectedFields))
            else
                localStorage.removeItem(`remember_profile_${rememberUser.user_email}`)
        }
        setUser(response)
    }, [setUser, localStorage])

    const logoutLocalStorage = useCallback(() => {
        localStorage.removeItem('profile')
        console.log("useUser.tsx logout localStorage: ", localStorage)
        console.log("useUser.tsx logout user: ", user)
    }, [setUser, localStorage])

    const loginUser = async (userNameEmail: string, userPass: string, rememberUser?: RememberUserData) => {
        try {
          const response = await fetch(`http://localhost:4000/api/users/login/`, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json', // Set the appropriate content-type for my API
              // Add any other requires headers here
            },
            body:JSON.stringify({
              "user_email": userNameEmail,
              "pass": userPass
            })
          });
          if (response.ok) {
            const json = await response.json();
            if(json){
                loginLocalStorage(json, rememberUser);
            }
            else{
              console.log("error email not found 1?: ")
            }
          } else {
            console.log("error email not found 2?: ", response)
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
          // setGmailUserLogged(INITIAL_USER)  // Resetting after login to allow later the logout
        }
      };
    //   fetchUser();

    return {
        isLogged: Boolean(user._id),
        user: user,
        loginLocalStorage,
        logoutLocalStorage,
        loginUser
    }
}