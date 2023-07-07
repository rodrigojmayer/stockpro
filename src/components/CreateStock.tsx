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
import { DataCreateStockOptions, ColumnData } from '../types';


interface mainData {
    id: number;
    name: string;
  }
  interface emailsAlertData {
      id: number;
      email: string;
    }


const measureArray: mainData[] = [
    { id: 0, name: '-'},
    { id: 1, name: 'Unit'},
    { id: 2, name: 'Kg'},
    { id: 3, name: 'Lts'},
]; 
const categoryArray: mainData[] = [
    { id: 0, name: '-'},
    { id: 1, name: 'Kitchens'},
    { id: 2, name: 'Food'},
    { id: 3, name: 'Furniture'},
];
const subCategoryArray: mainData[] = [
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

interface ChildProps {
    open:  boolean
    handleClose: (newData: boolean) => void
    columnsCustom: ColumnData[] 
}

export default function CreateStock( 
    {   open, 
        handleClose, 
        columnsCustom,
    }: ChildProps) {
    // const { openSaveChanges, closeSaveChanges } = props;
    const { classes } = useStylesGlobal();
    const close = () => {
        handleClose(false)
    }

    const [openOptionsCreate, setOpenOptionsCreate] = useState<DataCreateStockOptions>(INITIAL_CREATESTOCK_OPTIONS);
    const [stockName, setStockName] = useState('');
    const [stockNameTemp, setStockNameTemp] = useState('');
    const [stockQuantity, setStockQuantity] = useState('');
    const [stockQuantityTemp, setStockQuantityTemp] = useState('');
    const [stockMeasure, setStockMeasure] = useState('');
    const [stockMeasureTemp, setStockMeasureTemp] = useState('');
    const [stockCategory, setStockCategory] = useState('');
    const [stockCategoryTemp, setStockCategoryTemp] = useState('');
    const [stockSubCategory, setStockSubCategory] = useState('');
    const [stockSubCategoryTemp, setStockSubCategoryTemp] = useState('');
    const [stockPrice, setStockPrice] = useState('');
    const [stockPriceTemp, setStockPriceTemp] = useState('');
    const [stockDescription, setStockDescription] = useState('');
    const [stockDescriptionTemp, setStockDescriptionTemp] = useState('');
    const [stockImageUrl, setStockImageUrl] = useState('');
    const [stockImageUrlTemp, setStockImageUrlTemp] = useState('');
    const [stockAlertQuantity, setStockAlertQuantity] = useState('');
    const [stockAlertQuantityTemp, setStockAlertQuantityTemp] = useState('');
    const [stockAlertDate, setStockAlertDate] = useState('');
    const [stockAlertDateTemp, setStockAlertDateTemp] = useState<Date | string>('');
    const [stockCustomValues, setStockCustomValues] = useState('');
    const [stockCustomValuesTemp, setStockCustomValuesTemp] = useState(columnsCustom.map((value) => ({
        label: value.label,
        value: "",
    })));
    


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

    
    const handleOpenOptionsCreate = (newData:  string) => {
        const updatedOptions = { ...openOptionsCreate };
        for (const key in updatedOptions) {
            if (Object.prototype.hasOwnProperty.call(updatedOptions, key)) 
            updatedOptions[key as keyof typeof updatedOptions] = (newData===key ? false : true );
        }
        setOpenOptionsCreate(updatedOptions);
    }
    
    const handleStockNameChange = (value: string) => {
        console.log("Name value: ", value)
        setStockNameTemp(value)
    }
    const handleStockQuantityChange = (value: string) => {
        console.log("Quantity value: ", value)
        setStockQuantityTemp(value)
    }
    const handleStockMeasureChange = (value: string) => {
        console.log("Measure value: ", value)
        setStockMeasureTemp(value)
    }
    const handleStockCategoryChange = (value: string) => {
        console.log("Category value: ", value)
        setStockCategoryTemp(value)
    }
    const handleStockSubCategoryChange = (value: string) => {
        console.log("SubCategory value: ", value)
        setStockSubCategoryTemp(value)
    }
    const handleStockPriceChange = (value: string) => {
        console.log("Price value: ", value)
        setStockPriceTemp(value)
    }
    const handleStockDescriptionChange = (value: string) => {
        console.log("Description value: ", value)
        setStockDescriptionTemp(value)
    }
    const handleSetImageUrl = (value: string) => {
    console.log("handleSetImageUrl value: ", value)
    setStockImageUrlTemp(value)
    }
    const handleStockAlertQuantityChange = (value: string) => {
    console.log("handleSetAlertQuantity value: ", value)
    setStockAlertQuantityTemp(value)
    }
    // const handleStockAlertDateChange = (value: string) => {
    const handleStockAlertDateChange = (date:Date | null) => {
        console.log("handleSetAlertDate value: ", date)
        // if(date)
        //     setStockAlertDateTemp(date)
        if (date) {
            const formattedDate = date.toISOString();
            setStockAlertDateTemp(formattedDate);
        } else {
            setStockAlertDateTemp('');
        }
    }
    const handleStockCustomValuesTemp = (value: string) => {
        console.log("Custom value: ", value)
        
        // const updateEmailsAlertsTemp = [...stockCustomValuesTemp, {id:nextId, email: ""}]
        // updateFieldsNew[index].label = event.currentTarget.value
        // console.log("updateFieldsNew[index].label: ", updateFieldsNew[index].label)
        // console.log("customFieldsTemp[index].label: ", customFieldsTemp[index].label)
        // if(updateFieldsNew[index].label != customFieldsTemp[index].label)
        //     updateFieldsNew[index].okButtonShow = true
        // else
        //     updateFieldsNew[index].okButtonShow = false
        
        // console.log("updateEmailsAlertsTemp: ", updateEmailsAlertsTemp)

        // setStockCustomValuesTemp(updateEmailsAlertsTemp)
    }

    
    // alert by AlertQuantity
    // alert by AlertDate
    // custom fields???

    // const customeante = stockCustomValuesTemp.map((value) => ({
    //     label: value.label,
    //     newField: "new value",
    // }))

    
    useEffect(() => {
        // stockCustomValuesTemp.map((value) => {
        //     console.log(value)
        // })
        // console.log("openOptionsCreate: ", openOptionsCreate)
        // setSelectedUsersTemp(selectedUsers)
        // setStockMeasureTemp(measure)
        // setStockCategoryTemp(category)
        // setStockSubCategoryTemp(subCategory)
        // console.log("stockMeasureTemp: ", stockMeasureTemp)

    }, [ open, openOptionsCreate])
    
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
                        
                        stockNameTemp={stockNameTemp}
                        onStockNameChange={handleStockNameChange}

                        stockQuantityTemp={stockQuantityTemp}
                        onStockQuantityChange={handleStockQuantityChange}

                        measureArray={measureArray}
                        stockMeasureTemp={stockMeasureTemp}
                        onStockMeasureChange={handleStockMeasureChange}
                        
                        categoryArray={categoryArray}
                        stockCategoryTemp={stockCategoryTemp}
                        onStockCategoryChange={handleStockCategoryChange}
                        
                        subCategoryArray={subCategoryArray}
                        stockSubCategoryTemp={stockSubCategoryTemp}
                        onStockSubCategoryChange={handleStockSubCategoryChange}
                    />
                    <CreateStockSecondaryData 
                        hiddenPanel={openOptionsCreate.secondaryData}
                        openOptionsCreate={handleOpenOptionsCreate} 
                        
                        stockPriceTemp={stockPriceTemp}
                        onStockPriceChange={handleStockPriceChange}
                        
                        stockDescriptionTemp={stockDescriptionTemp}
                        onStockDescriptionChange={handleStockDescriptionChange}
                        
                        imageUrl={stockImageUrlTemp}
                        onSetImageUrl={handleSetImageUrl}
                    />
                    <CreateStockAlerts 
                        hiddenPanel={openOptionsCreate.alerts}
                        openOptionsCreate={handleOpenOptionsCreate}
                        
                        stockMeasureTemp={stockMeasureTemp}

                        stockAlertQuantityTemp = {stockAlertQuantityTemp}
                        onStockAlertQuantityChange = {handleStockAlertQuantityChange}
                        
                        stockAlertDateTemp={stockAlertDateTemp}
                        onStockAlertDateChange={handleStockAlertDateChange}

                    />
                    <CreateStockCustomFields
                        hiddenPanel={openOptionsCreate.customFields}
                        openOptionsCreate={handleOpenOptionsCreate}
                        
                        columnsCustom={columnsCustom}
                        
                        stockCustomValuesTemp={stockCustomValuesTemp}
                        onStockCustomValuesTemp={handleStockCustomValuesTemp}
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