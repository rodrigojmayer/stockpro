import React, { useState, useEffect, useContext, useRef } from 'react';
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
         UpButton,
         MinusButton,
         EditButton
        } from '../Buttons';
// import EditIcon from '@mui/icons-material/Edit';
// import IonTrash from "../assets/ion_trash.svg";
import SaveChanges from '../SaveChanges';
// import Checkbox from '@mui/material/Checkbox';
import { useStylesGlobal, modalStyleExternal, modalStyleInternal } from '../../Styles'
import { CategoriesSubData, DataCreateStockOptions, ColumnData, ProductUpdateData } from '../../types';

// import { CategoriesContext } from '../context/CategoriesContext';
// import { MeasuresContext } from '../context/MeasuresContext';
import { UserContext } from '../../context/UserContext';
import { IsLoadingContext } from '../../context/IsLoadingContext';
// import EditStock from './EditStock';
import ManageStock from '../ManageStock';
import ErrorModal from '../ErrorModal';
import { useNavigate } from 'react-router-dom';
import { CheckListStockContext } from '../../context/CheckListStockContext';
import { LanguageLabelsContext } from '../../context/LanguageLabelsContext';
import { CategoriesContext } from '../../context/CategoriesContext';

interface ChildProps {
    open:  boolean
    handleClose: (newData: boolean) => void
    columnsCustom:  ColumnData[] 
    // productUpdate:  ProductUpdateData 
    subCategoryUpdate:  CategoriesSubData 
}

