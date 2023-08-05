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
import { useStylesGlobal, modalStyleExternal, modalStyleInternal } from '../Styles'
import { DataCreateStockOptions } from '../types';


interface mainData {
    id: number;
    name: string;
}
interface emailsAlertData {
    id: number;
    email: string;
}


// const categoryArray: measureData[] = [
//     { id: 0, name: '-'},
//     { id: 1, name: 'Kitchen'},
//     { id: 2, name: 'Food'},
//     { id: 3, name: 'Furniture'},
// ];
// const subCategoryArray: measureData[] = [
//     { id: 0, name: '-'},
//     { id: 1, name: 'Cutlery'},
//     { id: 2, name: 'Fruits'},
//     { id: 3, name: 'Chairs'},
// ];


const emailsAlert: emailsAlertData[] = [
    { id: 1, email: 'email1@test.com' },
    { id: 2, email: 'email2@test.com'  },
    { id: 3, email: 'email3@test.com'},
];

interface Category {
    _id: string;
    id: number;
    name: string;
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    sub_categories: string[];
}


interface ChildProps {
    hiddenPanel:  boolean
    // openOptionsCreate: (newData: string) => void
    openOptionsCreate: (newData: string )=> void
    stockNameTemp: string
    onStockNameChange: (newData: string )=> void
    stockAmountTemp: string
    onStockAmountChange: (newData: string )=> void
    measureArray: mainData[]
    stockMeasureTemp: string
    // onStockMeasureChange: (newData: string )=> void
    onStockMeasureChange: (newData: any )=> void
    stockCodeTemp: string
    onStockCodeChange: (newData: string )=> void
    categoryArray: mainData[]
    // stockCategoryTemp: string
    stockCategoryTemp: (Category | null)
    // onStockCategoryChange: (newData: string )=> void
    onStockCategoryChange: (newData: any )=> void
    subCategoryArray: mainData[]
    stockSubCategoryTemp: string
    onStockSubCategoryChange: (newData: string )=> void

    
    
}

export default function CreateStockMainData(
        {   hiddenPanel, 
            openOptionsCreate,
            stockNameTemp, 
            onStockNameChange,
            stockAmountTemp, 
            onStockAmountChange,
            measureArray,  
            stockMeasureTemp, 
            onStockMeasureChange,
            stockCodeTemp, 
            onStockCodeChange,
            categoryArray, 
            stockCategoryTemp, 
            onStockCategoryChange,
            subCategoryArray, 
            stockSubCategoryTemp, 
            onStockSubCategoryChange, 
        }: ChildProps )  {
// export default function CreateStockMainData( { open, handleClose }: ChildProps) {
    // const { openSaveChanges, closeSaveChanges } = props;
    const { classes } = useStylesGlobal();
    const close = () => {
        // handleClose(false)
    }
    console.log("measureArray: ", measureArray)

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
        // console.log("stockMeasureTemp: ", stockMeasureTemp)
        // setSelectedUsersTemp(selectedUsers)
        // setMeasureTemp(measure)
        // setCategoryTemp(category)
        // setSubCategoryTemp(subCategory)

    }, [ open, stockMeasureTemp])
    

    useEffect(() => {
        console.log("measureArray: ", measureArray)
        console.log("categoryArray: ", categoryArray)
        console.log("subCategoryArray : ", subCategoryArray )
        console.log("stockCategoryTemp: ", stockCategoryTemp)
    
}, [])
    return (
       
        <div
        hidden= {hiddenPanel}
        // className={classes.testt}
        >
            <Typography align='center' variant='h6'>Main data</Typography>
            <Box className={classes.customBoxColumn}>
                <Box className={classes.customBoxRow}>
                    <TextField
                        label="Name*"
                        value={stockNameTemp}
                        onChange={ (event) => onStockNameChange(event.target.value) }
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
                        label="Code*"
                        value={stockCodeTemp}
                        onChange={ (event) => onStockCodeChange(event.target.value) }
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
                        label="Amount"
                        value={stockAmountTemp}
                        onChange={ (event) => onStockAmountChange(event.target.value) }
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
                        value={stockMeasureTemp}
                        // onChange={ (event) => onStockMeasureChange(event) }
                        onChange={ (event) => onStockMeasureChange(event.target.value) }
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
                        // value={stockCategoryTemp}
                        value={stockCategoryTemp?.id || ''}
                        onChange={ (event) => onStockCategoryChange(event.target.value) }
                    >
                        {categoryArray.map((category) => (
                            <MenuItem 
                                className={classes.menuItemUsers}
                                key={category.id} 
                                value={category.id}
                                // value={category.name}
                                sx={{ justifyContent: "space-between" }}
                            >
                                {category.name}
                                {/* {selectedUsersTemp.includes(unit) ? <CheckIcon color="info" /> : null} */}
                            </MenuItem>
                        ))}
                    </TextField>
                {/* </Box> 
                <Box className={classes.customBoxRow}> */}
                    <TextField  
                    
                        label="Sub-Categ." 
                        size="small"
                        select
                        disabled={stockCategoryTemp ? false : true}
                        className={classes.inputMainData}
                        InputProps={{className: classes.inputClassName}}
                        value={stockSubCategoryTemp}
                        onChange={ (event) => onStockSubCategoryChange(event.target.value) }
                    >
                        {stockCategoryTemp ? stockCategoryTemp.sub_categories.map((subCategory, index) => (
                            
                            <MenuItem 
                            
                                className={classes.menuItemUsers}
                                key={index} 
                                // key={subCategory.id} 
                                // value={subCategory.name}
                                value={subCategory}
                                sx={{ justifyContent: "space-between" }}
                            >
                                {subCategory}
                                {/* {selectedUsersTemp.includes(unit) ? <CheckIcon color="info" /> : null} */}
                            </MenuItem>
                        )) :
                            <MenuItem 
                            
                            >
                            </MenuItem>
                        }
                    </TextField>
                </Box> 
                <Box className={`${classes.customBoxRow} ${classes.customBoxRowArrowButton} `}>
                    
                    <div className={classes.customBoxCenter}>
                        <Typography align="left" sx={{ width: "169px" }}></Typography>
                    
                        <Typography align="right" sx={{ width: "95px" }}>Secondary data</Typography>
                        <UpButton
                        direction="right"
                        //clicked={() => console.log("upButtonClicked")}
                        clicked={() => handleHiddenOptions("secondaryData")}
                        />
                    
                    </div> 
                </Box>
            </Box>
        </div>
    )
}