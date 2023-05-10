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
    // droppable: {
    //     display: "flex",
    //     // width: "100%",
    // },
    table: {
        // position: "absolute",
        // bottom: 48,
        // zIndex: 500,
        width: "calc(100% - 6px)",
        // height: "250px",
        // minHeight: "10%",
        margin: "3px",
        padding: "6px 0",
        // backgroundColor: "red !important"
        backgroundColor: "rgb(69, 144, 186)",
        display: "flex",
        flexDirection: "column",
        // justifyContent: "space-evenly",
        alignItems: "center",
        // gap: "9px",
        
    },
    buttonsGroup: {
        width: "100%",
        height: "100%",
    },
    buttonFields: {
        backgroundColor: "white",
        width: "calc(100% - 12px)",
        // width: "auto",
        margin: "9px",
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
    // height: "90%",
    // backgroundColor: "rgb(45,72, 91, 1)",
    // margin: "auto",
    // padding: "3px",
    
    // color: "white",
    overflowX: "hidden",
};
const style2 = {
    // position: 'absolute',
    // display: "flex",
    // justifyContent: "center",
    // left: "50%",
    // transform: "translate(-50%, 0%)",
    top: 74,
    width: "calc(100% - 32px)",
    // height: "70%",
    height: "520px",
    backgroundColor: "rgb(45,72, 91, 1)",
    margin: "auto",
    padding: "3px",
    color: "white",
    overflow: "scroll",
    overflowX: "hidden",

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



    // useEffect(() => {
    //     console.log("Fields columns: ", columns)
        
    // }, [])

    const [orderedFields, setOrderedFields] = useState(columns)
    const [unsetFields, setUnsetFields] = useState<ColumnData[]>([])
     
    // const handleDragStart = () => {

    // }
    const handleDragEnd = (result: any) => {
        console.log("result: ", result)
        if (!result.destination) return;
        const items = Array.from(orderedFields);
        const [reorderData] = items.splice(result.source.index,1);
        items.splice(result.destination.index, 0, reorderData);
        setOrderedFields(items)
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
                                        <Typography align="center" >
                                            Hidden fields
                                        </Typography>
                                    </Grid>
                <Grid item xs={6} >
                <DragDropContext 
                // onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                >
                {/* <Box  className={classes.droppable}> */}
                
                    <Droppable
                   
                    droppableId="list"
                    >
                       


                        {(provided) => (
                            <List
                            className={classes.table}
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                // sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
                            >

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

                                {provided.placeholder} 
                            </List>
                            

                        )}
                            

                    </Droppable>
                    
                </DragDropContext>
                    </Grid>
                                    <Grid item xs={6} >
                    {/* <Droppable droppableId="list"> */}
                        {/* {(provided) => ( */}
                            <List
                            className={classes.table}
                                // {...provided.droppableProps}
                                // ref={provided.innerRef}
                                // sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
                            >

                                            {unsetFields.map((column, index) => (
                                                    // {(provided) => (
                                                        <Paper
                                                        // ref={provided.innerRef}
                                                        // {...provided.draggableProps}
                                                        // {...provided.dragHandleProps}
                                                        // elevation={2}
                                                        // key={column.dataKey} 
                                                        className={classes.buttonFields}
                                                        // endIcon={<MinusButton />}
                                                        >
                                                        
                                                        {/* <ListItem> */}
                                                                
                                                            {column.label}
                                                        {/* </ListItem> */}
                                                        
                                                        </Paper>
                                                    // )}
                                                // </Draggable>
                                            ))}

                                {/* {provided.placeholder}  */}
                            </List>

                        {/* )} */}

                    {/* </Droppable> */}
                                </Grid>
                    {/* </Box> */}
                </Grid>
                teste
                </Box>
            </Box>
        </Modal>
    )
}