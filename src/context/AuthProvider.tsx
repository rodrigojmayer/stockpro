import { createContext, useEffect, useState } from "react"

const AuthContext = createContext<object | any>(undefined)

type AuthProviderProps = {
    children: React.ReactNode
}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [auth, setAuth] = useState({})
    const persistedValue = localStorage.getItem('persist');
    // const [persist, setPersist] = useState<boolean>(JSON.parse(localStorage.getItem('persist')) ?? false)
    const [persist, setPersist] = useState<boolean>(
        persistedValue ? JSON.parse(persistedValue) : false
    );
    useEffect(() => {
        console.log("AuthProvider auth: ", auth)
    }, [auth])
    return (
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext