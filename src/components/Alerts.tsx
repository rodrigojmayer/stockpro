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
import { ColumnData, ColumnDataCustom, ChildProps, UserData, EmailData } from '../types';
import ErrorModal from './ErrorModal';
import { IsLoadingContext } from '../context/IsLoadingContext';
import { UserContext } from '../context/UserContext';
import { UsersContext } from '../context/UsersContext';
import { EmailsContext } from '../context/EmailsContext';

// };
// type SaveChangesProps = {
//     openSaveChanges: boolean;
//     closeSaveChanges: (newData?: boolean) => void;
// }
// interface ChildProps {
//     open:  boolean
//     handleClose: (newData: boolean) => void
// }

 
// const names = [
//     "Humaira Sims",
//     "Santiago Solis",
//     "Dawid Floyd",
//     "Mateo Barlow",
//     "Samia Navarro",
//     "Kaden Fields",
//     "Genevieve Watkins",
//     "Mariah Hickman",
//     "Rocco Richardson",
//   "Harris Glenn",
// ]
interface usersAlertData {
    id: number;
    name: string;
    email: string;
    enabled: boolean;
    deleted: boolean;
  }
  interface emailsAlertData {
      id: number;
      email: string;
      id_client: number;
    }
    // interface emailsAlertData2 {
    //     id_client: number;
    //     emails: string[];
    //   }


const usersAlert: usersAlertData[] = [
    { id: 1, name: 'Humaira Sims', email: 'hsims@mail.com', enabled: true , deleted: false},
    { id: 2, name: 'Santiago Solis', email: 'ssolis@mail.com', enabled: true, deleted: false  },
    { id: 3, name: 'Dawid Floyd', email: 'dfloyd@mail.com', enabled: true  , deleted: false},
    { id: 4, name: 'Mateo Barlow', email: 'mbarlow@mail.com', enabled: true, deleted: false  },
    { id: 5, name: 'Samia Navarro', email: 'snavarro@mail.com', enabled: true, deleted: false  },
]; 
const idUsersAlertSelected: number[] = [1,  3, 5];

// const emailsAlert: emailsAlertData[] = [
//     { id: 1, email: 'email1@test.com', id_client: 1 },
//     { id: 2, email: 'email2@test.com', id_client: 2 },
//     { id: 3, email: 'email3@test.com', id_client: 1 },
// ];
// const emailsAlert: emailsAlertData2[] = [
//     { id_client: 1, emails: ['email1_client1@test.com', 'email2_client1@test.com']},
//     { id_client: 2, emails: ['email1_client2@test.com', 'email2_client2@test.com']},
//     { id_client: 3, emails: ['email1_client3@test.com', 'email2_client3@test.com']},
// ];


