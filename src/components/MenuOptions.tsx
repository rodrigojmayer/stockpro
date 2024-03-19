import React from 'react'
import { useContext } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import ButtonGroup from '@mui/material/ButtonGroup';
import { UserContext } from '../context/UserContext';
import { useNavigate } from "react-router-dom"
import useUser from '../hooks/useUser';
import useLogout from '../hooks/useLogout';

const styleMenuOptions = {
    position: 'absolute',
    '&  > :nth-of-type(1)': {
        width: "100%",
        height: "100%",
    },
    '& Button': {
        color: "white",
        height: "100%",
    },
};
const styleMenuOptionsSM = {
    bottom: 64,
    width: "100%",
    backgroundColor: "rgb(18, 35, 46, 1)",
}
const styleMenuOptionsLG = {
    top: 64,
    right: 0,
    width: "15%",
    backgroundColor: "rgb(38,55, 66, 1)",
    height: "30%",
    borderRadius: "0 0 10px 10px",
};

interface ChildProps {
    open:  boolean
    handleClose: (newData: boolean) => void
    onData: (data: { option: string, open: boolean }) => void;
}

export default function MenuOptions({ open, handleClose,  onData}: ChildProps) {
    
    const breakpointLG = useMediaQuery('(min-width:1024px)');
    const { user, setUser, INITIAL_USER } = useContext<any>(UserContext)
    const { isLogged } = useUser()
    const logout = useLogout();

    const close = () => {
        handleClose(false)
    }

    const selOp = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const buttonElement = e.currentTarget.value 
        onData({option:buttonElement, open: true})
        handleClose(false)
    }

    const navigate = useNavigate();

    const signOut = async() => {

        try {
            await logout()
            setUser(INITIAL_USER)
        } catch (error: unknown) {
            console.error('Logout error: ', error)
        } finally {
            navigate('/login')
        }
    }
    
    const  buttons = [
        // <Button value="fields" key="fields" variant="text" onClick={selOp}>Fields</Button>,
        <Button value="profile" key="profile" variant="text" onClick={selOp}>Profile</Button>,
        <Button value="preferences" key="preferences" variant="text" onClick={selOp}>Preferences</Button>,
        <Button value="logout" key="logout" variant="text" onClick={signOut}>Log out</Button>,
    ];
 
    let height_box = "42%"
    if(user.id_access_level <4){
        // buttons.splice(1, 0, <Button value="alerts" key="alerts" variant="text" onClick={selOp}>Alerts</Button>)
        buttons.splice(2, 0, <Button value="users" key="users" variant="text" onClick={selOp}>Users</Button>)
        height_box = "50%"
    }

    return (
        <Modal
            open={open} 
            onClose={close}
            sx={{ 
                '& .MuiBackdrop-root': { backgroundColor: breakpointLG ? 'rgba(0, 0, 0, 0)': ""} 
            }} // Set the custom background color here
        > 
            <Box 
                sx={{
                    ...styleMenuOptions, 
                    ...(breakpointLG ? styleMenuOptionsLG : styleMenuOptionsSM)
                }}
                height={height_box}
            >
                <ButtonGroup 
                    orientation="vertical"
                    // variant="text"    
                >
                    {buttons}
                </ButtonGroup>
            </Box>
        </Modal>
    )
}