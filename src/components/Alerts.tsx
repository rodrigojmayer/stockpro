import React, { useState, useEffect } from 'react';
import { makeStyles } from 'tss-react/mui';
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
         Select,
         FormControl
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
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';


const useStyles = makeStyles()({
    finishButtons: {
        display: "flex",
        justifyContent:  "center",
        gap: 20,
        margin: "20px",
    },
    multiSelectForm: {
        display: "flex",
        justifyContent:  "center",
        backgroundColor: "white",
        // border: 0,
        borderRadius: "10px",
        borderColor: "transparent",
        // borderRadius: "10px 10px 0 0",
        "& .MuiOutlinedInput-root": {
            border: "0px solid",
            "& fieldset": {
                border: "0px solid",
            },
            '&.Mui-focused': {
                borderColor: "transparent",
                // borderRadius: "10px 10px 0 0",
                // backgroundColor: "white",
                // borderRadius: "100px",
                // border: "none !important",
                // strokeWidth: 10 ,
                },
            "&.Mui-focused fieldset": {
                borderColor: "transparent",
                borderRadius: "10px 10px 0 0",
                backgroundColor: "white",
                // color: "red",
                // borderRadius: "100px",
                // border: "none",
                // borderColor: "rgba(0, 0, 0, 0.23)"             // focus
            }
        }

    },
    multiSelectInput: {
        '&.Mui-focused': {
            // borderColor: "transparent",
            color: "red",
            // borderRadius: "10px 10px 0 0",
            // backgroundColor: "white",
            // borderRadius: "100px",
            // border: "none !important",
            // strokeWidth: 10 ,
            },
        // justifyContent:  "center",
        // border: 0,
        // borderRadius: "10px",
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
// type SaveChangesProps = {
//     openSaveChanges: boolean;
//     closeSaveChanges: (newData?: boolean) => void;
// }
interface ChildProps {
    open:  boolean
    handleClose: (newData: boolean) => void
}


const names = [
  "Humaira Sims",
  "Santiago Solis",
  "Dawid Floyd",
  "Mateo Barlow",
  "Samia Navarro",
  "Kaden Fields",
  "Genevieve Watkins",
  "Mariah Hickman",
  "Rocco Richardson",
  "Harris Glenn"
]

export default function Alerts( { open, handleClose }: ChildProps) {
    // const { openSaveChanges, closeSaveChanges } = props;
    const { classes } = useStyles();
    const close = () => {
        handleClose(false)
    }
    const [openSaveChanges, setOpenSaveChanges] = useState(false);  
    const handleCloseSaveChanges = (ans?:boolean) => {
        console.log("ans: ", ans)   // If true should save the changes, if false shouldnt. In both cases has to close all the modals. If undefined should do nothing, just close the modal save changes
        setOpenSaveChanges(false);
    }
    const handleOpenSaveChanges = () => setOpenSaveChanges(true);



    const [selectedNames, setSelectedNames] = useState<string[]>([]);
    // const [selectedNames, setSelectedNames] = useState([]);
    

    
    return (
        <Modal
        open={open} 
        onClose={close}
        > 
            <Box sx={style}>
                <Box sx={style2}>

                    
                    <SaveChanges
                        openSaveChanges={openSaveChanges}
                        closeSaveChanges={handleCloseSaveChanges} 

                    />


                    <Typography align="center" variant="h5">
                        Alerts
                    </Typography>


                    <FormControl sx={{ m: 1, width: 500 }}>
                        <InputLabel>Multiple Select</InputLabel>
                        <Select
                            multiple
                            value={selectedNames}
                            onChange={(e) => setSelectedNames([...e.target.value])}
                            input={<OutlinedInput label="Multiple Select" />}
                            >
                                {names.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                    </FormControl>


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