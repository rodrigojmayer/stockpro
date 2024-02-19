// import { useState, useEffect } from 'react';
import { Box, 
         Modal, 
         Typography, 
        } from '@mui/material';
// import { OkButton } from './Buttons';
import { useStylesGlobal, modalStyleSaveExternal, modalStyleErrorInternal } from '../Styles'

type ConfirmChangedPassModalProps = {
    openShowImgModal: boolean;
    closeShowImgModal: (newData?: boolean) => void;
    showImgModal: string
}
export default function ConfirmChangedPassModal( props: ConfirmChangedPassModalProps) {
    const { openShowImgModal, closeShowImgModal, showImgModal } = props;
    // const { classes } = useStylesGlobal();
    
    
    // const handleOkButton = async() => {
    //     closeShowImgModal(true)
    // };
    
    return (
        <Modal
            open={openShowImgModal} 
            onClose={() => closeShowImgModal()}
        > 
            <Box sx={modalStyleSaveExternal}>
                {/* <Box sx={modalStyleErrorInternal}> */}
                    {/* <Box 
                        margin="20px 10px"
                    > */}
                        {/* <Typography variant='body1' align="center" >
                            Thanks for signing up to StockPro
                        </Typography>  */}
                        {/* <Typography variant='body2' align="center" >
                            {showImgModal} 
                        </Typography>  */}
                        <img 
                            style={{
                                display: "block", // Ensure the image is treated as a block element
                                margin: "auto",   // Set margins to auto to horizontally center the image
                                objectFit: 'contain',
                            }} 
                            // src={newRow[column.dataKey]} 
                            src={`https://cdn.filestackcontent.com/resize=w:320,h:320,fit:crop/rounded_corners=radius:17/auto_image/compress/${showImgModal}`} 
                            // src={`https://cdn.filestackcontent.com/${showImgModal}`} 
                            // onClick={(e)=> {
                            //     e.stopPropagation() // Prevent the click event from propagating to the parent cell
                            //     handleOpenShowImg(newRow[column.dataKey])
                            // }}
                        /> 
                    {/* </Box> */}
                    {/* <Box className={classes.finishButtons}>
                        <OkButton
                            clicked={() => handleOkButton()}
                        />
                    </Box>  */}
                {/* </Box> */}
            </Box>
        </Modal>
    )
}