export default function Alerts( { open, handleClose }: ChildProps) {
    // const { openSaveChanges, closeSaveChanges } = props;
    const { classes } = useStylesGlobal();
    const close = () => {
        handleClose(false)
    }

    
    const usersAlertSelected = usersAlert.filter((usr) => {
        if(idUsersAlertSelected.includes(usr.id))
        return usr
    })
    const [selectedUsers, setSelectedUsers] = useState<usersAlertData[]>(usersAlertSelected);
    const [selectedUsersTemp, setSelectedUsersTemp] = useState<usersAlertData[]>(usersAlertSelected);
    
    const { isLoading, setIsLoading, openBackdrop, setOpenBackdrop } = useContext<any>(IsLoadingContext)
    const {user, setUser} = useContext<any>(UserContext)
    const {users, setUsers} = useContext<any>(UsersContext)
    const {emails, setEmails} = useContext<any>(EmailsContext)
    
    const usersAlertSelected2 = users.filter((usr:any) => usr.alerts_enabled)
    const [selectedUsersTemp2, setSelectedUsersTemp2] = useState<usersAlertData[]>(usersAlertSelected2);

    // const [emailsAlerts, setEmailsAlerts] = useState(emailsAlert)  
    const [emailsAlerts, setEmailsAlerts] = useState(emails)  
    // const [errorEmailsAlerts, setErrorEmailsAlerts] = useState('');
    // const [emailsAlertsTemp, setEmailsAlertsTemp] = useState<emailsAlertData[]>(emailsAlerts)
    // const [emailsAlertsTemp, setEmailsAlertsTemp] = useState<emailsAlertData2[]>(emailsAlerts)

    const deleteEmail = (_id:any) => {
        // console.log("idEmailTemp: ", id)
        const updateEmails = [...emailsAlerts]
        // const updateFieldsNew = [...customFieldsNew]
        let index = emailsAlerts.findIndex((email: any) => email._id === _id)
        // let index = emailsAlertsTemp.findIndex(emailTemp => emailTemp.id_client === id)
        // console.log("index: ", index)
        // if (index !== -1) {
            updateEmails[index].deleted = true
            updateEmails[index].edited = true
            // setCustomFields(updateFields)
            // updateFieldsNew[index].deleted = true
            // console.log("customFields: ", customFields) 
            // } else {
                // index = customFieldsNew.findIndex(field => field.id === id)
        console.log("updateEmails before: ", updateEmails)
        // updateEmails.splice(index, 1)
        // console.log("updateEmails after: ", updateEmails)

        // }
        setEmailsAlerts(updateEmails)
    }
    
    const handleEditEmailAlertNew = (event: React.ChangeEvent<HTMLInputElement>) => {
        const index = emailsAlerts.findIndex((field: { _id: string }) => field._id === event.currentTarget.id)
        console.log("index: ", index)
        if(index !== -1) {
            // console.log("emails[index].email: ", emails[index].email)
            const updateEmails = JSON.parse(JSON.stringify(emailsAlerts))
            updateEmails[index].email = event.currentTarget.value
            if(emails[index]){  // To edit an existing email
                if(emails[index].email !== event.currentTarget.value)
                    updateEmails[index].edited = true
                else
                    updateEmails[index].edited = false
            } else {  // To edit a new email
                if(event.currentTarget.value !== '')
                    updateEmails[index].edited = true
                else
                    updateEmails[index].edited = false
            }
            if(updateEmails[index].edited && !validateEmail(updateEmails[index].email))
                updateEmails[index].error = 'Invalid email format'
            else
                updateEmails[index].error = ''
            console.log("updateEmails: ", updateEmails)
            setEmailsAlerts(updateEmails)
        }
    }
    const validateEmail = (email: string): boolean => {
        // Regular expression for email validation
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        return emailRegex.test(email)
    }
    // const handleValidate = () => {
    //     if (validateEmail(email))
    // }

    const [openSaveChanges, setOpenSaveChanges] = useState(false);  
    const [openErrorModal, setOpenErrorModal] = useState(false);    
    const [errorData, setErrorData] = useState(""); 
    const handleCloseSaveChanges = (ans?:boolean) => {
        if(ans){
            const updatedUsers = users.map((user_obj:any) => ({
                ...user_obj,
                alerts_enabled: selectedUsersTemp2.includes(user_obj)
            })).filter((updatedUser:any, index:number) => {
                return updatedUser.alerts_enabled !== users[index].alerts_enabled
            })
            updatedUsers.forEach((user_obj:any) => {
                const fetchUpdateUsersAlerts = async () => {
                    let loadingSuccess: boolean = false
                    try {
                        const response = await fetch(`http://localhost:4000/api/users/${user_obj._id}`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json', // Set the appropriate content-type for my API
                                // Add any other requires headers here
                            },
                            body:JSON.stringify({
                                // "amount": resultUpdated,
                                "alerts_enabled": user_obj.alerts_enabled,
                            })
                        })

                        // Check if the response status is successful
                        if (response.ok) {
                            const responseData = await response.json() // parse the response data
                            console.log('POST request successful: ', responseData)
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
                        // setIsLoading((prevLoading: any) => ({
                        //     ...prevLoading,
                        //     fieldsFetchCreateStock: loadingSuccess,
                        // }));
                        setIsLoading((prevLoading: any) => ({
                            ...prevLoading,
                            usersAlert: loadingSuccess,
                        }))
                    }
                } 
                fetchUpdateUsersAlerts() 
            })

            emailsAlerts.forEach((email_obj:any) => {

                const fetchCreateEmailAlert = async () => {
                    let loadingSuccess: boolean = false
                    try {
                        const response = await fetch(`http://localhost:4000/api/emails/`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                "email": email_obj.email,
                                "id_client": email_obj.id_client,
                                "deleted": email_obj.deleted
                            })
                        })
                        // Check if the response status is successful
                        if (response.ok) {
                            loadingSuccess = true
                        } else {
                            console.log('Request failed.', response.status, response.statusText)
                            // Handle the error here
                        }
                    } catch (error: unknown) {
                        if (typeof error === 'string') {
                            // 'error' is now narrowed down to type 'string'
                            console.error('Error:', error);
                        } else if (error instanceof Error) {
                            // 'error' is now narrowed down to type 'Error'
                            console.error('Error object:', error.message);
                        } else {
                            // Handle other cases as needed
                        }
                    } finally {
                        setIsLoading((prevLoading: any) => ({
                            ...prevLoading,
                            emailsAlert: loadingSuccess,
                        }))
                    }
                }
                const fetchEditEmailAlert = async () => {
                    let loadingSuccess: boolean = false
                    try {
                        const response = await fetch(`http://localhost:4000/api/emails/${email_obj._id}/`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                "email": email_obj.email,
                                "deleted": email_obj.deleted
                            })
                        })
                        if (response) {
                            loadingSuccess = true
                        } else {
                            console.log('Update failed.')
                        }
                    } catch (error) {
                        // Handle the case where the response is not OK (e.g., show an error message)
                    } finally {
                        setIsLoading((prevLoading: any) => ({
                            ...prevLoading,
                            emailsAlert: loadingSuccess,
                        }))
                    }
                }
                if(email_obj.edited){ // To avoid fetch if there hasn't been any change
                    if(email_obj._id.substring(0,3) === "NEW")
                        fetchCreateEmailAlert()
                    else {
                        fetchEditEmailAlert()
                    }
                }
            })
            close() 
        }
        setOpenSaveChanges(false);
    }
    
    const handleCloseErrorModal = () => {
        setOpenErrorModal(false)
    }
    const handleOpenSaveChanges = () => {
        const emailError = emailsAlerts.filter((email:EmailData) => {
            if(email.error && !email.deleted) return email
        })
        console.log("emailError: ", emailError)
        if(emailError.length>0){
            setOpenErrorModal(true)
            setErrorData("invalid_email_format")
        // }else if(profilePass!==profileConfirmPass){
        //     setOpenErrorModal(true)
        //     setErrorData("not_confirmed_pass")
        }
        else{
            setOpenSaveChanges(true);
        }
    };
    
    const addInputEmail = () => {
        const randomNumber = Math.round(Math.random() * 10000).toString()
        const timestamp = new Date().getTime().toString()
        const randomTemporalId = "NEW" + timestamp + randomNumber   // For the new _id add the NEW chars at the beggining and a random number, this is only temporal to use it as a key in the page until the object is created in the database
        const updateEmails = [...emailsAlerts, {_id:randomTemporalId, email: "", id_client:user.id_client, deleted: false, edited: false}]
        setEmailsAlerts(updateEmails)
    }
        
    
    useEffect(() => {
        // console.log("isLoading.fieldsFetchEditCustomColumn", isLoading.fieldsFetchEditCustomColumn)
        // console.log("isLoading.fieldsFetchCreateCustomColumn", isLoading.fieldsFetchCreateCustomColumn)
        // console.log("isLoading.fieldsFetchEditUsersFieldsOrder", isLoading.fieldsFetchEditUsersFieldsOrder)

        // if(isLoading.emailsAlert || isLoading.fieldsFetchCreateCustomColumn || isLoading.fieldsFetchEditUsersFieldsOrder){
        if(isLoading.usersAlert || isLoading.emailsAlert ){
            // alert("Reload page")
                    // setIsFetching(false)
            window.location.reload();
        }
}, [isLoading])
    useEffect(() => {
        // console.log("useeffect")
        // setSelectedUsersTemp(selectedUsers)
        setSelectedUsersTemp2(usersAlertSelected2)
        setEmailsAlerts(emails)
    }, [ open])
    
    return (
        <Modal
        open={open} 
        onClose={close}
        > 
            <Box sx={modalStyleExternal}>
                <Box sx={modalStyleInternal}>
                    <Typography align="center" variant="h5">
                        Alerts
                    </Typography>
                    <Box className={classes.customBoxColumn}>
                        <FormControl 
                            className={classes.formControlUsers}
                            size="small"
                        >
                            <InputLabel 
                            className={classes.inputLabelUsers} >Users</InputLabel>
                            <Select
                            
                            MenuProps={{ PaperProps: { sx: { maxHeight: "30%" ,
                            borderRadius: "10px",} } }}
                            className={classes.selectUsers}
                                multiple
                                // value={selectedUsers}
                                // value={selectedUsersTemp.map(user => user.name)}
                                value={selectedUsersTemp2.map(user => user.name)}
                                // onChange={(e) => {
                                //     const selectedUserIds = Array.isArray(e.target.value) ? e.target.value : [];
                                //     console.log("selectedUserIds: ",selectedUserIds[selectedUserIds.length-1] )
                                // }}
                                onChange={(e) => {
                                    const selectedUserIds = Array.isArray(e.target.value) ? e.target.value : [];
                                    // const selectedUsersTemp = usersAlert.filter(user => selectedUserIds.includes(user.name));
                                    const selectedUsersTemp2 = users.filter((user:any) => selectedUserIds.includes(user.name));
                                    
                                    // setSelectedUsersTemp(selectedUsersTemp);
                                    setSelectedUsersTemp2(selectedUsersTemp2);
                                  }}
                                // onChange={(e) => setSelectedUsers([... e.target.value])}
                                input={<OutlinedInput label="Users" className={classes.formControlUsers} />}
                                renderValue={(selected) => (
                                    <Stack gap={1} direction="row" flexWrap="wrap"
                                    className={classes.stackUsers}
                                    >
                                        {selected.map((value) => (
                                            <Chip 
                                                className={classes.chipUsers}
                                                key={value} 
                                                label={value} 
                                                onDelete={() =>
                                                    // setSelectedUsersTemp(
                                                    setSelectedUsersTemp2(
                                                        // selectedUsersTemp.filter((item) => item.name !== value)
                                                        selectedUsersTemp2.filter((item) => item.name !== value)
                                                    )
                                                }
                                                deleteIcon={
                                                    <CancelIcon
                                                    className={classes.cancelIconUsers}
                                                        onMouseDown={(event) => event.stopPropagation()}
                                                    />   
                                                }
                                            />
                                        ))}
                                    </Stack>
                                )}
                                >
                                    {/* {usersAlert.map((user) => ( */}
                                    {users.map((user:any) => (
                                        <MenuItem 
                                            className={classes.menuItemUsers}
                                            key={user._id} 
                                            value={user.name}
                                            sx={{ justifyContent: "space-between" }}
                                        >
                                            {user.name}
                                            {/* {selectedUsersTemp.includes(user) ? <CheckIcon color="info" /> : null} */}
                                            {selectedUsersTemp2.includes(user) ? <CheckIcon color="info" /> : null}
                                        </MenuItem>
                                    ))}
                                </Select>
                        </FormControl>
                        <Box className={classes.customBoxRow}>
                            <Typography variant='h6'  >
                                External emails
                            </Typography>
                            {/* <EditIcon 
                            className={classes.editIcon}
                            /> */}
                        </Box>
                            {emailsAlerts.map((email: EmailData) => {
                                 if (!email.deleted) {
                                     return (
                                        <Box className={classes.customBoxRow}
                                            key={email._id}
                                        >
                                                <TextField
                                                    // id={String(email._id)}
                                                    id={email._id}
                                                    type="email"
                                                    // id={column.dataKey.toString()}
                                                    // id="filled-multiline-flexible"
                                                    value={email.email}
                                                    // value={email.error}
                                                    // onChange={handleFilterChange}
                                                    onChange={ handleEditEmailAlertNew }
                                                    // error={email.error}
                                                    // error={email.error !== ''}
                                                    error={email.error !== ''}
                                                    // FormHelperTextProps={{ className: classes.helperText }}
                                                    helperText={email.error}
                                                    maxRows={1}
                                                    size="small"
                                                    className={classes.newEmailField}
                                                    InputProps={{
                                                        style: {
                                                            // color: "rgb(100, 147, 147, 1)",
                                                            borderRadius: 10,
                                                        },
                                                    }}
                                                />

                                            <Box className={classes.customBoxCenter}
                                                style={{maxHeight:"49px"}}
                                            > 
                                                <IconButton
                                                    className={classes.ionTrash}
                                                    onClick={() => deleteEmail(email._id)}
                                                >
                                                    <img 
                                                    src={IonTrash} 
                                                    alt="Trash"
                                                    />
                                                </IconButton>
                                            </Box>
                                         </Box>
                                    )
                                }
                            })} 
                        <Box className={classes.customBoxRow}>
                            <PlusButton
                                sizeIco={"45px !important"}
                                clicked={addInputEmail}
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
                    <SaveChanges
                        openSaveChanges={openSaveChanges}
                        closeSaveChanges={handleCloseSaveChanges} 
                    />
                    <ErrorModal
                        openErrorModal={openErrorModal}
                        closeErrorModal={handleCloseErrorModal}
                        errorData={errorData} 
                    />
                </Box>
            </Box>
        </Modal>
    )
}