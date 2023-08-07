import { Box,
         Modal, 
         Typography,
        } from '@mui/material';
import { 
         CancelButton, 
        } from './Buttons';
import { useStylesGlobal, modalStyleSaveExternal, modalStyleErrorModalInternal } from '../Styles'
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
    }

    return (
        <Modal
        open={openErrorModal} 
        onClose={() => closeErrorModal()}
        > 
            <Box sx={modalStyleSaveExternal}>
                <Box sx={modalStyleErrorModalInternal}>
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