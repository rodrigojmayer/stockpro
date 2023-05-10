import React from 'react'
import { useState, useEffect } from 'react'
import { makeStyles } from 'tss-react/mui';
import Box from '@mui/material/Box';
import { Container, Typography, Grid } from '@mui/material';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper/Paper';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"

import { OkButton, CancelButton } from './Buttons';
import {  IconButton  } from '@mui/material';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import ControlPointTwoToneIcon from '@mui/icons-material/ControlPointTwoTone';
import List from '@mui/material/List/List';


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
    finishButtons: {
        display: "flex",
        justifyContent:  "center",
        gap: 30,
        margin: "20px",
    }
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
    width: "calc(100% - 32px)",
    height: "520px",
    backgroundColor: "rgb(45,72, 91, 1)",
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
}
interface ChildProps {
    open:  boolean
    handleClose: (newData: boolean) => void
    columns: ColumnData[]
}

export default function Fields({ open, handleClose, columns }: ChildProps) {

    const { classes } = useStyles()
    const close = () => {
        handleClose(false)
    }

    const [orderedFields, setOrderedFields] = useState(columns)
    const [unsetFields, setUnsetFields] = useState<ColumnData[]>([])                               
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
                                            {orderedFields.map((column, index) => (
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
                                            ))}
                                            {provided.placeholder} 
                                        </List>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </Grid>
                        <Grid item xs={6} >
                            <List
                            className={classes.table}>
                                {unsetFields.map((column, index) => (
                                    <Paper
                                    className={classes.buttonFields}>
                                        <Typography noWrap>
                                            {column.label}
                                        </Typography>  
                                        <IconButton
                                        className={classes.plusIcon}
                                        onClick={addField}
                                        id="plusButton"
                                        value={column.id}>
                                            <ControlPointTwoToneIcon/>
                                        </IconButton>
                                    </Paper>
                                ))}
                            </List>
                        </Grid>
                    </Grid>
                    <Box className={classes.finishButtons}>
                        <CancelButton/>
                        <OkButton/>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}