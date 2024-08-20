import { useLocation, Navigate, useNavigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useContext, useEffect, useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import { IsLoadingContext } from "../context/IsLoadingContext";
import Administrator from "../pages/Administrator";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();
    const { isLoading } = useContext<any>(IsLoadingContext);
    const [render, setRender] = useState("loading");
    const [countAuthRenders, setCountAuthRenders] = useState(0);
    const navigate = useNavigate();
    // console.log("location: ", location.pathname)

    useEffect(() => {
            setCountAuthRenders(0)
    }, [])

    useEffect(() => {
        if(Object.keys(auth).length !== 0 || countAuthRenders>0){
            // console.log("auth._id: ", auth)
            // console.log("countAuthRenders: ", countAuthRenders)
            if (auth._id){
                if(auth._id === "65ec59db81901b6dd1f45a13" && location.pathname === "/administrator") {
                    setRender("administrator")
                } else {
                    navigate('/')
                    setRender("home")
                }
            } else if(countAuthRenders === 30) {
            // } else if(countAuthRenders === 50) {
                setRender("login")
            } else {
                setCountAuthRenders(countAuthRenders+1)
            }
        } else {
            setCountAuthRenders(countAuthRenders+1)
        }
    }, [auth, countAuthRenders])
    
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
