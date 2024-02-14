import { Box, 
         Modal, 
         Typography, 
        } from '@mui/material';
import { OkButton, 
         CancelButton, 
        } from './Buttons';
import { useStylesGlobal, modalStyleSaveExternal, modalStyleErrorInternal } from '../Styles'

type ForgottenPassModalProps = {
    openForgottenPassModal: boolean;
    closeForgottenPassModal: (newData?: boolean) => void;
}
export default function ForgottenPassModal( props: ForgottenPassModalProps) {
    const { openForgottenPassModal, closeForgottenPassModal } = props;
    const { classes } = useStylesGlobal();
    
    const handleOkButton = async() => {
        closeForgottenPassModal(true)
    };
    
    return (
        <Modal
            open={openForgottenPassModal} 
            onClose={() => closeForgottenPassModal()}
        > 
            <Box sx={modalStyleSaveExternal}>
                <Box sx={modalStyleErrorInternal}>
                    <Box 
                        margin="20px 10px"
                    >
                        <Typography variant='body1' align="center" >
                            Account recovery
                        </Typography> 
                        {/* <Typography variant='body2' align="center" >
                            Your account has been validated  
                        </Typography>  */}
                    </Box>
                    <Box className={classes.finishButtons}>
                        <CancelButton
                        clicked={() => closeForgottenPassModal()}
                        />
                        <OkButton
                            clicked={() => handleOkButton()}
                        />
                    </Box> 
                </Box>
            </Box>
        </Modal>
    )
}