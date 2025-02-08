import { useLocation, Navigate, useNavigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useContext, useEffect, useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import { IsLoadingContext } from "../context/IsLoadingContext";
import Administrator from "../pages/Administrator";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();
    const { isLoading, setIsLoading } = useContext<any>(IsLoadingContext);
    const [ authState, setAuthState ] = useState(auth._id);
    const [render, setRender] = useState("loading");
    // const [initialPathname, setInitialPathname] = useState(location.pathname);
    const [countAuthRenders, setCountAuthRenders] = useState(0);
    const navigate = useNavigate();
    // console.log("location: ", location.pathname)

    useEffect(() => {
        // setCountAuthRenders(0)
        // console.log("auth[]: ", auth)
        if(location.pathname === "/administrator") {
            setIsLoading((prevLoading:any) => ({
                ...prevLoading,
                administrator: true,
            }));
        }
    }, [])

    useEffect(() => {
        if(Object.keys(auth).length===0) setRender("login");
        if(authState!==auth._id) setAuthState(auth._id);
        // console.log("-------------------" )
        // console.log("render: ", render)
        if(Object.keys(auth).length !== 0 || countAuthRenders>0){
        // console.log("auth: ", auth)
        if(authState!==auth._id) setAuthState(auth._id);
        // console.log("Object.keys(auth).length: ", Object.keys(auth).length)
        // if(Object.keys(auth).length===0) setRender("login");
        // // console.log("countAuthRenders: ", countAuthRenders)
        // console.log("location.pathname: ", location.pathname)
        // if (auth._id ){
        //     if(auth._id === "65ec59db81901b6dd1f45a13" && location.pathname === "/administrator") {
        //         console.log("in to the second if-----******")
        //         setRender("administrator")
        //     } else {
        //         console.log("in to the elseXXXXXXXXXXXXX")
        //         navigate('/')
        //         setRender("home")
        //     }
        } else if(countAuthRenders === 30) {
        // } else if(countAuthRenders === 50) {
            setRender("login")
        // } else {setRender("login");
            // setCountAuthRenders(countAuthRenders+1)
        // }
        } else {
            setCountAuthRenders(countAuthRenders+1)
        }
    // }, [auth, countAuthRenders])
    }, [auth])
    
    useEffect(() => {
        // console.log("render: ", render)
        // console.log("authState: ", authState)
        // console.log("location.pathname: ", location.pathname)
        // console.log("initialPathname: ", initialPathname)
        if (authState){
            if(authState === "65ec59db81901b6dd1f45a13" && isLoading.administrator) {
                // console.log("in to the second if-----******")
                // navigate('/administrator')
                setRender("administrator")
                setIsLoading((prevLoading:any) => ({
                    ...prevLoading,
                    administrator: false,
                }));
            } else {
                // console.log("in to the elseXXXXXXXXXXXXX")
                navigate('/')
                setRender("home")
            }
        }
    }, [authState])
    let FinalComponent = (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
    
    if(!isLoading.user || render ==="login"){
        switch (render) {
            case "administrator":
                // FinalComponent = (<Navigate to="/administrator" state={{ from: location }} replace />);
                FinalComponent = (<Administrator />);
            break;
            case "home":
                FinalComponent = (<Outlet />);
            break;
            
            case "login":
                FinalComponent = (<Navigate to="/login" state={{ from: location }} replace />);
            break;
            
            default:
                FinalComponent = (
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={true}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                );
            break;
        }
    }

    return (
        <>{FinalComponent} </>
    )
}

export default RequireAuth;
