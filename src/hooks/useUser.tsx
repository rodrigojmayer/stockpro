import  { useCallback, useContext}  from 'react'
import { UserContext } from '../context/UserContext';
import { IsLoadingContext } from '../context/IsLoadingContext';

export default function useUser () {
    const { user, setUser } = useContext<any>(UserContext)
    const { isLoading, setIsLoading } = useContext<any>(IsLoadingContext);
    const localStorage = window.localStorage

    const login = useCallback((response: any) => {
        console.log("useUser.tsx response: ", response)
        localStorage.setItem('profile', JSON.stringify(response))
        setUser(response)
    }, [setUser, localStorage])

    const logout = useCallback(() => {
        setUser(null)
        localStorage.removeItem('profile')
    }, [setUser, localStorage])

    return {
        isLogged: Boolean(user._id),
        user: user,
        login,
        logout
    }

}