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
import { useStylesGlobal, modalStyleExternal, modalStyleInternal } from '../styles'
import { DataCreateStockOptions } from '../types';


interface ChildProps {
    open:  boolean
    handleClose: (newData: boolean) => void
}
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

const INITIAL_CREATESTOCK_OPTIONS = {
    mainData: false,  
    secondaryData: true,
    alerts: true,    
    customFields: true,
}

export default function CreateStock( { open, handleClose }: ChildProps) {
    // const { openSaveChanges, closeSaveChanges } = props;
    const { classes } = useStylesGlobal();
    const close = () => {
        handleClose(false)
    }

    const [openOptionsCreate, setOpenOptionsCreate] = useState<DataCreateStockOptions>(INITIAL_CREATESTOCK_OPTIONS);
    const [measure, setMeasure] = useState('');
    const [measureTemp, setMeasureTemp] = useState('');
    const [category, setCategory] = useState('');
    const [categoryTemp, setCategoryTemp] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [subCategoryTemp, setSubCategoryTemp] = useState('');
    

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

    
    const handleOpenOptionsCreate = (newData:  {option: string, open: boolean}) => {
        setOpenOptionsCreate({...openOptionsCreate, [newData.option]: newData.open});
    }
    // const handleCloseOptionsCreate = (newData:string) => {
    //     console.log("Received data:", newData);
    //     for(const [key, value] of Object.entries(openOptionsCreate)) {
    //         console.log("key: ", key)
    //         console.log("value: ", value)

    //         // if (value){
    //             setOpenOptionsCreate({ ...openOptionsCreate, [key]: value})
    //             // break;
    //         // }
    //     }
    // }

    useEffect(() => {
        // console.log("useeffect")
        // setSelectedUsersTemp(selectedUsers)
        setMeasureTemp(measure)
        setCategoryTemp(category)
        setSubCategoryTemp(subCategory)

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
                    <Typography align='center' variant="h5">Create stock</Typography>
                    <CreateStockMainData 
                        hiddenPanel={openOptionsCreate.mainData}
                        openOptionsCreate={handleOpenOptionsCreate}
                    />
                    <CreateStockSecondaryData 
                        hiddenPanel={openOptionsCreate.secondaryData}
                    />
                    <CreateStockAlerts 
                        hiddenPanel={openOptionsCreate.alerts}
                    />
                    <CreateStockCustomFields
                        hiddenPanel={openOptionsCreate.customFields}
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