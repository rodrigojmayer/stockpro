import React, { useState, useEffect, useContext } from 'react';
import { Box,
         Modal, 
         Typography,
        } from '@mui/material';
import { OkButton,
         CancelButton, 
         DeleteButton
        } from './Buttons';
import  CreateStockMainData  from './CreateStockMainData'
import  CreateStockSecondaryData  from './CreateStockSecondaryData'
import  CreateStockAlerts  from './CreateStockAlerts'
import  CreateStockCustomFields  from './CreateStockCustomFields'
import SaveChanges from './SaveChanges';
import { useStylesGlobal, modalStyleExternal, modalStyleInternal } from '../Styles'
import { Data, DataCreateStockOptions, ColumnData, ProductEditData } from '../types';

import { CategoriesContext } from '../context/CategoriesContext';
import { MeasuresContext } from '../context/MeasuresContext';
import { UserContext } from '../context/UserContext';
import { IsLoadingContext } from '../context/IsLoadingContext';
import dayjs, { Dayjs } from 'dayjs';
import ErrorModal from './ErrorModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';

interface mainData {
    id: number;
    name: string;
  }
  interface emailsAlertData {
      id: number;
      email: string;
    }


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
    // data: ProductUpdateData
    data: Data
    columnsCustom: ColumnData[] 
}

export default function EditStock( 
    {   open, 
        handleClose, 
        data,
        columnsCustom,
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
    const [stockNameTemp, setStockNameTemp] = useState(data.product);
    const [stockCodeTemp, setStockCodeTemp] = useState<string>(data.code?data.code:'');
    const [stockAmountTemp, setStockAmountTemp] = useState<number | string>(data.amount);
    const [stockMeasureTemp, setStockMeasureTemp] = useState<any>(data.measure?data.measure:'');

    const selectedCategory = categoryArray.find((category: any) => category.name === data.category) || null;
    const [stockCategoryTemp, setStockCategoryTemp] = useState<Category | null>(selectedCategory);


    const [stockSubCategoryTemp, setStockSubCategoryTemp] = useState<string>(data.sub_category?data.sub_category:'');
    const [stockPriceTemp, setStockPriceTemp] = useState<number | string>(data.price?data.price:'');
    const [stockDescriptionTemp, setStockDescriptionTemp] = useState<string>(data.description?data.description:'');
    const [stockImageUrlTemp, setStockImageUrlTemp] = useState<string>(data.url_image?data.url_image:'');
    const [stockAlertAmountTemp, setStockAlertAmountTemp] = useState<number | string>(data.alert_amount?data.alert_amount:'');
    const [stockAlertAmountEnabledTemp, setStockAlertAmountEnabledTemp] = useState<boolean>(data.alert_amount_enabled?data.alert_amount_enabled:false);
    const [stockAlertedAmountTemp, setStockAlertedAmountTemp] = useState<boolean>(data.alerted_amount?data.alerted_amount:false);
    const [stockAlertDateTemp, setStockAlertDateTemp] = useState<any>(data.alert_date?dayjs(data.alert_date):'');
    const [stockAlertDateEnabledTemp, setStockAlertDateEnabledTemp] = useState<boolean>(data.alert_date_enabled?data.alert_date_enabled:false);
    const [stockAlertedDateTemp, setStockAlertedDateTemp] = useState<boolean>(data.alerted_date?data.alerted_date:false);
    const [stockCustomValuesTemp, setStockCustomValuesTemp] = useState<object | any>(data.custom_fields?data.custom_fields:{});

    const [openSaveChanges, setOpenSaveChanges] = useState(false); 
    const [openErrorModal, setOpenErrorModal] = useState(false);  
    const [errorData, setErrorData] = useState("");  
    const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);  
   
    const handleCloseSaveChanges = (ans?:boolean) => {
        if(ans){
            // console.log("data.alert_amount_enabled: ", data.alert_amount_enabled)
            // console.log("stockAlertAmountEnabledTemp: ", stockAlertAmountEnabledTemp)
            // console.log("data.alert_amount_enabled!=stockAlertAmountEnabledTemp: ", data.alert_amount_enabled!=stockAlertAmountEnabledTemp)

            const bodyUpdate: ProductEditData = {}
            if(data.product!=stockNameTemp)
                bodyUpdate.product= stockNameTemp
            if(data.code!=stockCodeTemp)
                bodyUpdate.code = stockCodeTemp
            if(data.amount!=stockAmountTemp)
                bodyUpdate.amount = stockAmountTemp
            if(data.measure!=stockMeasureTemp)
                bodyUpdate.measure = stockMeasureTemp
            if(stockCategoryTemp && data.category!=stockCategoryTemp.name)
                bodyUpdate.category = stockCategoryTemp.name
            if(data.sub_category!=stockSubCategoryTemp)
                bodyUpdate.sub_category = stockSubCategoryTemp
            if(data.custom_fields!=stockCustomValuesTemp)
                bodyUpdate.custom_fields = stockCustomValuesTemp
            if(data.price!=stockPriceTemp)
                bodyUpdate.price = stockPriceTemp
            if(data.description!=stockDescriptionTemp)
                bodyUpdate.description = stockDescriptionTemp
            if(data.url_image!=stockImageUrlTemp)
                bodyUpdate.url_image = stockImageUrlTemp
            if(data.alert_amount!=stockAlertAmountTemp)
                bodyUpdate.alert_amount = stockAlertAmountTemp
            if(data.alert_amount_enabled!=stockAlertAmountEnabledTemp)
                bodyUpdate.alert_amount_enabled = stockAlertAmountEnabledTemp
            if(data.alerted_amount!=stockAlertedAmountTemp)
                bodyUpdate.alerted_amount = stockAlertedAmountTemp
            if(data.alert_date!=stockAlertDateTemp)
                bodyUpdate.alert_date = stockAlertDateTemp
            if(data.alert_date_enabled!=stockAlertDateEnabledTemp)
                bodyUpdate.alert_date_enabled = stockAlertDateEnabledTemp
            if(data.alerted_date!=stockAlertedDateTemp)
                bodyUpdate.alerted_date = stockAlertedDateTemp
                
            const fetchEditStockProduct = async () => {
                let loadingSuccess: boolean = false
                try {
                    const response = await fetch(`http://localhost:4000/api/products/${data._id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json', // Set the appropriate content-type for my API
                            // Add any other requires headers here
                        },

                        body:JSON.stringify(bodyUpdate)
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
            fetchEditStockProduct()
            close()
        }
        setOpenSaveChanges(false);
    }
    
    const handleCloseErrorModal = () => {
        setOpenErrorModal(false)
    }

    const handleOpenSaveChanges = () => {
        console.log("stockNameTemp: ", stockNameTemp)

        if(stockNameTemp===""){
            setOpenErrorModal(true)
            setErrorData("missing_data")
        }else if(Number(stockAmountTemp)<0){
            setOpenErrorModal(true)
            setErrorData("negative_amount")
        }
        else{
            setOpenSaveChanges(true);
        }
    }

    const handleOpenOptionsCreate = (newData:  string) => {
        const updatedOptions = { ...openOptionsCreate };
        for (const key in updatedOptions) {
            if (Object.prototype.hasOwnProperty.call(updatedOptions, key)) 
            updatedOptions[key as keyof typeof updatedOptions] = (newData===key ? false : true );
        }
        setOpenOptionsCreate(updatedOptions);
    }
    
    const handleStockNameChange = (value: string) => {
        setStockNameTemp(value)
    }
    const handleStockAmountChange = (value: number | string) => {
        setStockAmountTemp(value)
    }
    const handleStockMeasureChange = (value: string) => {
        setStockMeasureTemp(value)
    }
    const handleStockCategoryChange = (id: number) => {
        const selectedCategory = categories.find((category: any) => category.id === id) || null;
    
        // setStockCategoryTemp(value)
        setStockCategoryTemp(selectedCategory)
        setStockSubCategoryTemp('')
    }
    const handleStockSubCategoryChange = (value: string) => {
        setStockSubCategoryTemp(value)
    }
    const handleStockPriceChange = (value: number | string) => {
        setStockPriceTemp(value)
    }
    const handleStockCodeChange = (value: string) => {
        setStockCodeTemp(value)
    }
    const handleStockDescriptionChange = (value: string) => {
        setStockDescriptionTemp(value)
    }
    const handleSetImageUrl = (value: string) => {
        setStockImageUrlTemp(value)
    }
    const handleStockAlertAmountChange = (value: number | string) => {
        setStockAlertAmountTemp(value)
    }
    const handleStockAlertAmountEnabledChange = (value: boolean) => {
        setStockAlertAmountEnabledTemp(value)
    }
    const handleStockAlertDateChange = (date:Dayjs | Date | null | string) => {
        console.log("handleSetAlertDate value: ", date)
        if (date) {
            setStockAlertDateTemp(date);
        } else {
            setStockAlertDateTemp("");
        }
    }
    const handleStockAlertDateEnabledChange = (value: boolean) => {
        setStockAlertDateEnabledTemp(value)
    }
    const handleStockCustomValuesTemp = (value: string, dataKey: string) => {

        setStockCustomValuesTemp((prevCustomValues: object) => ({
            ...prevCustomValues,
            [dataKey]:value,
        }));
    }

    const handleDeleteProduct = () => {
        setOpenConfirmDeleteModal(true)
    }
    const handleCloseConfirmDeleteModal = () => {
        setOpenConfirmDeleteModal(false)
    }
    const handleConfirmDelete = () => {

        const fetchDeleteStockProduct = async () => {
            let loadingSuccess: boolean = false
            try {
                const response = await fetch(`http://localhost:4000/api/products/${data._id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json', // Set the appropriate content-type for my API
                        // Add any other requires headers here
                    },

                    body:JSON.stringify({
                        "deleted": true,
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
        fetchDeleteStockProduct()
        close()
    }
    
    useEffect(() => {
        if(isLoading.fieldsFetchCreateStock){
            // alert("Reload page")
                    // setIsFetching(false)
            window.location.reload();
        }
    }, [isLoading]) // To know if after save should reload the page
    
    useEffect(() => {
        // console.log("stockAmountTemp: ", stockAmountTemp)
        // console.log("stockAlertAmountTemp: ", stockAlertAmountTemp)
        if(stockAmountTemp && stockAlertAmountTemp){
            if(stockAmountTemp <= stockAlertAmountTemp){
                // console.log("Enter if: ")
                setStockAlertedAmountTemp(true)
            }else{
                // console.log("Enter else: ")
                setStockAlertedAmountTemp(false)
            }
        }
    }, [stockAmountTemp, stockAlertAmountTemp])
    
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
                    <ErrorModal
                        openErrorModal={openErrorModal}
                        closeErrorModal={handleCloseErrorModal}
                        errorData={errorData} 
                    />
                    <ConfirmDeleteModal
                        openConfirmDeleteModal={openConfirmDeleteModal}
                        closeConfirmDeleteModal={handleCloseConfirmDeleteModal}
                        data={stockNameTemp} 
                        confirmDelete={handleConfirmDelete}
                        
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
                        
                        stockAlertAmountEnabledTemp = {stockAlertAmountEnabledTemp}
                        onStockAlertAmountEnabledChange = {handleStockAlertAmountEnabledChange}
                        
                        stockAlertDateTemp={stockAlertDateTemp}
                        onStockAlertDateChange={handleStockAlertDateChange}
 
                        stockAlertDateEnabledTemp={stockAlertDateEnabledTemp}
                        onStockAlertDateEnabledChange={handleStockAlertDateEnabledChange}
 
                    />
                    <CreateStockCustomFields
                        hiddenPanel={openOptionsCreate.customFields}
                        openOptionsCreate={handleOpenOptionsCreate}
                        
                        columnsCustom={columnsCustom}
                        
                        stockCustomValuesTemp={stockCustomValuesTemp}
                        onStockCustomValuesTemp={handleStockCustomValuesTemp}
                    />
                    <Box className={classes.finishButtons}>
                        <DeleteButton
                        clicked={() => handleDeleteProduct()}
                        /> 
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