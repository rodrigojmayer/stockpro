import { Box, 
         Modal, 
         Typography, 
        } from '@mui/material';
import { OkButton } from './Buttons';
import { useStylesGlobal, modalStyleSaveExternal, modalStyleErrorInternal } from '../Styles'
import Paper from '@mui/material/Paper/Paper';

type ConfirmUserValidatedModalProps = {
    openConfirmUserValidatedModal: boolean;
    closeConfirmUserValidatedModal: (newData?: boolean) => void;
    textData: string
}
export default function ConfirmUserValidatedModal( props: ConfirmUserValidatedModalProps) {
    const { openConfirmUserValidatedModal, closeConfirmUserValidatedModal, textData } = props;
    const { classes } = useStylesGlobal();
    
    const handleOkButton = async() => {
        closeConfirmUserValidatedModal(true)
    };

    let text = ""
    if(textData === "user_already_validated"){
        text="Your account was already validated"
    } else {
        text="Your account has been validated"
    }

    return (
        <Modal
            open={openConfirmUserValidatedModal} 
            onClose={() => closeConfirmUserValidatedModal()}
        > 
            <Paper style={{margin:0}} >
                <Box sx={modalStyleSaveExternal}>
                    <Box sx={modalStyleErrorInternal}>
                        <Box 
                            margin="20px 10px"
                        >
                            {/* <Typography variant='body1' align="center" >
                                Thanks for signing up to StockPro
                            </Typography>  */}
                            <Typography variant='body2' align="center" >
                                {text}
                            </Typography> 
                        </Box>
                        <Box className={classes.finishButtons}>
                            <OkButton
                                clicked={() => handleOkButton()}
                            />
                        </Box> 
                    </Box>
                </Box>
            </Paper>
        </Modal>
    )
}