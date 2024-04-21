import { useLocation, Navigate, useNavigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";

const Redirect = () => {
    const { auth, persist } = useAuth();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const [secondLoad, setSecondLoad] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if(auth || secondLoad){
            if (auth._id ){
                navigate('/')
            } 
            setIsLoading(false)
        } else {
            setSecondLoad(true)
        }
    }, [auth])

    return (
        <>
        {
            isLoading
                    ? <p></p>
                    : auth?._id 
                        ? <Navigate to="/" state={{ from: location }} replace />
                        : <Outlet />
        }
        </>
    )
}

export default Redirect;