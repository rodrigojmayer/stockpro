import React, { useState, useEffect } from 'react';
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
import { useStylesGlobal, modalStyleExternal, modalStyleInternal } from '../styles'


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

interface ChildProps {
    hiddenPanel:  boolean
    // openOptionsCreate: (newData: string) => void
    openOptionsCreate: (newData: string )=> void
    
}

export default function CreateStockCustomFields({ hiddenPanel, openOptionsCreate }: ChildProps )  {
// export default function CreateStockCustomFields( { hiddenPanel }: { hiddenPanel: boolean } ) {
// export default function CreateStockMainData( { open, handleClose }: ChildProps) {
    // const { openSaveChanges, closeSaveChanges } = props;
    const { classes } = useStylesGlobal();
    const close = () => {
        // handleClose(false)
    }

    const [measure, setMeasure] = useState('');
    const [measureTemp, setMeasureTemp] = useState('');
    const [category, setCategory] = useState('');
    const [categoryTemp, setCategoryTemp] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [subCategoryTemp, setSubCategoryTemp] = useState('');
    
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

    const handleHiddenOptions = (changeTo:string) =>  {
        openOptionsCreate(changeTo)
    }

    useEffect(() => {
        // console.log("useeffect")
        // setSelectedUsersTemp(selectedUsers)
        setMeasureTemp(measure)
        setCategoryTemp(category)
        setSubCategoryTemp(subCategory)

    }, [ open])
    
    return (
        <div
        hidden= {hiddenPanel}
        >
            <Typography align='center' variant='h6'>Custom fields</Typography>
            <Box className={classes.customBoxColumn}>
                <Box className={classes.customBoxRow}>
                    <PlusButton/>
                </Box> 
                <Box className={`${classes.customBoxRow} ${classes.customBoxRowArrowButton} `}>
                    <UpButton
                        direction="left"
                    clicked={() => handleHiddenOptions("alerts")}
                    />
                    <Typography align="left" sx={{ width: "95px" }}>Alerts</Typography>
                    <Typography align="right" sx={{ width: "153px" }}></Typography>
                </Box>
            </Box>
            
        </div>
    )
}