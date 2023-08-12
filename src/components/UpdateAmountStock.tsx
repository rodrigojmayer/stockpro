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
         MinusButton
        } from './Buttons';
import  CreateStockMainData  from './CreateStockMainData'
import  CreateStockSecondaryData  from './CreateStockSecondaryData'
import  CreateStockAlerts  from './CreateStockAlerts'
import  CreateStockCustomFields  from './CreateStockCustomFields'
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import ControlPointTwoToneIcon from '@mui/icons-material/ControlPointTwoTone';
import EditIcon from '@mui/icons-material/Edit';
import List from '@mui/material/List/List';
// import IonTrash from "../assets/ion_trash.svg";
import SaveChanges from './SaveChanges';
import ListItemText from '@mui/material/ListItemText';
// import Checkbox from '@mui/material/Checkbox';
import { useStylesGlobal, modalStyleExternal, modalStyleInternal } from '../Styles'
import { Data, DataCreateStockOptions, ColumnData, ProductUpdateData } from '../types';

// import { CategoriesContext } from '../context/CategoriesContext';
// import { MeasuresContext } from '../context/MeasuresContext';
import { UserContext } from '../context/UserContext';
import { IsLoadingContext } from '../context/IsLoadingContext';
import EditStock from './EditStock';
import ErrorModal from './ErrorModal';

// interface mainData {
//     id: number;
//     name: string;
//   }
//   interface emailsAlertData {
//       id: number;
//       email: string;
//     }


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
// const subCategoryArray: mainData[] = [
//     { id: 0, name: '-'},
//     { id: 1, name: 'Cutlery'},
//     { id: 2, name: 'Fruits'},
//     { id: 3, name: 'Chairs'},
// ];


// interface Category {
//     _id: string;
//     id: number;
//     name: string;
//     deleted: boolean;
//     createdAt: string;
//     updatedAt: string;
//     __v: number;
//     sub_categories: string[];
// }

// const emailsAlert: emailsAlertData[] = [
//     { id: 1, email: 'email1@test.com' },
//     { id: 2, email: 'email2@test.com'  },
//     { id: 3, email: 'email3@test.com'},
// ];

// const INITIAL_CREATESTOCK_OPTIONS = {
//     mainData: false,  
//     secondaryData: true,
//     alerts: true,    
//     customFields: true,
// }

interface ChildProps {
    open:  boolean
    handleClose: (newData: boolean) => void
    productUpdate:  ProductUpdateData 
}

export default function UpdateAmountStock( 
    {   open, 
        handleClose, 
        productUpdate,
    }: ChildProps) {
    // const { openSaveChanges, closeSaveChanges } = props;
    const { classes } = useStylesGlobal();
    const close = () => {
        handleClose(false)
    } 


    // console.log("productUpdate: ", productUpdate)
    // console.log("columnsCustom: ", columnsCustom)

    // const { categories } = useContext<any>(CategoriesContext) 
    // const { measures } = useContext<any>(MeasuresContext)
    const { user } = useContext<any>(UserContext)
    const { isLoading, setIsLoading, openBackdrop, setOpenBackdrop } = useContext<any>(IsLoadingContext)

    const [ valueUpdate, setValueUpdate ] = useState<number>(-1)
    const [ valueModuleUpdate, setValueModuleUpdate ] = useState<number>(1)

    const upValue = () => {
        let newValue = valueUpdate+1
        if(newValue===0)
            newValue = 1
        setValueUpdate(newValue)
        setValueModuleUpdate(Math.abs(newValue))
    }
    const downValue = () => {
        let newValue = valueUpdate-1
        if(newValue===0)
            newValue = -1
        setValueUpdate(newValue)
        setValueModuleUpdate(Math.abs(newValue))
    }
    const writeValue = (e:any) => {
        let newValue = (Number(e.target.value))
        setValueUpdate(newValue)
        setValueModuleUpdate(Math.abs(newValue))
    }
    const ButtonOperator = valueUpdate > 0 ? PlusButton : MinusButton;
    const swapOperator = () => {
        setValueUpdate(-valueUpdate)
    }

    const [openSaveChanges, setOpenSaveChanges] = useState(false);  
    const [openErrorModal, setOpenErrorModal] = useState(false);  
    const [errorData, setErrorData] = useState(""); 
    
    const handleCloseErrorModal = () => {
        setOpenErrorModal(false)
    }
    const handleCloseSaveChanges = (ans?:boolean) => {
        // console.log("ans: ", ans)   // If true should save the changes, if false shouldnt. In both cases has to close all the modals. If undefined should do nothing, just close the modal save changes
        if(ans){
            
            // console.log("stockNameTemp: ", ans)
            console.log("productUpdate.amount_prod: ", productUpdate.id_prod)
            console.log("valueUpdate: ", valueUpdate)
            console.log("productUpdate.amount_prod: ", productUpdate.amount_prod)
            const resultUpdated = productUpdate.amount_prod + valueUpdate
            console.log("Updated result: ", resultUpdated)
            
            const fetchUpdateStockProduct = async () => {
                let loadingSuccess: boolean = false
                try {
                    const response = await fetch(`http://localhost:4000/api/products/${productUpdate.id_prod}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json', // Set the appropriate content-type for my API
                            // Add any other requires headers here
                        },
                        body:JSON.stringify({
                            "amount": resultUpdated,

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
    const handleOpenSaveChanges = () => setOpenSaveChanges(true);
    
    
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
                    />
                     {/* <ErrorModal
                        openErrorModal={openErrorModal}
                        closeErrorModal={handleCloseErrorModal}
                        errorData={errorData} 
                    /> */}
                    <Box className={`${classes.customBoxColumn} ${classes.updateBoxColumn}`}>
                    <Typography variant="h5">{productUpdate.name_prod}</Typography>
                    
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
                                    {productUpdate.amount_prod}
                                </Typography>
                            </Grid>
                            <Grid item xs={3} md={8} display="flex" justifyContent="center" > 
                                <ButtonOperator
                                    sizeIcoExt="50px !important"
                                    sizeIcoInt="57px !important"
                                    colorIco = "white"  // Fix color
                                    clicked={() => swapOperator()}
                                />
                            </Grid>
                            <Grid item xs={3} md={8} display="flex" justifyContent="center" >
                                <TextField
                                    maxRows={1}
                                    size="small"
                                    type="number"
                                    className={`${classes.inputMainData} ${classes.inputUpdateAmountStock}`}
                                    value={valueModuleUpdate}
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
                                    {productUpdate.measure_prod}
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
                        open={false} 
                        handleClose={function (newData: boolean): void {
                            throw new Error('Function not implemented.');
                        } } 
                        // data={[]} 
                        // columnsCustom={[]}                    
                    />
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