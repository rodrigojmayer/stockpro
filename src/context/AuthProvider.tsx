import { createContext, useEffect, useState } from "react"

const AuthContext = createContext<object | any>(undefined)

type AuthProviderProps = {
    children: React.ReactNode
}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [auth, setAuth] = useState({})

    useEffect(() => {
        console.log("AuthProvider auth: ", auth)
    }, [auth])
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext