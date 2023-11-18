import { useState, useEffect, useContext } from 'react';
import { Box,
         Modal, 
         Typography,
        } from '@mui/material';
import { OkButton,
         CancelButton, 
         DeleteButton
        } from './Buttons';
import  ManageStockMainData  from './ManageStockMainData'
import  ManageStockSecondaryData  from './ManageStockSecondaryData'
import  ManageStockAlerts  from './ManageStockAlerts'
import  ManageStockCustomFields  from './ManageStockCustomFields'
import  SaveChanges from './SaveChanges';
import { useStylesGlobal, modalStyleExternal, modalStyleInternal } from '../Styles'
import { Data, DataCreateStockOptions, ColumnData, ProductEditData } from '../types';
import { CategoriesContext } from '../context/CategoriesContext';
import { MeasuresContext } from '../context/MeasuresContext';
import { UserContext } from '../context/UserContext';
import { IsLoadingContext } from '../context/IsLoadingContext';
import dayjs, { Dayjs } from 'dayjs';
import ErrorModal from './ErrorModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';

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

const INITIAL_CREATESTOCK_OPTIONS = {
    mainData: false,  
    secondaryData: true,
    alerts: true,    
    customFields: true,
}

interface ChildProps {
    open:  boolean
    handleClose: (newData: boolean) => void
    data: Data
    columnsCustom: ColumnData[] 
}

