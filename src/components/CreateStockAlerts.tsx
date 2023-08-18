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
import { useStylesGlobal, modalStyleExternal, modalStyleInternal } from '../Styles'

import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import DatePicker from "material-ui-pickers/DatePicker";
import useMediaQuery from '@mui/material/useMediaQuery'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';

interface measureData {
    id: number;
    name: string;
  }
  interface emailsAlertData {
      id: number;
      email: string;
    }


const measureArray: measureData[] = [
    { id: 0, name: '-'},
    { id: 1, name: 'Unit'},
    { id: 2, name: 'Kg'},
    { id: 3, name: 'Lts'},
]; 
const categoryArray: measureData[] = [
    { id: 0, name: '-'},
    { id: 1, name: 'Kitchen'},
    { id: 2, name: 'Food'},
    { id: 3, name: 'Furniture'},
];
const subCategoryArray: measureData[] = [
    { id: 0, name: '-'},
    { id: 1, name: 'Cutlery'},
    { id: 2, name: 'Fruits'},
    { id: 3, name: 'Chairs'},
];


const emailsAlert: emailsAlertData[] = [
    { id: 1, email: 'email1@test.com' },
    { id: 2, email: 'email2@test.com'  },
    { id: 3, email: 'email3@test.com'},
];


interface ChildProps {
    hiddenPanel:  boolean
    // openOptionsCreate: (newData: string) => void
    openOptionsCreate: (newData: string )=> void
    stockMeasureTemp: string
    stockAlertAmountTemp: number | string
    onStockAlertAmountChange: (newData: number | string) => void
    stockAlertDateTemp: Date | String
    onStockAlertDateChange: (newData: Date | null | string) => void
    
}

export default function CreateStockAlerts(
    {   hiddenPanel, 
        openOptionsCreate, 
        stockMeasureTemp,
        stockAlertAmountTemp,
        onStockAlertAmountChange,
        stockAlertDateTemp,
        onStockAlertDateChange,
    }: ChildProps )  {
    // export default function CreateStockAlerts( { hiddenPanel }: { hiddenPanel: boolean } ) {
    // export default function CreateStockMainData( { open, handleClose }: ChildProps) {
    // const { openSaveChanges, closeSaveChanges } = props;
    const breakpointLG = useMediaQuery('(min-width:1024px)')
    const { classes } = useStylesGlobal();
    const close = () => {
        // handleClose(false)
    }
    
    const DatePickerComponent = breakpointLG ? DatePicker : MobileDatePicker;
    
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

    // const [selectedDate, setSelectedDate] = useState('');

    const handleDatePickerChange = (newDate:any) => { 
        // console.log("newDate: ", newDate) 
        // console.log("newDate.$d: ", newDate.$d)
        // Here, we adjust the selected date to GMT+0400 by using the utcOffset method
        // const adjustedDate = newDate.utcOffset('+0400', true);
        // const adjustedDate = newDate
        // const day = newDate.$D
        // console.log("day: ", day) 
        // const month = (newDate.$M + 1)
        // console.log("month: ", month)
        // const year = newDate.$y
        // console.log("year: ", year)
        // const adjustedDate = `${day}-${month}-${year}T02:00:00.000Z` // Adding 2 hours because the GMT comes in +0200 and returns the day before
        // const adjustedDate = `15-08-2023T02:00:00.000Z` // Adding 2 hours because the GMT comes in +0200 and returns the day before
        const adjustedDate = newDate.add(2, 'hour').toISOString(); // Adding 2 hours because the GMT comes in +0200 and returns the day before
        // // const formattedDate = date;
      
        // Call the onStockAlertDateChange function with the adjusted date
        onStockAlertDateChange(adjustedDate);
      };
    const handleHiddenOptions = (changeTo:string) =>  {
        openOptionsCreate(changeTo)
    }

    useEffect(() => {
        

    }, [ open])
    

    
    return (
        <div
        hidden= {hiddenPanel}
        >
            <Typography align='center' variant='h6'>Alerts</Typography>
            <Box className={classes.customBoxColumn}>
                {/* <Box className={classes.customBoxRow}>
                    <Typography align="center" variant="h6">
                        
                    </Typography>
                </Box>  */}
                <Box className={classes.customBoxRow}>
                    <Grid container>
                        <Grid item xs={10} >
                        <TextField
                            label="By amount"
                            // onChange={ handleEditCustomFieldNew }
                            maxRows={1}
                            size="small"
                            type="number"
                            className={classes.inputMainData}
                            value={stockAlertAmountTemp}
                            onChange={ (event) => onStockAlertAmountChange(event.target.value) }
                            InputProps={{
                                className: classes.inputClassName,
                                style: {
                                // height:"36px"
                                // borderRadius: 10,
                                },
                            }}
                        />
                            
                        </Grid>
                        <Grid item xs={.5} >
                        </Grid>
                {/* <Box className={classes.customBoxRow}>  */}
                        <Grid item xs={1.5} >
                            <Typography align='center' variant='h6'>{stockMeasureTemp}</Typography>
                            {/* <PlusButton/>       */}
                        </Grid>
                {/* </Box> */}
                    </Grid>
                </Box>
               
                    <Grid container>
                        <Grid item xs={10} >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']} >
                                    <DatePickerComponent
                                        label="By date"
                                        format="DD/MM/YYYY"
                                        // value={stockAlertDateTemp || null}
                                        value={ typeof stockAlertDateTemp === 'string'
                                        ? null
                                        : stockAlertDateTemp}
                                        // onChange={ (newDate) => onStockAlertDateChange(newDate) }
                                        onChange={ (newDate) => handleDatePickerChange(newDate) }
                                        slotProps={{ textField: { size: 'small' } }}
                                        className={classes.inputMainData} 
                                        sx={{ 
                                            marginTop: "-8px !important",
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius:  "10px !important",
                                            }
                                        }} 
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={.5} >
                        </Grid>
                        <Box className={classes.customBoxCenter}> 
                            <Grid item xs={1.5} >
                                <CalendarMonthRoundedIcon />
                                    
                            </Grid>
                        </Box>
                    </Grid>
                <Box className={`${classes.customBoxRow} ${classes.customBoxRowArrowButton}`} >
                    
                        <div className={classes.customBoxCenter}>
                            <UpButton
                                direction="left"
                                clicked={() => handleHiddenOptions("secondaryData")}
                            />
                            <Typography align="left" sx={{ width: "95px" }}>Secondary data</Typography>
                            
                            </div>
                            
                        <div className={classes.customBoxCenter}>
                            <Typography align="right" sx={{ width: "95px" }}>Custom fields</Typography>
                            <UpButton
                            direction="right"
                            clicked={() => handleHiddenOptions("customFields")}
                            />
                        </div>
                </Box>
            </Box>
        </div>
    )
}