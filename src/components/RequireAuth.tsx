import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";

const RequireAuth = () => {
    const { auth, persist } = useAuth();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const [secondLoad, setSecondLoad] = useState(false);

    useEffect(() => {
        console.log("RequireAuth auth: ", auth)
        console.log("RequireAuth _id: ", auth._id)
        console.log("RequireAuth auth userNameEmail: ", auth?.userNameEmail)
        if(auth || secondLoad){
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
                        ? <Outlet />
                        : <Navigate to="/login" state={{ from: location }} replace />
              

                
            // auth?._id
            //     ? auth._id
            //         ? <Outlet />
            //         : <Navigate to="/login" state={{ from: location }} replace />
            //     : <></>

        }
        </>
    )
}

export default RequireAuth;