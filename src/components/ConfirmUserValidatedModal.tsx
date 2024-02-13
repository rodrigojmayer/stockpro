import { Box, 
         Modal, 
         Typography, 
        } from '@mui/material';
import { OkButton } from './Buttons';
import { useStylesGlobal, modalStyleSaveExternal, modalStyleErrorInternal } from '../Styles'

type ConfirmUserValidatedModalProps = {
    openConfirmUserValidatedModal: boolean;
    closeConfirmUserValidatedModal: (newData?: boolean) => void;
}
export default function ConfirmUserValidatedModal( props: ConfirmUserValidatedModalProps) {
    const { openConfirmUserValidatedModal, closeConfirmUserValidatedModal } = props;
    const { classes } = useStylesGlobal();
    
    const handleOkButton = async() => {
        closeConfirmUserValidatedModal(true)
    };
    
    return (
        <Modal
            open={openConfirmUserValidatedModal} 
            onClose={() => closeConfirmUserValidatedModal()}
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
                            Your account has been validated  
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