export default function ManageStock( 
    {   open, 
        handleClose, 
        data,
        columnsCustom,
    }: ChildProps) {
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
    const edition = (data._id!==0 ? true : false)
    const [titleStat, setTitleStat] = useState<string>("Edit ");
    const [openOptionsCreate, setOpenOptionsCreate] = useState<DataCreateStockOptions>(INITIAL_CREATESTOCK_OPTIONS);
    const [stockNameTemp, setStockNameTemp] = useState(data.product);
    const [stockCodeTemp, setStockCodeTemp] = useState<any>(data.code);
    const [stockAmountTemp, setStockAmountTemp] = useState<number | string>(data.amount);
    const [stockMeasureTemp, setStockMeasureTemp] = useState<string>(data.measure);
    let selectedCategory
    if(edition)
        selectedCategory = categoryArray.find((category: any) => category.name === data.category) || null;
    const [stockCategoryTemp, setStockCategoryTemp] = useState<Category | null>(selectedCategory);
    const [stockSubCategoryTemp, setStockSubCategoryTemp] = useState<string>(data.sub_category); 
    const [stockPriceTemp, setStockPriceTemp] = useState<number | string>(data.price?data.price:'');
    const [stockDescriptionTemp, setStockDescriptionTemp] = useState<string>(data.description?data.description:'');
    const [stockImageUrlTemp, setStockImageUrlTemp] = useState<string>(data.url_image?data.url_image:'');
    const [stockAlertAmountTemp, setStockAlertAmountTemp] = useState<number | string>(data.alert_amount?data.alert_amount:0);
    const [stockAlertAmountEnabledTemp, setStockAlertAmountEnabledTemp] = useState<boolean>(data.alert_amount_enabled?data.alert_amount_enabled:false);
    const [stockAlertedAmountTemp, setStockAlertedAmountTemp] = useState<boolean>(data.alerted_amount?data.alerted_amount:false);
    const [stockAlertDateTemp, setStockAlertDateTemp] = useState<any>(data.alert_date?data.alert_date:'');
    const [stockAlertDateEnabledTemp, setStockAlertDateEnabledTemp] = useState<boolean>(data.alert_date_enabled?data.alert_date_enabled:false);
    const [stockAlertedDateTemp, setStockAlertedDateTemp] = useState<boolean>(data.alerted_date?data.alerted_date:false);
    const [stockCustomValuesTemp, setStockCustomValuesTemp] = useState<object | any>(data.custom_fields?data.custom_fields:{});

    const [openSaveChanges, setOpenSaveChanges] = useState(false); 
    const [openErrorModal, setOpenErrorModal] = useState(false);  
    const [messageBeforeSave, setMessageBeforeSave] = useState("");  
    const [errorData, setErrorData] = useState("");  
    const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);  
   
    const handleCloseSaveChanges = (ans?:boolean) => {
        if(ans){
            
            console.log("data.alert_date_enabled: ", data.alert_date_enabled)
            console.log("stockAlertDateEnabledTemp: ", stockAlertDateEnabledTemp)
            console.log("data.alerted_date: ", data.alerted_date)
            console.log("stockAlertedDateTemp: ", stockAlertedDateTemp)
            // console.log("data.alert_amount_enabled: ", data.alert_amount_enabled)
            // console.log("stockAlertAmountEnabledTemp: ", stockAlertAmountEnabledTemp)
            // console.log("data.alert_amount_enabled!=stockAlertAmountEnabledTemp: ", data.alert_amount_enabled!=stockAlertAmountEnabledTemp)
            alert("stop")

            const bodyUpdate: ProductEditData = {}
            bodyUpdate.id_client = user.id_client
            bodyUpdate.deleted = false
            if(!edition || data.product!=stockNameTemp)
                bodyUpdate.product= stockNameTemp
            if(!edition || data.code!=stockCodeTemp)
                bodyUpdate.code = stockCodeTemp
            if(!edition || data.amount!=stockAmountTemp)
                bodyUpdate.amount = stockAmountTemp
            if(!edition || data.measure!=stockMeasureTemp)
                bodyUpdate.measure = stockMeasureTemp
            if(stockCategoryTemp && data.category!=stockCategoryTemp.name)
                bodyUpdate.category = stockCategoryTemp.name
            if(!edition || data.sub_category!=stockSubCategoryTemp)
                bodyUpdate.sub_category = stockSubCategoryTemp
            if(!edition || data.custom_fields!=stockCustomValuesTemp)
                bodyUpdate.custom_fields = stockCustomValuesTemp
            if(!edition || data.price!=stockPriceTemp)
                bodyUpdate.price = stockPriceTemp
            if(!edition || data.description!=stockDescriptionTemp)
                bodyUpdate.description = stockDescriptionTemp
            if(!edition || data.url_image!=stockImageUrlTemp)
                bodyUpdate.url_image = stockImageUrlTemp
            if(!edition || data.alert_amount!=stockAlertAmountTemp)
                bodyUpdate.alert_amount = stockAlertAmountTemp
            if(!edition || data.alert_amount_enabled!=stockAlertAmountEnabledTemp)
                bodyUpdate.alert_amount_enabled = stockAlertAmountEnabledTemp
            if(!edition || data.alerted_amount!=stockAlertedAmountTemp)
                bodyUpdate.alerted_amount = stockAlertedAmountTemp
            if(!edition || data.alert_date!=stockAlertDateTemp)
                bodyUpdate.alert_date = stockAlertDateTemp
            if(!edition || data.alert_date_enabled!=stockAlertDateEnabledTemp)
                bodyUpdate.alert_date_enabled = stockAlertDateEnabledTemp
            if(!edition || data.alerted_date!=stockAlertedDateTemp)
                bodyUpdate.alerted_date = stockAlertedDateTemp
                
            const fetchManageStockProduct = async () => {
                let loadingSuccess: boolean = false
                try {
                    
                    const manage_stock = (edition ? data._id : "")
                    const manage_method = (edition ? 'PATCH' : 'POST')
                    const response = await fetch(`http://localhost:4000/api/products/${manage_stock}`, {
                        method: manage_method,
                        headers: {
                            'Content-Type': 'application/json', // Set the appropriate content-type for my API
                            // Add any other requires headers here
                        },
                        body:JSON.stringify(bodyUpdate)
                    })
                    // Check if the response status is successful
                    if (response.ok) {
                        const responseData = await response.json() // parse the response data
                        // console.log('POST request successful: ', responseData)
                        // console.log(`${manage_method} request successful: `, responseData)
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
            fetchManageStockProduct()
            close()
        }
        setOpenSaveChanges(false);
    }
    
    const handleCloseErrorModal = () => {
        setOpenErrorModal(false)
    }

    const handleOpenSaveChanges = () => {
        // console.log("stockNameTemp: ", stockNameTemp)

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
        console.log("value: ", value)
        console.log("typeof value: ", typeof value)
        const topValue = 999
        // let newValue = parseInt(value.replace(/[+\-e]/g, ''), 10);
        if(typeof value === 'number'){
            if(isNaN(value)){
                value = stockAmountTemp
            } else if(value > topValue)
                value = topValue
        }
        setStockAmountTemp(value) 
    }
    const handleStockMeasureChange = (value: string) => {
        setStockMeasureTemp(value)
    }
    const handleStockCategoryChange = (id: number) => {
        const selectedCategory = categories.find((category: any) => category.id === id) || null;
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
        // console.log("value alerted: ", value)
        setStockAlertAmountEnabledTemp(value)
    }
    const handleStockAlertDateChange = (date:Dayjs | Date | null | string) => {
        // console.log("handleSetAlertDate value: ", date)
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
                    // console.log('POST request successful: ', responseData)
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
            window.location.reload();
        }
    }, [isLoading]) // To know if after save should reload the page
    
    useEffect(() => {
        if(stockAmountTemp <= stockAlertAmountTemp){
            setStockAlertedAmountTemp(true)
            if (stockAlertAmountEnabledTemp){
                setMessageBeforeSave("The stock amount will drop below the alert level.");
            }
            else 
                setMessageBeforeSave("");
        }else{
            setStockAlertedAmountTemp(false)
            setMessageBeforeSave("");
        }
    }, [stockAmountTemp, stockAlertAmountTemp, stockAlertAmountEnabledTemp])

    useEffect(() => {
        const currentDate = new Date()
        const alertDate = new Date(stockAlertDateTemp)
        if(currentDate >= alertDate){
            setStockAlertedDateTemp(true)
            if (stockAlertDateEnabledTemp){
                setMessageBeforeSave("The alert date is before current date.");
            }
            else 
                setMessageBeforeSave("");
        }else{
            setStockAlertedDateTemp(false)
            setMessageBeforeSave("");
        }
    }, [stockAlertDateTemp, stockAlertDateEnabledTemp])

    
    useEffect(() => {
        if(!edition){
            setStockNameTemp("")
            setStockCodeTemp('')
            setStockAmountTemp('')
            setStockMeasureTemp('')
            setStockCategoryTemp(null)
            setStockSubCategoryTemp('')
            setStockPriceTemp('')
            setStockDescriptionTemp('')
            setStockImageUrlTemp('')
            setStockAlertAmountTemp('')
            setStockAlertAmountEnabledTemp(false)
            setStockAlertedAmountTemp(false)
            setStockAlertDateTemp('')
            setStockAlertDateEnabledTemp(false)
            setStockAlertedDateTemp(false);
            setStockCustomValuesTemp({});
            setTitleStat("Create ")
        }
    }, [open])
    
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
                        messageBeforeSave={messageBeforeSave}
                    />
                    <ErrorModal
                        openErrorModal={openErrorModal}
                        closeErrorModal={handleCloseErrorModal}
                        errorData={errorData} 
                    />
                    <ConfirmDeleteModal
                        openConfirmDeleteModal={openConfirmDeleteModal}
                        closeConfirmDeleteModal={handleCloseConfirmDeleteModal}
                        source={"stock"}
                        data={stockNameTemp} 
                        confirmDelete={handleConfirmDelete}
                        
                    />
                    {/* <Typography align='center' variant="h5">{edition ?'Editetete ' : 'Createtete '} stock</Typography> */}
                    <Typography align='center' variant="h5">{titleStat} stock</Typography>
                    <ManageStockMainData 
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
                        
                        // subCategoryArray={subCategoryArray}
                        stockSubCategoryTemp={stockSubCategoryTemp}
                        onStockSubCategoryChange={handleStockSubCategoryChange}
                    />
                    <ManageStockSecondaryData 
                        hiddenPanel={openOptionsCreate.secondaryData}
                        openOptionsCreate={handleOpenOptionsCreate} 

                        id_product={data._id}
                        
                        stockPriceTemp={stockPriceTemp}
                        onStockPriceChange={handleStockPriceChange}
                        
                        stockDescriptionTemp={stockDescriptionTemp}
                        onStockDescriptionChange={handleStockDescriptionChange}
                        
                        imageUrl={stockImageUrlTemp}
                        onSetImageUrl={handleSetImageUrl}
                    />
                    <ManageStockAlerts 
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
                    <ManageStockCustomFields
                        hiddenPanel={openOptionsCreate.customFields}
                        openOptionsCreate={handleOpenOptionsCreate}
                        
                        columnsCustom={columnsCustom}
                        
                        stockCustomValuesTemp={stockCustomValuesTemp}
                        onStockCustomValuesTemp={handleStockCustomValuesTemp}
                    />
                    <Box className={classes.finishButtons}>
                        {(titleStat === "Edit ") &&
                            <DeleteButton
                                clicked={() => handleDeleteProduct()}
                            />  
                        }
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