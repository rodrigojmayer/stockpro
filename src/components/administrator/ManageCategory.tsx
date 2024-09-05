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
import { CategoriesData, DataCreateStockOptions, ColumnData, ProductUpdateData } from '../../types';
import { UserContext } from '../../context/UserContext';
import { IsLoadingContext } from '../../context/IsLoadingContext';
import ErrorModal from '../ErrorModal';
import { LanguageLabelsContext } from '../../context/LanguageLabelsContext';
import { CategoriesContext } from '../../context/CategoriesContext';
interface ChildProps {
    open:  boolean
    handleClose: (newData: boolean) => void
    // productUpdate:  ProductUpdateData 
    categoryTemp:  CategoriesData 
    updateCategory: (newData: any, field: string) => void
}
export default function ManageCategory( 
    {   open, 
        handleClose, 
        categoryTemp,
        updateCategory
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
    
    // const categoryLoad = categoryTemp 
    // const [ resultUpdated, setResultUpdated ] = useState<number | string>(subCategoryUpdate.amount)
    // const [ categoryTemp, setCategoryTemp ] = useState<any>("")
    const [ categoryLoad, setCategoryLoad ] = useState<any>(categoryTemp)
    // const [ categoryEnTemp, setSubCategoryEnTemp ] = useState<any>("")
    // const [ subCategoryEsTemp, setSubCategoryEsTemp ] = useState<any>("")
    // const [ subCategoryDkTemp, setSubCategoryDkTemp ] = useState<any>("")
    // const [ subCategoryItTemp, setSubCategoryItTemp ] = useState<any>("")

    // console.log("subCategoryUpdate: ", subCategoryUpdate)
    // console.log("categories: ", categories)

    // useEffect(() => {
    //         setOpenBackdrop(true)
    //         // setCategoryTemp(subCategoryUpdate.category);
    //         setSubCategoryEnTemp(subCategoryUpdate.sub_category_en);
    //         setSubCategoryEsTemp(subCategoryUpdate.sub_category_es);
    //         setSubCategoryDkTemp(subCategoryUpdate.sub_category_dk);
    //         setSubCategoryItTemp(subCategoryUpdate.sub_category_it);
    //         setOpenBackdrop(true);
        
    //         // Find the category by name and get its ID
    //         const category = categories.find((cat: any) => cat.category_en === subCategoryUpdate.category_en);
    //         setCategoryTemp(category ? category.id : "");  // Set the ID or empty string if not found
        
    //         setSubCategoryEnTemp(subCategoryUpdate.sub_category_en);
    // }, [open]) 
    // useEffect(() => {
    //     if(categoryTemp && subCategoryEnTemp)
    //         setOpenBackdrop(false)
    // }, [categoryTemp, subCategoryEnTemp])

    // const onCategoryTempChange = (value: any) => {
    //     setCategoryTemp(value)
    // }
    // const onCategoryEnTempChange = (value: string) => {
    //     setSubCategoryEnTemp(value)
    // }
    // const onCategoryEsTempChange = (value: string) => {
    //     setSubCategoryEsTemp(value)
    // }
    // const onCategoryDkTempChange = (value: string) => {
    //     setSubCategoryDkTemp(value)
    // }
    // const onCategoryItTempChange = (value: string) => {
    //     setSubCategoryItTemp(value)
    // }
    
    const [openSaveChanges, setOpenSaveChanges] = useState(false);  
    const [openEditCategory, setOpenEditCategory] = useState(false);  
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
            
            console.log("categoryTemp.category_en: ", categoryTemp.category_en)
            console.log("categoryLoad.category_en: ", categoryLoad.category_en)
            // console.log("subCategoryUpdate: ", subCategoryUpdate)
            
            const bodyUpdate: CategoriesData = {}
            // // bodyUpdate.id_client = user.id_client
            // // bodyUpdate.deleted = false
            // // if(!edition || data.product!=stockNameTemp)
            if(categoryLoad.category_en != categoryTemp.category_en)
                bodyUpdate.name = categoryTemp.category_en
            if(categoryLoad.category_es != categoryTemp.category_es)
                bodyUpdate.name_esp = categoryTemp.category_es
            if(categoryLoad.category_dk != categoryTemp.category_dk)
                bodyUpdate.name_dan = categoryTemp.category_dk
            if(categoryLoad.category_it != categoryTemp.category_it)
                bodyUpdate.name_ita = categoryTemp.category_it
            
            const fetchUpdateCategory = async () => {
                let loadingSuccess: boolean = false
                try {
                    const response = await fetch(`${import.meta.env.VITE_API_URL_BACKEND}/categories/${categoryTemp._id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json', // Set the appropriate content-type for my API
                            // Add any other requires headers here
                        },
                        body:JSON.stringify(bodyUpdate)
                        // body:JSON.stringify({
                        //     "name": categoryTemp.category_en,
                        //     "name_esp": categoryTemp.category_es,
                        //     "name_dan": categoryTemp.category_dk,
                        //     "name_ita": categoryTemp.category_it
                        // })
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
                    setIsLoading((prevLoading: any) => ({
                        ...prevLoading,
                        categories: loadingSuccess,
                    }));
                    setCategoryLoad(categoryTemp)
                    
                }
            } 
            fetchUpdateCategory();       //////////Change the name for update
            close()
        }
        setOpenSaveChanges(false);
        // setIsLoading((prevLoading: any) => ({
        //     ...prevLoading,
        //     fieldsFetchCreateStock: false,
        // }));
    }
    
    const handleOpenSaveChanges = () => {
        // console.log("signUpdate: ", signUpdate)
        // console.log("Number(productUpdate.amount): ", Number(productUpdate.amount))
        // const updatedResult = (valueUpdate * signUpdate) + Number(productUpdate.amount);
        // setResultUpdated(subCategoryUpdate);
        // setUpdatedResultVisible(true);
        setOpenSaveChanges(true);
    }
    
    // const handleOpenEditCategory = () => {
    //     setOpenEditCategory(true)
    // }
    // const handleCloseEditCategory = () => {
    //     close()
    //     setOpenEditCategory(false)
    // }  

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
                                Update Category
                            </Typography>   
                            {/* <Box className={classes.customBoxRow}>
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
                                                {category.category_en}
                                            </MenuItem>
                                        ))}
                                </TextField>
                                <EditButton
                                    clicked={() => handleOpenEditCategory()}
                                    />
                            </Box>  */}
                            {/* <Box className={classes.customBoxRow}>
                            {categories.map((category: any) => {if(category.id === categoryTemp){return(category.category_es)}})}
                            &nbsp;/&nbsp; 
                            {categories.map((category: any) => {if(category.id === categoryTemp){return(category.category_dk)}})}
                            &nbsp;/&nbsp;
                            {categories.map((category: any) => {if(category.id === categoryTemp){return(category.category_it)}})}
                            </Box> */}
                            <Box className={classes.customBoxRow}>
                                <TextField
                                    label="Category En"
                                    value={categoryTemp.category_en}
                                    onChange={ (event:any) => updateCategory(event.target.value, "category_en") }
                                    maxRows={1}
                                    size="small"
                                    className={classes.inputMainData}
                                    InputProps={{
                                        className: classes.inputClassName,
                                        inputProps: {maxLength: 30}
                                    }}
                                    />
                            </Box> 
                            <Box className={classes.customBoxRow}>
                                <TextField
                                    label="Category Es"
                                    value={categoryTemp.category_es}
                                    onChange={ (event:any) => updateCategory(event.target.value, "category_es") }
                                    maxRows={1}
                                    size="small"
                                    className={classes.inputMainData}
                                    InputProps={{
                                        className: classes.inputClassName,
                                        inputProps: {maxLength: 30}
                                    }}
                                    />
                            </Box> 
                            <Box className={classes.customBoxRow}>
                                <TextField
                                    label="Category Dk"
                                    value={categoryTemp.category_dk}
                                    onChange={ (event:any) => updateCategory(event.target.value, "category_dk") }
                                    maxRows={1}
                                    size="small"
                                    className={classes.inputMainData}
                                    InputProps={{
                                        className: classes.inputClassName,
                                        inputProps: {maxLength: 30}
                                    }}
                                    />
                            </Box> 
                            <Box className={classes.customBoxRow}>
                                <TextField
                                    label="Category It"
                                    value={categoryTemp.category_it}
                                    onChange={ (event:any) => updateCategory(event.target.value, "category_it") }
                                    maxRows={1}
                                    size="small"
                                    className={classes.inputMainData}
                                    InputProps={{
                                        className: classes.inputClassName,
                                        inputProps: {maxLength: 30}
                                    }}
                                    />
                            </Box> 
                        </Box>  
                        <Box className={classes.finishButtons}>
                            {/* {user.id_access_level === 4 ? 
                                    "" 
                                    : 
                                    <EditButton
                                    clicked={() => handleOpenEditStock()}
                                    />
                                }  */}
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