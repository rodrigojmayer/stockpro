import { useEffect, useState, useContext } from 'react';
import { Box, 
         Button,
         IconButton, 
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
import { FilestackContext } from '../context/FilestackContext';
import { PickerOverlay } from 'filestack-react';
import IonTrash from "../assets/ion_trash.svg";

// import * as filestack from 'filestack-js';
// declare module 'filestack' {
//     const filestack: any; // Replace 'any' with the correct type definitions
  
//     export = filestack;
//   }
interface ChildProps {
    hiddenPanel:  boolean
    openOptionsCreate: (newData: string )=> void
    id_product: number
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
        id_product,
        stockPriceTemp, 
        onStockPriceChange, 
        stockDescriptionTemp, 
        onStockDescriptionChange,
        imageUrl,
        onSetImageUrl, 
    }: ChildProps )  {
    const { classes } = useStylesGlobal();
    const close = () => {}
    
    const { filestack } = useContext<any>(FilestackContext);
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
    // const apiKey = import.meta.env.VITE_FILESTACK_API_KEY;
    console.log("filestack:", filestack);
    console.log("filestack.apikey:", filestack[0].apikey);
    const apiKey = filestack[0].apikey;
    const signature = filestack[0].signature;
    const policy = "eyJleHBpcnkiOjI3NjI0NjAwMDB9"; // The policy is always the same for for all the files for the date 2057-07-16
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
    const deleteFilesStock = (imgurl: string) => {
        console.log("Deleting this filestock imgurl: ", imgurl)
        console.log("Deleting this filestock apiKey: ", apiKey)
        const fileHandle = imgurl.split('/')[3];
        console.log("Deleting apiKey: ", apiKey)
        console.log("Deleting fileHandle: ", fileHandle)
        console.log("Deleting policy: ", policy)
        console.log("Deleting signature: ", signature)
        // To delete I need:
        // 1- apiKey OK
        // 2- fileHandle OK
        // 3- policy OK
        // 4- const signature = '60ed5a44f2dc60536c692a0621bff6e6faee11e2206eec1f306e30c7c8111cfe';
        
        const url = `https://www.filestackapi.com/api/file/${fileHandle}?key=${apiKey}&policy=${policy}&signature=${signature}`; 
        const requestOptions = {
            method: 'DELETE',
        };
        fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('File deleted successfully');
        })
        .catch(error => {
            console.error('There was a problem deleting the file:', error);
        });
        onSetImageUrl("")
        const fetchDeleteImageProduct = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/products/${id_product}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json', // Set the appropriate content-type for my API
                    },
                    body:JSON.stringify({url_image:""})
                })
                // Check if the response status is successful
                if (response.ok) {
                    // const responseData = await response.json() // parse the response data
                } else {
                    // Handle non-successful responses
                    console.error('Request failed: ', response.status, response.statusText)
                    // Handle the error here
                }
            } catch (error: unknown) {
                if (typeof error === 'string') {
                    // 'error' is now narrowed down to type 'string'
                    console.error('Error:', error)
                } else if (error instanceof Error) {
                    // 'error' is now narrowed down to type 'Error'
                    console.error('Error object:', error.message)
                } else {
                    // Handle other cases as needed
                }
            } finally {
            }
        } 
        fetchDeleteImageProduct()
    }
                
    return (
        <div
        hidden= {hiddenPanel}
        >
            <Typography align='center' variant='h6' >Secondary data</Typography>
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
                    <img src={imageUrl}/>
                </Box> 
                <Box className={classes.customBoxRow}>
                    {/* <SelectImageButton 
                        imageUrl = {imageUrl}
                        setImageUrl = {onSetImageUrl}
                    /> */}
                    {imageUrl  && 
                    //   {  imageUrl ?  
                    //       :  
                        
                        <IconButton
                            className={classes.ionTrash}
                            onClick={() => deleteFilesStock(imageUrl)}
                            // id="plusButton"
                            // value={column.id}
                            >
                                <img 
                                src={IonTrash} 
                                alt="Trash"
                                />
                        </IconButton>
                     }
                        <AddImageButton
                            clicked={handleShowPicker}
                        />
                    {/* } */}
                </Box> 
                {showPicker && (
                    <Box className={classes.customZIndexTop}>
                        <PickerOverlay
                       
                            apikey={apiKey}
                            // onUploadDone={(res) => console.log(res)}
                            // onUploadDone={(res filesUploaded) => console.log(res.filesUploaded[0])}
                            // onUploadDone={(res: any) => console.log(res.filesUploaded[0].url)}
                            onUploadDone={(res: any) => {
                                onSetImageUrl(res.filesUploaded[0].url)
                                console.log("res.filesUploaded[0]: ", res.filesUploaded[0])
                                // handleShowPicker()
                            }}
                            pickerOptions={{
                                onClose: () => {
                                    handleShowPicker()
                                },
                                lang: "es"
                            }}
                        />
                    </Box>
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