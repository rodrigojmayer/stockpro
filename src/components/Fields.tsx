import React from 'react'
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
    height: "520px",
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
    const [unsetFields, setUnsetFields] = useState(columnsHiddenFields)  
    const [customFields, setCustomFields] = useState(columnsCustom)  
    const [customFieldsNew, setCustomFieldsNew] = useState<ColumnDataCustom[]>(columnsCustomNew)  
    // const [okButtonShow, setOkButtonShow] = useState(okButton)  

                                 
    const removeField = (e: React.MouseEvent<HTMLButtonElement>)  => {
        let orderedArray = Array.from(orderedFields)
        const unsetArray = Array.from(unsetFields)
        const fieldToRemove = orderedFields.find(o => o.id == parseInt(e.currentTarget.value))
        if (fieldToRemove) {
            orderedArray = orderedArray.filter(function(item) {
                return item !== fieldToRemove
            })
            unsetArray.push(fieldToRemove)
        }
        setOrderedFields(orderedArray)
        unsetArray.sort((a,b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0))
        setUnsetFields(unsetArray)
    }
    const addField = (e: React.MouseEvent<HTMLButtonElement>)  => {
        const orderedArray = Array.from(orderedFields)
        let unsetArray = Array.from(unsetFields)
        // console.log("parseInt: ", String(1.01) )
        // console.log("Number: ", Boolean("2.2"))
        const fieldToAdd = unsetArray.find(o => o.id == parseInt(e.currentTarget.value))
        if (fieldToAdd) {
            unsetArray = unsetArray.filter(function(item) {
                return item !== fieldToAdd
            })
            orderedArray.push(fieldToAdd)
        }
        setOrderedFields(orderedArray)
        unsetArray.sort((a,b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0))
        setUnsetFields(unsetArray)
    }
    const handleDragEnd = (result: any) => {
        if (!result.destination) return;
        const items = Array.from(orderedFields);
        const [reorderData] = items.splice(result.source.index,1);
        items.splice(result.destination.index, 0, reorderData);
        setOrderedFields(items)
    }
    
    const handleEditCustomFieldNew = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log("event.currentTarget.id: ", event.currentTarget.id)
        // console.log("event.currentTarget.value: ", event.currentTarget.value)
        // console.log("isNaN('w'): ", isNaN(NaN))
        // setCustomFields({...customFields, event.currentTarget.value})
        const index = customFieldsNew.findIndex((field: { id: number }) => field.id === Number(event.currentTarget.id))
        if(index !== -1) {
            const updateFieldsNew = JSON.parse(JSON.stringify(customFieldsNew))
            updateFieldsNew[index].label = event.currentTarget.value
            // console.log("updateFieldsNew[index].label: ", updateFieldsNew[index].label)
            // console.log("customFields[index].label: ", customFields[index].label)
            if(customFields[index]){
                if(updateFieldsNew[index].label == customFields[index].label)
                    updateFieldsNew[index].okButtonShow = false
                else
                    updateFieldsNew[index].okButtonShow = true
            }else if(updateFieldsNew[index].label !='' ){
                updateFieldsNew[index].okButtonShow = true
            }else if (updateFieldsNew[index].label ==='' ){
                updateFieldsNew[index].okButtonShow = false
            }
            setCustomFieldsNew(updateFieldsNew)
        }
    }
    const saveCustomField = (id:number, label: string) => {
        const updateFields = [...customFields]
        const updateFieldsNew = [...customFieldsNew]
        let index = customFields.findIndex(field => field.id === id)
        if(index !== -1){
            
            updateFields[index].label = label
        }else{
            index = customFieldsNew.findIndex(field => field.id === id)
            const fieldsToOmit = ['okButtonShow']
            const newObj = Object.assign({}, customFieldsNew[index])
            fieldsToOmit.forEach(field => delete newObj[field as keyof ColumnDataCustom])
            updateFields.push(newObj)
            setUnsetFields([...unsetFields, newObj])
            // console.log("updateFields: ", updateFields)
        }

            
            setCustomFields(updateFields)
            updateFieldsNew[index].okButtonShow = false
            setCustomFieldsNew(updateFieldsNew)
            // console.log("customFields: ", customFields) 
        // }
    }

    const deleteField = (id:number) => {
        // console.log("id: ", id)
        const index = customFields.findIndex(field => field.id === id)
        if(index !== -1) {
            const updateFields = [...customFields]
            updateFields[index].deleted = true
            setCustomFields(updateFields)
            const updateFieldsNew = [...customFieldsNew]
            updateFieldsNew[index].deleted = true
            setCustomFieldsNew(updateFieldsNew)
            // console.log("customFields: ", customFields) 
        }
    }
    const addInputCustomField = () => {
        console.log("holis clickis", customFieldsNew.length)
        // const updateFieldsNew = JSON.parse(JSON.stringify(customFieldsNew))
        const lastObj = customFieldsNew[customFieldsNew.length - 1]
        const nextId = lastObj.id + 1
        const updateFieldsNew = [...customFieldsNew, {id:nextId, dataKey: "", label: "", width: 100, id_client: 2, deleted: false, okButtonShow: false}]

        

        // updateFieldsNew[index].label = event.currentTarget.value
        // console.log("updateFieldsNew[index].label: ", updateFieldsNew[index].label)
        // console.log("customFields[index].label: ", customFields[index].label)
        // if(updateFieldsNew[index].label != customFields[index].label)
        //     updateFieldsNew[index].okButtonShow = true
        // else
        //     updateFieldsNew[index].okButtonShow = false

        setCustomFieldsNew(updateFieldsNew)
    }

    useEffect(() => {

        // console.log("idColumnsTableOrder: ", idColumnsTableOrder)
        // console.log("customFieldsNew: ", customFieldsNew)
    }, [orderedFields, unsetFields, customFields, customFieldsNew])
    return (
        <Modal
        open={open} 
        onClose={close}> 
            <Box sx={style}>
                <Box sx={style2}>
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
                                            {orderedFields.map((column, index) => {
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
                                {unsetFields.map((column) => {
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
                            {customFieldsNew.map((cusField: ColumnDataCustom) => {
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
                                                clicked={( ) => saveCustomField(cusField.id, cusField.label)}
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
                        <CancelButton/>
                        <OkButton
                        clicked={() => console.log("qsy")}
                        />
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}