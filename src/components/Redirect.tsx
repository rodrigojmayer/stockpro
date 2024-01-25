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
        console.log("RequireAuth auth: ", auth)
        console.log("RequireAuth _id: ", auth._id)
        console.log("RequireAuth auth userNameEmail: ", auth?.userNameEmail)
        if(auth || secondLoad){
            if (auth._id ){
                
                console.log("!!!!!!!!!!!!!!Redirect navigate: ")
                navigate('/')
            } 
            setIsLoading(false)
        } else {
            setSecondLoad(true)
        }
    }, [auth])
    useEffect(() => {
        console.log("RequireAuth persist: ", persist)
    }, [persist])

    return (
        <>
        {
            // auth?._id
            //     ? <Outlet />
            //     : <Navigate to="/login" state={{ from: location }} replace />


            isLoading
                    ? <p>Loadinggggggggg</p>
                    : auth?._id 
                        ? <Navigate to="/" state={{ from: location }} replace />
                        : <Outlet />
                        
              

                
            // auth?._id
            //     ? auth._id
            //         ? <Outlet />
            //         : <Navigate to="/login" state={{ from: location }} replace />
            //     : <></>

        }
        </>
    )
}

export default Redirect;