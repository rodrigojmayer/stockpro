import { useContext } from 'react';
import { Box, 
         Modal, 
         Typography, 
        } from '@mui/material';
import { OkButton } from './Buttons';
import { useStylesGlobal, modalStyleSaveExternal, modalStyleErrorInternal } from '../Styles'
import { UserContext } from '../context/UserContext';

type ConfirmChangedPassModalProps = {
    openConfirmChangedPassModal: boolean;
    closeConfirmChangedPassModal: (newData?: boolean) => void;
}
export default function ConfirmChangedPassModal( props: ConfirmChangedPassModalProps) {
    const { openConfirmChangedPassModal, closeConfirmChangedPassModal } = props;
    const { classes } = useStylesGlobal();
    const { user } = useContext<any>(UserContext);
    
    
    const handleOkButton = async() => {
        closeConfirmChangedPassModal(true)
    };
    
    return (
        <Modal
        className={classes.modal_external_background}
            open={openConfirmChangedPassModal} 
            onClose={() => closeConfirmChangedPassModal()}
        > 
            <Box sx={modalStyleSaveExternal}>
                <Box 
                    sx={{ ...modalStyleErrorInternal }}
                    className={`${classes[`_${user.background_color}main_background_color` as keyof typeof classes]} ${classes[`_${user.background_color}modal_color` as keyof typeof classes]}`}
                >
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