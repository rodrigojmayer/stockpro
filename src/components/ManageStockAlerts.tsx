import dayjs, { Dayjs } from 'dayjs';// Import dayjs
import { useContext, useEffect, useRef, useState } from 'react';
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
import { UserContext } from '../context/UserContext';

interface ChildProps {
    hiddenPanel:  boolean
    openOptionsCreate: (newData: string )=> void
    stockMeasureTemp: string
    stockAlertAmountTemp: number
    onStockAlertAmountChange: (newData: number ) => void
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
    const firstInputRef = useRef<HTMLInputElement>(null)
    const { user } = useContext<any>(UserContext); 

    useEffect(() => {
        if (!hiddenPanel) {
            if (firstInputRef.current) {
                firstInputRef.current.focus()
            }
        }
    }, [hiddenPanel])

    const close = () => {}
    const DatePickerComponent = breakpointLG ? DatePicker : MobileDatePicker;
    const [openDatePicker, setOpenDatePicker] = useState(false);  
    const [openSaveChanges, setOpenSaveChanges] = useState(false);  
    const handleCloseSaveChanges = (ans?:boolean) => {
        if(ans){
            close()
        }
        setOpenSaveChanges(false);
    }
    const handleOpenSaveChanges = () => setOpenSaveChanges(true);
    
    const writeStockAlertAmount = (e:any) => {
        let newValue = parseInt(e.target.value.replace(/[+\-e]/g, ''), 10);
        const topValue = 999 
        if (isNaN(newValue)) {
            newValue = 0;
        } else if (newValue > topValue) {
            newValue = topValue;
        }
        onStockAlertAmountChange(newValue);
    }
    const handleDatePickerChange = (newDate:any) => { 
        const adjustedDate = newDate.add(2, 'hour').toISOString(); // Adding 2 hours because the GMT comes in +0200 and returns the day before
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
                                // type="number"
                                className={classes.inputMainData}
                                value={stockAlertAmountTemp}
                                disabled={!stockAlertAmountEnabledTemp}
                                // onChange={ (event) => onStockAlertAmountChange(Number(event.target.value)) }
                                onChange={ (event:any) => writeStockAlertAmount(event) }
                                InputProps={{
                                    className: classes.inputClassName,
                                    inputMode: "numeric",
                                    endAdornment: (
                                        <Typography 
                                            align='center' 
                                            variant='h6' 
                                            // className= {classes._0main_color}
                                            className={classes[`_${user.background_color}main_color` as keyof typeof classes]} 
                                            // sx={{
                                            //     color: "rgb(45,72, 91, 1)",
                                            // }}
                                        >
                                            {stockMeasureTemp}
                                        </Typography>
                                    ),
                                }}
                                // inputRef={input => input && input.focus()}
                                inputRef={firstInputRef}
                            />
                        </Grid>
                        <Grid item xs={3} >
                            <Typography >{(stockAlertAmountEnabledTemp)?'Enabled':'Disabled'}</Typography>
                        </Grid>
                        <Grid item xs={2} >
                            <Switch 
                                color='success' 
                                checked={stockAlertAmountEnabledTemp}
                                onChange={(event:any) => {
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
                                    defaultValue = { stockAlertDateTemp? dayjs(stockAlertDateTemp) : null}
                                    disabled={!stockAlertDateEnabledTemp}
                                    onChange={ (newDate) => handleDatePickerChange(newDate) }
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            InputProps: {
                                            endAdornment: (
                                            <InputAdornment
                                                // className= {classes._0main_color} 
                                                className={classes[`_${user.background_color}main_color` as keyof typeof classes]} 
                                                // sx={{ color: "rgb(45,72, 91, 1)" }} 
                                                position="end"
                                            >
                                            <CalendarMonthRoundedIcon 
                                                onClick = {stockAlertDateEnabledTemp ? () => setOpenDatePicker(true) : () => {}}
                                                style={stockAlertDateEnabledTemp ? {cursor: "pointer"} :  {}}
                                            />
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
                                    open={breakpointLG ? openDatePicker :undefined}
                                    onClose={breakpointLG ? () => setOpenDatePicker(false) :()=>{}}
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
                            onChange={(event:any) => {
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