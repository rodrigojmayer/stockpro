import { Box, 
         Modal, 
         TextField, 
         Typography, 
        } from '@mui/material'; 
import { OkButton, 
         CancelButton, 
        } from './Buttons';
import { useStylesGlobal, modalStyleSaveExternal, modalStyleErrorInternal } from '../Styles'; 
import { useEffect, useState } from 'react';
import ErrorModal from './ErrorModal';
import SaveChanges from './SaveChanges';
import ManageForgottenPass1EnterEmail from './ManageForgottenPass1EnterEmail';
import ManageForgottenPass2EnterVerificationCode from './ManageForgottenPass2EnterVerificationCode';

// const INITIAL_CREATESTOCK_OPTIONS:DataCreateStockOptions = {
const INITIAL_FORGOTTENPASS_OPTIONS:any = {
    enterEmail: false,  
    enterVerificationCode: true,
    // alerts: true,    
    // customFields: true,
}

type ManageForgottenPassProps = {
    openManageForgottenPass: boolean;
    closeManageForgottenPass: (newData?: boolean) => void;
}

export default function ManageForgottenPass( props: ManageForgottenPassProps) {
    const { openManageForgottenPass, closeManageForgottenPass } = props;
    const { classes } = useStylesGlobal();
    const [emailForgottenPass, setEmailForgottenPass] = useState<string>("")
    const [verificationCode, setVerificationCode] = useState<string>("")
    
    const [openOptions, setOpenOptions] = useState<any>(INITIAL_FORGOTTENPASS_OPTIONS);

    const [openSaveChanges, setOpenSaveChanges] = useState(false); 
    const [messageBeforeSave, setMessageBeforeSave] = useState(""); 
    const [errorTextFields, setErrorTextFields] = useState({
        "email": false,
        "verification_code": false,
    });
    const [openErrorModal, setOpenErrorModal] = useState(false);
    const [errorData, setErrorData] = useState("");

    const handleEditEmailForgottenPass = (value: string) => {
        setEmailForgottenPass(value)
    }
    const handleEditverificationCode = (value: string) => {
        setVerificationCode(value)
    }
    
    const handleOkButton = async() => {
        setErrorTextFields({
            "email": false,
            "verification_code": false,
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
                    // closeForgottenPassModal(true)
                    // setEmailForgottenPass("")
                }
            }
        }
    };

    const handleCloseErrorModal = () => {
        setOpenErrorModal(false)
    }

    const handleCloseManageForgottenPass = () => {
        closeManageForgottenPass()
        setEmailForgottenPass("")
        setErrorTextFields((prevErrorTextFields: any) => ({
            ...prevErrorTextFields,
            email: false,
        }));
    }
    const handleOpenSaveChanges = () => {
        // console.log("stockNameTemp: ", stockNameTemp)

        // if(stockNameTemp===""){
        //     setOpenErrorModal(true)
        //     setErrorData("missing_data")
        // }else if(Number(stockAmountTemp)<0){
        //     setOpenErrorModal(true)
        //     setErrorData("negative_amount")
        // }
        // else{
        //     setOpenSaveChanges(true);
        // }
        setOpenSaveChanges(true);

    }
    const handleCloseSaveChanges = (ans?:boolean) => {
        if(ans){

        }
        setOpenSaveChanges(false);
    }

    const handleOpenOptions = (newData:  string) => {
        const updatedOptions = { ...openOptions };
        for (const key in updatedOptions) {
            if (Object.prototype.hasOwnProperty.call(updatedOptions, key)) 
            updatedOptions[key as keyof typeof updatedOptions] = (newData===key ? false : true );
        }
        setOpenOptions(updatedOptions);
    }
    useEffect(() => {
        setEmailForgottenPass('')
        setVerificationCode('')
    }, [openManageForgottenPass])
    
    return (
        <Modal
            open={openManageForgottenPass} 
            onClose={handleCloseManageForgottenPass}
        > 
            <Box sx={modalStyleSaveExternal}>
                <Box sx={modalStyleErrorInternal}>
                    
                <form
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                handleOkButton();
                                e.stopPropagation() 
                            }
                        }}
                    >
                        <SaveChanges
                            openSaveChanges={openSaveChanges}
                            closeSaveChanges={handleCloseSaveChanges} 
                            messageBeforeSave={messageBeforeSave}
                        />                    
                        <ErrorModal
                            openErrorModal={openErrorModal}
                            closeErrorModal={handleCloseErrorModal}
                            errorData={errorData} 
                        />
                        <Box margin="10px">  
                            <Typography variant='body1' align="center" >
                                Account recovery
                            </Typography> 
                            {/* <Typography variant='body2' align="center" >
                                Your account has been validated  
                            </Typography>  */}
                        </Box>
                        <ManageForgottenPass1EnterEmail 
                            hiddenPanel={openOptions.enterEmail}
                            openOptions={handleOpenOptions}

                            emailForgottenPass={emailForgottenPass}
                            emailForgottenPassChange={handleEditEmailForgottenPass}
                        />
                        <ManageForgottenPass2EnterVerificationCode 
                            hiddenPanel={openOptions.enterVerificationCode}
                            openOptions={handleOpenOptions}

                            verificationCode={verificationCode}
                            verificationCodeChange={handleEditverificationCode}
                        />
                        
                        <Box className={classes.finishButtons}>
                            <CancelButton
                            clicked={handleCloseManageForgottenPass}
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