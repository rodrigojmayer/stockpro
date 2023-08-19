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
         UpButton,
         MinusButton,
         EditButton
        } from './Buttons';
// import EditIcon from '@mui/icons-material/Edit';
// import IonTrash from "../assets/ion_trash.svg";
import SaveChanges from './SaveChanges';
// import Checkbox from '@mui/material/Checkbox';
import { useStylesGlobal, modalStyleExternal, modalStyleInternal } from '../Styles'
import { Data, DataCreateStockOptions, ColumnData, ProductUpdateData } from '../types';

// import { CategoriesContext } from '../context/CategoriesContext';
// import { MeasuresContext } from '../context/MeasuresContext';
import { UserContext } from '../context/UserContext';
import { IsLoadingContext } from '../context/IsLoadingContext';
import EditStock from './EditStock';
import ErrorModal from './ErrorModal';

interface ChildProps {
    open:  boolean
    handleClose: (newData: boolean) => void
    // productUpdate:  ProductUpdateData 
    productUpdate:  Data 
}

export default function UpdateAmountStock( 
    {   open, 
        handleClose, 
        productUpdate,
    }: ChildProps) {
    const { classes } = useStylesGlobal();
    const close = () => {
        handleClose(false)
    } 

    // console.log("productUpdate: ", productUpdate)

    const { user } = useContext<any>(UserContext)
    const { isLoading, setIsLoading, openBackdrop, setOpenBackdrop } = useContext<any>(IsLoadingContext)

    const [ valueUpdate, setValueUpdate ] = useState<number>(-1)
    const [ resultUpdated, setResultUpdated ] = useState<number | string>(productUpdate.amount)
    const [ alertOn, setAlertOn ] = useState(false)

    const upValue = () => {
        let newValue = valueUpdate+1
        if(newValue===0)
            newValue = 1
        setValueUpdate(newValue)
    }
    const downValue = () => {
        let newValue = valueUpdate-1
        if(newValue===0)
            newValue = -1
        if(-productUpdate.amount > newValue)
            newValue = -productUpdate.amount
        setValueUpdate(newValue)
    }
    const writeValue = (e:any) => {
        let newValue = (Number(e.target.value)) 
        if(-productUpdate.amount > newValue)
            newValue = -productUpdate.amount
        setValueUpdate(newValue)
    }

    let ButtonOperator
    let buttonOperatorColor
    if (valueUpdate > 0 ){
        ButtonOperator = PlusButton 
        buttonOperatorColor = "rgb(100, 200, 100)"
    } else {
        ButtonOperator = MinusButton       
        buttonOperatorColor = "rgb(250, 100, 100)"

    }
    const swapOperator = () => {
        let newValue = -valueUpdate
        if(-productUpdate.amount > newValue)
            newValue = -productUpdate.amount
        setValueUpdate(newValue)
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


    useEffect(() => {
        setValueUpdate(-1)
        setAlertOn(false);
        setMessageBeforeSave("");
    }, [handleClose])

    const handleCloseSaveChanges = (ans?:boolean) => {
        // console.log("ans: ", ans)   // If true should save the changes, if false shouldnt. In both cases has to close all the modals. If undefined should do nothing, just close the modal save changes
        if(ans){
            
            // console.log("stockNameTemp: ", ans)
            // console.log("productUpdate.amount_prod: ", productUpdate.id_prod)
            // console.log("valueUpdate: ", valueUpdate)
            // console.log("productUpdate.amount_prod: ", productUpdate.amount_prod)
            
            
            const fetchUpdateStockProduct = async () => {
                let loadingSuccess: boolean = false
                try {
                    const response = await fetch(`http://localhost:4000/api/products/${productUpdate._id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json', // Set the appropriate content-type for my API
                            // Add any other requires headers here
                        },
                        body:JSON.stringify({
                            "amount": resultUpdated,
                            "alert_on": alertOn
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
            fetchUpdateStockProduct()        //////////Change the name for update


            // setSelectedUsers(selectedUsersTemp)
            // setEmailsAlerts(emailsAlertsTemp.filter(emailAlert => { if(emailAlert.email != "") return emailAlert}))
            close()
        }
        setOpenSaveChanges(false);
    }




    // const handleOpenSaveChanges = () => {
    //     const updatedResult  = productUpdate.amount_prod + valueUpdate
    //     setResultUpdated(updatedResult )
    //     // console.log("Updated result: ", resultUpdated)
    //     if(productUpdate.alert_amount){
    //         if (productUpdate.alert_amount >= resultUpdated){
    //             setAlertOn(true)
    //             setMessageBeforeSave("The stock amount will drop below the alert level.")
    //         }else {
    //             setAlertOn(false)
    //             setMessageBeforeSave("")                
    //         }
    //     } 
    //     setUpdatedResultVisible(true);
    // }
    // useEffect(() => {
    //     if (updatedResultVisible) {
    //         setOpenSaveChanges(true); // Now you can safely open the modal
    //         setUpdatedResultVisible(false); // Reset the state
    //     }
    // }, [updatedResultVisible]);
    


    const handleOpenSaveChanges = () => {
        const updatedResult = Number(productUpdate.amount) + valueUpdate;
        setResultUpdated(updatedResult);
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
    
    useEffect(() => {
        if (updatedResultVisible) {
            if (productUpdate.alert_amount) {
                if (Number(productUpdate.alert_amount) >= Number(resultUpdated)) {
                    setAlertOn(true);
                    setMessageBeforeSave("The stock amount will drop below the alert level.");
                } else {
                    setAlertOn(false);
                    setMessageBeforeSave("");
                }
            }
            
            setOpenSaveChanges(true);
            setUpdatedResultVisible(false);
        }
    }, [updatedResultVisible, resultUpdated, productUpdate.alert_amount]);



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
                     {/* <ErrorModal
                        openErrorModal={openErrorModal}
                        closeErrorModal={handleCloseErrorModal}
                        errorData={errorData} 
                    /> */}
                    <Box className={`${classes.customBoxColumn} ${classes.updateBoxColumn}`}>
                    <Typography variant="h5">{productUpdate.product}</Typography>
                    
                        <Grid container spacing={0} alignItems="center" >
                            <Grid item xs={6} md={6} > </Grid>
                            <Grid item xs={3} md={6} display="flex" justifyContent="center">
                                <UpButton
                                    direction="up"
                                    clicked={() => upValue()}
                                /> 
                            </Grid>
                            <Grid item xs={3} md={6} > </Grid>

                            <Grid item xs={1} md={8} > </Grid>
                            <Grid item xs={2} md={8} >
                            {/* <Box className={classes.customBoxRow}> */}
                                <Typography align='center' variant="h6" >
                                    {productUpdate.amount}
                                </Typography>
                            </Grid>
                            <Grid item xs={3} md={8} display="flex" justifyContent="center" > 
                                <ButtonOperator
                                    sizeIcoExt="50px !important"
                                    sizeIcoInt="57px !important"
                                    // colorIco = "white"  // Fix color
                                    colorIco = {buttonOperatorColor}
                                    clicked={() => swapOperator()}
                                />
                            </Grid>
                            <Grid item xs={3} md={8} display="flex" justifyContent="center" >
                                <TextField
                                    maxRows={1}
                                    size="small"
                                    type="number"
                                    className={`${classes.inputMainData} ${classes.inputUpdateAmountStock}`}
                                    value={Math.abs(valueUpdate)}
                                    onChange={ (event) => writeValue(event) }
                                    style= {{
                                        textAlign: 'center',
                                    }}
                                    InputProps={{
                                        className: classes.inputClassName,
                                        inputProps: {
                                            style: { textAlign: "center" },
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={2} md={8} display="flex" justifyContent="center" >
                                <Typography variant="h6" >
                                    {productUpdate.measure}
                                </Typography>
                            </Grid>
                            <Grid item xs={1} md={8} > </Grid>

                            <Grid item xs={6} md={8} > </Grid>
                            <Grid item xs={3} md={8} display="flex" justifyContent="center" >
                                {/* </Box>  */}
                                <UpButton
                                    direction="down"
                                    // clicked={() => setValueUpdate(valueUpdate-1)}
                                    clicked={() => downValue()}
                                /> 
                            </Grid>
                            <Grid item xs={3} md={6} > </Grid>
                        </Grid>
                    </Box>  
                    
                    <EditStock  ////////////////////////////////////////////// Continue with the edit stock modal here
                        open={openEditStock} 
                        handleClose={handleCloseEditStock} 
                        data={productUpdate} 
                        // columnsCustom={[]}                    
                    />
                    
                    <Box className={classes.finishButtons}>
                        <EditButton
                        clicked={() => handleOpenEditStock()}
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