import { useLocation, Navigate, useNavigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useContext, useEffect, useState } from "react";
import { IsLoadingContext } from "../context/IsLoadingContext";
import { Backdrop, CircularProgress } from "@mui/material";
import { Suspense } from 'react';

const RequireAuth = () => {
    const { auth, persist } = useAuth();
    const location = useLocation();
    const { isLoading, setIsLoading , } = useContext<any>(IsLoadingContext);
    const [loading, setLoading] = useState(true);
    const [secondLoad, setSecondLoad] = useState(false);
    const [render, setRender] = useState("loading");
    // const [countAuthRenders, setcountAuthRenders] = useState(0);
    const navigate = useNavigate();

    
    // console.log(" isLoading: ", isLoading)
    // console.log(" auth: ", auth)
    console.log(" _id: ", auth._id)
    // console.log(" auth userNameEmail: ", auth?.userNameEmail)

    useEffect(() => {
        // setcountAuthRenders(+1)
        // console.log("useEffect isLoading: ", isLoading)
        // console.log("useEffect auth: ", auth)
        console.log("useEffect _id: ", auth._id)
        // console.log("useEffect auth userNameEmail: ", auth?.userNameEmail)
        if(auth || secondLoad){
            if (auth._id){

                navigate('/')
                setRender("home")
            } else {
                // navigate('/login')
                setRender("login")
            }
            // setIsLoading(false)
            
        } else {
            setSecondLoad(true)
        }
    }, [auth])
    // useEffect(() => {
    //     console.log("RequireAuth persist: ", persist)
    // }, [persist])
    // useEffect(() => {
    //     console.log("countAuthRenders: ", countAuthRenders)
    // }, [countAuthRenders])

    return (
        <>
         {
            // auth?._id && (isLoading.user || 
            // isLoading.products ||
            // isLoading.columns||
            // isLoading.customColumns)
                 render==="login"   ? 
                 <Navigate to="/login" state={{ from: location }} replace />
                    : (render === "home" && !isLoading.user && !isLoading.products && !isLoading.columns && !isLoading.customColumns )?
                    // : auth?._id 
                         <Outlet />
                        : 
                    <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={true} // Loading...
                  >
                    <CircularProgress color="inherit" />
                  </Backdrop>
        } 
        </>
    )
}

export default RequireAuth;
