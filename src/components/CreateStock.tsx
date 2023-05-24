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
         Select ,
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
         UpButton
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
        // backgroundColor: "white",
        backgroundColor: "rgb(255,255, 255, .1)",
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
        backgroundColor: "rgb(255,255, 255, .8)",
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
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        width: "90%",
        // alignItems:  "flex-end",
        gap: 8,
    },
    customBoxRow: {
        display: "flex",
        justifyContent:  "center",
        alignItems: "center",
        gap: 8,
    },
    inputMainData: {
        backgroundColor: "white",
        borderRadius: 10,
        width: "100%",
        // width: "70%",
        // minWidth: "70%",
        // width: "70%",
        // height:"34px",
    },
    inputClassName: {
        borderRadius: 10,
    },
    
    selectInput: {
        paddingTop: '10px', // Adjust the top padding as needed
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
interface measureData {
    id: number;
    name: string;
  }
  interface emailsAlertData {
      id: number;
      email: string;
    }


const measureArray: measureData[] = [
    { id: 0, name: '-'},
    { id: 1, name: 'Unit'},
    { id: 2, name: 'Kg'},
    { id: 3, name: 'Lts'},
]; 
const categoryArray: measureData[] = [
    { id: 0, name: '-'},
    { id: 1, name: 'Kitchen'},
    { id: 2, name: 'Food'},
    { id: 3, name: 'Furniture'},
];
const subCategoryArray: measureData[] = [
    { id: 0, name: '-'},
    { id: 1, name: 'Cutlery'},
    { id: 2, name: 'Fruits'},
    { id: 3, name: 'Chairs'},
];


const emailsAlert: emailsAlertData[] = [
    { id: 1, email: 'email1@test.com' },
    { id: 2, email: 'email2@test.com'  },
    { id: 3, email: 'email3@test.com'},
];


export default function CreateStock( { open, handleClose }: ChildProps) {
    // const { openSaveChanges, closeSaveChanges } = props;
    const { classes } = useStyles();
    const close = () => {
        handleClose(false)
    }

    const [measure, setMeasure] = useState('');
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    
    // const usersAlertSelected = usersAlert.filter((usr) => {
    //     if(idUsersAlertSelected.includes(usr.id))
    //         return usr
    // })
    // const [selectedUsers, setSelectedUsers] = useState<usersAlertData[]>(usersAlertSelected);
    // const [selectedUsersTemp, setSelectedUsersTemp] = useState<usersAlertData[]>(usersAlertSelected);
    // const [selectedUsers, setSelectedUsers] = useState<usersAlertData[]>([]);
    // const [selectedNames, setSelectedNames] = useState([]);
    
    // const [emailsAlerts, setEmailsAlerts] = useState(emailsAlert)  
    // const [emailsAlertsTemp, setEmailsAlertsTemp] = useState<emailsAlertData[]>(emailsAlerts)

    // const deleteEmailTemp = (id:number) => {
    //     // console.log("idEmailTemp: ", id)
    //     const updateEmailsTemp = [...emailsAlertsTemp]
    //     // const updateFieldsNew = [...customFieldsNew]
    //     let index = emailsAlertsTemp.findIndex(emailTemp => emailTemp.id === id)
    //     // console.log("index: ", index)
    //     // console.log("updateEmailsTemp: ", updateEmailsTemp)
    //     // if (index !== -1) {
    //         // updateFields[index].deleted = true
    //     //     // setCustomFields(updateFields)
    //     //     updateFieldsNew[index].deleted = true
    //     //     // console.log("customFields: ", customFields) 
    //     // } else {
    //     //     index = customFieldsNew.findIndex(field => field.id === id)
    //     updateEmailsTemp.splice(index, 1)

    //     // }
    //     setEmailsAlertsTemp(updateEmailsTemp)
    // }
    
    // const handleEditCustomFieldNew = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     // console.log("event.currentTarget.id: ", event.currentTarget.id)
    //     // console.log("event.currentTarget.value: ", event.currentTarget.value)
    //     // console.log("isNaN('w'): ", isNaN(NaN))
    //     // setEmailsAlertsTemp({...emailsAlertsTemp, event.currentTarget.value})
    //         const index = emailsAlertsTemp.findIndex((field: { id: number }) => field.id === Number(event.currentTarget.id))
    //         if(index !== -1) {
    //             const updateEmailsAlertsTemp = JSON.parse(JSON.stringify(emailsAlertsTemp))
    //             updateEmailsAlertsTemp[index].email = event.currentTarget.value
    //         //     // console.log("updateFieldsNew[index].label: ", updateFieldsNew[index].label)
    //         //     // console.log("customFields[index].label: ", customFields[index].label)
    //         //     if(customFields[index]){
    //         //         if(updateFieldsNew[index].label == customFields[index].label || updateFieldsNew[index].label == '')
    //         //             updateFieldsNew[index].okButtonShow = false
    //         //         else
    //         //             updateFieldsNew[index].okButtonShow = true
    //         //     }else if(updateFieldsNew[index].label !='' ){
    //         //         updateFieldsNew[index].okButtonShow = true
    //         //     }else if (updateFieldsNew[index].label ==='' ){
    //         //         updateFieldsNew[index].okButtonShow = false
    //         //     }
    //             // console.log("updateEmailsAlertsTemp2: ", updateEmailsAlertsTemp)
        
    //             setEmailsAlertsTemp(updateEmailsAlertsTemp)
    //         }
    // }

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

    
    // const addInputCustomField = () => {
    //     // console.log("holis clickis", customFieldsNewTemp.length)
    //     // const updateFieldsNew = JSON.parse(JSON.stringify(customFieldsNewTemp))
    //     const lastObj = emailsAlertsTemp[emailsAlertsTemp.length - 1]
    //     const nextId = lastObj.id + 1
    //     const updateEmailsAlertsTemp = [...emailsAlertsTemp, {id:nextId, email: ""}]
    //     // updateFieldsNew[index].label = event.currentTarget.value
    //     // console.log("updateFieldsNew[index].label: ", updateFieldsNew[index].label)
    //     // console.log("customFieldsTemp[index].label: ", customFieldsTemp[index].label)
    //     // if(updateFieldsNew[index].label != customFieldsTemp[index].label)
    //     //     updateFieldsNew[index].okButtonShow = true
    //     // else
    //     //     updateFieldsNew[index].okButtonShow = false
        
    //     // console.log("updateEmailsAlertsTemp: ", updateEmailsAlertsTemp)

    //     setEmailsAlertsTemp(updateEmailsAlertsTemp)
    //     // setAddButtonShow(false)
    // }

    // useEffect(() => {
    //     // console.log("useeffect")
    //     // setSelectedUsersTemp(selectedUsers)
    //     setEmailsAlertsTemp(emailsAlerts)
    // }, [ open])
    
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
                    <Typography align='center' variant="h5">Create stock</Typography>
                    <Typography align='center' variant='h6'>Main data</Typography>
                    <Box className={classes.customBoxColumn}>
                        <Box className={classes.customBoxRow}>
                            <TextField
                                label="Name*"
                                // onChange={ handleEditCustomFieldNew }
                                maxRows={1}
                                size="small"
                                className={classes.inputMainData}
                                InputProps={{className: classes.inputClassName}}
                            />
                        </Box> 
                        <Box className={classes.customBoxRow}>
                            <TextField
                                label="Quantity"
                                maxRows={1}
                                size="small"
                                type="number"
                                className={classes.inputMainData}
                                InputProps={{  className: classes.inputClassName }}
                                // onChange={ handleEditCustomFieldNew }
                            />
                            <TextField 
                                label="Measure"
                                size="small"
                                select
                                className={classes.inputMainData}
                                InputProps={{className: classes.inputClassName}}
                                value={measure}
                                onChange={ (event) => setMeasure(event.target.value) }
                                >
                                    {measureArray.map((measure) => (
                                        <MenuItem 
                                            className={classes.menuItemUsers}
                                            key={measure.id} 
                                            value={measure.name}
                                            sx={{ justifyContent: "space-between" }}
                                        >
                                            {measure.name}
                                            {/* {selectedUsersTemp.includes(unit) ? <CheckIcon color="info" /> : null} */}
                                        </MenuItem>
                                    ))}


                                </TextField>
                        </Box> 
                        <Box className={classes.customBoxRow}>
                            <TextField 
                                label="Category"
                                size="small"
                                select
                                className={classes.inputMainData}
                                InputProps={{className: classes.inputClassName}}
                                value={category}
                                onChange={ (event) => setCategory(event.target.value) }
                            >
                                {categoryArray.map((category) => (
                                    <MenuItem 
                                        className={classes.menuItemUsers}
                                        key={category.id} 
                                        value={category.name}
                                        sx={{ justifyContent: "space-between" }}
                                    >
                                        {category.name}
                                        {/* {selectedUsersTemp.includes(unit) ? <CheckIcon color="info" /> : null} */}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box> 
                        <Box className={classes.customBoxRow}>
                            <TextField  
                                label="Sub-Category" 
                                size="small"
                                select
                                className={classes.inputMainData}
                                InputProps={{className: classes.inputClassName}}
                                value={subCategory}
                                onChange={ (event) => setSubCategory(event.target.value) }
                            >
                            {subCategoryArray.map((subCategory) => (
                                <MenuItem 
                                    className={classes.menuItemUsers}
                                    key={subCategory.id} 
                                    value={subCategory.name}
                                    sx={{ justifyContent: "space-between" }}
                                >
                                    {subCategory.name}
                                    {/* {selectedUsersTemp.includes(unit) ? <CheckIcon color="info" /> : null} */}
                                </MenuItem>
                            ))}
                        </TextField>
                        </Box>
                    </Box>
                    <UpButton
                    direction="right"
                    clicked={() => console.log("upButtonClicked")}
                    />
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