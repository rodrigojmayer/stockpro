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
import { ColumnData, ColumnDataCustom, ChildProps, UserEditData, PreferencesEditData } from '../types';
import { UserContext } from '../context/UserContext';
import { IsLoadingContext } from '../context/IsLoadingContext';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ErrorModal from './ErrorModal';
import { CheckListStockContext } from '../context/CheckListStockContext';


export default function Preferences( { open, handleClose }: ChildProps) {
    // const { openSaveChanges, closeSaveChanges } = props;
    const { classes } = useStylesGlobal();
    const close = () => {
        handleClose(false)
    }


    const languagesArray = [
        {"id": 0,
        "name": "English"},
        {"id": 1,
        "name": "Español"},
    ]
    const backgroundColorsArray = [
        {"id": 0,
        "name": "Space blue"},
        {"id": 1,
        "name": "Dark"},
        {"id": 2,
        "name": "Light"},
        {"id": 3,
        "name": "Minimal warm"},
    ]
    const { isLoading, setIsLoading, openBackdrop, setOpenBackdrop } = useContext<any>(IsLoadingContext)
    const { user, setUser } = useContext<any>(UserContext); 
    const { checkListStock, setCheckListStock } = useContext<any>(CheckListStockContext)
    const[ languagePref, setLanguagePref ] = useState<number>(0)
    const[ backgroundColorPref, setBackgroundColorPref ] = useState<number>(0)
    
    const [openSaveChanges, setOpenSaveChanges] = useState(false);  
    const [openErrorModal, setOpenErrorModal] = useState(false);  
    const [errorData, setErrorData] = useState("");  
    

    const handleCloseSaveChanges = (ans?:boolean) => {
        // console.log("languagePref: ", languagePref)
        // alert(`user._id:  ${user._id}`)   

        if(ans){
                const bodyUpdate: PreferencesEditData = {}
                if(user.language!=languagePref)
                    bodyUpdate.language= languagePref
                if(user.background_color!=backgroundColorPref)
                    bodyUpdate.background_color = backgroundColorPref

                const fetchUpdatePreferences = async () => {
                let loadingSuccess: boolean = false
                try {
                    const response = await fetch(`${import.meta.env.VITE_API_URL_BACKEND}/users/${user._id}`, {
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

                    setCheckListStock([]);
                }
            } 
            fetchUpdatePreferences()
            close()
        }
        setOpenSaveChanges(false);
    }
    
    const handleCloseErrorModal = () => {
        setOpenErrorModal(false)
    }

    const handleOpenSaveChanges = () => {
        // console.log("stockNameTemp: ", stockNameTemp)

        // if(profileUser===""){
        //     setOpenErrorModal(true)
        //     setErrorData("missing_data_user")
        // }else if(profilePass!==profileConfirmPass){
        //     setOpenErrorModal(true)
        //     setErrorData("not_confirmed_pass")
        // }
        // else{
            setOpenSaveChanges(true);
        // }
    };

    const handleLanguagePref = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log("handleLanguagePref", event.target.value)
        setLanguagePref(Number(event.target.value))
    }
    const handleBackgroundColorPref = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log("handleBackgroundColorPref", event.target.value)
        setBackgroundColorPref(Number(event.target.value))
    }
    
    useEffect(() => {
        setLanguagePref(user.language?user.language:0)
        setBackgroundColorPref(user.background_color?user.background_color:0)
    }, [user, open])
    
    return (
        <Modal
            sx={{backgroundColor: 'rgba(0, 0, 0, .5)'}}
            open={open} 
            onClose={close}
        > 
            <form
                onKeyDown={(e:any) => {
                    if (e.key === "Enter") {
                        e.preventDefault()
                        handleOpenSaveChanges()
                        e.stopPropagation()
                    }
                }}
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
                        <Typography align="center" variant="h5" className={classes.title}>
                            Preferences
                        </Typography>
                        <Box className={classes.customBoxColumn}>
                            <Box className={classes.customBoxRow}>
                                <TextField 
                                    label="Language"
                                    size="small"
                                    select
                                    className={classes.inputMainData}
                                    InputProps={{className: classes.inputClassName}}
                                    value={languagePref}
                                    onChange={ handleLanguagePref }
                                    >
                                        {languagesArray.map((language) => (
                                            <MenuItem 
                                                // className={classes.menuItemUsers}
                                                key={language.id} 
                                                value={language.id}
                                                sx={{ justifyContent: "space-between" }}
                                            >
                                                {language.name}
                                                {/* {selectedUsersTemp.includes(unit) ? <CheckIcon color="info" /> : null} */}
                                            </MenuItem>
                                        ))}
                                </TextField>
                            </Box>
                            <Box className={classes.customBoxRow}>
                                <TextField 
                                    label="Color mode"
                                    size="small"
                                    select
                                    className={classes.inputMainData}
                                    InputProps={{className: classes.inputClassName}}
                                    value={backgroundColorPref}
                                    onChange={ handleBackgroundColorPref }
                                    >
                                        {backgroundColorsArray.map((color) => (
                                            <MenuItem 
                                                // className={classes.menuItemUsers}
                                                key={color.id} 
                                                value={color.id}
                                                sx={{ justifyContent: "space-between" }}
                                            >
                                                {color.name}
                                                {/* {selectedUsersTemp.includes(unit) ? <CheckIcon color="info" /> : null} */}
                                            </MenuItem>
                                        ))}
                                </TextField>
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
            </form>
        </Modal>
    )
}