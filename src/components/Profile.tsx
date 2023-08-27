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
import { ColumnData, ColumnDataCustom, ChildProps } from '../types';
import { UserContext } from '../context/UserContext';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


export default function Profile( { open, handleClose }: ChildProps) {
    // const { openSaveChanges, closeSaveChanges } = props;
    const { classes } = useStylesGlobal();
    const close = () => {
        handleClose(false)
    }

    const { user, setUser } = useContext<any>(UserContext); 
    const[ profileName, setProfileName ] = useState<string>(user.name)
    const[ profileLastName, setProfileLastName ] = useState<string>(user.last_name)
    const[ profileEmail, setProfileEmail ] = useState<string>(user.email)
    const[ profileUser, setProfileUser ] = useState<string>(user.user)
    const[ profilePass, setProfilePass ] = useState<string>(user.pass)
    const[ showProfilePass, setShowProfilePass ] = useState<boolean>(false)
    const[ profileConfirmPass, setProfileConfirmPass ] = useState<string>(user.pass)
    const[ showProfileConfirmationPass, setShowProfileConfirmationPass ] = useState<boolean>(false)
    
    useEffect(() => {
        setProfileName(user.name)
        setProfileLastName(user.last_name)
         setProfileEmail(user.email)
        setProfileUser(user.user)
        setProfilePass(user.pass)
        setShowProfilePass(false)
        setProfileConfirmPass(user.pass)
    }, [user])

    const [openSaveChanges, setOpenSaveChanges] = useState(false);  
    const handleCloseSaveChanges = (ans?:boolean) => {
        // console.log("ans: ", ans)   // If true should save the changes, if false shouldnt. In both cases has to close all the modals. If undefined should do nothing, just close the modal save changes
        if(ans){
            // setSelectedUsers(selectedUsersTemp)
            // setEmailsAlerts(emailsAlertsTemp.filter(emailAlert => { if(emailAlert.email != "") return emailAlert}))
            close()
        }
        setOpenSaveChanges(false);
    }
    const handleOpenSaveChanges = () => setOpenSaveChanges(true);

    const handleEditName = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("engtradsagf")
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
    
    const showProfilePassToggle = () => {
        setShowProfilePass(!showProfilePass)
    }
    const showProfileConfirmationPassToggle = () => {
        setShowProfileConfirmationPass(!showProfileConfirmationPass)
    }

    useEffect(() => {
        {showProfileConfirmationPass?<VisibilityIcon/>:<VisibilityOffIcon/>}
    }, [showProfileConfirmationPass])
    
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
                    <Typography align="center" variant="h5">
                        Profile
                    </Typography>
                    <Box className={classes.customBoxColumn}>
                        {/* <FormControl 
                        className={classes.formControlUsers}
                                    size="small"
                        >
                            <InputLabel 
                            className={classes.inputLabelUsers} >Users</InputLabel>  
                        </FormControl> */}
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
                                label="Alias"
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
                                label="Password"
                                maxRows={1}
                                size="small"
                                type={showProfilePass ? "text" : "password"}
                                className={classes.inputMainData}
                                value={profilePass}
                                onChange={ handleEditPass }
                                
                                InputProps={{
                                    className: classes.inputClassName,
                                    endAdornment: (
                                        <IconButton onClick={showProfilePassToggle}>
                                            {showProfilePass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                    ),
                                }}
                            />
                        </Box>
                        <Box className={classes.customBoxRow}>
                            <TextField
                                label="Confirm password"
                                maxRows={1}
                                size="small"
                                type={showProfileConfirmationPass ? "text" : "password"}
                                className={classes.inputMainData}
                                value={profileConfirmPass}
                                onChange={ handleEditConfirmPass }
                                InputProps={{
                                    className: classes.inputClassName,
                                    endAdornment: (
                                        <IconButton onClick={showProfileConfirmationPassToggle}>
                                            {showProfileConfirmationPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                    ),
                                }}
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