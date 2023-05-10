import React from 'react'
import { useState, useEffect } from 'react'
import { makeStyles } from 'tss-react/mui';
// import MenuList from '@mui/material/MenuList/MenuList';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Container, Typography, Grid } from '@mui/material';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper/Paper';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"

import { PlusButton, MinusButton } from './Buttons';
import List from '@mui/material/List/List';
import { ListItem } from 'material-ui';
// import ButtonGroup from '@mui/material/ButtonGroup';


const useStyles = makeStyles()({
    table: {
        // position: "absolute",
        // bottom: 48,
        // zIndex: 500,
        width: "calc(100% - 6px)",
        height: "100%",
        margin: "3px",
        padding: "6px 0",
        // backgroundColor: "red !important"
        backgroundColor: "rgb(69, 144, 186)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        gap: "9px",
        
    },
    buttonsGroup: {
        width: "100%",
        height: "100%",
    },
    buttonFields: {
        backgroundColor: "white",
        width: "calc(100% - 12px)",
        // width: "auto",
        // margin: "8px",
        height: "32px",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "space-between",
        '&  svg': {
            // color: "red !important",
        }
        
    },


    widgets: {

    },
    widget: {

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
})

const style = {
    position: 'absolute',
    display: "flex",
    justifyContent: "center",
    // left: "50%",
    // transform: "translate(-50%, 0%)",
    top: 74,
    width: "100%",
    height: "70%",
    // backgroundColor: "rgb(45,72, 91, 1)",
    // margin: "auto",
    // padding: "3px",
    
    // color: "white",
};
const style2 = {
    // position: 'absolute',
    // display: "flex",
    // justifyContent: "center",
    // left: "50%",
    // transform: "translate(-50%, 0%)",
    top: 74,
    width: "calc(100% - 32px)",
    height: "70%",
    backgroundColor: "rgb(45,72, 91, 1)",
    margin: "auto",
    padding: "3px",
    
    color: "white",
};

type Data = {
    id: number;
    product: string;
    amount: number;
    unit: string;
    category: string;
    sub_category: string;
  }
interface ColumnData {
    dataKey: keyof Data
    label: string
    numeric?: boolean
    width: number
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



    useEffect(() => {
        console.log("Fields columns: ", columns)
        
    }, [])



    // const [widgets, setWidgets] = useState<string[]>([]);
    // const [widgets2, setWidgets2] = useState<string[]>([]);

    // function handleOnDrag(e: React.DragEvent, widgetType: string) {
    //     e.dataTransfer.setData("widgetType", widgetType);
    // }

    // function handleOnDrop(e: React.DragEvent) {
    //     const widgetType = e.dataTransfer.getData("widgetType") as string;
    //     console.log("widgetType", widgetType);
    //     setWidgets([...widgets, widgetType]);
    // }

    // function handleDragOver(e: React.DragEvent) {
    //     e.preventDefault();
    //     console.log("drag over")
    // }
    // function handleOnDrag2(e: React.DragEvent, widgetType: string) {
    //     e.dataTransfer.setData("widgetType", widgetType);
    // }

    // function handleOnDrop2(e: React.DragEvent) {
    //     const widgetType = e.dataTransfer.getData("widgetType") as string;
    //     console.log("widgetType", widgetType);
    //     setWidgets([...widgets2, widgetType]);
    // }

    // function handleDragOver2(e: React.DragEvent) {
    //     e.preventDefault();
    //     console.log("drag over")
    // }

    const handleDragEnd = () => {
        console.log("testin")
    }


    return (
        <Modal
            open={open} 
            onClose={close}
        > 
            <Box sx={style}>
                <Box sx={style2}>
                
                    {/* <Typography align="center" variant="h5">
                        Fields
                    </Typography>

                    <Grid container>
                <Grid item xs={6} >
                    <Typography align="center" >
                        Table order
                    </Typography>
                </Grid>
                <Grid item xs={6} >
                </Grid>
                <Grid item xs={6} >
                    <Box className={classes.table}>
                        {columns.map((column) => (
                            <Button
                            key={column.dataKey} 
                            className={classes.buttonFields}
                            endIcon={<MinusButton />}
                            >
                                {column.label}
                            </Button>
                        ))}

                    </Box>
                </Grid>
                <Grid item xs={6} >
                    <Box className={classes.table}>
                    {columns.map((column) => (
                            <Button
                            key={column.dataKey} 
                            className={classes.buttonFields}
                            endIcon={<PlusButton />}
                            >
                                {column.label}
                            </Button>
                        ))}
                    </Box>
                </Grid>
                </Grid> */}


                <Typography align="center" variant="h5">
                    Fields
                </Typography>
                                <Grid container>
                                    <Grid item xs={6} >
                                        <Typography align="center" >
                                            Table order
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} >
                                    </Grid>
                                    <Grid item xs={6} >
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="list">
                        {(provided) => (
                            <List
                            className={classes.table}
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                // sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
                            >

                                            {columns.map((column, index) => (
                                                <Draggable 
                                                key={column.dataKey} 
                                                draggableId={column.dataKey.toString()} 
                                                index={index}>
                                                    {(provided) => (
                                                        <Paper
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        elevation={2}
                                                        // key={column.dataKey} 
                                                        className={classes.buttonFields}
                                                        // endIcon={<MinusButton />}
                                                        >
                                                        
                                                        {/* <ListItem> */}
                                                                
                                                                {column.label}
                                                        {/* </ListItem> */}
                                                        
                                                        </Paper>
                                                    )}
                                                </Draggable>
                                            ))}

                                
                            </List>

                        )}

                    </Droppable>
                </DragDropContext>
                </Grid>
                                </Grid>
                teste
                </Box>
            </Box>
        </Modal>
    )
}