import { useEffect, useState } from 'react';
import { Box, 
         Button, 
         TextField,
         Typography,
        } from '@mui/material';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import { UpButton,
         SelectImageButton,
         AddImageButton
        } from './Buttons';
import { useStylesGlobal } from '../Styles'
import { unstable_gridTabIndexColumnHeaderFilterSelector } from '@mui/x-data-grid-premium';
import { PickerOverlay } from 'filestack-react';

// import * as filestack from 'filestack-js';
// declare module 'filestack' {
//     const filestack: any; // Replace 'any' with the correct type definitions
  
//     export = filestack;
//   }
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

    const [showPicker, setShowPicker] = useState(false)
    const handleShowPicker = () => {
        console.log("handleShowPicker showPicker: ", showPicker)
        setShowPicker((prevState) => !prevState)
    }
//     // const configValue: string = (process.env.FILESTACK_API_KEY as string);
//     // const configValue : any = process.env.FILESTACK_API_KEY 
//     // console.log("process.env.FILESTACK_API_KEY: ", configValue)
    const apiKey = import.meta.env.VITE_FILESTACK_API_KEY;
//  //  console.log("VITE_FILESTACK_API_KEY:", apiKey);
//     useEffect(() => {
//         const client = filestack.init(apiKey);
//         // const client = filestack.init("AiRJTDVe6Svy6ARdJSX4Fz");
    
//         // Use a function to open the Filestack picker when the component mounts
//         const openPicker = () => {
//           client.picker().open();
//         };
    
//         openPicker(); // Call the function to open the picker
    
//         // Optionally, you can add event listeners to handle the results or other actions
//         client.on('success', (result:any) => {
//           console.log('Filestack upload success', result);
//         });
    
//         client.on('error', (error:any) => {
//           console.error('Filestack error', error);
//         });
//       }, []); // Ensure this effect runs only once when the component mounts

      
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
                    {/* <SelectImageButton 
                        imageUrl = {imageUrl}
                        setImageUrl = {onSetImageUrl}
                    /> */}
                    <AddImageButton
                        clicked={handleShowPicker}
                    />
                </Box> 
                {showPicker && (
                    <PickerOverlay
                        apikey={apiKey}
                        onUploadDone={(res) => console.log(res)}
                    />
                )}
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