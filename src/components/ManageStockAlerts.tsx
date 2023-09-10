import { useState } from 'react';
import { Box,
         Grid,
         TextField,
         Typography,
         InputAdornment,
        } from '@mui/material';
import { UpButton } from './Buttons';
import { useStylesGlobal } from '../Styles'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import useMediaQuery from '@mui/material/useMediaQuery'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import Switch from '@mui/material/Switch';

interface ChildProps {
    hiddenPanel:  boolean
    openOptionsCreate: (newData: string )=> void
    stockMeasureTemp: string
    stockAlertAmountTemp: number | string
    onStockAlertAmountChange: (newData: number | string) => void
    stockAlertAmountEnabledTemp: boolean
    onStockAlertAmountEnabledChange: (newData: boolean) => void
    stockAlertDateTemp: Date | null
    onStockAlertDateChange: (newData: Date | null) => void
    stockAlertDateEnabledTemp: boolean
    onStockAlertDateEnabledChange: (newData: boolean) => void
}

export default function ManageStockAlerts(
    {   hiddenPanel, 
        openOptionsCreate, 
        stockMeasureTemp,
        stockAlertAmountTemp,
        onStockAlertAmountChange,
        stockAlertAmountEnabledTemp,
        onStockAlertAmountEnabledChange,
        stockAlertDateTemp,
        onStockAlertDateChange,
        stockAlertDateEnabledTemp,
        onStockAlertDateEnabledChange,
    }: ChildProps )  {
    const breakpointLG = useMediaQuery('(min-width:1024px)')
    const { classes } = useStylesGlobal();
    const close = () => {}
    const DatePickerComponent = breakpointLG ? DatePicker : MobileDatePicker;
    const [openSaveChanges, setOpenSaveChanges] = useState(false);  
    const handleCloseSaveChanges = (ans?:boolean) => {
        if(ans){
            close()
        }
        setOpenSaveChanges(false);
    }
    const handleOpenSaveChanges = () => setOpenSaveChanges(true);
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
        // console.log("adjustedDate: ", adjustedDate) 
        // Call the onStockAlertDateChange function with the adjusted date
        onStockAlertDateChange(adjustedDate);
      };
    const handleHiddenOptions = (changeTo:string) =>  {
        openOptionsCreate(changeTo)
    }

    return (
        <div
            hidden= {hiddenPanel}
        >
            <Typography align='center' variant='h6'>Alerts</Typography>
            <Box className={`${classes.customBoxColumn} ${classes.customBoxColumnStockOptions}`}>
                <Box className={classes.customBoxRow}>
                    <Grid container>
                        <Grid item xs={12} >
                            <TextField
                                label="By amount"
                                maxRows={1}
                                size="small"
                                type="number"
                                className={classes.inputMainData}
                                value={stockAlertAmountTemp}
                                disabled={!stockAlertAmountEnabledTemp}
                                onChange={ (event) => onStockAlertAmountChange(Number(event.target.value)) }
                                InputProps={{
                                    className: classes.inputClassName,
                                    endAdornment: (
                                        <Typography 
                                            align='center' 
                                            variant='h6' 
                                            sx={{
                                                color: "rgb(45,72, 91, 1)",
                                            }}
                                        >
                                            {stockMeasureTemp}
                                        </Typography>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={3} >
                            <Typography >{(stockAlertAmountEnabledTemp)?'Enabled':'Disabled'}</Typography>
                        </Grid>
                        <Grid item xs={2} >
                            <Switch 
                                color='success' 
                                checked={stockAlertAmountEnabledTemp}
                                onChange={(event) => {
                                    onStockAlertAmountEnabledChange(event.target.checked)
                                }}
                            />                           
                        </Grid>
                    </Grid>
                </Box>
                <Grid container>
                    <Grid item xs={12} >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']} >
                                <DatePickerComponent
                                    label="By date"
                                    format="DD/MM/YYYY"
                                    defaultValue = { stockAlertDateTemp? stockAlertDateTemp : null}
                                    disabled={!stockAlertDateEnabledTemp}
                                    onChange={ (newDate) => handleDatePickerChange(newDate) }
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            InputProps: {
                                            endAdornment: (
                                            <InputAdornment
                                            sx={{
                                                color: "rgb(45,72, 91, 1)",
                                            }}
                                            position="end"
                                            >
                                            <CalendarMonthRoundedIcon />
                                            </InputAdornment>
                                            ),
                                            },
                                        },
                                        }}
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
                        <Grid item xs={3} >
                            <Typography >{(stockAlertDateEnabledTemp)?'Enabled':'Disabled'}</Typography>
                        </Grid>
                        <Grid item xs={2} >
                            <Switch 
                                color='success' 
                                checked={stockAlertDateEnabledTemp}
                                onChange={(event) => {
                                    onStockAlertDateEnabledChange(event.target.checked)
                                }}
                             />   
                        </Grid>
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