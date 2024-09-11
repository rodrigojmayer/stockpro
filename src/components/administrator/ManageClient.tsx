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
interface ChildProps {
    open:  boolean
    handleClose: (newData: boolean) => void
    // productUpdate:  ProductUpdateData 
    clientUpdate:  any 
}
export default function ManageClient( 
{   open, 
    handleClose, 
    clientUpdate,
}: ChildProps) {
    const { classes } = useStylesGlobal();
    const close = () => {
        handleClose(false)
    } 
    // console.log("subCategoryUpdate: ", subCategoryUpdate)
    const { user } = useContext<any>(UserContext);
    const { labelsUpdateAmountStock } = useContext<any>(LanguageLabelsContext);
    const { isLoading, setIsLoading, openBackdrop, setOpenBackdrop } = useContext<any>(IsLoadingContext);

    const [ clientTemp, setClientTemp ] = useState<CategoriesSubData>({
        _id: "",
        id: NaN,
        id_group_filestack: NaN,
        client: '',
        deleted: false,
        enabled: true,
    })

    useEffect(() => {
        setOpenBackdrop(true)
        setClientTemp ({ ...clientTemp, 
            id_group_filestack: clientUpdate.id_group_filestack,
            client: clientUpdate.client,
            deleted: clientUpdate.deleted,
            enabled: clientUpdate.enabled,
        })
        setOpenBackdrop(true);
        
    }, [open]) 
    useEffect(() => {

        console.log("clientTemp?.id: ", clientTemp?.id)
        
        // if(categoryTemp?.id && subCategoryEnTemp)
        if(open)
            setOpenBackdrop(false)
    }, [clientTemp])

    // const onCategoryTempChange = (value: any) => {
    //     // setCategoryTemp(value)   
    //     setCategoryTemp({ ...categoryTemp, id: value})

    // }
    // const updateCategory = (value: any, field: string) => {
    //     setCategoryTemp({ ...categoryTemp, [field]: value})
    // }
    const updateClient = (value: any, field: string) => {
        setClientTemp({ ...clientTemp, [field]: value})
    }
    
    const [openSaveChanges, setOpenSaveChanges] = useState(false);   
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
            
            
            // const fetchUpdateSubCategory = async () => {
            //     let loadingSuccess: boolean = false
            //     try {
            //         const response = await fetch(`${import.meta.env.VITE_API_URL_BACKEND}/categoriesSub/${subCategoryUpdate._id}`, {
            //             method: 'PATCH',
            //             headers: {
            //                 'Content-Type': 'application/json', // Set the appropriate content-type for my API
            //                 // Add any other requires headers here
            //             },
            //             body:JSON.stringify({
            //                 "id_category": categoryTemp.id,
            //                 "name": subCategoryTemp.sub_category_en,
            //                 "name_esp": subCategoryTemp.sub_category_es,
            //                 "name_dan": subCategoryTemp.sub_category_dk,
            //                 "name_ita": subCategoryTemp.sub_category_it
            //             })
            //         })
            //         // Check if the response status is successful
            //         if (response.ok) {
            //             const responseData = await response.json() // parse the response data
            //             // console.log('POST request successful: ', responseData)
            //             loadingSuccess = true
            //         } else {
            //             // Handle non-successful responses
            //             console.error('Request failed: ', response.status, response.statusText)
            //             // Handle the error here
            //         }
            //     } catch (error: unknown) {
            //         if (typeof error === 'string') {
            //             // 'error' is now narrowed down to type 'string'
            //             console.error('Error:', error)
            //         } else if (error instanceof Error) {
            //             // 'error' is now narrowed down to type 'Error'
            //             console.error('Error object:', error.message)
            //         } else {
            //             // Handle other cases as needed
            //         }
            //     } finally {
            //         // setIsLoading(())
            //         setIsLoading((prevLoading: any) => ({
            //             ...prevLoading,
            //             categories_sub: loadingSuccess,
            //         }));
                    
            //     }
            // } 
            // fetchUpdateSubCategory();       //////////Change the name for update
            
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
                        <Box className={`${classes.customBoxColumn}`}>
                            <Typography noWrap align='center' variant="h5" className={classes.title}>
                                Update Client
                            </Typography>   
                            {/* <Box className={classes.customBoxRow}>
                                <TextField 
                                    label="Category"
                                    size="small"
                                    select
                                    className={classes.inputMainData}
                                    InputProps={{className: classes.inputClassName}}
                                    // value={CategoriesSubData.category}
                                    value={categoryTemp.id}
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
                            </Box>  */}
                            {/* <Box className={classes.customBoxRow}>
                            {categories.map((category: any) => {if(category.id === categoryTemp.id){return(category.category_es)}})}
                            &nbsp;/&nbsp; 
                            {categories.map((category: any) => {if(category.id === categoryTemp.id){return(category.category_dk)}})}
                            &nbsp;/&nbsp;
                            {categories.map((category: any) => {if(category.id === categoryTemp.id){return(category.category_it)}})}
                            </Box> */}
                            <Box className={classes.customBoxRow}>
                                <TextField
                                    label="Id Grou Filestack"
                                    value={clientTemp.id_group_filestack}
                                    onChange={ (event:any) => updateClient(event.target.value, "id_group_filestack") }
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
                                    label="Client"
                                    value={clientTemp.client}
                                    onChange={ (event:any) => updateClient(event.target.value, "client") }
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
                                    label="Deleted"
                                    value={clientTemp.deleted}
                                    onChange={ (event:any) => updateClient(event.target.value, "deleted") }
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
                                    label="Enabled"
                                    value={clientTemp.enabled}
                                    onChange={ (event:any) => updateClient(event.target.value, "enabled") }
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