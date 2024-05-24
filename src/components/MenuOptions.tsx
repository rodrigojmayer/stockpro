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
import { useStylesGlobal } from '../Styles';
import { LanguageLabelsContext } from '../context/LanguageLabelsContext';

interface ChildProps {
    open:  boolean
    handleClose: (newData: boolean) => void
    onData: (data: { option: string, open: boolean }) => void;
}

export default function MenuOptions({ open, handleClose,  onData}: ChildProps) {
    
    const { classes } = useStylesGlobal()
    const breakpointLG = useMediaQuery('(min-width:1024px)');
    const { user, setUser, INITIAL_USER } = useContext<any>(UserContext)
    const { labelsMenuOptions } = useContext<any>(LanguageLabelsContext)
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
        <Button value="profile" key="profile" variant="text" onClick={selOp}>{labelsMenuOptions.profile}</Button>,
        <Button value="preferences" key="preferences" variant="text" onClick={selOp}>{labelsMenuOptions.preferences}</Button>,
        <Button value="logout" key="logout" variant="text" onClick={signOut}>{labelsMenuOptions.logout}</Button>,
    ];
 
    let height_box = "42%"
    if(user.id_access_level <4){
        // buttons.splice(1, 0, <Button value="alerts" key="alerts" variant="text" onClick={selOp}>Alerts</Button>)
        buttons.splice(2, 0, <Button value="users" key="users" variant="text" onClick={selOp}>{labelsMenuOptions.users}</Button>)
        height_box = "50%"
    }

    return (
        <Modal
            open={open} 
            onClose={close}
            sx={{ 
                // backgroundColor: 'rgba(0, 0, 0, .5)',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                // '& .MuiBackdrop-root': { backgroundColor: breakpointLG ? 'rgba(0, 0, 0, 0)': ""} 
                '& .MuiBackdrop-root': { backgroundColor: 'rgba(0, 0, 0, 0)'} 
            }} // Set the custom background color here
        > 
            <Box 
                className={`${classes.menu_options} ${classes[`_${user.background_color}menu_options_color` as keyof typeof classes]} ${(breakpointLG ? `${classes.menu_options_LG} ${classes[`_${user.background_color}background_color3` as keyof typeof classes]}` : `${classes.menu_options_SM} ${classes[`_${user.background_color}main_background_colorDD` as keyof typeof classes]}`)}`}
                height={height_box}
            >
                <ButtonGroup 
                    orientation="vertical"  
                >
                    {buttons}
                </ButtonGroup>
            </Box>
        </Modal>
    )
}