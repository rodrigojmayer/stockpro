import React, { useState, useEffect } from 'react';
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
         UpButton
        } from './Buttons';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import ControlPointTwoToneIcon from '@mui/icons-material/ControlPointTwoTone';
import EditIcon from '@mui/icons-material/Edit';
import List from '@mui/material/List/List';
import IonTrash from "../assets/ion_trash.svg";
import SaveChanges from './SaveChanges';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { useStylesGlobal, modalStyleExternal, modalStyleInternal } from '../styles'
import { Data, ColumnData, ColumnDataCustom } from '../types';


interface measureData {
    id: number;
    name: string;
}
interface emailsAlertData {
    id: number;
    email: string;
}
interface DataCustomValues {
    label: string;
    value: string;
}

interface ChildProps {
    hiddenPanel:  boolean
    // openOptionsCreate: (newData: string) => void
    openOptionsCreate: (newData: string )=> void
    columnsCustom: ColumnData[] 
    // stockCustomValuesTemp: DataCustomValues[] 
    stockCustomValuesTemp: string
    onStockCustomValuesTemp: (newData: string, name:string )=> void
    
}

export default function CreateStockCustomFields(
    {   hiddenPanel, 
        openOptionsCreate,
        columnsCustom,
        stockCustomValuesTemp,
        onStockCustomValuesTemp,
    }: ChildProps )  {
    const { classes } = useStylesGlobal();
    const close = () => {
        // handleClose(false)
    }
    const columns: ColumnData[] = columnsCustom;
    const columnsCustomNew: ColumnDataCustom[] = columnsCustom
    .map((obj) => {
        // console.log("obj: ", obj)
        return {...obj, okButtonShow: false, fieldRepeatedShow: false}
    });

    const [measure, setMeasure] = useState('');
    const [measureTemp, setMeasureTemp] = useState('');
    const [category, setCategory] = useState('');
    const [categoryTemp, setCategoryTemp] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [subCategoryTemp, setSubCategoryTemp] = useState('');
    
    
    // const [orderedFieldsTemp, setOrderedFieldsTemp] = useState(columnsTableOrder)
    const [customFields, setCustomFields] = useState<ColumnDataCustom[]>(columnsCustomNew) 
    const [customFieldsTemp, setCustomFieldsTemp] = useState<ColumnDataCustom[]>(columnsCustomNew) 
    const [customFieldsNew, setCustomFieldsNew] = useState<ColumnDataCustom[]>(columnsCustomNew)
    const [customFieldsNewTemp, setCustomFieldsNewTemp] = useState<ColumnDataCustom[]>(columnsCustomNew)
    const [addButtonShow, setAddButtonShow] = useState<boolean>(true)

    const [openSaveChanges, setOpenSaveChanges] = useState(false);  
    const handleCloseSaveChanges = (ans?:boolean) => {
        // console.log("ans: ", ans)   // If true should save the changes, if false shouldnt. In both cases has to close all the modals. If undefined should do nothing, just close the modal save changes
        if(ans){
            // setSelectedUsers(selectedUsersTemp)
            // setEmailsAlerts(emailsAlertsTemp.filter(emailAlert => { if(emailAlert.email != "") return emailAlert}))
            close()
        }
        setOpenSaveChanges(false);
    }
    const handleOpenSaveChanges = () => setOpenSaveChanges(true);
    
    // const addInputCustomField = () => {
    //     console.log("push the plus button yeah", columnsCustomNew )
    // }

    const handleEditCustomFieldNew = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log("event.currentTarget.id: ", event.currentTarget.id)
        // console.log("event.currentTarget.value: ", event.currentTarget.value)
        // console.log("isNaN('w'): ", isNaN(NaN))
        // setCustomFieldsTemp({...customFieldsTemp, event.currentTarget.value})
        
        const index = customFieldsNewTemp.findIndex((field: { id: number }) => field.id === Number(event.currentTarget.id))
        // if(index !== -1) {
            const updateFieldsNew = JSON.parse(JSON.stringify(customFieldsNewTemp))
            updateFieldsNew[index].label = event.currentTarget.value
            // console.log("updateFieldsNew[index].label: ", updateFieldsNew[index].label)
            // console.log("customFieldsTemp[index].label: ", customFieldsTemp[index].label)
            
            const updateDefectFieldsRepeated = columns.filter((col) => {
                if(((col.label).toLowerCase()) == (event.currentTarget.value).toLowerCase() && !col.deleted && col.id !== updateFieldsNew[index].id)
                    return col
            })
            const updateCustomFieldsRepeated = customFieldsNew.filter((col) => {
                if(((col.label).toLowerCase()) == (event.currentTarget.value).toLowerCase() && !col.deleted && col.id !== updateFieldsNew[index].id)
                    return col
            })
            const updateCustomFieldsTempRepeated = customFieldsNewTemp.filter((col) => {
                if(((col.label).toLowerCase()) == (event.currentTarget.value).toLowerCase() && !col.deleted && col.id !== updateFieldsNew[index].id)
                    return col
            })
            if(updateDefectFieldsRepeated[0] || updateCustomFieldsRepeated[0] || updateCustomFieldsTempRepeated[0]){
                console.log("updateDefectFieldsRepeated: ", updateDefectFieldsRepeated)
                console.log("updateCustomFieldsRepeated: ", updateCustomFieldsRepeated)
                updateFieldsNew[index].fieldRepeatedShow = true
                updateFieldsNew[index].okButtonShow = false
                setAddButtonShow(false)
            }else{
                updateFieldsNew[index].fieldRepeatedShow = false
                setAddButtonShow(true)
                if(customFieldsTemp[index]){
                    if(updateFieldsNew[index].label == customFieldsTemp[index].label || updateFieldsNew[index].label == ''){
                        updateFieldsNew[index].okButtonShow = false
                        setAddButtonShow(true)
                    }
                    else{
                        updateFieldsNew[index].okButtonShow = true
                        setAddButtonShow(false)
                    }
                }else if(updateFieldsNew[index].label !='' ){
                    updateFieldsNew[index].okButtonShow = true
                    setAddButtonShow(false)
                }else if (updateFieldsNew[index].label ==='' ){
                    updateFieldsNew[index].okButtonShow = false
                    setAddButtonShow(true)
                }
            }
            setCustomFieldsNewTemp(updateFieldsNew)
        // }
    }

    const saveCustomField = (id:number, label: string) => {
        // console.log("label: ", label)
        // const updateFields = [...customFieldsTemp]
        const updateFields = [...customFieldsTemp.map(obj => ({ ...obj }))]
        // const updateFieldsNew = [...customFieldsNewTemp]
        const updateFieldsNew = [...customFieldsNewTemp.map(obj => ({ ...obj }))]
        // const updateOrderedFieldsTemp = [...orderedFieldsTemp]
        // const updateOrderedFieldsTemp = [...orderedFieldsTemp.map(obj => ({ ...obj }))]
        // const updateUnsetFieldsTemp = [...unsetFieldsTemp]
        // const updateUnsetFieldsTemp = [...unsetFieldsTemp.map(obj => ({ ...obj }))]
        let index = customFieldsTemp.findIndex(field => field.id === id)
        // let indexOrdered = orderedFieldsTemp.findIndex(field => field.id === id)
        // let indexUnset = unsetFieldsTemp.findIndex(field => field.id === id)
        // console.log("index: ", index)
        // console.log("updateFields: ", updateFields)
        if(index !== -1){
            
            // console.log("updateFields[index].label: ", updateFields[index].label)
            updateFields[index].label = label
            // if(indexOrdered !== -1){
            //     updateOrderedFieldsTemp[indexOrdered].label = label
            //     setOrderedFieldsTemp(updateOrderedFieldsTemp)
            // }
            // if(indexUnset !== -1){
            //     updateUnsetFieldsTemp[indexUnset].label = label
            //     setUnsetFieldsTemp(updateUnsetFieldsTemp)
            // }
        }else{
            index = customFieldsNewTemp.findIndex(field => field.id === id)
            // console.log("customFieldsNewTemp: ", customFieldsNewTemp)
            // console.log("index2: ", index)
            // console.log("id: ", id)
            const fieldsToOmit = ['okButtonShow']
            const newObj = Object.assign({}, customFieldsNewTemp[index])
            // console.log("newObj: ", newObj)
            fieldsToOmit.forEach(field => delete newObj[field as keyof ColumnDataCustom])
            updateFields.push(newObj)
            // updateUnsetFieldsTemp.push(newObj)
            // setUnsetFieldsTemp(updateUnsetFieldsTemp)
            // setUnsetFieldsTemp([...unsetFieldsTemp, newObj])
            // console.log("updateFields: ", updateFields)
        }

        // console.log("updateFields: ", updateFields)
            
        // console.log("customFieldsNewTemp[index].label: ", updateFields[index].label)
        setCustomFieldsTemp(updateFields)
        updateFieldsNew[index].okButtonShow = false
        setAddButtonShow(true)
        setCustomFieldsNewTemp(updateFieldsNew)
    }
    const deleteField = (id:number) => {
        // console.log("customFieldsNewTemp: ", customFieldsNewTemp)
        // const updateFields = [...customFieldsTemp]
        const updateFields = [...customFieldsTemp.map(obj => ({ ...obj }))]
        // const updateFieldsNew = [...customFieldsNewTemp]
        const updateFieldsNew = [...customFieldsNewTemp.map(obj => ({ ...obj }))]
        // const updateOrderedFieldsTemp = [...orderedFieldsTemp]
        // const updateOrderedFieldsTemp = [...orderedFieldsTemp.map(obj => ({ ...obj }))]
        // const updateUnsetFieldsTemp = [...unsetFieldsTemp]
        // const updateUnsetFieldsTemp = [...unsetFieldsTemp.map(obj => ({ ...obj }))]
        let index = customFieldsTemp.findIndex(field => field.id === id)
        // let indexOrdered = orderedFieldsTemp.findIndex(field => field.id === id)
        // let indexUnset = unsetFieldsTemp.findIndex(field => field.id === id)
        if (index !== -1) {
            updateFields[index].deleted = true
            setCustomFieldsTemp(updateFields)
            updateFieldsNew[index].deleted = true
            // console.log("customFieldsTemp: ", customFieldsTemp) 
            // if(indexOrdered !== -1){
            //     updateOrderedFieldsTemp[indexOrdered].deleted = true
            //     setOrderedFieldsTemp(updateOrderedFieldsTemp)
            // }
            // if(indexUnset !== -1){
            //     // console.log("unsetFieldsDelete5: ", unsetFields[2].deleted)
            //     updateUnsetFieldsTemp[indexUnset].deleted = true
            //     // console.log("unsetFieldsDelete4: ", unsetFields[2].deleted)
            //     setUnsetFieldsTemp(updateUnsetFieldsTemp)
            //     // console.log("unsetFieldsDelete3: ", unsetFields[2].deleted)
            // }
            // console.log("unsetFieldsDelete2: ", unsetFields[2].deleted)
        } else {
            index = customFieldsNewTemp.findIndex(field => field.id === id)
            updateFieldsNew.splice(index, 1)

        }
        // console.log("unsetFieldsDelete1: ", unsetFields[2].deleted)
        setCustomFieldsNewTemp(updateFieldsNew)
        
        // console.log("unsetFieldsDelete: ", unsetFields[2])
        // console.log("unsetFieldsDelete: ", unsetFields[2].deleted)
    }
    const addInputCustomField = () => {
        console.log("holis clickis", customFieldsNewTemp.length)
        // const updateFieldsNew = JSON.parse(JSON.stringify(customFieldsNewTemp))
        const lastObj = customFieldsNewTemp[customFieldsNewTemp.length - 1]
        const nextId = lastObj.id + 1
        const updateFieldsNew = [...customFieldsNewTemp, {id:nextId, dataKey: "", label: "", width: 100, id_client: 2, deleted: false, okButtonShow: false, fieldRepeatedShow:false}]

        

        // updateFieldsNew[index].label = event.currentTarget.value
        // console.log("updateFieldsNew[index].label: ", updateFieldsNew[index].label)
        // console.log("customFieldsTemp[index].label: ", customFieldsTemp[index].label)
        // if(updateFieldsNew[index].label != customFieldsTemp[index].label)
        //     updateFieldsNew[index].okButtonShow = true
        // else
        //     updateFieldsNew[index].okButtonShow = false
        
        console.log("updateFieldsNew: ", updateFieldsNew)

        setCustomFieldsNewTemp(updateFieldsNew)
        setAddButtonShow(false)
    }
    // const addInputCustomField = () => {
    //     // console.log("holis clickis", customFieldsNewTemp.length)
    //     // const updateFieldsNew = JSON.parse(JSON.stringify(customFieldsNewTemp))
    //     const lastObj = emailsAlertsTemp[emailsAlertsTemp.length - 1]
    //     const nextId = lastObj.id + 1
    //     const updateEmailsAlertsTemp = [...emailsAlertsTemp, {id:nextId, email: ""}]
    //     // updateFieldsNew[index].label = event.currentTarget.value
    //     // console.log("updateFieldsNew[index].label: ", updateFieldsNew[index].label)
    //     // console.log("customFieldsTemp[index].label: ", customFieldsTemp[index].label)
    //     // if(updateFieldsNew[index].label != customFieldsTemp[index].label)
    //     //     updateFieldsNew[index].okButtonShow = true
    //     // else
    //     //     updateFieldsNew[index].okButtonShow = false
        
    //     // console.log("updateEmailsAlertsTemp: ", updateEmailsAlertsTemp)

    //     setEmailsAlertsTemp(updateEmailsAlertsTemp)
    //     // setAddButtonShow(false)
    // }

    const handleHiddenOptions = (changeTo:string) =>  {
        openOptionsCreate(changeTo)
    }
    // console.log("stockCustomValuesTemp: ", stockCustomValuesTemp)
    // console.log("stockCustomValuesTemp[0]: ", stockCustomValuesTemp[0])
    // console.log("stockCustomValuesTemp[0].label: ", stockCustomValuesTemp[0].label)
    // useEffect(() => {
        

    // }, [ ])
    
    return (
        <div
        hidden= {hiddenPanel}
        >
            <Typography align='center' variant='h6'>Custom fields</Typography>
            <Box className={classes.customBoxColumn}>
                
                {customFieldsNewTemp.map((cusField: ColumnDataCustom) => {
                    if (!cusField.deleted) {
                        return (
                            <Box className={classes.customBoxRow}
                            key={cusField.id}
                            >
                                {/* {cusField.label} */}
                                <TextField
                                    label={cusField.label}
                                    // id={column.dataKey.toString()}
                                    // id="filled-multiline-flexible"
                                    // value={cusField.label}
                                    // onChange={ handleEditCustomFieldNew }
                                    // maxRows={1}
                                    size="small"
                                    className={classes.inputMainData}
                                    value={stockCustomValuesTemp[cusField.dataKey]}
                                    onChange={ (event) => onStockCustomValuesTemp(event.target.value, cusField.dataKey) }
                                    // className={classes.newCustomField}
                                    // className={classes.inputMainData} 
                                    InputProps={{
                                        style: {
                                        // height:"36px",
                                        borderRadius: 10,
                                        },
                                    }}
                                />
                                {/* <Box className={classes.customBoxCenter}> 
                                    <IconButton
                                    className={classes.ionTrash}
                                    onClick={() => deleteField(cusField.id)}
                                    // id="plusButton"
                                    // value={column.id}
                                    >
                                        <img 
                                        src={IonTrash} 
                                        alt="Trash"
                                        />
                                    </IconButton>
                                </Box>
                                <div className={`${classes.customBoxCenter} ${classes.hideShowSpace} `}> 
                                    <div className={cusField.okButtonShow ? classes.show : classes.hide}>
                                        <OkButton
                                        sizeIco={"34px"}
                                        roundedIco={true}
                                        cusField = {{id: cusField.id, value: cusField.label}}
                                        clicked={() => saveCustomField(cusField.id, cusField.label)}
                                        />
                                    </div>
                                    <div className={cusField.fieldRepeatedShow ? classes.show : classes.hide}>
                                        Field repeated
                                    </div>
                                </div> */}
                            </Box>
                        )
                    }
                })}
                {/* <Box className={classes.customBoxRow}>
                    <div className={(addButtonShow? "" : classes.hide)}>
                        <PlusButton
                            clicked={addInputCustomField}
                        />
                    </div>
                </Box>  */}
                <Box className={`${classes.customBoxRow} ${classes.customBoxRowArrowButton} `}>
                    <div className={classes.customBoxCenter}>
                        <UpButton
                            direction="left"
                            clicked={() => handleHiddenOptions("alerts")}
                        />
                        <Typography align="left" sx={{ width: "95px" }}>Alerts</Typography>
                    
                    <Typography align="right" sx={{ width: "169px" }}></Typography>
                    </div>
                </Box>
            </Box>
            
        </div>
    )
}