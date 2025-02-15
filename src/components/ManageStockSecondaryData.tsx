import { useEffect, useState, useContext, useRef } from 'react';
import { Box, 
         IconButton, 
         TextField,
         Typography,
         Modal,
        } from '@mui/material';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import { UpButton,
         AddImageButton
        } from './Buttons';
import { useStylesGlobal } from '../Styles'
import { FilestackContext } from '../context/FilestackContext';
// import { PickerOverlay } from 'filestack-react';
import IonTrash from "../assets/ion_trash.svg";
import { UserContext } from '../context/UserContext';
import { LanguageLabelsContext } from '../context/LanguageLabelsContext';

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
    const firstInputRef = useRef<HTMLInputElement>(null)
    const { user } = useContext<any>(UserContext);
    const { labelsManageStock } = useContext<any>(LanguageLabelsContext)

    useEffect(() => {
        if (!hiddenPanel) {
            if (firstInputRef.current) {
                firstInputRef.current.focus()
            }
        }
    }, [hiddenPanel])

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
        setShowPicker(true)
    }
    const handleClosePicker = () => {
        setShowPicker(false)
    }
    
    const writeStockPriceChange = (e:any) => {
        let newValue = parseFloat(e.target.value.replace(/[^0-9.,]/g, '')); // Allow only numbers, commas, and dots
        newValue = Math.round(newValue * 100) / 100;
        const topValue = 1000000 
        if (isNaN(newValue)) {
            newValue = 0;
        } else if (newValue > topValue) {
            newValue = topValue;
        }
        onStockPriceChange(newValue);
    }
    const apiKey = filestack[0].apikey;
    const removeImg = (imgurl: string) => {
        deleteFilesStock(id_product, imgurl)
        onSetImageUrlHandle("")
    }
                
    return (
        <div
            hidden= {hiddenPanel}
        >
            <Typography align='center' variant='h6' >{labelsManageStock.secondary_data}</Typography>
            <Box className={`${classes.customBoxColumn} ${classes.customBoxColumnStockOptions}`}>
                <Box className={classes.customBoxRow}>
                    <TextField
                        label={labelsManageStock.price}
                        maxRows={1}
                        size="small"
                        type="number"
                        className={classes.inputMainData}
                        value={stockPriceTemp}
                        onChange={ (event:any) => writeStockPriceChange(event) }
                        InputProps={{
                            className: classes.inputClassName,
                            inputMode: "numeric",
                            endAdornment: (
                                <AttachMoneyRoundedIcon  
                                    className={classes[`_${user.background_color}main_color` as keyof typeof classes]}    
                                />
                            ),
                        }}
                        inputRef={firstInputRef}
                    />
                </Box> 
                <Box className={classes.customBoxRow}>
                    <TextField
                        label={labelsManageStock.description}
                        maxRows={1}
                        size="small"
                        className={classes.inputMainData}
                        value={stockDescriptionTemp}
                        onChange={ (event:any) => onStockDescriptionChange(event.target.value) }
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
                                objectFit: 'contain',
                                cursor: "pointer"
                            }}  
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
                <Modal
                    className={classes.modal_external_background}
                    open={showPicker} 
                    onClose={handleClosePicker}
                > 
                    <Box className={classes.customZIndexTop} >
                        {/*<PickerOverlay
                             apikey={apiKey}
                             onUploadDone={(res: any) => {
                                 if(imageUrlHandle){
                                     console.log("There is already the imageUrlHandle: ", imageUrlHandle)
                                     onHandleUnsavedImages(imageUrlHandle)
                                 }
                                 onSetImageUrlHandle(res.filesUploaded[0])
                            }}
                            pickerOptions={{
                                onClose: () => {
                                    handleClosePicker()
                                },
                                lang: labelsManageStock.filestack_options,
                                accept: ["image/*"],
                            }}
                        />*/}
                    </Box> 
                </Modal> 
                <Box className={`${classes.customBoxRow} ${classes.customBoxRowArrowButton}`}>
                    <div className={classes.customBoxCenter}>
                        <UpButton
                            direction="left"
                            clicked={() => handleHiddenOptions("mainData")}
                        />
                        <Typography align="left" sx={{ width: "95px" }}>{labelsManageStock.main_data}</Typography>
                    </div> 
                    <div className={classes.customBoxCenter}>  
                        <Typography align="right" sx={{ width: "95px" }}>{labelsManageStock.alerts}</Typography>
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