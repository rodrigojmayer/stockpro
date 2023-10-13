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
import { ColumnData, ColumnDataCustom, ChildProps, UserData } from '../types';
import { UserContext } from '../context/UserContext';
import { UsersContext } from '../context/UsersContext';

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
    interface emailsAlertData2 {
        id_client: number;
        emails: string[];
      }


const usersAlert: usersAlertData[] = [
    { id: 1, name: 'Humaira Sims', email: 'hsims@mail.com', enabled: true , deleted: false},
    { id: 2, name: 'Santiago Solis', email: 'ssolis@mail.com', enabled: true, deleted: false  },
    { id: 3, name: 'Dawid Floyd', email: 'dfloyd@mail.com', enabled: true  , deleted: false},
    { id: 4, name: 'Mateo Barlow', email: 'mbarlow@mail.com', enabled: true, deleted: false  },
    { id: 5, name: 'Samia Navarro', email: 'snavarro@mail.com', enabled: true, deleted: false  },
]; 
const idUsersAlertSelected: number[] = [1,  3, 5];

const emailsAlert: emailsAlertData[] = [
    { id: 1, email: 'email1@test.com', id_client: 1 },
    { id: 2, email: 'email2@test.com', id_client: 2 },
    { id: 3, email: 'email3@test.com', id_client: 1 },
];
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

    const {user, setUser} = useContext<any>(UserContext)
    const {users, setUsers} = useContext<any>(UsersContext)
    const usersAlertSelected2 = users.filter((usr:any) => usr.alerts_enabled)
    const [selectedUsersTemp2, setSelectedUsersTemp2] = useState<usersAlertData[]>(usersAlertSelected2);

    const [emailsAlerts, setEmailsAlerts] = useState(emailsAlert)  
    const [emailsAlertsTemp, setEmailsAlertsTemp] = useState<emailsAlertData[]>(emailsAlerts)
    // const [emailsAlertsTemp, setEmailsAlertsTemp] = useState<emailsAlertData2[]>(emailsAlerts)

    const deleteEmailTemp = (id:number) => {
        // console.log("idEmailTemp: ", id)
        const updateEmailsTemp = [...emailsAlertsTemp]
        // const updateFieldsNew = [...customFieldsNew]
        let index = emailsAlertsTemp.findIndex(emailTemp => emailTemp.id === id)
        // let index = emailsAlertsTemp.findIndex(emailTemp => emailTemp.id_client === id)
        // console.log("index: ", index)
        // console.log("updateEmailsTemp: ", updateEmailsTemp)
        // if (index !== -1) {
            // updateFields[index].deleted = true
        //     // setCustomFields(updateFields)
        //     updateFieldsNew[index].deleted = true
        //     // console.log("customFields: ", customFields) 
        // } else {
        //     index = customFieldsNew.findIndex(field => field.id === id)
        updateEmailsTemp.splice(index, 1)

        // }
        setEmailsAlertsTemp(updateEmailsTemp)
    }
    
    const handleEditCustomFieldNew = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log("event.currentTarget.id: ", event.currentTarget.id)
        // console.log("event.currentTarget.value: ", event.currentTarget.value)
        // console.log("isNaN('w'): ", isNaN(NaN))
        // setEmailsAlertsTemp({...emailsAlertsTemp, event.currentTarget.value})
            const index = emailsAlertsTemp.findIndex((field: { id: number }) => field.id === Number(event.currentTarget.id))
            if(index !== -1) {
                const updateEmailsAlertsTemp = JSON.parse(JSON.stringify(emailsAlertsTemp))
                updateEmailsAlertsTemp[index].email = event.currentTarget.value
            //     // console.log("updateFieldsNew[index].label: ", updateFieldsNew[index].label)
            //     // console.log("customFields[index].label: ", customFields[index].label)
            //     if(customFields[index]){
            //         if(updateFieldsNew[index].label == customFields[index].label || updateFieldsNew[index].label == '')
            //             updateFieldsNew[index].okButtonShow = false
            //         else
            //             updateFieldsNew[index].okButtonShow = true
            //     }else if(updateFieldsNew[index].label !='' ){
            //         updateFieldsNew[index].okButtonShow = true
            //     }else if (updateFieldsNew[index].label ==='' ){
            //         updateFieldsNew[index].okButtonShow = false
            //     }
                // console.log("updateEmailsAlertsTemp2: ", updateEmailsAlertsTemp)
        
                setEmailsAlertsTemp(updateEmailsAlertsTemp)
            }
    }

    const [openSaveChanges, setOpenSaveChanges] = useState(false);  
    const handleCloseSaveChanges = (ans?:boolean) => {
        if(ans){
            const updatedUsers = users.map((user_obj:any) => ({
                ...user_obj,
                alerts_enabled: selectedUsersTemp2.includes(user_obj)
            })).filter((updatedUser:any, index:number) => {
                return updatedUser.alerts_enabled !== users[index].alerts_enabled
            })
            updatedUsers.forEach((user_obj:any) => {
                const fetchUpdateAlerts = async () => {
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
                                "alerts_enabled": user_obj.alerts_enabled
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
                    }
                } 
                fetchUpdateAlerts() 
            })
            close() 
        }
        setOpenSaveChanges(false);
    }
    const handleOpenSaveChanges = () => setOpenSaveChanges(true);

    
    const addInputCustomField = () => {
        // console.log("holis clickis", customFieldsNewTemp.length)
        // const updateFieldsNew = JSON.parse(JSON.stringify(customFieldsNewTemp))
        const lastObj = emailsAlertsTemp[emailsAlertsTemp.length - 1]
        const nextId = lastObj.id + 1
        const updateEmailsAlertsTemp = [...emailsAlertsTemp, {id:nextId, email: "", id_client:user.id_client}]
        // updateFieldsNew[index].label = event.currentTarget.value
        // console.log("updateFieldsNew[index].label: ", updateFieldsNew[index].label)
        // console.log("customFieldsTemp[index].label: ", customFieldsTemp[index].label)
        // if(updateFieldsNew[index].label != customFieldsTemp[index].label)
        //     updateFieldsNew[index].okButtonShow = true
        // else
        //     updateFieldsNew[index].okButtonShow = false
        
        // console.log("updateEmailsAlertsTemp: ", updateEmailsAlertsTemp)

        setEmailsAlertsTemp(updateEmailsAlertsTemp)
        // setAddButtonShow(false)
    }

    useEffect(() => {
        // console.log("useeffect")
        // setSelectedUsersTemp(selectedUsers)
        setSelectedUsersTemp2(usersAlertSelected2)
        setEmailsAlertsTemp(emailsAlerts)
    }, [ open])
    
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
                            {emailsAlertsTemp.map((emailTemp: emailsAlertData) => {
                                //  if (!emailNew.deleted) {
                                     return (
                                        <Box className={classes.customBoxRow}
                                        key={emailTemp.id}
                                        >
                                            <TextField
                                                id={String(emailTemp.id)}
                                                type="email"
                                                // id={column.dataKey.toString()}
                                                // id="filled-multiline-flexible"
                                                value={emailTemp.email}
                                                // onChange={handleFilterChange}
                                                onChange={ handleEditCustomFieldNew }
                                                maxRows={1}
                                                size="small"
                                                className={classes.newEmailField}
                                                InputProps={{
                                                    style: {
                                                    // height:"36px",
                                                    borderRadius: 10,
                                                    },
                                                }}
                                            />
                                            <Box className={classes.customBoxCenter}> 
                                                <IconButton
                                                className={classes.ionTrash}
                                                onClick={() => deleteEmailTemp(emailTemp.id)}
                                                // id="plusButton"
                                                // value={column.id}
                                                >
                                                    <img 
                                                    src={IonTrash} 
                                                    alt="Trash"
                                                    />
                                                </IconButton>
                                            </Box>
                                         </Box>
                                    )
                                // }
                            })} 
                        <Box className={classes.customBoxRow}>
                            <PlusButton
                                sizeIco={"45px !important"}
                                clicked={addInputCustomField}
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