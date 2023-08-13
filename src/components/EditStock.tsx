import React, { useState, useEffect, useContext } from 'react';
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
import { useStylesGlobal, modalStyleExternal, modalStyleInternal } from '../Styles'
import { Data, DataCreateStockOptions, ColumnData } from '../types';

import { CategoriesContext } from '../context/CategoriesContext';
import { MeasuresContext } from '../context/MeasuresContext';
import { UserContext } from '../context/UserContext';
import { IsLoadingContext } from '../context/IsLoadingContext';

interface mainData {
    id: number;
    name: string;
  }
  interface emailsAlertData {
      id: number;
      email: string;
    }


// const measureArray: mainData[] = [
//     { id: 0, name: '-'},
//     { id: 1, name: 'Unit'},
//     { id: 2, name: 'Kg'},
//     { id: 3, name: 'Lts'},
// ]; 
// const categoryArray: mainData[] = [
//     { id: 0, name: '-'},
//     { id: 1, name: 'Kitchens'},
//     { id: 2, name: 'Food'},
//     { id: 3, name: 'Furniture'},
// ];
const subCategoryArray: mainData[] = [
    { id: 0, name: '-'},
    { id: 1, name: 'Cutlery'},
    { id: 2, name: 'Fruits'},
    { id: 3, name: 'Chairs'},
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
    // data: Data[]
    // columnsCustom: ColumnData[] 
}

export default function EditStock( 
    {   open, 
        handleClose, 
        // data,
        // columnsCustom,
    }: ChildProps) {
    // const { openSaveChanges, closeSaveChanges } = props;
    const { classes } = useStylesGlobal();
    const close = () => {
        handleClose(false)
    } 

    const { categories } = useContext<any>(CategoriesContext) 
    const categoryArray = categories
    const { measures } = useContext<any>(MeasuresContext)
    const measureArray = measures
    const { user } = useContext<any>(UserContext)
    const { isLoading, setIsLoading, openBackdrop, setOpenBackdrop } = useContext<any>(IsLoadingContext)


    const [openOptionsCreate, setOpenOptionsCreate] = useState<DataCreateStockOptions>(INITIAL_CREATESTOCK_OPTIONS);
    const [stockName, setStockName] = useState('');
    const [stockNameTemp, setStockNameTemp] = useState('');
    const [stockAmount, setStockAmount] = useState('');
    const [stockAmountTemp, setStockAmountTemp] = useState('');
    const [stockMeasure, setStockMeasure] = useState('');
    const [stockMeasureTemp, setStockMeasureTemp] = useState('');
    const [stockCategory, setStockCategory] = useState('');
    // const [stockCategoryTemp, setStockCategoryTemp] = useState('');
    const [stockCategoryTemp, setStockCategoryTemp] = useState<Category | null>(null);
    const [stockSubCategory, setStockSubCategory] = useState('');
    const [stockSubCategoryTemp, setStockSubCategoryTemp] = useState('');
    const [stockPrice, setStockPrice] = useState('');
    const [stockPriceTemp, setStockPriceTemp] = useState('');
    const [stockCodeTemp, setStockCodeTemp] = useState('');
    const [stockDescription, setStockDescription] = useState('');
    const [stockDescriptionTemp, setStockDescriptionTemp] = useState('');
    const [stockImageUrl, setStockImageUrl] = useState('');
    const [stockImageUrlTemp, setStockImageUrlTemp] = useState('');
    const [stockAlertAmount, setStockAlertAmount] = useState('');
    const [stockAlertAmountTemp, setStockAlertAmountTemp] = useState('');
    const [stockAlertDate, setStockAlertDate] = useState('');
    const [stockAlertDateTemp, setStockAlertDateTemp] = useState<Date | String>("");
    // const [stockAlertDateTemp, setStockAlertDateTemp] = useState<Date | null>(null);
    const [stockCustomValues, setStockCustomValues] = useState('');
    
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');

    // const [stockCustomValuesTemp, setStockCustomValuesTemp] = useState(columnsCustom.map((value) => ({
    //     label: value.label,
    //     value: "",
    // })));
    const [stockCustomValuesTemp, setStockCustomValuesTemp] = useState<object | any>({});

    


    const [openSaveChanges, setOpenSaveChanges] = useState(false);  
    const handleCloseSaveChanges = (ans?:boolean) => {
        // console.log("ans: ", ans)   // If true should save the changes, if false shouldnt. In both cases has to close all the modals. If undefined should do nothing, just close the modal save changes
        if(ans){
            
            // console.log("stockNameTemp: ", stockNameTemp)
            // console.log("stockAmountTemp: ", stockAmountTemp)
            // console.log("stockMeasureTemp: ", stockMeasureTemp)
            // console.log("stockCategoryTemp: ", stockCategoryTemp)
            // console.log("stockSubCategoryTemp: ", stockSubCategoryTemp)
            // console.log("stockPriceTemp: ", stockPriceTemp)
            // console.log("stockCodeTemp: ", stockCodeTemp)
            // console.log("stockDescriptionTemp: ", stockDescriptionTemp)
            // console.log("stockImageUrlTemp: ", stockImageUrlTemp)
            // console.log("stockAlertAmountTemp: ", stockAlertAmountTemp)
            // console.log("stockAlertDateTemp: ", stockAlertDateTemp)
            // console.log("stockCustomValuesTemp: ", stockCustomValuesTemp)

            // const stockAlertDateTemp2 = new Date()
            const fetchCreateStockProduct = async () => {
                let loadingSuccess: boolean = false
                try {
                    const response = await fetch(`http://localhost:4000/api/products/`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json', // Set the appropriate content-type for my API
                            // Add any other requires headers here
                        },
                        body:JSON.stringify({
                                // "id": 7,
                            "product": stockNameTemp,
                            "id_client": user.id_client,
                            "amount": stockAmountTemp,
                            "measure": stockMeasureTemp,
                            "category": stockCategoryTemp && stockCategoryTemp.name,
                            "sub_category": stockSubCategoryTemp,
                            "custom_fields": stockCustomValuesTemp,
                            "deleted": false,

                            "price": stockPriceTemp,
                            "code": stockCodeTemp,
                            "description": stockDescriptionTemp,
                            "url_image": stockImageUrlTemp,

                            "alert_amount": stockAlertAmountTemp,
                            "alert_date": stockAlertDateTemp,
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
                    setIsLoading((prevLoading: any) => ({
                        ...prevLoading,
                        fieldsFetchCreateStock: loadingSuccess,
                    }));
                }
            } 
            // fetchCreateStockProduct()


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
    const handleStockAmountChange = (value: string) => {
        console.log("Amount value: ", value)
        setStockAmountTemp(value)
    }
    const handleStockMeasureChange = (value: string) => {
    // const handleStockMeasureChange = (event: any) => {
        console.log("Measure value: ", value)
        // console.log("Measure event: ", event)
        setStockMeasureTemp(value)
    }
    // const handleStockCategoryChange = (value: string) => {
    const handleStockCategoryChange = (id: number) => {
        // console.log("Category value: ", value)
        // const selectedCategoryId = event.target.value as number;
        const selectedCategory = categories.find((category: any) => category.id === id) || null;
    
        console.log("Category value: ", id)
        console.log("selectedCategory: ", selectedCategory)
        // setStockCategoryTemp(value)
        setStockCategoryTemp(selectedCategory)
    }
    const handleStockSubCategoryChange = (value: string) => {
        console.log("SubCategory value: ", value)
        setStockSubCategoryTemp(value)
    }
    const handleStockPriceChange = (value: string) => {
        console.log("Price value: ", value)
        setStockPriceTemp(value)
    }
    const handleStockCodeChange = (value: string) => {
        console.log("Code value: ", value)
        setStockCodeTemp(value)
    }
    const handleStockDescriptionChange = (value: string) => {
        console.log("Description value: ", value)
        setStockDescriptionTemp(value)
    }
    const handleSetImageUrl = (value: string) => {
    console.log("handleSetImageUrl value: ", value)
    setStockImageUrlTemp(value)
    }
    const handleStockAlertAmountChange = (value: string) => {
    console.log("handleSetAlertAmount value: ", value)
    setStockAlertAmountTemp(value)
    }
    // const handleStockAlertDateChange = (value: string) => {
    const handleStockAlertDateChange = (date:Date | null | string) => {
        console.log("handleSetAlertDate value: ", date)
        // if(date)
        //     setStockAlertDateTemp(date)
        if (date) {
            // const formattedDate = date.toISOString();
            // const formattedDate = date;
            console.log("date: ", date)
            // setStockAlertDateTemp(formattedDate);
            setStockAlertDateTemp(date);
        } else {
            // setStockAlertDateTemp('');
            setStockAlertDateTemp("");
        }
    }
    const handleStockCustomValuesTemp = (value: string, dataKey: string) => {
        // console.log("Custom value: ", value)
        // console.log("Custom dataKey: ", dataKey)
        // const [stockCustomValuesTemp, setStockCustomValuesTemp] = useState('');
    
        // const updateCustomValuesTemp = [...stockCustomValuesTemp, {[dataKey]:value}]
        // updateFieldsNew[index].label = event.currentTarget.value
        // console.log("updateFieldsNew[index].label: ", updateFieldsNew[index].label)
        // console.log("customFieldsTemp[index].label: ", customFieldsTemp[index].label)
        // if(updateFieldsNew[index].label != customFieldsTemp[index].label)
        //     updateFieldsNew[index].okButtonShow = true
        // else
        //     updateFieldsNew[index].okButtonShow = false
        
        setStockCustomValuesTemp((prevCustomValues: object) => ({
            ...prevCustomValues,
            [dataKey]:value,
        }));
        // console.log("updateCustomValuesTemp: ", updateCustomValuesTemp)

        // setStockCustomValuesTemp(updateCustomValuesTemp)
    }

    
    useEffect(() => {
        // console.log("isLoading.fieldsFetchEditCustomColumn", isLoading.fieldsFetchEditCustomColumn)
        // console.log("isLoading.fieldsFetchCreateCustomColumn", isLoading.fieldsFetchCreateCustomColumn)
        // console.log("isLoading.fieldsFetchEditUsersFieldsOrder", isLoading.fieldsFetchEditUsersFieldsOrder)

        if(isLoading.fieldsFetchCreateStock){
            // alert("Reload page")
                    // setIsFetching(false)
            window.location.reload();
        }
    }, [isLoading]) // To know if after save should reload the page
    // alert by AlertAmount
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
                    <Typography align='center' variant="h5">Edit stock</Typography>
                    <CreateStockMainData 
                        hiddenPanel={openOptionsCreate.mainData}
                        openOptionsCreate={handleOpenOptionsCreate}
                        
                        stockNameTemp={stockNameTemp}
                        onStockNameChange={handleStockNameChange}

                        stockAmountTemp={stockAmountTemp}
                        onStockAmountChange={handleStockAmountChange}

                        measureArray={measureArray}
                        stockMeasureTemp={stockMeasureTemp}
                        onStockMeasureChange={handleStockMeasureChange}
                        
                        stockCodeTemp={stockCodeTemp}
                        onStockCodeChange={handleStockCodeChange}

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

                        stockAlertAmountTemp = {stockAlertAmountTemp}
                        onStockAlertAmountChange = {handleStockAlertAmountChange}
                        
                        stockAlertDateTemp={stockAlertDateTemp}
                        onStockAlertDateChange={handleStockAlertDateChange}
 
                    />
                    {/* <CreateStockCustomFields
                        hiddenPanel={openOptionsCreate.customFields}
                        openOptionsCreate={handleOpenOptionsCreate}
                        
                        // columnsCustom={columnsCustom}
                        
                        stockCustomValuesTemp={stockCustomValuesTemp}
                        onStockCustomValuesTemp={handleStockCustomValuesTemp}
                    /> */}
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