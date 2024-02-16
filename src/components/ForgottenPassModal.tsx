import { Box, 
         Modal, 
         TextField, 
         Typography, 
        } from '@mui/material';
import { OkButton, 
         CancelButton, 
        } from './Buttons';
import { useStylesGlobal, modalStyleSaveExternal, modalStyleErrorInternal } from '../Styles'
import { useState } from 'react';
import ErrorModal from './ErrorModal';

type ForgottenPassModalProps = {
    openForgottenPassModal: boolean;
    closeForgottenPassModal: (newData?: boolean) => void;
}
export default function ForgottenPassModal( props: ForgottenPassModalProps) {
    const { openForgottenPassModal, closeForgottenPassModal } = props;
    const { classes } = useStylesGlobal();
    const [emailForgottenPass, setEmailForgottenPass] = useState<string>("")
    const [errorTextFields, setErrorTextFields] = useState({
        "email": false,
    });
    const [openErrorModal, setOpenErrorModal] = useState(false);  
    const [errorData, setErrorData] = useState(""); 

    const handleEditEmailForgottenPass = (value: string) => {
        setEmailForgottenPass(value)
    }

    const handleOkButton = async() => {
        setErrorTextFields({
            "email": false,
        });
        if(emailForgottenPass===""){
            setOpenErrorModal(true)
            setErrorData("missing_email")
            setErrorTextFields((prevErrorTextFields: any) => ({
                ...prevErrorTextFields,
                email: true,
            }));
        }
        else{

            let loadingSuccess: boolean = false
            try{

                const response = await fetch(`http://localhost:4000/api/users/forgottenPass`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: emailForgottenPass
                    })
                })

                const responseData = await response.json()
                if(response.ok){
                    console.log("request ok: ", responseData)
                    loadingSuccess=true
                } else {
                    console.log("error: ", responseData)
                    setOpenErrorModal(true)
                    setErrorData(responseData.errorCode)
                    setErrorTextFields((prevErrorTextFields: any) => ({
                        ...prevErrorTextFields,
                        [responseData.field]: true,
                    }));
                }
            } catch (err: unknown) {
                console.log("err: ", err)
            } finally {
                if(loadingSuccess){
                    closeForgottenPassModal(true)
                    setEmailForgottenPass("")
                }
            }
        }
    };
    
    const handleCloseErrorModal = () => {
        setOpenErrorModal(false)
    }

    const handleCloseForgottenPassModal = () => {
        closeForgottenPassModal()
        setEmailForgottenPass("")
        setErrorTextFields((prevErrorTextFields: any) => ({
            ...prevErrorTextFields,
            email: false,
        }));
    }
    
    return (
        <Modal
            open={openForgottenPassModal} 
            onClose={handleCloseForgottenPassModal}
        > 
            <Box sx={modalStyleSaveExternal}>
                <Box sx={modalStyleErrorInternal}>
                    <Box 
                        margin="20px 10px"
                    >
                        <ErrorModal
                            openErrorModal={openErrorModal}
                            closeErrorModal={handleCloseErrorModal}
                            errorData={errorData} 
                        />
                        <Typography variant='body1' align="center" >
                            Account recovery
                        </Typography> 
                        {/* <Typography variant='body2' align="center" >
                            Your account has been validated  
                        </Typography>  */}
                    </Box>
                    <form
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                handleOkButton();
                                e.stopPropagation() 
                            }
                        }}
                    >
                        <Box className={classes.customBoxColumn}>
                                <Box className={classes.customBoxRow}>
                                    <TextField
                                        label="Email"
                                        maxRows={1}
                                        size="small"
                                        type= "text"
                                        className= {`${errorTextFields.email ? classes.text_field_error : ""} ${classes.inputMainData} `}
                                        value={emailForgottenPass}
                                        onChange={ (event) => handleEditEmailForgottenPass(event.target.value) }
                                        InputProps={{
                                            className: classes.inputClassName,
                                            // endAdornment: (
                                                // <IconButton onClick={showActualPassToggle}>
                                                //     {showActualPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                // </IconButton>
                                            // ),
                                        }}
                                    />
                                </Box>
                            </Box>
                        <Box className={classes.finishButtons}>
                            <CancelButton
                            clicked={handleCloseForgottenPassModal}
                            />
                            <OkButton
                                clicked={() => handleOkButton()}
                            />
                        </Box> 
                    </form>
                </Box>
            </Box>
        </Modal>
    )
}