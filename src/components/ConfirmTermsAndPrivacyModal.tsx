import { useState, useEffect } from 'react';
import { Box, 
         Modal, 
         Typography, 
        } from '@mui/material';
import { OkButton } from './Buttons';
import { useStylesGlobal, modalStyleSaveExternal, modalStyleErrorInternal } from '../Styles'

type ConfirmTermsAndPrivacyModalProps = {
    openConfirmTermsAndPrivacyModal: boolean;
    closeConfirmTermsAndPrivacyModal: (newData?: boolean) => void;
}
export default function ConfirmTermsAndPrivacyModal( props: ConfirmTermsAndPrivacyModalProps) {
    const { openConfirmTermsAndPrivacyModal, closeConfirmTermsAndPrivacyModal } = props;
    const { classes } = useStylesGlobal();
    
    
    const handleOkButton = async() => {
        closeConfirmTermsAndPrivacyModal(true)
    };
    
    return (
        <Modal
            open={openConfirmTermsAndPrivacyModal} 
            onClose={() => closeConfirmTermsAndPrivacyModal()}
        > 
            <Box sx={modalStyleSaveExternal}>
                <Box sx={modalStyleErrorInternal}>
                    <Box 
                        margin="20px 10px"
                    >
                        {/* <Typography variant='body1' align="center" >
                            Thanks for signing up to StockPro
                        </Typography>  */}
                        <Typography variant='body2' align="center" >
                            Terms and Privacy here
                        </Typography> 
                    </Box>
                    <Box className={classes.finishButtons}>
                        <OkButton
                            clicked={() => handleOkButton()}
                        />
                    </Box> 
                </Box>
            </Box>
        </Modal>
    )
}