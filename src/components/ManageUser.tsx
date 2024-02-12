import { useState, useEffect, useContext } from 'react';
import { Box,
         Modal, 
         TextField,
         Typography,
         MenuItem,
         Switch,
        } from '@mui/material';
import { OkButton,
         CancelButton, 
         DeleteButton
        } from './Buttons';
import SaveChanges from './SaveChanges';
import { useStylesGlobal, modalStyleExternal, modalStyleInternal } from '../Styles'
import { DataCreateStockOptions, ColumnData, UserEditData } from '../types';
import { AccessLevelsContext } from '../context/AccessLevelsContext';
import { UserContext } from '../context/UserContext';
import { IsLoadingContext } from '../context/IsLoadingContext';
import ErrorModal from './ErrorModal';
import { UsersContext } from '../context/UsersContext';
import ConfirmDeleteModal from './ConfirmDeleteModal';
// import useAddUser from '../hooks/addUser';   //      To do next

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
}

export default function ManageUser( 
    {   open, 
        handleClose, 
        dataEditUser,
    }: ChildProps) {
    const { classes } = useStylesGlobal();
    const close = () => {
        handleClose(false)
    } 
    // const postUser = useAddUser(); 
    const edition = (Object.keys(dataEditUser).length !== 0 ? true : false)
    const { user, sendJsonMessage, lastJsonMessage } = useContext<any>(UserContext)
    const { users, setUsers } = useContext<any>(UsersContext)
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
    // const [userPassword, setUserPassword] = useState<string>('');
    const [errorTextFields, setErrorTextFields] = useState({
        "access_level": false,
        "email": false,
        "user": false,
        // "password": false,
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
            if(userEmail===""){
                bodyUpdate.email = null
            }else if(!edition || dataEditUser.email != userEmail){
                bodyUpdate.email = userEmail
            }
            if(!edition || dataEditUser.enabled !== userEnabled){
                bodyUpdate.enabled = userEnabled
            }
            // if(!edition || dataEditUser.pass != userPassword)
            //     bodyUpdate.pass = userPassword 
            let changed = false
            if(Object.keys(bodyUpdate).length>0)
                changed = true;
            
            let loadingSuccess: boolean = false

            const fetchManageUser = async () => {
                bodyUpdate.id_client = user.id_client
                bodyUpdate.language =  user.language
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
                        // console.log(`${manage_method} request successful: `, responseData)
                        loadingSuccess = true
                        let updatedUsers
                        if (edition){
                            updatedUsers = users.map((currentUser: any) => {
                                // Find the user by comparing some unique identifies, like _id
                                if (currentUser._id === responseData._id) {
                                    // Update only the properties from bodyUpdate
                                    return {
                                        ...currentUser,
                                        ...bodyUpdate
                                    };
                                }
                                // For other users, keep them unchanged
                                return currentUser;
                            })
                        } else {
                            const newUser = responseData
                            updatedUsers = [...users, newUser]
                            
                        }
                        setUsers(updatedUsers)
                        if(!responseData.enabled){
                            sendJsonMessage({
                                disable: responseData.user
                            })
                        }
                    } else if (response.status === 400) {
                        // Handle non-successful responses
                        const errorData = await response.json()
                        // console.error('errorData: ', errorData)
                        // console.error('errorData.error: ', errorData.error)
                        // console.error('errorData.errorCode: ', errorData.errorCode)
                        // Handle the error here
                        setOpenErrorModal(true) // Open the modal for duplicate product error
                        setErrorData(errorData.errorCode)
                        setErrorTextFields((prevErrorTextFields: any) => ({
                            ...prevErrorTextFields,
                            [errorData.field]: true,
                        }));
                    } else {
                        console.error('Request failed: ', response.status, response.statusText)
                        console.error('response: ', response)
                        console.error('response.: ', response)
                    }
                } catch (error: unknown) {
                    if (typeof error === 'string') {
                        // 'error' is now narrowed down to type 'string'
                        console.error('Error:', error)
                    } else if (error instanceof Error) {
                        // 'error' is now narrowed down to type 'Error'
                        console.error('Errrrrrror object:')
                        console.error('Error object:', error.message)
                    } else {
                        // Handle other cases as needed
                        console.error('Error??? object:')
                    }
                } finally {
                    // console.log("loadingSuccess: ", loadingSuccess)
                    setIsLoading((prevLoading: any) => ({
                        ...prevLoading,
                        fieldsFetchCreateStock: loadingSuccess,
                    }));
                    console.log("loadingSuccess: ", loadingSuccess)
                    if(loadingSuccess || !changed)
                        close();
                }
            } 
            if (changed)
                fetchManageUser()
            else
                close()
           
        }
        setOpenSaveChanges(false);
    }

    const handleCloseErrorModal = () => {
        setOpenErrorModal(false)
    }
    const handleOpenSaveChanges = () => {
        setErrorTextFields({
            "access_level": false,
            "email": false,
            "user": false,
            // "password": false,
        });
        if(!userAccessLevel){
            setOpenErrorModal(true)
            setErrorData("missing_user_access_level")
            setErrorTextFields((prevErrorTextFields: any) => ({
                ...prevErrorTextFields,
                access_level: true,
            }));
        }else if(userUser===""){
            setOpenErrorModal(true)
            setErrorData("missing_user_user")
            setErrorTextFields((prevErrorTextFields: any) => ({
                ...prevErrorTextFields,
                user: true,
            }));
        }else if(userEmail===""){
            setOpenErrorModal(true)
            setErrorData("missing_email")
            setErrorTextFields((prevErrorTextFields: any) => ({
                ...prevErrorTextFields,
                email: true,
            }));
        // }else if(userPassword===""){
        //     setOpenErrorModal(true)
        //     setErrorData("missing_user_password")
        //     setErrorTextFields((prevErrorTextFields: any) => ({
        //         ...prevErrorTextFields,
        //         password: true,
        //     }));
        }else{
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
        // console.log("setUserAccessLevel value: ", value)
        setUserAccessLevel(value)
        setErrorTextFields((prevErrorTextFields: any) => ({
            ...prevErrorTextFields,
            access_level: false,
        }));
    }
    const handleUserName = (value: string) => {
        // console.log("setUserName value: ", value)
        setUserName(value)
    }
    const handleUserLastName = (value: string) => {
        // console.log("setUserLastName value: ", value)
        setUserLastName(value)
    }
    const handleUserUser = (value: string) => {
        // console.log("setUserUser value: ", value)
        setUserUser(value)
        setErrorTextFields((prevErrorTextFields: any) => ({
            ...prevErrorTextFields,
            user: false,
        }));
    }
    const handleUserEmail = (value: string) => {
        // console.log("setUserUser value: ", value)
        setUserEmail(value)
    }
    const handleUserDeleted = (value: boolean) => {
        // console.log("setUserDeleted value: ", value)
        setUserDeleted(value)
    }
    const handleUserEnabled = (value: boolean) => {
        console.log("setUserEnabled value: ", value)
        setUserEnabled(value)
    }
    // const handleUserPassword = (value: string) => {
    //     // console.log("setUserPassword value: ", value)
    //     setUserPassword(value)
    //     setErrorTextFields((prevErrorTextFields: any) => ({
    //         ...prevErrorTextFields,
    //         password: false,
    //     }));
    // }

    useEffect(() => {
        if(dataEditUser.id_access_level)
            setUserAccessLevel(dataEditUser.id_access_level)
        else
            setUserAccessLevel(null)
        if(dataEditUser.name)
            setUserName(dataEditUser.name)
        else
            setUserName('')
        if(dataEditUser.last_name)
            setUserLastName(dataEditUser.last_name)
        else
            setUserLastName('')
        if(dataEditUser.user)
            setUserUser(dataEditUser.user)
        else
            setUserUser('')
        if(dataEditUser.email)
            setUserEmail(dataEditUser.email)
        else
            setUserEmail('')
        if(dataEditUser.enabled!==undefined)
            setUserEnabled(dataEditUser.enabled)
        else
            setUserEnabled(true)
        // if(dataEditUser.pass)
        //     setUserPassword(dataEditUser.pass)
        // else
        //     setUserPassword('')
        setErrorTextFields({
            "access_level": false,
            "email": false,
            "user": false,
            // "password": false,
        });
    }, [ open, openOptionsCreate])
    
    const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);  
   
    const handleDeleteProduct = () => {
        setOpenConfirmDeleteModal(true)
    }
    const handleCloseConfirmDeleteModal = () => {
        setOpenConfirmDeleteModal(false)
    }
    const handleConfirmDelete = () => {
        const fetchDeleteStockProduct = async () => {
            let loadingSuccess: boolean = false
            try {
                const response = await fetch(`http://localhost:4000/api/users/${dataEditUser._id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json', // Set the appropriate content-type for my API
                        // Add any other requires headers here
                    },

                    body:JSON.stringify({
                        "deleted": true,
                    })
                })

                // Check if the response status is successful
                if (response.ok) {
                    const responseData = await response.json() // parse the response data
                    console.log('POST request successful: ', responseData)
                    loadingSuccess = true
                    const updatedUsers = users.filter((user: any) => {
                        // Find the user by comparing to delete, like _id
                        if(user._id !== responseData._id)
                            return user;
                    })
                    setUsers(updatedUsers)
                    sendJsonMessage({
                        delete: responseData.user
                    })
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
        fetchDeleteStockProduct()
        close()
        setOpenConfirmDeleteModal(false)
    }

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
                    <ConfirmDeleteModal
                        openConfirmDeleteModal={openConfirmDeleteModal}
                        closeConfirmDeleteModal={handleCloseConfirmDeleteModal}
                        source={"user"}
                        data={userName} 
                        confirmDelete={handleConfirmDelete}
                    />
                    <Typography align='center' variant="h5">{edition ? 'Edit ' : 'Create '} user</Typography>
                    <form
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                handleOpenSaveChanges(); // Call your save function
                                e.stopPropagation() 
                            }
                        }}
                    >
                        <Box className={classes.customBoxColumn}>
                            <Box className={classes.customBoxRow}>
                                <TextField 
                                    label="Access level*"
                                    size="small"
                                    select
                                    className= {`${errorTextFields.access_level ? classes.text_field_error : ""} ${classes.inputMainData} `}
                                    InputProps={{className: classes.inputClassName}}
                                    value={userAccessLevel ? userAccessLevel : '' }
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
                                            </MenuItem>
                                        ))}
                                </TextField>
                            </Box>
                            <Box className={classes.customBoxRow}>
                                <TextField
                                    label="User*"
                                    value={userUser}
                                    onChange={ (event) => handleUserUser(event.target.value) }
                                    maxRows={1}
                                    size="small"
                                    className= {`${errorTextFields.user ? classes.text_field_error : ""} ${classes.inputMainData} `}
                                    InputProps={{
                                        className: classes.inputClassName,
                                    }}
                                />
                            </Box>
                            <Box className={classes.customBoxRow}>
                                <TextField
                                    label="Email*"
                                    value={userEmail}
                                    onChange={ (event) => handleUserEmail(event.target.value) }
                                    maxRows={1}
                                    size="small"
                                    // className={classes.inputMainData}
                                    className= {`${errorTextFields.email ? classes.text_field_error : ""} ${classes.inputMainData} `}
                                    InputProps={{
                                        className: classes.inputClassName,
                                    }}
                                />
                            </Box>
                            {/* <Box className={classes.customBoxRow}>
                                <TextField
                                    label="Password*"
                                    value={userPassword}
                                    type="password"
                                    onChange={ (event) => handleUserPassword(event.target.value) }
                                    maxRows={1}
                                    size="small"
                                    className= {`${errorTextFields.password ? classes.text_field_error : ""} ${classes.inputMainData} `}
                                    InputProps={{
                                        className: classes.inputClassName,
                                    }}
                                />
                            </Box> */}
                            <Box className={classes.customBoxRow}>
                                <TextField
                                    label="Name"
                                    value={userName}
                                    onChange={ (event) => handleUserName(event.target.value) }
                                    maxRows={1}
                                    size="small"
                                    className= {classes.inputMainData}
                                    InputProps={{
                                        className: classes.inputClassName,
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
                                    }}
                                />
                            </Box>
                            <Box className={classes.customBoxRow}>
                                <Typography >{(userEnabled)?'Enabled':'Disabled'}</Typography>
                                <Switch 
                                        color='success'  
                                        checked={userEnabled}
                                        onChange={(event) => {
                                            handleUserEnabled(event.target.checked)
                                        }}
                                    />  
                            </Box>
                        </Box>
                    </form>
                    <Box className={classes.finishButtons}>
                        <DeleteButton
                            clicked={() => handleDeleteProduct()}
                        /> 
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