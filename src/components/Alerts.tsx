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

    formControlUsers: {
        width: "300px",
        backgroundColor: "white",
        borderRadius: "10px",
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
            },
            '&.Mui-focused': {
                },
            "&.Mui-focused fieldset": {
            }
        }
    },
    selectUsers: {
    },
    inputLabelUsers: {
    },
    stackUsers: {
    },
    chipUsers: {
    },
    cancelIconUsers: {
        '& > *': {
            color: 'rgb(255, 47, 47, .9)',
        }
    },
    menuItemUsers: {
        "&.Mui-selected": {
        },
    },
    customBoxColumn: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    customBoxRow: {
        display: "flex",
        justifyContent:  "center",
        alignItems: "center",
        gap: 6,
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
  "Harris Glenn",
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


                    <Box className={classes.customBoxColumn}>
                        <FormControl 
                        className={classes.formControlUsers}
                                    size="small"
                        >
                            <InputLabel 
                            className={classes.inputLabelUsers} >Users</InputLabel>
                            <Select
                            
                            MenuProps={{ PaperProps: { sx: { maxHeight: "30%" ,
                            borderRadius: "10px",} } }}
                            className={classes.selectUsers}
                                multiple
                                value={selectedNames}
                                onChange={(e) => setSelectedNames([...e.target.value])}
                                input={<OutlinedInput label="Users" className={classes.formControlUsers} />}
                                renderValue={(selected) => (
                                    <Stack gap={1} direction="row" flexWrap="wrap"
                                    className={classes.stackUsers}
                                    >
                                        {selected.map((value) => (
                                            <Chip 
                                                className={classes.chipUsers}
                                                key={value} 
                                                label={value} 
                                                onDelete={() =>
                                                    setSelectedNames(
                                                        selectedNames.filter((item) => item !== value)
                                                    )
                                                }
                                                deleteIcon={
                                                    <CancelIcon
                                                    className={classes.cancelIconUsers}
                                                        onMouseDown={(event) => event.stopPropagation()}
                                                    />   
                                                }
                                            />
                                        ))}
                                    </Stack>
                                )}
                                >
                                    {names.map((name) => (
                                        <MenuItem 
                                            className={classes.menuItemUsers}
                                            key={name} 
                                            value={name}
                                            sx={{ justifyContent: "space-between" }}
                                        >
                                            {name}
                                            {selectedNames.includes(name) ? <CheckIcon color="info" /> : null}
                                        </MenuItem>
                                    ))}
                                </Select>
                        </FormControl>


                        <Box className={classes.customBoxRow}>
                            <Typography variant='h6'  >
                                Emails
                            </Typography>
                            <EditIcon 
                            // className={classes.editIcon}
                            />
                        </Box>
                            {/* {customFieldsNew.map((cusField: ColumnDataCustom) => { */}
                                {/* if (!cusField.deleted) { */}
                                    {/* return (
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
                                            </div> */}
                                        {/* </Box>
                                    )
                                }
                            })} */}
                        <Box className={classes.customBoxRow}>
                            <PlusButton
                                sizeIco={"45px !important"}
                                // clicked={addInputCustomField}
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