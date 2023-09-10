import { useState } from 'react';
import { Box, 
         TextField,
         Typography,
        } from '@mui/material';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import { UpButton,
         SelectImageButton
        } from './Buttons';
import { useStylesGlobal } from '../Styles'

interface ChildProps {
    hiddenPanel:  boolean
    openOptionsCreate: (newData: string )=> void
    stockPriceTemp: number | string
    onStockPriceChange: (newData: number | string )=> void
    stockDescriptionTemp: string
    onStockDescriptionChange: (newData: string )=> void
    imageUrl: string
    onSetImageUrl: (newData: string )=> void
}

export default function ManageStockSecondaryData(
    {   hiddenPanel, 
        openOptionsCreate, 
        stockPriceTemp, 
        onStockPriceChange, 
        stockDescriptionTemp, 
        onStockDescriptionChange,
        imageUrl,
        onSetImageUrl, 
    }: ChildProps )  {
    const { classes } = useStylesGlobal();
    const close = () => {}
    const [openSaveChanges, setOpenSaveChanges] = useState(false);  
    const handleCloseSaveChanges = (ans?:boolean) => {
        if(ans){
            close()
        }
        setOpenSaveChanges(false);
    }
    const handleOpenSaveChanges = () => setOpenSaveChanges(true);
    const handleHiddenOptions = (changeTo:string) =>  {
        openOptionsCreate(changeTo)
    }

    return (
        <div
            hidden= {hiddenPanel}
        >
            <Typography align='center' variant='h6'>Secondary data</Typography>
            <Box className={`${classes.customBoxColumn} ${classes.customBoxColumnStockOptions}`}>
                <Box className={classes.customBoxRow}>
                    <TextField
                        label="Price"
                        maxRows={1}
                        size="small"
                        type="number"
                        className={classes.inputMainData}
                        value={stockPriceTemp}
                        onChange={ (event) => onStockPriceChange(Number(event.target.value)) }
                        InputProps={{
                            className: classes.inputClassName,
                            endAdornment: (
                                <AttachMoneyRoundedIcon  sx={{ color: "rgb(45,72, 91, 1)" }} />
                            ),
                        }}
                    />
                </Box> 
                <Box className={classes.customBoxRow}>
                    <TextField
                        label="Description"
                        maxRows={1}
                        size="small"
                        className={classes.inputMainData}
                        value={stockDescriptionTemp}
                        onChange={ (event) => onStockDescriptionChange(event.target.value) }
                        InputProps={{  className: classes.inputClassName }}
                    />
                </Box> 
                <Box className={classes.customBoxRow}>
                    <SelectImageButton 
                        imageUrl = {imageUrl}
                        setImageUrl = {onSetImageUrl}
                    />
                </Box> 
                <Box className={`${classes.customBoxRow} ${classes.customBoxRowArrowButton}`}>
                    <div className={classes.customBoxCenter}>
                        <UpButton
                            direction="left"
                            clicked={() => handleHiddenOptions("mainData")}
                        />
                        <Typography align="left" sx={{ width: "95px" }}>Main data</Typography>
                    </div> 
                    <div className={classes.customBoxCenter}>  
                        <Typography align="right" sx={{ width: "95px" }}>Alerts</Typography>
                        <UpButton
                        direction="right"
                        clicked={() => handleHiddenOptions("alerts")}
                        />
                    </div>
                </Box>
            </Box>  
        </div>
    )
}