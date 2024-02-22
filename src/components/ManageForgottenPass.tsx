import { Box, 
         Modal, 
         TextField, 
         Typography, 
        } from '@mui/material'; 
import { OkButton, 
         CancelButton, 
        } from './Buttons';
import { useStylesGlobal, modalStyleSaveExternal, modalStyleErrorInternal, modalStyleInternalForgottenPass, modalStyleInternal } from '../Styles'; 
import { useEffect, useState } from 'react';
import ErrorModal from './ErrorModal';
import SaveChanges from './SaveChanges';
import ManageForgottenPass1EnterEmail from './ManageForgottenPass1EnterEmail';
import ManageForgottenPass2EnterVerificationCode from './ManageForgottenPass2EnterVerificationCode';
import ManageForgottenPass3ChangePass from './ManageForgottenPass3ChangePass';
import ConfirmChangedPassModal from './ConfirmChangedPassModal';

const INITIAL_FORGOTTENPASS_OPTIONS:any = {
    enterEmail: true,  
    enterVerificationCode: false,
    changePass: false, 
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
    const [newPass, setNewPass] = useState<string>("")
    const [confirmNewPass, setConfirmNewPass] = useState<string>("")
    
    const [openOptions, setOpenOptions] = useState<any>(INITIAL_FORGOTTENPASS_OPTIONS);

    const [openSaveChanges, setOpenSaveChanges] = useState(false); 
    const [messageBeforeSave, setMessageBeforeSave] = useState(""); 
    const [errorTextFields, setErrorTextFields] = useState({
        "email": false,
        "verification_code": false,
        "new_password": false,
        "confirm_new_password": false,
    });
    const [openErrorModal, setOpenErrorModal] = useState(false);
    const [errorData, setErrorData] = useState("");
    const [opencloseConfirmChangedPassModal, setOpencloseConfirmChangedPassModal] = useState(false); 

    const handleEditEmailForgottenPass = (value: string) => {
        setErrorTextFields((prevErrorTextFields: any) => ({
            ...prevErrorTextFields,
            email: false,
        }));
        setEmailForgottenPass(value)
    }
    const handleEditVerificationCode = (value: string) => {
        setErrorTextFields((prevErrorTextFields: any) => ({
            ...prevErrorTextFields,
            verification_code: false,
        }));
        setVerificationCode(value)
    }
    const handleEditNewPass = (value: string) => {
        setErrorTextFields((prevErrorTextFields: any) => ({
            ...prevErrorTextFields,
            new_password: false,
        }));
        setNewPass(value)
    }
    const handleEditConfirmNewPass = (value: string) => {
        setErrorTextFields((prevErrorTextFields: any) => ({
            ...prevErrorTextFields,
            confirm_new_password: false,
        }));
        setConfirmNewPass(value)
    }
    const handleCloseErrorModal = () => {
        setOpenErrorModal(false)
    }
    
    const handleOkButton = async () => {

        if(openOptions.enterEmail){
            const sendEmailSuccess = await handleSendEmail();
            if(sendEmailSuccess)
                handleOpenOptions("enterVerificationCode");
        } else if (openOptions.enterVerificationCode) {
            const verificateCodeSuccess = await handleVerificateCode();
            if(verificateCodeSuccess)
                handleOpenOptions("changePass");
        }else if (openOptions.changePass) {
            const changePassSuccess = await handleChangePass();
            if(changePassSuccess)
                setOpencloseConfirmChangedPassModal(true)
        }
    }

    const handleSendEmail = async() => {
        // setErrorTextFields({
        //     "email": false,
        //     "verification_code": false,
        // });
        let loadingSuccess: boolean = false;
        if(emailForgottenPass===""){
            setOpenErrorModal(true)
            setErrorData("missing_email")
            setErrorTextFields((prevErrorTextFields: any) => ({
                ...prevErrorTextFields,
                email: true,
            }));
        } else {
            try{
                const response = await fetch(`http://localhost:4000/api/users/generateVerificationCodeForgottenPass`, {
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
            } 
        }
        console.log("loadingSuccess: ", loadingSuccess)
        return loadingSuccess
    };

    const handleVerificateCode = async() => {
        console.log("handling verificate code")
        console.log("emailForgottenPass: ", emailForgottenPass)
        let loadingSuccess: boolean = false;
        if(verificationCode===""){
            setOpenErrorModal(true)
            setErrorData("missing_verification_code")
            setErrorTextFields((prevErrorTextFields: any) => ({
                ...prevErrorTextFields,
                verification_code: true,
            }));
        } else {
            try{
                const response = await fetch(`http://localhost:4000/api/users/verifyCodeForgottenPass`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: emailForgottenPass,
                        verification_code: verificationCode,
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
            } 
        }
        console.log("loadingSuccess: ", loadingSuccess)
        return loadingSuccess
    }

    const handleChangePass = async() => {
        console.log("handling verificate code")
        console.log("emailForgottenPass: ", emailForgottenPass)
        let loadingSuccess: boolean = false;
        if(newPass===""){
            setOpenErrorModal(true)
            setErrorData("missing_new_pass")
            setErrorTextFields((prevErrorTextFields: any) => ({
                ...prevErrorTextFields,
                new_password: true,
            }));
        } else if(newPass.length<6){
            setOpenErrorModal(true)
            setErrorData("invalid_pass_format")
            setErrorTextFields((prevErrorTextFields: any) => ({
                ...prevErrorTextFields,
                new_password: true,
            }));
        } else if(confirmNewPass===""){
            setOpenErrorModal(true)
            setErrorData("missing_confirm_new_pass")
            setErrorTextFields((prevErrorTextFields: any) => ({
                ...prevErrorTextFields,
                confirm_new_password: true,
            }));
        } else if(newPass!==confirmNewPass){
            setOpenErrorModal(true)
            setErrorData("confirm_password_must_match")
            setErrorTextFields((prevErrorTextFields: any) => ({
                ...prevErrorTextFields,
                confirm_new_password: true,
            }));
        } else {
            try{
                const response = await fetch(`http://localhost:4000/api/users/changePassForgottenPass`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: emailForgottenPass,
                        verification_code: verificationCode,
                        new_pass: newPass,
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
            } 
        }
        console.log("loadingSuccess: ", loadingSuccess)
        return loadingSuccess
    }
    
    const handleOpenOptions = (newData:  string) => {
        const updatedOptions = { ...openOptions };
        for (const key in updatedOptions) {
            if (Object.prototype.hasOwnProperty.call(updatedOptions, key)) 
            updatedOptions[key as keyof typeof updatedOptions] = (newData===key ? true : false );
        }
        setOpenOptions(updatedOptions);
    }
    
    const handlecloseConfirmChangedPassModal = () => {
        setOpencloseConfirmChangedPassModal(false)
        handleCloseManageForgottenPass()
    }

    const handleCloseManageForgottenPass = () => {
        closeManageForgottenPass()
        setEmailForgottenPass("")
        setErrorTextFields((prevErrorTextFields: any) => ({
            ...prevErrorTextFields,
            email: false,
        }));
        handleOpenOptions("enterEmail")
    }

    useEffect(() => {
        if(INITIAL_FORGOTTENPASS_OPTIONS.enterEmail){
            setEmailForgottenPass('');
            setVerificationCode('');
            setNewPass('');
            setConfirmNewPass('');
        }
    }, [openManageForgottenPass])
    
    return (
        <Modal
            open={openManageForgottenPass} 
            onClose={handleCloseManageForgottenPass}
        > 
            <Box sx={modalStyleSaveExternal}>
                <Box sx={{...modalStyleErrorInternal, ...modalStyleInternalForgottenPass}}>
                    <form onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            handleOkButton();
                            e.stopPropagation() 
                        }
                    }}>
                        <ConfirmChangedPassModal
                            openConfirmChangedPassModal={opencloseConfirmChangedPassModal}
                            closeConfirmChangedPassModal={handlecloseConfirmChangedPassModal} 
                        />                  
                        <ErrorModal
                            openErrorModal={openErrorModal}
                            closeErrorModal={handleCloseErrorModal}
                            errorData={errorData} 
                        />
                        <Box marginTop="10px">  
                            <Typography variant='h6' align="center" >
                                Account recovery
                            </Typography> 
                        </Box>
                        <ManageForgottenPass1EnterEmail 
                            hiddenPanel={!openOptions.enterEmail}

                            emailForgottenPass={emailForgottenPass}
                            emailForgottenPassChange={handleEditEmailForgottenPass}

                            errorTextFields={errorTextFields}
                        />
                        <ManageForgottenPass2EnterVerificationCode 
                            hiddenPanel={!openOptions.enterVerificationCode}
                            
                            emailForgottenPass={emailForgottenPass}
                            verificationCode={verificationCode}
                            verificationCodeChange={handleEditVerificationCode}

                            errorTextFields={errorTextFields}
                        />
                        <ManageForgottenPass3ChangePass 
                            hiddenPanel={!openOptions.changePass}

                            newPass={newPass}
                            newPassChange={handleEditNewPass}
                            confirmNewPass={confirmNewPass}
                            confirmNewPassChange={handleEditConfirmNewPass}
                            
                            errorTextFields={errorTextFields}
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