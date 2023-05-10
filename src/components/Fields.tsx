import React from 'react'
import { useState, useEffect } from 'react'
import { makeStyles } from 'tss-react/mui';
// import MenuList from '@mui/material/MenuList/MenuList';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import { Container, Typography, Grid } from '@mui/material';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper/Paper';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"

// import { PlusButton, MinusButton } from './Buttons';
import { Button, IconButton  } from '@mui/material';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import ControlPointTwoToneIcon from '@mui/icons-material/ControlPointTwoTone';
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
        borderRadius: "10px",
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
        // padding: "0 5px",
        paddingLeft: "8px",
        height: "32px",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        // fontFamily: [
        //   '"Asap Condensed"',
        // ].join(','),
        // fontSize: "20px",
        
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

// type Data = {
//     id: number;
//     product: string;
//     amount: number;
//     unit: string;
//     category: string;
//     sub_category: string;
//   }

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
        setUnsetFields(unsetArray)
    }
    const handleDragEnd = (result: any) => {
        console.log("result: ", result)
        if (!result.destination) return;
        const items = Array.from(orderedFields);
        console.log("items: ", items)
        // console.log("items: ", items)
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
                                                        >
                                                                
                                                            <Typography noWrap>
                                                                {column.label}
                                                            </Typography>
                                                            {/* <Button
                                                            > */}
                                                            <IconButton
                                                            onClick={removeField}
                                                            className={classes.backPlus}
                                                            id="minusButton"
                                                            value={column.id}>
                                                                <RemoveCircleTwoToneIcon 
                                                                />
                                                            </IconButton>
                                                            {/* </Button> */}
                                                            

                                                            {/* <MinusButton 
                                                            onClick={() => removeField()}
                                                            sizeData={"30px"}
                                                            /> */}
                                                        
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
                                                            
                                                            <IconButton
                                                            className={classes.plusIcon}
                                                            onClick={addField}
                                                            id="plusButton"
                                                            value={column.id}>
                                                                <ControlPointTwoToneIcon/>
                                                            </IconButton>
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