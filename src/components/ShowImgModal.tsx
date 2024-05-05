// import { useState, useEffect } from 'react';
import { Box, 
         Modal, 
         Typography, 
        } from '@mui/material';
// import { OkButton } from './Buttons';
import { useStylesGlobal, modalStyleSaveExternal, modalStyleImageExternal, modalStyleImageInternal } from '../Styles'

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
        sx={{backgroundColor: 'rgba(0, 0, 0, .5)'}}
            open={openShowImgModal} 
            onClose={() => closeShowImgModal()}
        > 
            <Box sx={modalStyleImageExternal}>
                <Box sx={modalStyleImageInternal}>
                    <img src={`https://cdn.filestackcontent.com/resize=w:320,h:320,fit:crop/rounded_corners=radius:17/auto_image/compress/${showImgModal}`} /> 
                </Box>
            </Box>
        </Modal>
    )
}