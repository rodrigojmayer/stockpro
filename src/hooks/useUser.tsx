import  { useCallback, useContext}  from 'react'
import { UserContext } from '../context/UserContext';
import { IsLoadingContext } from '../context/IsLoadingContext';
import { RememberUserData } from '../types';

export default function useUser () {
    const { INITIAL_USER, user, setUser } = useContext<any>(UserContext)
    const { isLoading, setIsLoading } = useContext<any>(IsLoadingContext);
    const localStorage = window.localStorage

    const login = useCallback((response: any, rememberUser?: RememberUserData) => {
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

    const logout = useCallback(() => {
        localStorage.removeItem('profile')
        console.log("useUser.tsx logout localStorage: ", localStorage)
        console.log("useUser.tsx logout user: ", user)
    }, [setUser, localStorage])

    return {
        isLogged: Boolean(user._id),
        user: user,
        login,
        logout
    }
}