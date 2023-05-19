import React, { useState, useEffect } from 'react';
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


const useStyles = makeStyles()({
    finishButtons: {
        display: "flex",
        justifyContent:  "center",
        gap: 20,
        margin: "20px",
    },

    formControlUsers: {
        width: "300px",
        backgroundColor: "white",
        borderRadius: "10px",
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
            },
            '&.Mui-focused': {
                },
            "&.Mui-focused fieldset": {
            }
        }
    },
    selectUsers: {
    },
    inputLabelUsers: {
    },
    stackUsers: {
    },
    chipUsers: {
    },
    cancelIconUsers: {
        '& > *': {
            color: 'rgb(255, 47, 47, .9)',
        }
    },
    menuItemUsers: {
        "&.Mui-selected": {
        },
    },
    customBoxColumn: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    customBoxRow: {
        display: "flex",
        justifyContent:  "center",
        alignItems: "center",
        gap: 6,
    },
    newEmailField: {        
        backgroundColor: "white",
        borderRadius: 10,
        minWidth: "150px",
        width: "100%",
        maxWidth: "250px",
    },
    ionTrash:{
        color: "rgb(255, 47, 47, 1)",
        padding: "0",
        marginBottom: "4px",
        width: "37px", 
        height: "37px",
        '& img': {
            width: "37px", 
            height: "37px",
        },
    },



})
const style = {
    position: 'absolute',
    display: "flex",
    justifyContent: "center",
    top: 74,
    width: "100%",
    overflowX: "hidden",
};
const style2 = {
    top: 74,
    maxWidth: "700px",
    width: "calc(100% - 32px)",
    maxHeight: "520px",
    // height: "520px",
    backgroundColor: "rgb(45,72, 91, 1)",
    borderRadius: "10px",
    margin: "auto",
    padding: "3px",
    color: "white",
    overflow: "scroll",
    overflowX: "hidden",

};
// type SaveChangesProps = {
//     openSaveChanges: boolean;
//     closeSaveChanges: (newData?: boolean) => void;
// }
interface ChildProps {
    open:  boolean
    handleClose: (newData: boolean) => void
}


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
    { id: 1, email: 'email1@test.com' },
    { id: 2, email: 'email2@test.com'  },
    { id: 3, email: 'email3@test.com'},
];


export default function Alerts( { open, handleClose }: ChildProps) {
    // const { openSaveChanges, closeSaveChanges } = props;
    const { classes } = useStyles();
    const close = () => {
        handleClose(false)
    }


    const usersAlertSelected = usersAlert.filter((usr) => {
        if(idUsersAlertSelected.includes(usr.id))
            return usr
    })
    const [selectedUsers, setSelectedUsers] = useState<usersAlertData[]>(usersAlertSelected);
    const [selectedUsersTemp, setSelectedUsersTemp] = useState<usersAlertData[]>(usersAlertSelected);
    // const [selectedUsers, setSelectedUsers] = useState<usersAlertData[]>([]);
    // const [selectedNames, setSelectedNames] = useState([]);
    
    const [emailsAlerts, setEmailsAlerts] = useState(emailsAlert)  
    const [emailsAlertsTemp, setEmailsAlertsTemp] = useState<emailsAlertData[]>(emailsAlerts)

    const deleteEmailTemp = (id:number) => {
        console.log("idEmailTemp: ", id)
        const updateEmailsTemp = [...emailsAlertsTemp]
        // const updateFieldsNew = [...customFieldsNew]
        let index = emailsAlertsTemp.findIndex(emailTemp => emailTemp.id === id)
        console.log("index: ", index)
        console.log("updateEmailsTemp: ", updateEmailsTemp)
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
        console.log("isNaN('w'): ", isNaN(NaN))
        // setCustomFields({...customFields, event.currentTarget.value})
            // const index = customFieldsNew.findIndex((field: { id: number }) => field.id === Number(event.currentTarget.id))
            // if(index !== -1) {
            //     const updateFieldsNew = JSON.parse(JSON.stringify(customFieldsNew))
            //     updateFieldsNew[index].label = event.currentTarget.value
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
            //     setCustomFieldsNew(updateFieldsNew)
            // }
    }

    const [openSaveChanges, setOpenSaveChanges] = useState(false);  
    const handleCloseSaveChanges = (ans?:boolean) => {
        console.log("ans: ", ans)   // If true should save the changes, if false shouldnt. In both cases has to close all the modals. If undefined should do nothing, just close the modal save changes
        if(ans){
            setSelectedUsers(selectedUsersTemp)
            setEmailsAlerts(emailsAlertsTemp)
            
            close()
        }
        setOpenSaveChanges(false);
    }
    const handleOpenSaveChanges = () => setOpenSaveChanges(true);

    useEffect(() => {
        // console.log("useeffect")
        setSelectedUsersTemp(selectedUsers)
        setEmailsAlertsTemp(emailsAlerts)
    }, [ open])
    
    return (
        <Modal
        open={open} 
        onClose={close}
        > 
            <Box sx={style}>
                <Box sx={style2}>

                    
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
                                value={selectedUsersTemp.map(user => user.name)}
                                // onChange={(e) => {
                                //     const selectedUserIds = Array.isArray(e.target.value) ? e.target.value : [];
                                //     console.log("selectedUserIds: ",selectedUserIds[selectedUserIds.length-1] )
  
                                // }}
                                onChange={(e) => {
                                    const selectedUserIds = Array.isArray(e.target.value) ? e.target.value : [];
                                    const selectedUsersTemp = usersAlert.filter(user => selectedUserIds.includes(user.name));
                                    setSelectedUsersTemp(selectedUsersTemp);
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
                                                    setSelectedUsersTemp(
                                                        selectedUsersTemp.filter((item) => item.name !== value)
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
                                    {usersAlert.map((user) => (
                                        <MenuItem 
                                            className={classes.menuItemUsers}
                                            key={user.id} 
                                            value={user.name}
                                            sx={{ justifyContent: "space-between" }}
                                        >
                                            {user.name}
                                            {selectedUsersTemp.includes(user) ? <CheckIcon color="info" /> : null}
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
                                                    height:"34px",
                                                    borderRadius: 10,
                                                    },
                                                }}
                                            />
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
                                    )
                                // }
                            })} 
                        <Box className={classes.customBoxRow}>
                            <PlusButton
                                sizeIco={"45px !important"}
                                // clicked={addInputCustomField}
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