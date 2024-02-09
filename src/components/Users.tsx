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
         Button,
        } from '@mui/material';
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import Paper from '@mui/material/Paper/Paper';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"

import { OkButton,
         CancelButton, 
         PlusButton,
         AddButton,
        } from './Buttons';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import ControlPointTwoToneIcon from '@mui/icons-material/ControlPointTwoTone';
import EditIcon from '@mui/icons-material/Edit';
import List from '@mui/material/List/List';
import IonTrash from "../assets/ion_trash.svg";
import SaveChanges from './SaveChanges';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { useStylesGlobal, modalStyleExternal, modalStyleInternal, modalStyleDisabled, modalStyleEnabled } from '../Styles'
import { ColumnData, ColumnDataCustom, ChildProps, UserEditData } from '../types';
import { UserContext } from '../context/UserContext';
import { IsLoadingContext } from '../context/IsLoadingContext';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ErrorModal from './ErrorModal';
import { UsersContext } from '../context/UsersContext';
import ManageUser from './ManageUser';
import { CheckListStockContext } from '../context/CheckListStockContext';



export default function Users( { open, handleClose }: ChildProps) {
    // const { openSaveChanges, closeSaveChanges } = props;
    const { classes } = useStylesGlobal();
    const close = () => {
        handleClose(false)
    }
    const { isLoading, setIsLoading, openBackdrop, setOpenBackdrop } = useContext<any>(IsLoadingContext)
    const { user, setUser } = useContext<any>(UserContext); 
    const { users } = useContext<any>(UsersContext)
    const { checkListStock, setCheckListStock } = useContext<any>(CheckListStockContext)
    // const usersArray = users
    const [ modalDisabled, setModalDisabled ]= useState<boolean>(false); 
    const [usersArray, setUsersArray] = useState<any>(users); 

    const [ showManageUser, setShowManageUser ] = useState(false) 
    const handleCloseManageUser = () => {
        setUserEditData({})  
        setShowManageUser(false)
    }
    
    const openManageUser = () => setShowManageUser(true)
    
    const [ userEditData, setUserEditData ] = useState<UserEditData>({})  
    const selectEditUser = (user:UserEditData) => {
        // console.log("user to edit: ", user)
        setUserEditData(user)
    }  
    const [addButtonShow, setAddButtonShow] = useState<boolean>(true)

    const [openSaveChanges, setOpenSaveChanges] = useState(false);  
    const [openErrorModal, setOpenErrorModal] = useState(false);  
    const [errorData, setErrorData] = useState("");  
    
    // const handleCloseSaveChanges = (ans?:boolean) => {
    //     // console.log("profileLastName: ", profileLastName)
    //     alert(`user._id:  ${user._id}`)   

    //     if(ans){ 
    //             const bodyUpdate: UserEditData = {}
    //             const fetchUpdateUser = async () => {
    //             let loadingSuccess: boolean = false
    //             try {
    //                 const response = await fetch(`http://localhost:4000/api/users/${user._id}`, {
    //                     method: 'PATCH',
    //                     headers: {
    //                         'Content-Type': 'application/json', // Set the appropriate content-type for my API
    //                         // Add any other requires headers here
    //                     },
    
    //                     body:JSON.stringify(bodyUpdate)
    //                 })
    
    //                 // Check if the response status is successful
    //                 if (response.ok) {
    //                     const responseData = await response.json() // parse the response data
    //                     console.log('POST request successful: ', responseData)
    //                     loadingSuccess = true
    //                 } else {
    //                     // Handle non-successful responses
    //                     console.error('Request failed: ', response.status, response.statusText)
    //                     // Handle the error here
    //                 }
    //             } catch (error: unknown) {
    //                 if (typeof error === 'string') {
    //                     // 'error' is now narrowed down to type 'string'
    //                     console.error('Error:', error)
    //                 } else if (error instanceof Error) {
    //                     // 'error' is now narrowed down to type 'Error'
    //                     console.error('Error object:', error.message)
    //                 } else {
    //                     // Handle other cases as needed
    //                 }
    //             } finally {
    //                 // setIsLoading(())
    //                 setIsLoading((prevLoading: any) => ({
    //                     ...prevLoading,
    //                     fieldsFetchCreateStock: loadingSuccess,
    //                 }));
                    
    //                 setCheckListStock([]);
    //             }
    //         } 
    //         // fetchUpdateUser()
    //         close()
    //     }
    //     setOpenSaveChanges(false);
    // }
    
    const handleCloseErrorModal = () => {
        setOpenErrorModal(false)
    }

    useEffect(() => {
        if (Object.keys(userEditData).length !== 0) 
            setShowManageUser(true)
        
    }, [userEditData])

    useEffect(() => {
        // console.log("Users.tsx: ", users)
        setUsersArray(users)
    }, [users])

    return (
        <Modal
            open={open} 
            onClose={close}
        > 
            <Box sx={modalStyleExternal }>
                <Box sx={modalStyleInternal}>
                    <ErrorModal
                        openErrorModal={openErrorModal}
                        closeErrorModal={handleCloseErrorModal}
                        errorData={errorData} 
                    />
                    <Typography align="center" variant="h5">
                        Users
                    </Typography>
                    <Box className={classes.customBoxColumn}>
                        {Array.isArray(usersArray) && usersArray.map((user:any) => {
                        {/* {Array.isArray(users) && users.map((user:any) => { */}
                        
                            return (
                                <Stack 
                                    className={classes.customBoxColumn} 
                                    key={user._id}  
                                    spacing={2} 
                                    direction="row"
                                >

                                    <Button
                                        className={classes.btnCommonStyle} 
                                        variant="contained"
                                        onClick={() => selectEditUser(user)}
                                        // maxRows={1}
                                        size="small"
                                        // color="neutral"
                                    >
                                        <Typography >
                                            {user.user}
                                        </Typography>  
                                    </Button>
                                </Stack>
                            )
                        })}
                    </Box>
                    <ManageUser
                        open={showManageUser} 
                        handleClose={handleCloseManageUser} 
                        dataEditUser={userEditData}
                    />

                    <Box className={classes.finishButtons}>
                        <AddButton 
                            clicked={ openManageUser}
                        /> 
                        <CancelButton
                        clicked={() => close()}
                        />
                    </Box> 
                </Box>
            </Box>
        </Modal>
    )
}