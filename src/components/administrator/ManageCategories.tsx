import React, { useState, useEffect, useContext } from 'react';
import { Box,
         Modal, 
         TextField,
         Typography,
         MenuItem,
        } from '@mui/material';
import { OkButton,
         CancelButton, 
         EditButton
        } from '../Buttons';
import SaveChanges from '../SaveChanges';
import { useStylesGlobal, modalStyleExternal, modalStyleInternal } from '../../Styles'
import { CategoriesSubData, DataCreateStockOptions, ColumnData, ProductUpdateData } from '../../types';
import { UserContext } from '../../context/UserContext';
import { IsLoadingContext } from '../../context/IsLoadingContext';
import ErrorModal from '../ErrorModal';
import { LanguageLabelsContext } from '../../context/LanguageLabelsContext';
import { CategoriesContext } from '../../context/CategoriesContext';
interface ChildProps {
    open:  boolean
    handleClose: (newData: boolean) => void
    // productUpdate:  ProductUpdateData 
    subCategoryUpdate:  CategoriesSubData 
}
export default function ManageCategories( 
    {   open, 
        handleClose, 
        subCategoryUpdate,
    }: ChildProps) {
    const { classes } = useStylesGlobal();
    const close = () => {
        handleClose(false)
    } 
    // console.log("subCategoryUpdate: ", subCategoryUpdate)
    const { user } = useContext<any>(UserContext);
    const { labelsUpdateAmountStock } = useContext<any>(LanguageLabelsContext);
    const { isLoading, setIsLoading, openBackdrop, setOpenBackdrop } = useContext<any>(IsLoadingContext);
    const { categories } = useContext<any>(CategoriesContext) 
    
    // const [ resultUpdated, setResultUpdated ] = useState<number | string>(subCategoryUpdate.amount)
    const [ categoryTemp, setCategoryTemp ] = useState<any>("")
    const [ subCategoryTemp, setSubCategoryTemp ] = useState<any>("")


    useEffect(() => {
            setOpenBackdrop(true)
            // setCategoryTemp(subCategoryUpdate.category);
            setSubCategoryTemp(subCategoryUpdate.sub_category);
            setOpenBackdrop(true);
        
            // Find the category by name and get its ID
            const category = categories.find((cat: any) => cat.name === subCategoryUpdate.category);
            setCategoryTemp(category ? category.id : "");  // Set the ID or empty string if not found
        
            setSubCategoryTemp(subCategoryUpdate.sub_category);
    }, [open]) 
    useEffect(() => {
        if(categoryTemp && subCategoryTemp)
            setOpenBackdrop(false)
    }, [categoryTemp, subCategoryTemp])

    const onCategoryTempChange = (value: any) => {
        console.log("value: ", value)
        // setCategoryTemp(e.value)
        setCategoryTemp(value)
    }
    const onSubCategoryTempChange = (value: string) => {
        setSubCategoryTemp(value)
    }
    
    const [openSaveChanges, setOpenSaveChanges] = useState(false);  
    const [openEditStock, setOpenEditStock] = useState(false);  
    const [messageBeforeSave, setMessageBeforeSave] = useState("");  
    
    const [openErrorModal, setOpenErrorModal] = useState(false);  
    const [errorData, setErrorData] = useState(""); 
    
    const handleCloseErrorModal = () => {
        setOpenErrorModal(false)
    }
    // console.log("alert_amount: ", productUpdate.alert_amount)
    const handleCloseSaveChanges = (ans?:boolean) => {
        // console.log("ans: ", ans)   // If true should save the changes, if false shouldnt. In both cases has to close all the modals. If undefined should do nothing, just close the modal save changes
        if(ans){
            
            console.log("categoryTemp: ", categoryTemp)
            console.log("subCategoryTemp: ", subCategoryTemp)
            console.log("subCategoryUpdate: ", subCategoryUpdate)
            
            
            const fetchUpdateSubCategory = async () => {
                let loadingSuccess: boolean = false
                try {
                    const response = await fetch(`${import.meta.env.VITE_API_URL_BACKEND}/categoriesSub/${subCategoryUpdate._id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json', // Set the appropriate content-type for my API
                            // Add any other requires headers here
                        },
                        body:JSON.stringify({
                            // "id_category": subCategoryTemp,
                            "name": subCategoryTemp
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
                    // setIsLoading(())
                    // setIsLoading((prevLoading: any) => ({
                    //     ...prevLoading,
                    //     fieldsFetchCreateStock: loadingSuccess,
                    // }));
                    
                }
            } 
            fetchUpdateSubCategory();       //////////Change the name for update
            // setSelectedUsers(selectedUsersTemp)
            // setEmailsAlerts(emailsAlertsTemp.filter(emailAlert => { if(emailAlert.email != "") return emailAlert}))
            close()
        }
        setOpenSaveChanges(false);
        setIsLoading((prevLoading: any) => ({
            ...prevLoading,
            fieldsFetchCreateStock: false,
        }));
    }
    
    const handleOpenSaveChanges = () => {
        // console.log("signUpdate: ", signUpdate)
        // console.log("Number(productUpdate.amount): ", Number(productUpdate.amount))
        // const updatedResult = (valueUpdate * signUpdate) + Number(productUpdate.amount);
        // setResultUpdated(subCategoryUpdate);
        // setUpdatedResultVisible(true);
        setOpenSaveChanges(true);
    }
    
    const handleOpenEditStock = () => {
        setOpenEditStock(true)
    }
    const handleCloseEditStock = () => {
        close()
        setOpenEditStock(false)
    }  

    // console.log("signUpdate: ", signUpdate)
    if (openBackdrop ) {
        return <Typography>Loading...</Typography>;
    }
    // useEffect(() => {
       
    // }, [open, categories, subCategoryUpdate.category, subCategoryUpdate.sub_category]);


    return (
        <Modal
        className={classes.modal_external_background}
            open={open} 
            onClose={close}
        > 
            <form
                // onKeyDown={(e:any) => {
                //     if (e.key === "Enter") {
                //         e.preventDefault()
                //         handleOpenSaveChanges()
                //         e.stopPropagation()
                //     } else if (e.key === "ArrowUp") {
                //         e.preventDefault()
                //         upValue()
                //         e.stopPropagation()
                //     } else if (e.key === "ArrowDown") {
                //         e.preventDefault()
                //         downValue()
                //         e.stopPropagation()
                //     }
                // }}
            >
                <Box sx={modalStyleExternal}>
                    <Box 
                        sx={{ ...modalStyleInternal }}
                        className={`${classes[`_${user.background_color}main_background_color` as keyof typeof classes]} ${classes[`_${user.background_color}modal_color` as keyof typeof classes]}`}
                    >
                        <SaveChanges
                            openSaveChanges={openSaveChanges}
                            closeSaveChanges={handleCloseSaveChanges} 
                            
                            messageBeforeSave={messageBeforeSave}
                            />
                        {/* <ErrorModal
                            openErrorModal={openErrorModal}
                            closeErrorModal={handleCloseErrorModal}
                            errorData={errorData} 
                        /> */}
                        <Box className={`${classes.customBoxColumn}`}>
                            <Typography noWrap align='center' variant="h5" className={classes.title}>
                                Update Sub Category
                            </Typography>   
                            <Box className={classes.customBoxRow}>
                                <TextField 
                                    label="Category"
                                    size="small"
                                    select
                                    className={classes.inputMainData}
                                    InputProps={{className: classes.inputClassName}}
                                    // value={CategoriesSubData.category}
                                    value={categoryTemp}
                                    onChange={ (event:any) => onCategoryTempChange(event.target.value) }
                                    >
                                        {categories.map((category: any) => (
                                            <MenuItem 
                                            key={category.id} 
                                            value={category.id}
                                            sx={{ justifyContent: "space-between" }}
                                            >
                                                {category.name}
                                            </MenuItem>
                                        ))}
                                </TextField>
                            </Box> 
                            <Box className={classes.customBoxRow}>
                                <TextField
                                    label="Sub Category"
                                    value={subCategoryTemp}
                                    // value={null}
                                    onChange={ (event:any) => onSubCategoryTempChange(event.target.value) }
                                    maxRows={1}
                                    size="small"
                                    className={classes.inputMainData}
                                    InputProps={{
                                        className: classes.inputClassName,
                                        inputProps: {maxLength: 30}
                                    }}
                                    // inputRef={input => input && input.focus()}
                                    // inputRef={firstInputRef} // Set the ref to the first input    
                                    />
                            </Box> 
                        </Box>  
                        <Box className={classes.finishButtons}>
                            {user.id_access_level === 4 ? 
                                    "" 
                                    : 
                                    <EditButton
                                    clicked={() => handleOpenEditStock()}
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
            </form>
            </Modal>
    )
}