import { useState, useEffect } from 'react';
import { Box, 
         Modal, 
         Typography, 
        } from '@mui/material';
import { OkButton } from './Buttons';
import { useStylesGlobal, modalStyleSaveExternal, modalStyleErrorInternal } from '../Styles'

type ConfirmChangedPassModalProps = {
    openConfirmChangedPassModal: boolean;
    closeConfirmChangedPassModal: (newData?: boolean) => void;
}
export default function ConfirmChangedPassModal( props: ConfirmChangedPassModalProps) {
    const { openConfirmChangedPassModal, closeConfirmChangedPassModal } = props;
    const { classes } = useStylesGlobal();
    
    
    const handleOkButton = async() => {
        closeConfirmChangedPassModal(true)
    };
    
    return (
        <Modal
            open={openConfirmChangedPassModal} 
            onClose={() => closeConfirmChangedPassModal()}
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
                            Your password has been successfully changed  
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