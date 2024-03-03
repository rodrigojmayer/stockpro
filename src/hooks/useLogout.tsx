import { Logout } from "@mui/icons-material";
import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({});
        try {
            const response = await axios('/logout', {
                withCredentials: true
            });
        } catch (err:any) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout