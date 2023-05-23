import { useState, useEffect } from 'react'
import { makeStyles } from 'tss-react/mui';
import { Box,
         Container,
         Grid,
         IconButton,
         Modal, 
         TextField,
         Typography,
        } from '@mui/material';
import Paper from '@mui/material/Paper/Paper';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"

import { OkButton,
         CancelButton, 
         PlusButton,
        } from './Buttons';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import ControlPointTwoToneIcon from '@mui/icons-material/ControlPointTwoTone';
import EditIcon from '@mui/icons-material/Edit';
import List from '@mui/material/List/List';
import IonTrash from "../assets/ion_trash.svg";
import SaveChanges from './SaveChanges';


const useStyles = makeStyles()({
    table: {
        width: "calc(100% - 6px)",
        margin: "3px",
        padding: "6px 0",
        borderRadius: "10px",
        backgroundColor: "rgb(69, 144, 186)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    buttonsGroup: {
        width: "100%",
        height: "100%",
    },
    buttonFields: {
        backgroundColor: "white",
        width: "calc(100% - 12px)",
        margin: "9px",
        paddingLeft: "8px",
        height: "32px",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        
    },
    page: {
        display: "inline-block",
        margin: "2%",
        width: "30%",
        height: "30%",
        backgroundColor: "white",
    },
    dropped_widget: {
        color: "red",
    },
    backPlus: {
        color: "rgb(255, 47, 47, 1)",
        width: "32px", 
        height: "32px",
        '& svg': {
            width: "32px", 
            height: "32px",
        }
    },
    plusIcon: {
        color: "rgb(32, 205, 60, 1)",
        width: "32px", 
        height: "32px",
        '& svg': {
            width: "32px", 
            height: "32px",
        }
    },
    customBoxColumn: {
        display: "flex",
        flexDirection: "column",
    },
    customBoxRow: {
        display: "flex",
        justifyContent:  "center",
        alignItems: "center",
        gap: 6,
    },
    editIcon: {
        width: "32px", 
        height: "32px",
        marginBottom: "6px"
    },
    newCustomField: {
        backgroundColor: "white",
        borderRadius: 10,
        minWidth: "150px",
        width: "40%",
        maxWidth: "250px",
    },
    ionTrash:{
        color: "rgb(255, 47, 47, 1)",
        padding: "0",
        marginBottom: "4px",
        width: "37px", 
        height: "37px",
        '& img': {
            width: "37px", 
            height: "37px",
        },
    },
    finishButtons: {
        display: "flex",
        justifyContent:  "center",
        gap: 20,
        margin: "20px",
    },
    show: {
        display: "block",
    },
    hide: {
        // display: "none",
        visibility: "hidden"
    },
})

const style = {
    position: 'absolute',
    display: "flex",
    justifyContent: "center",
    top: 74,
    width: "100%",
    overflowX: "hidden",
};
const style2 = {
    top: 74,
    maxWidth: "700px",
    width: "calc(100% - 32px)",
    maxHeight: "520px",
    // height: "520px",
    backgroundColor: "rgb(45,72, 91, 1)",
    borderRadius: "10px",
    margin: "auto",
    padding: "3px",
    color: "white",
    overflow: "scroll",
    overflowX: "hidden",

};


interface ColumnData {
    id: number;
    dataKey: string;
    label: string;
    numeric?: boolean;
    width: number;
    id_client?: number;
    deleted: boolean;
}
interface ChildProps {
    open:  boolean
    handleClose: (newData: boolean) => void
    // columns: ColumnData[]
    columnsDefault: ColumnData[]
    columnsCustom: ColumnData[]
    idColumnsTableOrder: Number[]
    // columnsHiddenFields: ColumnData[]
}
interface ColumnDataCustom {
    id: number;
    dataKey: string;
    label: string;
    numeric?: boolean;
    width: number;
    id_client?: number;
    deleted: boolean;
    okButtonShow: boolean;
}

export default function Fields({ open, handleClose, columnsDefault, columnsCustom, idColumnsTableOrder }: ChildProps) {

    const { classes } = useStyles()
    const close = () => {
        handleClose(false)
    }
    // const columns: ColumnData[] = columnsDefault.concat(columnsCustom).filter(column => !(column.deleted));
    const columns: ColumnData[] = columnsDefault.concat(columnsCustom);
    // const columns= allColumns.filter(column => !(column.deleted));

    const columnsTableOrder = columns.filter((col) => {
        if(idColumnsTableOrder.includes(col.id))
            return col
    })
    const columnsHiddenFields =  columns.filter((col) => {
        if(!columnsTableOrder.includes(col))
            return col
    })
    // const columnsCustomNew = JSON.parse(JSON.stringify(columnsCustom))
    const columnsCustomNew: ColumnDataCustom[] = columnsCustom
    // .filter((obj) => !(obj.deleted))
    .map((obj) => ({...obj, okButtonShow: false}));

    // const columnsCustomNew: ColumnData[]= [...columnsCustom]
    const [orderedFields, setOrderedFields] = useState(columnsTableOrder)
    const [orderedFieldsTemp, setOrderedFieldsTemp] = useState(columnsTableOrder)
    const [unsetFields, setUnsetFields] = useState<ColumnData[]>([...columnsHiddenFields]) 
    const [unsetFieldsTemp, setUnsetFieldsTemp] = useState<ColumnData[]>([...columnsHiddenFields])  
    const [customFields, setCustomFields] = useState<ColumnDataCustom[]>(columnsCustomNew) 
    const [customFieldsTemp, setCustomFieldsTemp] = useState<ColumnDataCustom[]>(columnsCustomNew) 
    const [customFieldsNew, setCustomFieldsNew] = useState<ColumnDataCustom[]>(columnsCustomNew)
    const [customFieldsNewTemp, setCustomFieldsNewTemp] = useState<ColumnDataCustom[]>(columnsCustomNew)
    
    // const [okButtonShow, setOkButtonShow] = useState(okButton)  

                                 
    const removeField = (e: React.MouseEvent<HTMLButtonElement>)  => {
        let orderedArray = Array.from(orderedFieldsTemp)
        const unsetArray = Array.from(unsetFieldsTemp)
        const fieldToRemove = orderedFieldsTemp.find(o => o.id == parseInt(e.currentTarget.value))
        if (fieldToRemove) {
            orderedArray = orderedArray.filter(function(item) {
                return item !== fieldToRemove
            })
            unsetArray.push(fieldToRemove)
        }
        setOrderedFieldsTemp(orderedArray)
        unsetArray.sort((a,b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0))
        setUnsetFieldsTemp(unsetArray)
    }
    const addField = (e: React.MouseEvent<HTMLButtonElement>)  => {
        const orderedArray = Array.from(orderedFieldsTemp)
        let unsetArray = Array.from(unsetFieldsTemp)
        // console.log("parseInt: ", String(1.01) )
        // console.log("Number: ", Boolean("2.2"))
        const fieldToAdd = unsetArray.find(o => o.id == parseInt(e.currentTarget.value))
        if (fieldToAdd) {
            unsetArray = unsetArray.filter(function(item) {
                return item !== fieldToAdd
            })
            orderedArray.push(fieldToAdd)
        }
        setOrderedFieldsTemp(orderedArray)
        unsetArray.sort((a,b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0))
        setUnsetFieldsTemp(unsetArray)
    }
    const handleDragEnd = (result: any) => {
        if (!result.destination) return;
        const items = Array.from(orderedFieldsTemp);
        const [reorderData] = items.splice(result.source.index,1);
        items.splice(result.destination.index, 0, reorderData);
        setOrderedFieldsTemp(items)
    }
    
    const handleEditCustomFieldNew = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log("event.currentTarget.id: ", event.currentTarget.id)
        // console.log("event.currentTarget.value: ", event.currentTarget.value)
        // console.log("isNaN('w'): ", isNaN(NaN))
        // setCustomFieldsTemp({...customFieldsTemp, event.currentTarget.value})
            const index = customFieldsNewTemp.findIndex((field: { id: number }) => field.id === Number(event.currentTarget.id))
            if(index !== -1) {
                const updateFieldsNew = JSON.parse(JSON.stringify(customFieldsNewTemp))
                updateFieldsNew[index].label = event.currentTarget.value
                // console.log("updateFieldsNew[index].label: ", updateFieldsNew[index].label)
                // console.log("customFieldsTemp[index].label: ", customFieldsTemp[index].label)
                if(customFieldsTemp[index]){
                    if(updateFieldsNew[index].label == customFieldsTemp[index].label || updateFieldsNew[index].label == '')
                        updateFieldsNew[index].okButtonShow = false
                    else
                        updateFieldsNew[index].okButtonShow = true
                }else if(updateFieldsNew[index].label !='' ){
                    updateFieldsNew[index].okButtonShow = true
                }else if (updateFieldsNew[index].label ==='' ){
                    updateFieldsNew[index].okButtonShow = false
                }
                setCustomFieldsNewTemp(updateFieldsNew)
            }
    }
    const saveCustomField = (id:number, label: string) => {
        // console.log("id: ", id)
        // console.log("label: ", label)
        const updateFields = [...customFieldsTemp]
        const updateFieldsNew = [...customFieldsNewTemp]
        const updateOrderedFieldsTemp = [...orderedFieldsTemp]
        const updateUnsetFieldsTemp = [...unsetFieldsTemp]
        let index = customFieldsTemp.findIndex(field => field.id === id)
        let indexOrdered = orderedFieldsTemp.findIndex(field => field.id === id)
        let indexUnset = unsetFieldsTemp.findIndex(field => field.id === id)
        // console.log("index: ", index)
        // console.log("updateFields: ", updateFields)
        if(index !== -1){
            
            // console.log("updateFields[index].label: ", updateFields[index].label)
            updateFields[index].label = label
            if(indexOrdered !== -1){
                updateOrderedFieldsTemp[indexOrdered].label = label
                setOrderedFieldsTemp(updateOrderedFieldsTemp)
            }
            if(indexUnset !== -1){
                updateUnsetFieldsTemp[indexUnset].label = label
                setUnsetFieldsTemp(updateUnsetFieldsTemp)
            }
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
            updateUnsetFieldsTemp.push(newObj)
            setUnsetFieldsTemp(updateUnsetFieldsTemp)
            // setUnsetFieldsTemp([...unsetFieldsTemp, newObj])
            // console.log("updateFields: ", updateFields)
        }

        console.log("updateFields: ", updateFields)
            
        // console.log("customFieldsNewTemp[index].label: ", updateFields[index].label)
        setCustomFieldsTemp(updateFields)
        updateFieldsNew[index].okButtonShow = false
        setCustomFieldsNewTemp(updateFieldsNew)
    }

    const deleteField = (id:number) => {
        // console.log("customFieldsNewTemp: ", customFieldsNewTemp)
        // const updateFields = [...customFieldsTemp]
        const updateFields = [...customFieldsTemp.map(obj => ({ ...obj }))]
        // const updateFieldsNew = [...customFieldsNewTemp]
        const updateFieldsNew = [...customFieldsNewTemp.map(obj => ({ ...obj }))]
        // const updateOrderedFieldsTemp = [...orderedFieldsTemp]
        const updateOrderedFieldsTemp = [...orderedFieldsTemp.map(obj => ({ ...obj }))]
        // const updateUnsetFieldsTemp = [...unsetFieldsTemp]
        const updateUnsetFieldsTemp = [...unsetFieldsTemp.map(obj => ({ ...obj }))]
        let index = customFieldsTemp.findIndex(field => field.id === id)
        let indexOrdered = orderedFieldsTemp.findIndex(field => field.id === id)
        let indexUnset = unsetFieldsTemp.findIndex(field => field.id === id)
        if (index !== -1) {
            updateFields[index].deleted = true
            setCustomFieldsTemp(updateFields)
            updateFieldsNew[index].deleted = true
            // console.log("customFieldsTemp: ", customFieldsTemp) 
            if(indexOrdered !== -1){
                updateOrderedFieldsTemp[indexOrdered].deleted = true
                setOrderedFieldsTemp(updateOrderedFieldsTemp)
            }
            if(indexUnset !== -1){
                // console.log("unsetFieldsDelete5: ", unsetFields[2].deleted)
                updateUnsetFieldsTemp[indexUnset].deleted = true
                // console.log("unsetFieldsDelete4: ", unsetFields[2].deleted)
                setUnsetFieldsTemp(updateUnsetFieldsTemp)
                // console.log("unsetFieldsDelete3: ", unsetFields[2].deleted)
            }
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
        const updateFieldsNew = [...customFieldsNewTemp, {id:nextId, dataKey: "", label: "", width: 100, id_client: 2, deleted: false, okButtonShow: false}]

        

        // updateFieldsNew[index].label = event.currentTarget.value
        // console.log("updateFieldsNew[index].label: ", updateFieldsNew[index].label)
        // console.log("customFieldsTemp[index].label: ", customFieldsTemp[index].label)
        // if(updateFieldsNew[index].label != customFieldsTemp[index].label)
        //     updateFieldsNew[index].okButtonShow = true
        // else
        //     updateFieldsNew[index].okButtonShow = false
        
        console.log("updateFieldsNew: ", updateFieldsNew)

        setCustomFieldsNewTemp(updateFieldsNew)
    }

    const [openSaveChanges, setOpenSaveChanges] = useState(false);  
    const handleCloseSaveChanges = (ans?:boolean) => {
        console.log("ans: ", ans)   // If true should save the changes, if false shouldnt. In both cases has to close all the modals. If undefined should do nothing, just close the modal save changes
        if(ans){
            setOrderedFields(orderedFieldsTemp)
            setUnsetFields(unsetFieldsTemp)
            setCustomFields(customFieldsTemp)
            setCustomFieldsNew(customFieldsNewTemp)
            
            close()
        }
        setOpenSaveChanges(false);
    }
    const handleOpenSaveChanges = () => setOpenSaveChanges(true);

    useEffect(() => {

        // console.log("orderedFieldsEffect: ", orderedFields)

        // console.log("unsetFieldsEffect: ", unsetFields)
        console.log("unsetFieldsDelete: ", unsetFields[2].deleted)

        // console.log("customFieldsEffect: ", customFields)
        // console.log("customFieldsNewEffect: ", customFieldsNew)
        // console.log("idColumnsTableOrder: ", idColumnsTableOrder)
        // console.log("customFieldsNewTemp: ", customFieldsNewTemp)
        setOrderedFieldsTemp(orderedFields)
        setUnsetFieldsTemp(unsetFields)
        setCustomFieldsTemp(customFields)
        setCustomFieldsNewTemp(customFieldsNew)
    // }, [open, customFields, customFieldsNew])
    }, [open])
    return (
        <Modal
        open={open} 
        onClose={close}> 
            <Box sx={style}>
                <Box sx={style2}>

                <SaveChanges
                    openSaveChanges={openSaveChanges}
                    closeSaveChanges={handleCloseSaveChanges} 

                />

                    <Typography align="center" variant="h5">
                        Fields
                    </Typography>
                    <Grid container>
                        <Grid item xs={6} >
                            <Typography align="center">
                                Table order
                            </Typography>
                        </Grid>
                        <Grid item xs={6} >
                            <Typography align="center">
                                Hidden fields
                            </Typography>
                        </Grid>
                        <Grid item xs={6} >
                            <DragDropContext 
                            // onDragStart={handleDragStart}
                            onDragEnd={handleDragEnd}>
                                <Droppable
                                droppableId="list">
                                    {(provided) => (
                                        <List
                                        className={classes.table}
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}>
                                            {orderedFieldsTemp.map((column, index) => {
                                                if (!column.deleted) {
                                                    return (
                                                        <Draggable 
                                                        key={column.id} 
                                                        draggableId={column.id.toString()} 
                                                        index={index}>
                                                            {(provided) => (
                                                                <Paper
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                elevation={2}
                                                                className={classes.buttonFields}>
                                                                    <Typography noWrap>
                                                                        {column.label}
                                                                    </Typography>
                                                                    <IconButton
                                                                    onClick={removeField}
                                                                    className={classes.backPlus}
                                                                    id="minusButton"
                                                                    value={column.id}>
                                                                        <RemoveCircleTwoToneIcon/>
                                                                    </IconButton>
                                                                </Paper>
                                                            )}
                                                        </Draggable>
                                                    )
                                                }
                                            })}
                                            {provided.placeholder} 
                                        </List>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </Grid>
                        <Grid item xs={6} >
                            <List
                            className={classes.table}
                            >
                                {unsetFieldsTemp.map((column) => {
                                    if (!column.deleted) {
                                        return (
                                            <Paper
                                            key={column.id} 
                                            className={classes.buttonFields}>
                                                <Typography noWrap>
                                                    {column.label}
                                                </Typography>  
                                                <IconButton
                                                className={classes.plusIcon}
                                                onClick={addField}
                                                id="plusButton"
                                                value={column.id}
                                                >
                                                    <ControlPointTwoToneIcon/>
                                                </IconButton>
                                            </Paper>
                                        )
                                    }
                                })}
                            </List>
                        </Grid>
                    </Grid>
                    <Box className={classes.customBoxColumn}>
                        <Box className={classes.customBoxRow}>
                            <Typography variant='h6'  >
                                Custom fields 
                            </Typography>
                            <EditIcon 
                            className={classes.editIcon}
                            />
                        </Box>
                            {customFieldsNewTemp.map((cusField: ColumnDataCustom) => {
                                if (!cusField.deleted) {
                                    return (
                                        <Box className={classes.customBoxRow}
                                        key={cusField.id}
                                        >
                                            <TextField
                                                id={String(cusField.id)}
                                                // id={column.dataKey.toString()}
                                                // id="filled-multiline-flexible"
                                                value={cusField.label}
                                                // onChange={handleFilterChange}
                                                onChange={ handleEditCustomFieldNew }
                                                maxRows={1}
                                                size="small"
                                                className={classes.newCustomField}
                                                InputProps={{
                                                    style: {
                                                    height:"34px",
                                                    borderRadius: 10,
                                                    },
                                                }}
                                            />
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
                                            <div className={cusField.okButtonShow ? classes.show : classes.hide}>
                                                <OkButton
                                                sizeIco={"34px"}
                                                roundedIco={true}
                                                cusField = {{id: cusField.id, value: cusField.label}}
                                                clicked={() => saveCustomField(cusField.id, cusField.label)}
                                                />
                                            </div>
                                        </Box>
                                    )
                                }
                            })}
                        <Box className={classes.customBoxRow}>
                            <PlusButton
                                sizeIco={"45px !important"}
                                clicked={addInputCustomField}
                            />
                        </Box>
                    </Box>
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