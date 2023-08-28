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
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import { styled, alpha } from '@mui/material/styles';

import { OkButton,
         CancelButton, 
         PlusButton,
         UpButton,
         FolderButton,
         SelectImageButton
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


interface measureData {
    id: number;
    name: string;
}
interface emailsAlertData {
    id: number;
    email: string;
}





interface ChildProps {
    hiddenPanel:  boolean
    // openOptionsCreate: (newData: string) => void
    openOptionsCreate: (newData: string )=> void
    stockPriceTemp: number | string
    onStockPriceChange: (newData: number | string )=> void
    stockDescriptionTemp: string
    onStockDescriptionChange: (newData: string )=> void
    imageUrl: string
    onSetImageUrl: (newData: string )=> void
    
}

export default function CreateStockSecondaryData(
    {   hiddenPanel, 
        openOptionsCreate, 
        stockPriceTemp, 
        onStockPriceChange, 
        stockDescriptionTemp, 
        onStockDescriptionChange,
        imageUrl,
        onSetImageUrl, 
    }: ChildProps )  {
    const { classes } = useStylesGlobal();
    const close = () => {
        // handleClose(false)
    }

    // console.log("entra al createstocksecondarydata: ")   
        
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

    

    const handleHiddenOptions = (changeTo:string) =>  {
        openOptionsCreate(changeTo)
    }

    useEffect(() => {
        // console.log("useeffect")
        // setSelectedUsersTemp(selectedUsers)
        // setMeasureTemp(measure)
        // setCategoryTemp(category)
        // setSubCategoryTemp(subCategory)

    }, [ open])
    
    return (
        <div
        hidden= {hiddenPanel}
        >
            <Typography align='center' variant='h6'>Secondary data</Typography>
            <Box className={`${classes.customBoxColumn} ${classes.customBoxColumnStockOptions}`}>
                <Box className={classes.customBoxRow}>
                    <TextField
                        label="Price"
                        maxRows={1}
                        size="small"
                        type="number"
                        className={classes.inputMainData}
                        value={stockPriceTemp}
                        onChange={ (event) => onStockPriceChange(Number(event.target.value)) }
                        InputProps={{
                            className: classes.inputClassName,
                            style: {
                            // height:"36px"
                            // borderRadius: 10,
                            },
                            endAdornment: (
                                <AttachMoneyRoundedIcon  sx={{ color: "rgb(45,72, 91, 1)" }} />
                            ),
                        }}
                    />
                </Box> 
                <Box className={classes.customBoxRow}>
                    <TextField
                        label="Description"
                        maxRows={1}
                        size="small"
                        className={classes.inputMainData}
                        value={stockDescriptionTemp}
                        onChange={ (event) => onStockDescriptionChange(event.target.value) }
                        InputProps={{  className: classes.inputClassName }}
                        // onChange={ handleEditCustomFieldNew }
                    />
                </Box> 
                <Box className={classes.customBoxRow}>
                    <SelectImageButton 
                        imageUrl = {imageUrl}
                        setImageUrl = {onSetImageUrl}

                    />
                </Box> 
                <Box className={`${classes.customBoxRow} ${classes.customBoxRowArrowButton}`}>
                    
                    <div className={classes.customBoxCenter}>
                        <UpButton
                            direction="left"
                            clicked={() => handleHiddenOptions("mainData")}
                        />
                        <Typography align="left" sx={{ width: "95px" }}>Main data</Typography>
                    
                    </div> 
                    <div className={classes.customBoxCenter}>  
                        <Typography align="right" sx={{ width: "95px" }}>Alerts</Typography>
                        <UpButton
                        direction="right"
                        clicked={() => handleHiddenOptions("alerts")}
                        />
                    </div>
                </Box>
            </Box>  
        </div>
    )
}