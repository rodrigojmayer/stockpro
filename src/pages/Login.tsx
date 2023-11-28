import { NavLink, Outlet } from "react-router-dom"
import LoginModal from "../components/LoginModal"
import { useState } from "react";

export default function Login () {

    // const [openLoginModal, setOpenLoginModal] = useState(true);  
   

    // const handleCloseLoginModal = () => {
    //     setOpenLoginModal(false)
    // }


    return (
        <div>
            <LoginModal 
                // openLoginModal={openLoginModal}
                // closeLoginModal={handleCloseLoginModal}
                // source={"stock"}
                // data={stockNameTemp} 
                // confirmDelete={handleConfirmDelete}
            />
                
            <NavLink to="/">Home</NavLink>
        </div>
    )
}