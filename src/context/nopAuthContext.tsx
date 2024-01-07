import { createContext, useContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie';

const AuthContext = createContext<object | undefined>(undefined)

type EmailsProviderProps = {
    children: React.ReactNode;
  };

export const AuthProvider: React.FC<EmailsProviderProps>  = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

    useEffect(() => {
        // Check if JWT exists in cookies
        const token = Cookies.get('jwt')
        console.log("token: ", token)
        console.log("isAuthenticated: ", isAuthenticated)
        if (token) {
            // Validate the token if needed
            setIsAuthenticated(true)
        }
    }, [])

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext)