import React, { useState, useEffect, useContext } from 'react';
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
         Select ,
         FormControl,
         Stack,
         Chip,
         Switch,
        } from '@mui/material';
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import Paper from '@mui/material/Paper/Paper';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"

import { OkButton,
         CancelButton, 
         PlusButton,
         UpButton
        } from './Buttons';
import  CreateStockMainData  from './CreateStockMainData'
import  CreateStockSecondaryData  from './CreateStockSecondaryData'
import  CreateStockAlerts  from './CreateStockAlerts'
import  CreateStockCustomFields  from './CreateStockCustomFields'
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import ControlPointTwoToneIcon from '@mui/icons-material/ControlPointTwoTone';
import EditIcon from '@mui/icons-material/Edit';
import List from '@mui/material/List/List';
import IonTrash from "../assets/ion_trash.svg";
import SaveChanges from './SaveChanges';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { useStylesGlobal, modalStyleExternal, modalStyleInternal } from '../Styles'
import { Data, DataCreateStockOptions, ColumnData, UserEditData } from '../types';

import { CategoriesContext } from '../context/CategoriesContext';
import { MeasuresContext } from '../context/MeasuresContext';
import { AccessLevelsContext } from '../context/AccessLevelsContext';
import { UserContext } from '../context/UserContext';
import { IsLoadingContext } from '../context/IsLoadingContext';
import ErrorModal from './ErrorModal';
import { UsersContext } from '../context/UsersContext';

const INITIAL_CREATESTOCK_OPTIONS = {
    mainData: false,  
    secondaryData: true,
    alerts: true,    
    customFields: true,
}

interface ChildProps {
    open:  boolean
    handleClose: (newData: boolean) => void
    dataEditUser: UserEditData
    // data: Data[]
    // columnsCustom: ColumnData[] 
}

export default function ManageUser( 
    {   open, 
        handleClose, 
        dataEditUser,
    }: ChildProps) {
    // const { openSaveChanges, closeSaveChanges } = props;
    const { classes } = useStylesGlobal();
    const close = () => {
        handleClose(false)
    } 

    console.log("data edit user: ", dataEditUser)
    const edition = (Object.keys(dataEditUser).length !== 0 ? true : false)
    const { user } = useContext<any>(UserContext)
    const { users } = useContext<any>(UsersContext)
    const { accessLevels } = useContext<any>(AccessLevelsContext)
    
    const { isLoading, setIsLoading, openBackdrop, setOpenBackdrop } = useContext<any>(IsLoadingContext)


    const [openOptionsCreate, setOpenOptionsCreate] = useState<DataCreateStockOptions>(INITIAL_CREATESTOCK_OPTIONS);
    const [userAccessLevel, setUserAccessLevel] = useState<number|null>(null);
    const [userName, setUserName] = useState<string>('');
    const [userLastName, setUserLastName] = useState<string>('');
    const [userUser, setUserUser] = useState<string>('');
    const [userEmail, setUserEmail] = useState<string>('');
    const [userDeleted, setUserDeleted] = useState<boolean>(false);
    const [userEnabled, setUserEnabled] = useState<boolean>(true);
    const [userPassword, setUserPassword] = useState<string>('');
    const [errorTextFields, setErrorTextFields] = useState({
        "access_level": false,
        "name": false,
        "email": false,
        "user": false,
        "password": false,
    });

    const [openSaveChanges, setOpenSaveChanges] = useState(false);  
    const [openErrorModal, setOpenErrorModal] = useState(false);  
    const [errorData, setErrorData] = useState("");  

    const handleCloseSaveChanges = (ans?:boolean) => {
        if(ans){
            
            const bodyUpdate: UserEditData = {}
            if(!edition || dataEditUser.id_access_level != userAccessLevel)
                bodyUpdate.id_access_level = userAccessLevel
            if(!edition || dataEditUser.name != userName)
                bodyUpdate.name = userName
            if(!edition || dataEditUser.last_name != userLastName)
                bodyUpdate.last_name = userLastName
            if(!edition || dataEditUser.user != userUser)
                bodyUpdate.user = userUser
            if(!edition || dataEditUser.email != userEmail)
                bodyUpdate.email = userEmail
            if(!edition || dataEditUser.enabled !== userEnabled)
                bodyUpdate.enabled = userEnabled
            if(!edition || dataEditUser.pass != userPassword)
                bodyUpdate.pass = userPassword 

            const fetchManageUser = async () => {
                let loadingSuccess: boolean = false
                try {
                    const manage_user = (edition ? dataEditUser._id : "")
                    const manage_method = (edition ? 'PATCH' : 'POST')
                    const response = await fetch(`http://localhost:4000/api/users/${manage_user}`, {
                        method: manage_method,
                        headers: {
                            'Content-Type': 'application/json', // Set the appropriate content-type for my API
                            // Add any other requires headers here
                        },
                        body:JSON.stringify(bodyUpdate)
                    })

                    // Check if the response status is successful
                    if (response.ok) {
                        const responseData = await response.json() // parse the response data
                        console.log(`${manage_method} request successful: `, responseData)
                        loadingSuccess = true
                    } else if (response.status === 400) {
                        // Handle non-successful responses
                        console.error('Request failed: ', response.status, response.statusText)
                        const errorData = await response.json()
                        console.error('Request failed 2: ', errorData.error)
                        // Handle the error here
                        if (errorData.errorCode === 'duplicate_product') {
                            setOpenErrorModal(true) // Open the modal for duplicate product error
                            setErrorData(errorData.errorCode)
                        
                        }
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
                    console.log("loadingSuccess: ", loadingSuccess)
                    setIsLoading((prevLoading: any) => ({
                        ...prevLoading,
                        fieldsFetchCreateStock: loadingSuccess,
                    }));
                }
            } 
            fetchManageUser()


            // setSelectedUsers(selectedUsersTemp)
            // setEmailsAlerts(emailsAlertsTemp.filter(emailAlert => { if(emailAlert.email != "") return emailAlert}))
            // close()
        }
        setOpenSaveChanges(false);
    }
    const handleCloseErrorModal = () => {
        setOpenErrorModal(false)
    }

    const handleOpenSaveChanges = () => {
        // console.log("userName: ", userName)

        let save_changes_allowed: boolean = true
        if(userName===""){
            setOpenErrorModal(true)
            setErrorData("missing_user_name")
            setErrorTextFields((prevErrorTextFields: any) => ({
                ...prevErrorTextFields,
                name: true,
            }));
            save_changes_allowed=false
        }
        if(!userAccessLevel){
            setOpenErrorModal(true)
            setErrorData("missing_user_access_level")
            setErrorTextFields((prevErrorTextFields: any) => ({
                ...prevErrorTextFields,
                access_level: true,
            }));
            save_changes_allowed=false
        }
        if(userUser===""){
            setOpenErrorModal(true)
            setErrorData("missing_user_user")
            setErrorTextFields((prevErrorTextFields: any) => ({
                ...prevErrorTextFields,
                user: true,
            }));
            save_changes_allowed=false
        }
        if(userPassword===""){
            setOpenErrorModal(true)
            setErrorData("missing_user_password")
            setErrorTextFields((prevErrorTextFields: any) => ({
                ...prevErrorTextFields,
                password: true,
            }));
            save_changes_allowed=false
        }
        if(save_changes_allowed){
            setOpenSaveChanges(true);
        }
    }

    const handleOpenOptionsCreate = (newData:  string) => {
        const updatedOptions = { ...openOptionsCreate };
        for (const key in updatedOptions) {
            if (Object.prototype.hasOwnProperty.call(updatedOptions, key)) 
            updatedOptions[key as keyof typeof updatedOptions] = (newData===key ? false : true );
        }
        setOpenOptionsCreate(updatedOptions);
    }

    const handleUserAccessLevel = (value: number) => {
        console.log("setUserAccessLevel value: ", value)
        setUserAccessLevel(value)
        setErrorTextFields((prevErrorTextFields: any) => ({
            ...prevErrorTextFields,
            access_level: false,
        }));
    }
    const handleUserName = (value: string) => {
        console.log("setUserName value: ", value)
        setUserName(value)
        setErrorTextFields((prevErrorTextFields: any) => ({
            ...prevErrorTextFields,
            name: false,
        }));
    }
    const handleUserLastName = (value: string) => {
        console.log("setUserLastName value: ", value)
        setUserLastName(value)
    }
    const handleUserUser = (value: string) => {
        console.log("setUserUser value: ", value)
        setUserUser(value)
        setErrorTextFields((prevErrorTextFields: any) => ({
            ...prevErrorTextFields,
            user: false,
        }));
    }
    const handleUserEmail = (value: string) => {
        console.log("setUserUser value: ", value)
        setUserEmail(value)
    }
    const handleUserDeleted = (value: boolean) => {
        console.log("setUserDeleted value: ", value)
        setUserDeleted(value)
    }
    const handleUserEnabled = (value: boolean) => {
        console.log("setUserEnabled value: ", value)
        setUserEnabled(value)
    }
    const handleUserPassword = (value: string) => {
        console.log("setUserPassword value: ", value)
        setUserPassword(value)
        setErrorTextFields((prevErrorTextFields: any) => ({
            ...prevErrorTextFields,
            password: false,
        }));
    }
    // const handleStockCategoryChange = (value: string) => {
    

    
    useEffect(() => {
        if(isLoading.fieldsFetchCreateStock){
            window.location.reload();
        }
    }, [isLoading]) // To know if after save should reload the page

    
    // useEffect(() => {

    // }, [ open, openOptionsCreate])
    

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
                    {/* <Typography align='center' variant="h5">Create user</Typography> */}
                    <Typography align='center' variant="h5">{edition ? 'Edit ' : 'Create '} user</Typography>
                    
                    
                    <Box className={classes.customBoxColumn}>
                        <Box className={classes.customBoxRow}>
                            <TextField 
                                label="Access level*"
                                size="small"
                                select
                                // className={classes.inputMainData}
                                className= {`${errorTextFields.access_level ? classes.text_field_error : ""} ${classes.inputMainData} `}
                                InputProps={{className: classes.inputClassName}}
                                value={userAccessLevel ? userAccessLevel : '' }
                                // onChange={ (event) => onStockMeasureChange(event) }
                                onChange={ (event) => handleUserAccessLevel(Number(event.target.value)) }
                                >
                                    {accessLevels.map((accessLevel: any) => (
                                        <MenuItem 
                                            className={classes.menuItemUsers}
                                            key={accessLevel.id} 
                                            value={accessLevel.id}
                                            sx={{ justifyContent: "space-between" }}
                                        >
                                            {accessLevel.name}
                                            {/* {selectedUsersTemp.includes(unit) ? <CheckIcon color="info" /> : null} */}
                                        </MenuItem>
                                    ))}
                            </TextField>
                        </Box>
                        <Box className={classes.customBoxRow}>
                            <TextField
                                label="Name*"
                                value={userName}
                                onChange={ (event) => handleUserName(event.target.value) }
                                maxRows={1}
                                size="small"
                                // className={classes.inputMainData}
                                className= {`${errorTextFields.name ? classes.text_field_error : ""} ${classes.inputMainData} `}
                                InputProps={{
                                    className: classes.inputClassName,
                                    style: {
                                    // height:"36px"
                                    // borderRadius: 10,
                                    },
                                }}
                            />
                        </Box>
                        <Box className={classes.customBoxRow}>
                            <TextField
                                label="Last name"
                                value={userLastName}
                                onChange={ (event) => handleUserLastName(event.target.value) }
                                maxRows={1}
                                size="small"
                                className={classes.inputMainData}
                                InputProps={{
                                    className: classes.inputClassName,
                                    style: {
                                    // height:"36px"
                                    // borderRadius: 10,
                                    },
                                }}
                            />
                        </Box>
                        <Box className={classes.customBoxRow}>
                            <TextField
                                label="Email"
                                value={userEmail}
                                onChange={ (event) => handleUserEmail(event.target.value) }
                                maxRows={1}
                                size="small"
                                className={classes.inputMainData}
                                InputProps={{
                                    className: classes.inputClassName,
                                    style: {
                                    // height:"36px"
                                    // borderRadius: 10,
                                    },
                                }}
                            />
                        </Box>
                        <Box className={classes.customBoxRow}>
                            <TextField
                                label="User*"
                                value={userUser}
                                onChange={ (event) => handleUserUser(event.target.value) }
                                maxRows={1}
                                size="small"
                                // className={classes.inputMainData}
                                className= {`${errorTextFields.user ? classes.text_field_error : ""} ${classes.inputMainData} `}
                                InputProps={{
                                    className: classes.inputClassName,
                                    style: {
                                    // height:"36px"
                                    // borderRadius: 10,
                                    },
                                }}
                            />
                        </Box>
                        <Box className={classes.customBoxRow}>
                            <TextField
                                label="Password*"
                                value={userPassword}
                                onChange={ (event) => handleUserPassword(event.target.value) }
                                maxRows={1}
                                size="small"
                                // className={classes.inputMainData}
                                className= {`${errorTextFields.password ? classes.text_field_error : ""} ${classes.inputMainData} `}
                                InputProps={{
                                    className: classes.inputClassName,
                                    style: {
                                    // height:"36px"
                                    // borderRadius: 10,
                                    },
                                }}
                            />
                        </Box>
                        <Box className={classes.customBoxRow}>
                            <Typography >{(userEnabled)?'Enabled':'Disabled'}</Typography>
                            <Switch 
                                    color='success' 
                                    // defaultChecked 
                                    checked={userEnabled}
                                    onChange={(event) => {
                                        handleUserEnabled(event.target.checked)
                                        // console.log("event: ", event.target.checked)
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