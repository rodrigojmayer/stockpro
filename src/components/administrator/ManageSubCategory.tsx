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
import { CategoriesSubData, DataCreateStockOptions, ColumnData, ProductUpdateData, CategoriesData } from '../../types';
import { UserContext } from '../../context/UserContext';
import { IsLoadingContext } from '../../context/IsLoadingContext';
import ErrorModal from '../ErrorModal';
import { LanguageLabelsContext } from '../../context/LanguageLabelsContext';
import { CategoriesContext } from '../../context/CategoriesContext';
import ManageCategory from './ManageCategory';


const initial_state_sub_category = {
    _id: "",
    id: 0,
    id_category: 1,
    sub_category_en: "",
    sub_category_es: "",
    sub_category_dk: "",
    sub_category_it: "",
    deleted: false,
  }
  interface ChildProps {
    open:  boolean
    handleClose: (newData: boolean) => void
    // productUpdate:  ProductUpdateData 
    subCategoryUpdate:  CategoriesSubData 
}
export default function ManageSubCategory( 
    {   open, 
        handleClose, 
        subCategoryUpdate,
    }: ChildProps) {
    const { classes } = useStylesGlobal();
    const close = () => {
        handleClose(false)
    } 
    // console.log("subCategoryUpdate: ", subCategoryUpdate)
    // console.log("subCategoryUpdate: ", subCategoryUpdate)
    const { user } = useContext<any>(UserContext);
    const { labelsUpdateAmountStock } = useContext<any>(LanguageLabelsContext);
    const { isLoading, setIsLoading, openBackdrop, setOpenBackdrop } = useContext<any>(IsLoadingContext);
    const { categories } = useContext<any>(CategoriesContext) 
    
    // const [ resultUpdated, setResultUpdated ] = useState<number | string>(subCategoryUpdate.amount)
    const base_category = categories.find((cat: any) => cat.id === 1);
    const [ categoryTemp, setCategoryTemp ] = useState<CategoriesData>(base_category)
    // const [ categoryTemp, setCategoryTemp ] = useState<CategoriesData>({
    //     id: NaN,
    //     category_en: "",
    //     category_es: "",
    //     category_dk: "",
    //     category_it: "",
    //     deleted: false
    // })
    const [ subCategoryTemp, setSubCategoryTemp ] = useState<CategoriesSubData>(initial_state_sub_category)
    // const [ subCategoryTemp, setSubCategoryTemp ] = useState<CategoriesSubData>({
    //     id: NaN,
    //     sub_category_en: "",
    //     sub_category_es: "",
    //     sub_category_dk: "",
    //     sub_category_it: "",
    //     deleted: false
    // })
    // const [ subCategoryEnTemp, setSubCategoryEnTemp ] = useState<any>("")
    // const [ subCategoryEsTemp, setSubCategoryEsTemp ] = useState<any>("")
    // const [ subCategoryDkTemp, setSubCategoryDkTemp ] = useState<any>("")
    // const [ subCategoryItTemp, setSubCategoryItTemp ] = useState<any>("")

    // console.log("subCategoryUpdate: ", subCategoryUpdate)
    // console.log("categories: ", categories)

    useEffect(() => {
        // setOpenBackdrop(true)
        if(subCategoryUpdate._id !== ""){

                setSubCategoryTemp ({ ...subCategoryTemp, 
                    sub_category_en: subCategoryUpdate.sub_category_en,
                    sub_category_es: subCategoryUpdate.sub_category_es,
                    sub_category_dk: subCategoryUpdate.sub_category_dk,
                    sub_category_it: subCategoryUpdate.sub_category_it,
                })
                // setOpenBackdrop(true);
                // Find the category by name and get its ID
                // if
                const category = categories.find((cat: any) => cat.category_en === subCategoryUpdate.category_en);
                console.log("category: ", category)
                setCategoryTemp(category)
            } else {
                setSubCategoryTemp(initial_state_sub_category)
                setCategoryTemp(base_category)
                setOpenBackdrop(false)
            }
            // setSubCategoryEnTemp(subCategoryUpdate.sub_category_en);
    }, [open]) 
    useEffect(() => {

        // console.log("-----------open------: ", open)
        // console.log("categoryTemp------: ", categoryTemp)
        // console.log("categoryTemp?.id------: ", categoryTemp?.id)
        // console.log("subCategoryTemp.sub_category_en------: ", subCategoryTemp.sub_category_en)
        
        // if(categoryTemp?.id && subCategoryEnTemp)
        if(categoryTemp?.id && subCategoryTemp.sub_category_en && open)
            setOpenBackdrop(false)
    }, [categoryTemp, subCategoryTemp.sub_category_en])

    const onCategoryTempChange = (value: any) => {
        // setCategoryTemp(value)   
        setCategoryTemp({ ...categoryTemp, id: value})

    }
    const updateCategory = (value: any, field: string) => {
        setCategoryTemp({ ...categoryTemp, [field]: value})
    }
    const updateSubCategory = (value: any, field: string) => {
        setSubCategoryTemp({ ...subCategoryTemp, [field]: value})
    }
    // const onSubCategoryEnTempChange = (value: string) => {
    //     setSubCategoryEnTemp(value)
    // }
    // const onSubCategoryEsTempChange = (value: string) => {
    //     setSubCategoryEsTemp(value)
    // }
    // const onSubCategoryDkTempChange = (value: string) => {
    //     setSubCategoryDkTemp(value)
    // }
    // const onSubCategoryItTempChange = (value: string) => {
    //     setSubCategoryItTemp(value)
    // }
    
    const [openSaveChanges, setOpenSaveChanges] = useState(false);  
    const [openManageCategory, setOpenManageCategory] = useState(false);  
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
            
            // console.log("categoryTemp: ", categoryTemp)
            // console.log("subCategoryEnTemp: ", subCategoryEnTemp)
            // console.log("subCategoryUpdate: ", subCategoryUpdate)
            
            
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
                            "id_category": categoryTemp.id,
                            "name": subCategoryTemp.sub_category_en,
                            "name_esp": subCategoryTemp.sub_category_es,
                            "name_dan": subCategoryTemp.sub_category_dk,
                            "name_ita": subCategoryTemp.sub_category_it
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
                    setIsLoading((prevLoading: any) => ({
                        ...prevLoading,
                        categories_sub: loadingSuccess,
                    }));
                    
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
    
    const handleOpenManageCategory = () => {
        setOpenManageCategory(true)
    }
    const handleCloseManageCategory = () => {
        // close()
        console.log("categories: ", categories)
        categories
        setOpenManageCategory(false)
    }  

    // console.log("signUpdate: ", signUpdate)
    if (openBackdrop ) {
        return <Typography>Loading...</Typography>;
    }
    // useEffect(() => {
    // console.log("categoryTemp: ", categoryTemp)
       
    // }, []);


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
                        <ManageCategory  ///////////////////// Continue with the edit stock modal here
                            open={openManageCategory} 
                            handleClose={handleCloseManageCategory} 
                            categoryTemp={categoryTemp}
                            updateCategory={updateCategory} 
                        />
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
                                    value={categoryTemp?.id}
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
                                    clicked={() => handleOpenManageCategory()}
                                />
                            </Box> 
                            <Box className={classes.customBoxRow}>
                            {categories.map((category: any) => {if(category.id === categoryTemp?.id){return(category.category_es)}})}
                            &nbsp;/&nbsp; 
                            {categories.map((category: any) => {if(category.id === categoryTemp?.id){return(category.category_dk)}})}
                            &nbsp;/&nbsp;
                            {categories.map((category: any) => {if(category.id === categoryTemp?.id){return(category.category_it)}})}
                            </Box>
                            <Box className={classes.customBoxRow}>
                                <TextField
                                    label="Sub Category En"
                                    value={subCategoryTemp.sub_category_en}
                                    onChange={ (event:any) => updateSubCategory(event.target.value, "sub_category_en") }
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
                                    label="Sub Category Es"
                                    value={subCategoryTemp.sub_category_es}
                                    onChange={ (event:any) => updateSubCategory(event.target.value, "sub_category_es") }
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
                                    label="Sub Category Dk"
                                    value={subCategoryTemp.sub_category_dk}
                                    onChange={ (event:any) => updateSubCategory(event.target.value, "sub_category_dk") }
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
                                    label="Sub Category It"
                                    value={subCategoryTemp.sub_category_it}
                                    onChange={ (event:any) => updateSubCategory(event.target.value, "sub_category_it") }
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