import { Box,
         Modal, 
         Typography,
        } from '@mui/material';
import { 
         CancelButton, 
        } from './Buttons';
import { useStylesGlobal, modalStyleSaveExternal, modalStyleErrorInternal } from '../Styles'
// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type ErrorModalProps = {
    openErrorModal: boolean;
    closeErrorModal: (newData?: boolean) => void;
    errorData: string
}
export default function ErrorModal( props: ErrorModalProps) {
    const { openErrorModal, closeErrorModal, errorData } = props;
    const { classes } = useStylesGlobal();
    let title = ""
    let subTitle = ""
    const navigate = useNavigate()
    // Mising, invalid format, duplicated

    if(errorData === "missing_data"){
        title="Missing required data"
        subTitle="Name*"
    } else if (errorData === "negative_amount"){
        title="Shortfall"
        subTitle=`The amount cannot be negative`
    } else if (errorData === "missing_data_user"){
        title="Missing required data"
        subTitle=`Alias`
    } else if (errorData === "missing_user_name"){
        title="Missing required data"
        subTitle="Name*"
    } else if (errorData === "missing_user_access_level"){
        title="Missing required data"
        subTitle=`Acess level*`
    } else if (errorData === "missing_user_user"){
        title="Missing required data"
        subTitle=`User*`
    // } else if (errorData === "missing_user_password"){
    //     title="Missing required data"
    //     subTitle=`Password*`
    } else if (errorData === "missing_email"){
        title="Missing required data"
        subTitle=`Email*`
    } else if (errorData === "missing_user_name_email"){
        title="Missing required data"
        subTitle=`Username or email*`
    } else if (errorData === "confirm_password_must_match"){
        title="Confirm password must match"
        subTitle=`Confirm password*`
    } else if (errorData === "missing_terms_and_privacy"){
        title="Must accept terms and privacy"
        subTitle=`Terms and privacy*`
    } else if (errorData === "invalid_email_format"){
        title="Invalid email format"
        subTitle=``
    } else if (errorData === "email_duplicated"){
        title=""
        subTitle=`Email address already in use`
    } else if (errorData === "user_duplicated"){
        title=""
        subTitle=`User already in use`
    } else if (errorData === "user_deleted"){
        title=""
        subTitle=`User deleted`
    }  else if (errorData === "user_disabled"){
        title=""
        subTitle=`User disabled`
    } else if (errorData === "login_failed"){
        title="Login failed"
        subTitle=`User or password incorrect`
    } else if (errorData === "missing_actual_pass"){
        title="Missing required data"
        subTitle=`Actual password*`
    } else if (errorData === "missing_new_pass"){
        title="Missing required data"
        subTitle=`New password*`
    } else if (errorData === "missing_confirm_new_pass"){
        title="Missing required data"
        subTitle=`Confirm new password*`
    } else if (errorData === "not_confirmed_pass"){
        // title="Not confirmed password"
        subTitle=`The password confirmation does not match`
    }  else if (errorData === "invalid_password"){
        title=""
        subTitle=`Actual password incorrect`
    }  else if (errorData === "email_not_found"){
        title=""
        subTitle=`Email not found`
    } else if (errorData === "expired_validation"){
        title="Invalid activation link"
        subTitle=`You can sign up again.`
    } else if (errorData === "invalid_user_format"){
        title="Invalid user format"
        subTitle=`Contains invalid characters.`
    } else if (errorData === "invalid_pass_format"){
        title="Invalid password format"
        subTitle=`It must have at least 6 characters.`
    } else if (errorData === "missing_verification_code"){
        title="Missing required data"
        subTitle=`Verification code*.`
    } else if (errorData === "expired_code_validation"){
        title="Expired code validation"
        // subTitle=`You can sign up again.`
    } else if (errorData === "invalid_code"){
        title="Invalid code validation"
        // subTitle=`You can sign up again.`
    }
    
    const handleCloseErrorModal = () => {

        closeErrorModal()            
        if (errorData === "expired_validation") {
            navigate('/signup')
        }
    }

    return (
        <Modal
        open={openErrorModal} 
        onClose={() => handleCloseErrorModal()}
        > 
            <form
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.code === "Space") {
                        e.preventDefault();
                        handleCloseErrorModal();
                        e.stopPropagation() 
                    }
                }}
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
                            clicked={() => handleCloseErrorModal()}
                            />
                        </Box> 
                    </Box>
                </Box>
            </form>
        </Modal>
    )
}