export default function UpdateSubCategory( 
    {   open, 
        handleClose, 
        columnsCustom,
        subCategoryUpdate,
    }: ChildProps) {
    const { classes } = useStylesGlobal();
    const [firstInputRef, setFirstInputRef] = useState(true);
    const close = () => {
        handleClose(false)
    } 
    console.log("subCategoryUpdate: ", subCategoryUpdate)
    const { user } = useContext<any>(UserContext);
    const { labelsUpdateAmountStock } = useContext<any>(LanguageLabelsContext);
    const { isLoading, setIsLoading, openBackdrop, setOpenBackdrop } = useContext<any>(IsLoadingContext);
    const { categories } = useContext<any>(CategoriesContext) 
    const { checkListStock, setCheckListStock } = useContext<any>(CheckListStockContext);
    
    
    const [ signUpdate, setSignUpdate ] = useState<number>(-1)
    const [ valueUpdate, setValueUpdate ] = useState<number>(1)
    // const [ resultUpdated, setResultUpdated ] = useState<number | string>(subCategoryUpdate.amount)
    const [ categoryTemp, setCategoryTemp ] = useState(subCategoryUpdate.category)
    const [ subCategoryTemp, setSubCategoryTemp ] = useState(subCategoryUpdate.sub_category)
    // const [ alertedAmount, setAlertedAmount ] = useState(false)
    // const [ alertedAmount, setAlertedAmount ] = useState(false)
    // const [ alertedAmount, setAlertedAmount ] = useState(false)
    // const [ alertedAmount, setAlertedAmount ] = useState(false)
    

    useEffect(() => {
        setCategoryTemp(subCategoryUpdate.category);
        setSubCategoryTemp(subCategoryUpdate.sub_category);
    }, [open])
    // const swapOperator = () => {
    //     const productAmount = Number(productUpdate.amount)
    //     let newSign = -(signUpdate)
    //     let newValue
    //     const topValue = 999 - productAmount
    //     if(productAmount===0)
    //         newSign = 1
    //     else{
    //         if(valueUpdate > productAmount && newSign < 0){
    //             newValue = productAmount
    //             setValueUpdate(newValue)
    //         } else if(valueUpdate > topValue && newSign > 0){
                
    //             if(topValue !== 0){
    //                 newValue = topValue
    //                 setValueUpdate(newValue)
    //             } else if(newSign > 0)
    //                 newSign = -1
    //         }
    //     }
    //     setSignUpdate(newSign)
    // }
    // const upValue = () => {
    //     const productAmount = Number(productUpdate.amount)
    //     let newValue
    //     const topValue = 999 - productAmount
    //     if ( signUpdate < 0 ){
    //         newValue = valueUpdate-1

    //     } else {
    //         newValue = valueUpdate+1
    //     }
    //     if(newValue > topValue && signUpdate > 0){
    //         if(topValue !== 0)
    //             setSignUpdate(1)
    //         newValue = topValue
    //     }
    //     if(newValue===0){
    //         if(topValue !== 0)
    //             setSignUpdate(1)
    //         newValue = 1
    //     }
    //     setValueUpdate(Math.abs(newValue))
    // }
    // const downValue = () => {
    //     const productAmount = Number(productUpdate.amount)
    //     let newValue
    //     if ( signUpdate < 0 ){
    //         newValue = valueUpdate+1
    //     } else {
    //         newValue = valueUpdate-1
    //     }
    //     if(newValue === 0 || newValue === -1){
    //         setSignUpdate(-1)
    //         newValue = 1
    //     }
    //     if(productAmount < newValue && signUpdate < 0)
    //         newValue = productAmount
    //     if(productAmount===0)
    //         setSignUpdate(1)
    //     setValueUpdate(Math.abs(newValue))
    // }
    // const writeValue = (e:any) => {
    //     setFirstInputRef(false)
    //     const productAmount = Number(productUpdate.amount)
    //     let newValue = parseInt(e.target.value.replace(/[+\-e]/g, ''), 10);
    //     const topValue = 999 - productAmount
    //     if(newValue===0)
    //         newValue = 1
    //     if(e.target.value==="")
    //         newValue = 1
    //     if(!isNaN(newValue)){
    //         if(newValue > productAmount && signUpdate < 0){
    //             newValue = productAmount
    //         }else if(newValue > topValue && signUpdate > 0)
    //             newValue = topValue
    //         setValueUpdate(newValue);
    //     }
    // }

    let ButtonOperator
    let buttonOperatorColor
    // if (valueUpdate > 0 ){
    if (Number(signUpdate) > 0 ){
        ButtonOperator = PlusButton 
        buttonOperatorColor = "rgb(100, 200, 100)"
    } else {
        ButtonOperator = MinusButton       
        buttonOperatorColor = "rgb(250, 100, 100)"

    }

    const [updatedResultVisible, setUpdatedResultVisible] = useState(false);
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
            
            // console.log("stockNameTemp: ", ans)
            // console.log("productUpdate.amount_prod: ", productUpdate.id_prod)
            // console.log("valueUpdate: ", valueUpdate)
            // console.log("productUpdate.amount_prod: ", productUpdate.amount_prod)
            
            
            // const fetchUpdateStockProduct = async () => {
            //     let loadingSuccess: boolean = false
            //     try {
            //         const response = await fetch(`${import.meta.env.VITE_API_URL_BACKEND}/products/${productUpdate._id}`, {
            //             method: 'PATCH',
            //             headers: {
            //                 'Content-Type': 'application/json', // Set the appropriate content-type for my API
            //                 // Add any other requires headers here
            //             },
            //             body:JSON.stringify({
            //                 "amount": resultUpdated,
            //                 "alerted_amount": alertedAmount
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
            //             fieldsFetchCreateStock: loadingSuccess,
            //         }));
                    
            //         setCheckListStock([]);
            //     }
            // } 
            // fetchUpdateStockProduct();       //////////Change the name for update


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
        // console.log("valueUpdateasd: ", valueUpdate)
        // console.log("signUpdate: ", signUpdate)
        // console.log("Number(productUpdate.amount): ", Number(productUpdate.amount))
        // const updatedResult = (valueUpdate * signUpdate) + Number(productUpdate.amount);
        // setResultUpdated(subCategoryUpdate);
        setUpdatedResultVisible(true);
    }
    
    const handleOpenEditStock = () => {
        setOpenEditStock(true)
    }

    const handleCloseEditStock = () => {
        close()
        setOpenEditStock(false)
    }  

    // ...
    
    // useEffect(() => {
    //     if (updatedResultVisible) {
    //         if (Number(productUpdate.alert_amount) >= Number(resultUpdated)) {
    //             setAlertedAmount(true);
    //             if (productUpdate.alert_amount_enabled)
    //                 setMessageBeforeSave(labelsUpdateAmountStock.messageAmountAlert);
    //             else 
    //                 setMessageBeforeSave("");
    //         } else {
    //             setAlertedAmount(false);
    //             setMessageBeforeSave("");
    //         }
    //         setOpenSaveChanges(true);
    //         setUpdatedResultVisible(false);
    //     }
    // }, [updatedResultVisible, resultUpdated, productUpdate.alert_amount]);

    // useEffect(() => {
    //     console.log("UpdateAmoungStock.tsx useEffect isLoading.fieldsFetchCreateStock: ", isLoading.fieldsFetchCreateStock)
    //     console.log("UpdateAmoungStock.tsx useEffect updatedResultVisible: ", updatedResultVisible)

    //     if(isLoading.fieldsFetchCreateStock && updatedResultVisible){
    //         // alert("Reload page")
    //                 // setIsFetching(false)
    //         alert("UpdateAmoungStock.tsx here used to be a window.location.reload()")
    //         // window.location.reload();
    //     }
    // }, [isLoading]) // To know if after save should reload the page

    
    // console.log("signUpdate: ", signUpdate)
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
                                    // onChange={ (event:any) => onStockMeasureChange(event.target.value) }
                                    >
                                        {categories.map((category: any) => (
                                            <MenuItem 
                                                key={category.id} 
                                                value={category.name}
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
                                    // onChange={ (event:any) => onStockNameChange(event.target.value) }
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


                            {/* <Grid container spacing={0} alignItems="center" >
                                <Grid item xs={3} display="flex" justifyContent="center">
                                    <Typography variant="h6" >
                                        {labelsUpdateAmountStock.amount}
                                    </Typography> </Grid>
                                <Grid item xs={3} />
                                <Grid item xs={3} display="flex" justifyContent="center">
                                    <UpButton
                                        direction="up"
                                        clicked={() => upValue()}
                                    /> 
                                </Grid>
                                <Grid item xs={3} />
                                <Grid item xs={3} display="flex" justifyContent="center">
                                    <Typography variant="h6" >
                                        {productUpdate.amount}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} display="flex" justifyContent="center" > 
                                    <ButtonOperator
                                        sizeIcoExt="50px !important"
                                        sizeIcoInt="57px !important"
                                        // colorIco = "white"  // Fix color
                                        colorIco = {buttonOperatorColor}
                                        clicked={() => swapOperator()}
                                    />
                                </Grid>
                                <Grid item xs={3} display="flex" justifyContent="center" >
                                    <TextField
                                        maxRows={1}
                                        size="small"
                                        // type="number"
                                        className={`${classes.inputMainData} ${classes.inputUpdateAmountStock}`}
                                        // value={Math.abs(valueUpdate)}
                                        value={valueUpdate}
                                        onChange={ (event:any) => writeValue(event) }
                                        style= {{
                                            textAlign: 'center',
                                        }}
                                        InputProps={{
                                            className: classes.inputClassName,
                                            inputProps: {
                                                style: { textAlign: "center" },
                                                inputMode: "numeric",
                                            },
                                        }}
                                        // inputRef={firstInputRef}
                                        inputRef={firstInputRef ? input => input && input.select() : undefined}
                                    />
                                </Grid>
                                <Grid item xs={3} display="flex" justifyContent="center" >
                                    <Typography variant="h6" >
                                        {productUpdate.measure}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} />
                                <Grid item xs={3} display="flex" justifyContent="center" >
                                    <UpButton
                                        direction="down"
                                        // clicked={() => setValueUpdate(valueUpdate-1)}
                                        clicked={() => downValue()}
                                    /> 
                                </Grid>
                                <Grid item xs={3} />
                            </Grid> */}
                        </Box>  
                        {/* <ManageStock  ///////////////////// Continue with the edit stock modal here
                            open={openEditStock} 
                            handleClose={handleCloseEditStock} 
                            data={subCategoryUpdate} 
                            columnsCustom={columnsCustom} 
                        /> */}
                        
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