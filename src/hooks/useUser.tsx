import  { useCallback, useContext}  from 'react'
import { UserContext } from '../context/UserContext';
import { IsLoadingContext } from '../context/IsLoadingContext';

export default function useUser () {
    const { INITIAL_USER, user, setUser } = useContext<any>(UserContext)
    const { isLoading, setIsLoading } = useContext<any>(IsLoadingContext);
    const localStorage = window.localStorage

    const login = useCallback((response: any) => {
        console.log("useUser.tsx login response: ", response)
        console.log("useUser.tsx login user: ", user)
        console.log("useUser.tsx login localStorage: ", localStorage)
        localStorage.setItem('profile', JSON.stringify(response))
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