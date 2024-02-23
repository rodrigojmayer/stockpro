import { useEffect, useState, useContext } from 'react';
import { Box, 
         Button,
         IconButton, 
         TextField,
         Typography,
         InputAdornment,
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
// import {  TransformOptions } from 'filestack-js'; 
import IonTrash from "../assets/ion_trash.svg";

// import * as filestack from 'filestack-js';
// declare module 'filestack' {
//     const filestack: any; // Replace 'any' with the correct type definitions
  
//     export = filestack;
//   }
interface ChildProps {
    hiddenPanel:  boolean
    openOptionsCreate: (newData: string )=> void
    id_product: string
    stockPriceTemp: number | string
    onStockPriceChange: (newData: number | string )=> void
    stockDescriptionTemp: string
    onStockDescriptionChange: (newData: string )=> void
    imageUrlHandle: string
    onSetImageUrlHandle: (newData: string )=> void
    unsavedImages: string[]
    onHandleUnsavedImages: (newData: string )=> void
}

export default function ManageStockSecondaryData(
    {   hiddenPanel, 
        openOptionsCreate, 
        id_product,
        stockPriceTemp, 
        onStockPriceChange, 
        stockDescriptionTemp, 
        onStockDescriptionChange,
        imageUrlHandle,
        onSetImageUrlHandle,
        unsavedImages,
        onHandleUnsavedImages 
    }: ChildProps )  {
    const { classes } = useStylesGlobal();
    const close = () => {}
    
    const { filestack, deleteFilesStock } = useContext<any>(FilestackContext);
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
        // console.log("handleShowPicker showPicker: ", showPicker)
        setShowPicker((prevState) => !prevState)
    }
    
    const writeStockPriceChange = (e:any) => {
        let newValue = parseFloat(e.target.value.replace(/[^0-9.,]/g, '')); // Allow only numbers, commas, and dots
        // let newValue = parseInt(e.target.value.replace(/[+\-e]/g, ''), 10);
        newValue = Math.round(newValue * 100) / 100;
        const topValue = 1000000 
        if (isNaN(newValue)) {
            newValue = 0;
        } else if (newValue > topValue) {
            newValue = topValue;
        }
        onStockPriceChange(newValue);
    }
//     // const configValue: string = (process.env.FILESTACK_API_KEY as string);
//     // const configValue : any = process.env.FILESTACK_API_KEY 
//     // console.log("process.env.FILESTACK_API_KEY: ", configValue)
    // const apiKey = import.meta.env.VITE_FILESTACK_API_KEY;
    // console.log("filestack:", filestack);
    // console.log("filestack.apikey:", filestack[0].apikey);
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
    const removeImg = (imgurl: string) => {
        // console.log("Deleting this filestock imgurl: ", imgurl)
        // console.log("Deleting this filestock apiKey: ", apiKey)
        // const fileHandle = imgurl.split('/')[3];
        // console.log("Deleting apiKey: ", apiKey)
        // console.log("Deleting fileHandle: ", fileHandle)
        // console.log("Deleting policy: ", policy)
        // console.log("Deleting signature: ", signature)
        // // To delete I need:
        // // 1- apiKey OK
        // // 2- fileHandle OK
        // // 3- policy OK
        // // 4- const signature = '60ed5a44f2dc60536c692a0621bff6e6faee11e2206eec1f306e30c7c8111cfe';
        
        deleteFilesStock(id_product, imgurl)
        // const url = `https://www.filestackapi.com/api/file/${fileHandle}?key=${apiKey}&policy=${policy}&signature=${signature}`; 
        // const requestOptions = {
        //     method: 'DELETE',
        // };
        // fetch(url, requestOptions)
        // .then(response => {
        //     if (!response.ok) {
        //         throw new Error('Network response was not ok');
        //     }
        //     console.log('File deleted successfully');
        // })
        // .catch(error => {
        //     console.error('There was a problem deleting the file:', error);
        // });
        onSetImageUrlHandle("")
        // const fetchDeleteImageProduct = async () => {
        //     try {
        //         const response = await fetch(`http://localhost:4000/api/products/${id_product}`, {
        //             method: 'PATCH',
        //             headers: {
        //                 'Content-Type': 'application/json', // Set the appropriate content-type for my API
        //             },
        //             body:JSON.stringify({url_image:""})
        //         })
        //         // Check if the response status is successful
        //         if (response.ok) {
        //             // const responseData = await response.json() // parse the response data
        //         } else {
        //             // Handle non-successful responses
        //             console.error('Request failed: ', response.status, response.statusText)
        //             // Handle the error here
        //         }
        //     } catch (error: unknown) {
        //         if (typeof error === 'string') {
        //             // 'error' is now narrowed down to type 'string'
        //             console.error('Error:', error)
        //         } else if (error instanceof Error) {
        //             // 'error' is now narrowed down to type 'Error'
        //             console.error('Error object:', error.message)
        //         } else {
        //             // Handle other cases as needed
        //         }
        //     } finally {
        //     }
        // } 
        // fetchDeleteImageProduct()
    }

    // useEffect(() => {
    //     console.log("imageUrlHandle: ", imageUrlHandle)
    // }, [imageUrlHandle])
                
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
                        // type="money"
                        className={classes.inputMainData}
                        value={stockPriceTemp}
                        onChange={ (event) => writeStockPriceChange(event) }
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
                        InputProps={{  
                            className: classes.inputClassName,
                            inputProps: {maxLength: 75}
                        }}
                    />
                </Box> 
                {  imageUrlHandle ? 
                    <Box className={classes.customImgRow}>
                        <img 
                            style={{
                                alignItems: "center",
                                 maxWidth: "55%", 
                                 maxHeight: "130px", 
                                 objectFit: 'contain' 
                            }} 
                            // src={imageUrlHandle} 
                            // src={`https://cdn.filestackcontent.com/resize=w:90/auto_image/compress/${imageUrlHandle}`} 
                            src={`https://cdn.filestackcontent.com/resize=w:200,h:200,fit:crop/rounded_corners=radius:17/auto_image/compress/${imageUrlHandle}`} 
                            onClick={handleShowPicker} 
                        />
                        <IconButton
                            className={classes.ionTrash}
                            onClick={() => removeImg(imageUrlHandle)}
                            style={{ marginRight: "15px" }} 
                        >
                            <img 
                                src={IonTrash} 
                                alt="Trash"
                            />
                        </IconButton>
                    </Box> 
                    :  
                    <Box className={classes.customBoxRow}>
                        <AddImageButton
                            clicked={handleShowPicker}
                        />
                    </Box> 
                } 
                {showPicker && (
                    <Box className={classes.customZIndexTop}>
                        <PickerOverlay
                       
                            apikey={apiKey}
                            // onUploadDone={(res) => console.log(res)}
                            // onUploadDone={(res filesUploaded) => console.log(res.filesUploaded[0])}
                            // onUploadDone={(res: any) => console.log(res.filesUploaded[0].url)}
                            
                            // resizeParams={{
                            // transformOptions={{
                            //     clientOptions={{
                                // actionOptions={{
                            // // compressParams={{
                            //     transformations: {
                            //         convert: { 
                                // convertTransform={ { 
                                //             output:{
                                //                 format: "webp"
                                //             } 
                                //         }}
                        //             } 
                            //     }
                            // }}
                            
                            // onSuccess={(
                            //     transformations: {
                            //         convert: { 
                            //                 output:{
                            //                     format: "webp"
                            //                 } 
                            //             } 
                            //     }
                            // }}

                            // transformOptions= {{

                            // }}

                            onUploadDone={(res: any) => {
                                if(imageUrlHandle){
                                    console.log("There is already the imageUrlHandle: ", imageUrlHandle)
                                    // setUnsavedImages((prevImages: string[]) => [...prevImages, imageUrlHandle])
                                    onHandleUnsavedImages(imageUrlHandle)
                                }
                                // console.log("res.filesUploaded[0]: ", res.filesUploaded[0])
                                // onSetImageUrlHandle(res.filesUploaded[0].url)
                                // onSetImageUrlHandle(`https://cdn.filestackcontent.com/${res.filesUploaded[0].handle}`)
                                // onSetImageUrlHandle(`https://cdn.filestackcontent.com/auto_image/${res.filesUploaded[0].handle}`)
                                onSetImageUrlHandle(`${res.filesUploaded[0].handle}`)
                                // onSetImageUrlHandle(`https://cdn.filestackcontent.com/resize=w:30/auto_image/compress/${res.filesUploaded[0].handle}`)
                                // handleShowPicker()
                            }}
                            
                            pickerOptions={{
                                onClose: () => {
                                    handleShowPicker()
                                },
                                lang: "es",
                                accept: ["image/*"],
                               
                            //     transformations: {
                            //         convert: {
                            //     output: {
                            //         format: 'png',
                            //         quality: 1,
                            //         blob: false, // export file as blob or url
                            //         name: null, // output file name if null name will be extracted from url or file element
                            //       },
                            //     }
                            // }
                                // outputParams: {
                                //     format: 'webp'
                                // }
                                // maxSize:25,
                                // minifyJs:{

                                //     transform: {
                                //     output:{
    
                                //         format: 'webp'
                                //     }   
                                // }
                                        

                                // transformations: {
                                //     outformat: {
                                //         format: 'webp'
                                //     }
                                // }
                                // transformations: {
                                // //     compress:true
                                //     // convert: {
                                //     //     output:{
                                //     //         format: "webp"
                                //     //     }
                                //     // }
                                //     crop: {
                                //         aspectRatio: 1,
                                //         force: true
                                //       }
                                // },
                                // actionOptions: {

                                // },
                                // uploadConfig: {
                                    // outputParams:{
                                        // transformations: {
                                            // output: {
                                                        //  format: 'zip'
                                                        //  }
                                        //   }
                                    // },
                                //     transformations: {
                                            // output:{
                                //                 // format: "webp"
                                //             // }
                                //         } 
                                // transformOptions: {
                                // transformations: {
                                            // convert: { 
                                                    // output:{
                                                        // format: "webp"
                                    //                 } 
                                    //             } 
                                        // }
                                // }
                                    // conversion: {
                                    //     output: {
                                    //         format: 'webp' // Specify the desired output format here
                                    //     }
                                    // }
                                
                            }}
                            // convert={{
                            //     output:{
                            //         format: "webp"
                                // }
                            // }} 
                            // Filelink ={{
                            //     transformations: {
                            //         crop: {
                            //             aspectRatio: 16/9
                            //         },
                            //         convert: {
                                        // output: {
                                        //     format: 'webp' // Specify the desired output format here
                                        // }
                            //         }
                            // //     }
                            // }}

                        />
                    </Box>
                )}
                {/* </Box>  */}
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