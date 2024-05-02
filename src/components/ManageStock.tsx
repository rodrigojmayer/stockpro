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
import { FilestackContext } from '../context/FilestackContext';
import { CheckListStockContext } from '../context/CheckListStockContext';

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

const INITIAL_CREATESTOCK_OPTIONS:DataCreateStockOptions = {
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
    const { filestack, deleteFilesStock } = useContext<any>(FilestackContext);
    const { checkListStock, setCheckListStock } = useContext<any>(CheckListStockContext)
   
    const edition = (data._id!== "" ? true : false)
    const [titleStat, setTitleStat] = useState<string>("Edit ");
    const [openOptionsCreate, setOpenOptionsCreate] = useState<DataCreateStockOptions>(INITIAL_CREATESTOCK_OPTIONS);
    const [stockNameTemp, setStockNameTemp] = useState(data.product);
    const [stockCodeTemp, setStockCodeTemp] = useState<any>(data.code);
    const [stockAmountTemp, setStockAmountTemp] = useState<number >(data.amount);
    const [stockMeasureTemp, setStockMeasureTemp] = useState<string>(data.measure);
    let selectedCategory
    if(edition)
        selectedCategory = categoryArray.find((category: any) => category.name === data.category) || null;
    const [stockCategoryTemp, setStockCategoryTemp] = useState<Category | null>(selectedCategory);
    const [stockSubCategoryTemp, setStockSubCategoryTemp] = useState<string>(data.sub_category); 
    const [stockPriceTemp, setStockPriceTemp] = useState<number | string>(data.price?data.price:'');
    const [stockDescriptionTemp, setStockDescriptionTemp] = useState<string>(data.description?data.description:'');
    const [stockImageUrlTemp, setStockImageUrlTemp] = useState<string>(data.url_image?data.url_image:'');  
    const [unsavedImages, setUnsavedImages] = useState<string[]>([])
    const [stockAlertAmountTemp, setStockAlertAmountTemp] = useState<number>(data.alert_amount?data.alert_amount:0);
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

            if(unsavedImages.length>0) {
                unsavedImages.forEach((unsavedImage) => {
                    deleteFilesStock(data._id, unsavedImage)
                })
            }
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
            bodyUpdate.apikey = filestack[0].apikey
            bodyUpdate.signature = filestack[0].signature
            if(data.url_image!=stockImageUrlTemp)
                bodyUpdate.url_image_edited = true

            const fetchManageStockProduct = async () => {
                
                let loadingSuccess: boolean = false
                try {
                    const manage_stock = (edition ? data._id : "")
                    const manage_method = (edition ? 'PATCH' : 'POST')
                    const response = await fetch(`${import.meta.env.VITE_API_URL_BACKEND}/products/${manage_stock}`, {
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
                    
                    setCheckListStock([])
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
    const handleCloseWithoutSaveChanges = () => {
        const deleteImages:string[] = unsavedImages
        if(stockImageUrlTemp && stockImageUrlTemp !== data.url_image) { // Delete new image added in filestack that wont be saved in the product
            deleteImages.push(stockImageUrlTemp)
        }
        if(data.url_image && deleteImages.includes(data.url_image)) {   // Avoid delete the image that was already in the product and then was another saved in filestack, but finally it wont be saved in the product
            const indexToRemove = deleteImages.indexOf(data.url_image)
            if ( indexToRemove !== -1){
                deleteImages.splice(indexToRemove, 1)
            }
        }

        if(deleteImages.length>0) {
            deleteImages.forEach((unsavedImage) => {
                deleteFilesStock(data._id, unsavedImage)
            })
        }
        close()
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
    const handleStockAmountChange = (value: number ) => {
        console.log("value: ", value)
        console.log("typeof value: ", typeof value)
        const topValue = 999
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
    const fetchCreateFilestackImagesProcessingQueue = async (img_data:any) => {
        let loadingSuccess: boolean = false
        console.log("img_data: ", img_data)
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL_BACKEND}/filestackImagesProcessingQueue/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "name": img_data.filename,
                    "apikey": filestack[0].apikey,
                    "signature": filestack[0].signature,
                    "url": img_data.handle,
                    "size": img_data.size
                })
            })
            // Check if the response status is successful
            if (response.ok) {
                loadingSuccess = true
            } else {
                console.log('Request failed.', response.status, response.statusText)
                // Handle the error here
            }
        } catch (error: unknown) {
            if (typeof error === 'string') {
                // 'error' is now narrowed down to type 'string'
                console.error('Error:', error);
            } else if (error instanceof Error) {
                // 'error' is now narrowed down to type 'Error'
                console.error('Error object:', error.message);
            } else {
                // Handle other cases as needed
            }
        } 
    }
    const handleSetImageUrl = (value: any) => {
        setStockImageUrlTemp(value.handle)
        fetchCreateFilestackImagesProcessingQueue(value);
    }
    
    const handleUnsavedImages = (value: string) => {
        setUnsavedImages((prevImages: string[]) => [...prevImages, value])
    }
    const handleStockAlertAmountChange = (value: number) => {
        setStockAlertAmountTemp(value)
    }
    const handleStockAlertAmountEnabledChange = (value: boolean) => {
        setStockAlertAmountEnabledTemp(value)
    }
    const handleStockAlertDateChange = (date:Dayjs | Date | null | string) => {
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
        console.log("handleConfirmDelete data.url_image: ", data.url_image)
        const deleteImages:string[] = unsavedImages
        if(stockImageUrlTemp && stockImageUrlTemp !== data.url_image) { // Delete new image added in filestack that wont be saved in the product
            deleteImages.push(stockImageUrlTemp)
        }
        if(data.url_image && !deleteImages.includes(data.url_image)) {
            console.log("handleConfirmDelete enter if data.url_image: ", data.url_image)   // Delete the image that was already in the product and then was another saved in filestack, but finally it wont be saved in the product
            deleteImages.push(data.url_image)
        }

        if(deleteImages.length>0) {
            deleteImages.forEach((unsavedImage) => {
                deleteFilesStock(data._id, unsavedImage)
            })
        }
        const fetchDeleteStockProduct = async () => {
            let loadingSuccess: boolean = false
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL_BACKEND}/products/${data._id}`, {
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
            setStockAmountTemp(0)
            setStockMeasureTemp('')
            setStockCategoryTemp(null)
            setStockSubCategoryTemp('')
            setStockPriceTemp('')
            setStockDescriptionTemp('')
            setStockImageUrlTemp('')
            setStockAlertAmountTemp(0)
            setStockAlertAmountEnabledTemp(false)
            setStockAlertedAmountTemp(false)
            setStockAlertDateTemp('')
            setStockAlertDateEnabledTemp(false)
            setStockAlertedDateTemp(false);
            setStockCustomValuesTemp({});
            setTitleStat("Create ")
            setOpenOptionsCreate(INITIAL_CREATESTOCK_OPTIONS)
        }
    }, [open])
    
    return (
        <Modal
            sx={{backgroundColor: 'rgba(0, 0, 0, .5)'}}
            open={open} 
            onClose={close}
        > 
            <form
                onKeyDown={(e:any) => {
                    if (e.key === "Enter") {
                        e.preventDefault()
                        handleOpenSaveChanges()
                        e.stopPropagation()
                    }
                }}
            >
                <Box sx={modalStyleExternal}>
                    <Box sx={{...modalStyleInternal, overflow: 'visible'}}>
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
                        
                        <Typography align='center' variant="h5" >{titleStat} stock</Typography>
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
                            
                            imageUrlHandle={stockImageUrlTemp}
                            onSetImageUrlHandle={handleSetImageUrl}

                            unsavedImages={unsavedImages}
                            onHandleUnsavedImages={handleUnsavedImages}
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
                                clicked={() => handleCloseWithoutSaveChanges()}
                            />
                            <OkButton
                                clicked={() => handleOpenSaveChanges()}
                            />
                        </Box> 
                    </Box>
                </Box>
            </form>
        </Modal>
    )
}