import { Box,
         Modal, 
         Typography,
        } from '@mui/material';
import { 
         CancelButton, 
        } from './Buttons';
import { useStylesGlobal, modalStyleSaveExternal, modalStyleErrorInternal } from '../Styles'
// import { useState } from 'react';
 

type ErrorModalProps = {
    openErrorModal: boolean;
    closeErrorModal: (newData?: boolean) => void;
    errorData: string
}
export default function ErrorModal( props: ErrorModalProps) {
    const { openErrorModal, closeErrorModal } = props;
    const { classes } = useStylesGlobal();
    let title = ""
    let subTitle = ""

    if(props.errorData === "missing_data"){
        title="Missing required data"
        subTitle="Name*"
    } else if (props.errorData === "duplicate_product"){
        title="Duplicated data"
        subTitle=`This product already exists`
    } else if (props.errorData === "negative_amount"){
        title="Shortfall"
        subTitle=`The amount cannot be negative`
    } else if (props.errorData === "missing_data_user"){
        title="Missing required data"
        subTitle=`Alias`
    } else if (props.errorData === "not_confirmed_pass"){
        // title="Not confirmed password"
        subTitle=`The password confirmation does not match`
    } else if (props.errorData === "missing_user_name"){
        title="Missing required data"
        subTitle="Name*"
    } else if (props.errorData === "missing_user_access_level"){
        title="Missing required data"
        subTitle=`Acess level*`
    } else if (props.errorData === "missing_user_user"){
        title="Missing required data"
        subTitle=`User*`
    } else if (props.errorData === "missing_user_password"){
        title="Missing required data"
        subTitle=`Password*`
    } else if (props.errorData === "invalid_email_format"){
        title="Invalid email format"
        subTitle=`Email*`
    } else if (props.errorData === "email_duplicated"){
        title=""
        subTitle=`Email address already in use`
    } else if (props.errorData === "user_duplicated"){
        title=""
        subTitle=`User already in use`
    } 
    

    return (
        <Modal
        open={openErrorModal} 
        onClose={() => closeErrorModal()}
        > 
            <Box sx={modalStyleSaveExternal}>
                <Box sx={modalStyleErrorInternal}>
                    <Typography align="center" variant="h6">
                        {title}
                    </Typography>
                    <Typography align="center" >
                        {subTitle}
                    </Typography>
                    <Box className={classes.finishButtons}>
                        <CancelButton
                        clicked={() => closeErrorModal(false)}
                        />
                    </Box> 
                </Box>
            </Box>
        </Modal>
    )
}