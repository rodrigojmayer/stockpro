import { useContext } from 'react';
import { Box, 
         Modal, 
         Typography
        } from '@mui/material';
import { OkButton } from './Buttons';
import { useStylesGlobal, modalStyleSaveExternal, modalStyleErrorInternal } from '../Styles'
import Paper from '@mui/material/Paper/Paper';
import { UserContext } from '../context/UserContext';

type ConfirmUserValidatedModalProps = {
    openConfirmUserValidatedModal: boolean;
    closeConfirmUserValidatedModal: (newData?: boolean) => void;
    textData: string
}
export default function ConfirmUserValidatedModal( props: ConfirmUserValidatedModalProps) {
    const { openConfirmUserValidatedModal, closeConfirmUserValidatedModal, textData } = props;
    const { classes } = useStylesGlobal();
    const { user } = useContext<any>(UserContext);
    
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
        sx={{backgroundColor: 'rgba(0, 0, 0, .5)'}}
            open={openConfirmUserValidatedModal} 
            onClose={() => closeConfirmUserValidatedModal()}
        > 
            <Paper style={{margin:0}} >
                <Box sx={modalStyleSaveExternal}>
                    {/* <Box sx={{...modalStyleErrorInternal, ..._0modal_background_color}}> */}
                    {/* <Box sx={{...modalStyleErrorInternal, ...{[`_${user.background_color}modal_background_color`]: true} }}> */}
                    <Box 
                        sx={{ ...modalStyleErrorInternal }}
                        className={classes[`_${user.background_color}main_background_color` as keyof typeof classes]}
                    >
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