import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from 'tss-react/mui';
import { Box,
         Container,
         Grid,
         IconButton,
         Modal, 
         TextField,
         Typography,
         OutlinedInput,
         InputLabel,
         MenuItem,
         Select,
         FormControl,
         Stack,
         Chip,
        } from '@mui/material';
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import Paper from '@mui/material/Paper/Paper';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"

import { OkButton,
         CancelButton, 
         PlusButton,
        } from './Buttons';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import ControlPointTwoToneIcon from '@mui/icons-material/ControlPointTwoTone';
import EditIcon from '@mui/icons-material/Edit';
import List from '@mui/material/List/List';
import IonTrash from "../assets/ion_trash.svg";
import SaveChanges from './SaveChanges';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { useStylesGlobal, modalStyleExternal, modalStyleInternal } from '../Styles'
import { ColumnData, ColumnDataCustom, ChildProps, UserEditData } from '../types';
import { UserContext } from '../context/UserContext';
import { IsLoadingContext } from '../context/IsLoadingContext';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ErrorModal from './ErrorModal';


export default function Profile( { open, handleClose }: ChildProps) {
    // const { openSaveChanges, closeSaveChanges } = props;
    const { classes } = useStylesGlobal();
    const close = () => {
        handleClose(false)
    }

    const { isLoading, setIsLoading, openBackdrop, setOpenBackdrop } = useContext<any>(IsLoadingContext)
    const { user, setUser } = useContext<any>(UserContext); 
    const[ profileName, setProfileName ] = useState<string>('')
    const[ profileLastName, setProfileLastName ] = useState<string>('')
    const[ profileEmail, setProfileEmail ] = useState<string>(user.email)
    const[ profileUser, setProfileUser ] = useState<string>(user.user)
    const[ profilePass, setProfilePass ] = useState<string>(user.pass)
    const[ showProfilePass, setShowProfilePass ] = useState<boolean>(false)
    const[ profileConfirmPass, setProfileConfirmPass ] = useState<string>(user.pass)
    const[ showProfileConfirmationPass, setShowProfileConfirmationPass ] = useState<boolean>(false)
    
    const [openSaveChanges, setOpenSaveChanges] = useState(false);  
    const [openErrorModal, setOpenErrorModal] = useState(false);  
    const [errorData, setErrorData] = useState("");  
    

    const handleCloseSaveChanges = (ans?:boolean) => {
        // console.log("profileLastName: ", profileLastName)
        alert(`user._id:  ${user._id}`)   

        if(ans){
                const bodyUpdate: UserEditData = {}
                if(user.name!=profileName)
                    bodyUpdate.name= profileName
                if(user.last_name!=profileLastName)
                    bodyUpdate.last_name = profileLastName
                if(user.email!=profileEmail)
                    bodyUpdate.email = profileEmail
                if(user.user!=profileUser)
                    bodyUpdate.user = profileUser
                if(user.pass!=profilePass)
                    bodyUpdate.pass = profilePass

                const fetchUpdateUser = async () => {
                let loadingSuccess: boolean = false
                try {
                    const response = await fetch(`http://localhost:4000/api/users/${user._id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json', // Set the appropriate content-type for my API
                            // Add any other requires headers here
                        },
    
                        body:JSON.stringify(bodyUpdate)
                    })
    
                    // Check if the response status is successful
                    if (response.ok) {
                        const responseData = await response.json() // parse the response data
                        // console.log('POST request successful: ', responseData)
                        loadingSuccess = true
                    } else {
                        // Handle non-successful responses
                        console.error('Request failed: ', response.status, response.statusText)
                        // Handle the error here
                    }
                } catch (error: unknown) {
                    if (typeof error === 'string') {
                        // 'error' is now narrowed down to type 'string'
                        console.error('Error:', error)
                    } else if (error instanceof Error) {
                        // 'error' is now narrowed down to type 'Error'
                        console.error('Error object:', error.message)
                    } else {
                        // Handle other cases as needed
                    }
                } finally {
                    // setIsLoading(())
                    setIsLoading((prevLoading: any) => ({
                        ...prevLoading,
                        fieldsFetchCreateStock: loadingSuccess,
                    }));
                }
            } 
            fetchUpdateUser()
            close()
        }
        setOpenSaveChanges(false);
    }
    
    const handleCloseErrorModal = () => {
        setOpenErrorModal(false)
    }

    const handleOpenSaveChanges = () => {
        // console.log("stockNameTemp: ", stockNameTemp)

        if(profileUser===""){
            setOpenErrorModal(true)
            setErrorData("missing_data_user")
        }else if(profilePass!==profileConfirmPass){
            setOpenErrorModal(true)
            setErrorData("not_confirmed_pass")
        }
        else{
            setOpenSaveChanges(true);
        }
    };

    const handleEditName = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log("engtradsagf")
        setProfileName(event.target.value)
    }
    const handleEditLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProfileLastName(event.target.value)
    }
    const handleEditEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProfileEmail(event.target.value)
    }
    const handleEditUser = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProfileUser(event.target.value)
    }
    const handleEditPass = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProfilePass(event.target.value)
    }
    const handleEditConfirmPass = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProfileConfirmPass(event.target.value)
    }
    
    // const showProfilePassToggle = () => {
    //     setShowProfilePass(!showProfilePass)
    // }
    // const showProfileConfirmationPassToggle = () => {
    //     setShowProfileConfirmationPass(!showProfileConfirmationPass)
    // }

    useEffect(() => {
        setProfileName(user.name?user.name:'')
        setProfileLastName(user.last_name?user.last_name:'')
        setProfileEmail(user.email?user.email:'')
        setProfileUser(user.user?user.user:'')
        setProfilePass(user.pass?user.pass:'')
        setProfileConfirmPass(user.pass?user.pass:'')
        setShowProfilePass(false)
        setShowProfileConfirmationPass(false)
    }, [user, open])
    
    return (
        <Modal
        open={open} 
        onClose={close}
        > 
            <Box sx={modalStyleExternal}>
                <Box sx={modalStyleInternal}>
                    <SaveChanges
                        openSaveChanges={openSaveChanges}
                        closeSaveChanges={handleCloseSaveChanges} 
                    />
                    <ErrorModal
                        openErrorModal={openErrorModal}
                        closeErrorModal={handleCloseErrorModal}
                        errorData={errorData} 
                    />
                    <Typography align="center" variant="h5">
                        Profile
                    </Typography>
                    <Box className={classes.customBoxColumn}>
                        <Box className={classes.customBoxRow}>
                            <TextField
                                label="Name"
                                maxRows={1}
                                size="small"
                                type="text"
                                className={classes.inputMainData}
                                value={profileName}
                                onChange={ handleEditName }
                                InputProps={{className: classes.inputClassName,}}
                            />
                        </Box>
                        <Box className={classes.customBoxRow}>
                            <TextField
                                label="Last name"
                                maxRows={1}
                                size="small"
                                type="text"
                                className={classes.inputMainData}
                                value={profileLastName}
                                onChange={ handleEditLastName }
                                InputProps={{className: classes.inputClassName,}}
                            />
                        </Box>
                        <Box className={classes.customBoxRow}>
                            <TextField
                                label="Email"
                                maxRows={1}
                                size="small"
                                type="email"
                                className={classes.inputMainData}
                                value={profileEmail}
                                onChange={ handleEditEmail }
                                InputProps={{className: classes.inputClassName,}}
                            />
                        </Box>
                        <Box className={classes.customBoxRow}>
                            <TextField
                                label="Alias*"
                                maxRows={1}
                                size="small"
                                type="text"
                                className={classes.inputMainData}
                                value={profileUser}
                                onChange={ handleEditUser }
                                InputProps={{className: classes.inputClassName,}}
                            />
                        </Box>
                        <Box className={classes.customBoxRow}>
                            <TextField
                                label="Password*"
                                maxRows={1}
                                size="small"
                                type={showProfilePass ? "text" : "password"}
                                className={classes.inputMainData}
                                value={profilePass}
                                onChange={ handleEditPass }
                                // InputProps={{
                                //     className: classes.inputClassName,
                                //     endAdornment: (
                                //         <IconButton onClick={showProfilePassToggle}>
                                //             {showProfilePass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                //         </IconButton>
                                //     ),
                                // }}
                            />
                        </Box>
                        <Box className={classes.customBoxRow}>
                            <TextField
                                label="Confirm password*"
                                maxRows={1}
                                size="small"
                                type={showProfileConfirmationPass ? "text" : "password"}
                                className={classes.inputMainData}
                                value={profileConfirmPass}
                                onChange={ handleEditConfirmPass }
                                // InputProps={{
                                //     className: classes.inputClassName,
                                //     endAdornment: (
                                //         <IconButton onClick={showProfileConfirmationPassToggle}>
                                //             {showProfileConfirmationPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                //         </IconButton>
                                //     ),
                                // }}
                            />
                        </Box>
                    </Box>
                    <Box className={classes.finishButtons}>
                        <CancelButton
                        clicked={() => close()}
                        />
                        <OkButton
                        clicked={() => handleOpenSaveChanges()}
                        />
                    </Box> 
                </Box>
            </Box>
        </Modal>
    )
}