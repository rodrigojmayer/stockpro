import { Box,
         Modal, 
         TextField, 
         Typography,
         IconButton,
        } from '@mui/material';
import { OkButton,
         CancelButton, 
        } from './Buttons';
import { useStylesGlobal, modalStyleSaveExternal, modalStyleSaveInternal, modalStyleExternal, modalStyleInternal, modalStyleChangePassExternal, modalStyleChangePassInternal } from '../Styles'
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { CheckListStockContext } from '../context/CheckListStockContext';
import { IsLoadingContext } from '../context/IsLoadingContext';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ErrorModal from './ErrorModal';
import SaveChanges from './SaveChanges';
import ConfirmChangedPassModal from './ConfirmChangedPassModal';


type ChangePassModalProps = {
    openChangePassModal: boolean;
    closeChangePassModal: (newData?: boolean) => void;
}
export default function ChangePassModal( props: ChangePassModalProps) {
    const { openChangePassModal, closeChangePassModal } = props;
    const { classes } = useStylesGlobal();
    // console.log("props: ", props)
    const [errorTextFields, setErrorTextFields] = useState({
        "actualPass": false,
        "newPass": false,
        "confirmNewPass": false,
    });

    const { user, setUser } = useContext<any>(UserContext);
    const { checkListStock, setCheckListStock } = useContext<any>(CheckListStockContext)
    const { isLoading, setIsLoading, openBackdrop, setOpenBackdrop } = useContext<any>(IsLoadingContext)
    
    const[ actualPass, setActualPass ] = useState<string>("")
    const[ showActualPass, setShowActualPass ] = useState<boolean>(false)
    const[ newPass, setNewPass ] = useState<string>("")
    const[ showNewPass, setShowNewPass ] = useState<boolean>(false)
    const[ confirmNewPass, setConfirmNewPass ] = useState<string>("")
    const[ showConfirmNewPass, setShowConfirmNewPass ] = useState<boolean>(false)

    const [openSaveChanges, setOpenSaveChanges] = useState(false);  
    const [openErrorModal, setOpenErrorModal] = useState(false);  
    const [errorData, setErrorData] = useState(""); 
    const [opencloseConfirmChangedPassModal, setOpencloseConfirmChangedPassModal] = useState(false);  
    

    const handleEditActualPass = (event: React.ChangeEvent<HTMLInputElement>) => {
        setActualPass(event.target.value);
    }
    const handleEditNewPass = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPass(event.target.value);
    }
    const handleEditConfirmNewPass = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmNewPass(event.target.value);
    }

    const showActualPassToggle = () => {
        setShowActualPass(!showActualPass)
    }
    const showNewPassToggle = () => {
        setShowNewPass(!showNewPass)
    }
    const showConfirmNewPassToggle = () => {
        setShowConfirmNewPass(!showConfirmNewPass)
    }

    const handleCloseErrorModal = () => {
        setOpenErrorModal(false);
    }

    const handleOpenSaveChanges = () => {
        setErrorTextFields({
            "actualPass": false,
            "newPass": false,
            "confirmNewPass": false,
        });
        if(actualPass===""){
            setOpenErrorModal(true);
            setErrorData("missing_actual_pass");
            setErrorTextFields((prevErrorTextFields: any) => ({
                ...prevErrorTextFields,
                actualPass: true,
            }));
        } else if (newPass===""){
            setOpenErrorModal(true)
            setErrorData("missing_new_pass")
            setErrorTextFields((prevErrorTextFields: any) => ({
                ...prevErrorTextFields,
                newPass: true,
            }));
        }else if (confirmNewPass===""){
            setOpenErrorModal(true)
            setErrorData("missing_confirm_new_pass")
            setErrorTextFields((prevErrorTextFields: any) => ({
                ...prevErrorTextFields,
                confirmNewPass: true,
            }));
        }else if(newPass!==confirmNewPass){
            setOpenErrorModal(true);
            setErrorData("not_confirmed_pass");
        }
        else{
            setOpenSaveChanges(true);
        }
    };

    const handleCloseSaveChanges = (ans?:boolean) => {
        if(ans){
            // const bodyUpdate: UserEditData = {};
            // if(user.pass!=profilePass)
            //     bodyUpdate.pass = profilePass;
            const fetchChangePass = async () => {
                let loadingSuccess: boolean = false
                try {
                    const response = await fetch(`${import.meta.env.VITE_API_URL_BACKEND}/users/changePass`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json', // Set the appropriate content-type for my API
                            // Add any other requires headers here
                        },
                        // body:JSON.stringify(bodyUpdate)
                        body:JSON.stringify({
                            _id: user._id,
                            actualPass,
                            newPass,
                        })
                    })

                    // Check if the response status is successful
                    if (response.ok) {
                        // const responseData = await response.json(); // parse the response data
                        // console.log('POST request successful: ', responseData)
                        loadingSuccess = true;
                        // const updatedUser = {
                        //     ...user,
                        //     // ...bodyUpdate
                        // }
                        // setUser(updatedUser)
                    } else {
                        // Handle non-successful responses
                        const errorData = await response.json()
                        console.error('Request failed errorData: ', errorData);
                        console.error('Request failed response: ', response);
                        console.error('Request failed: ', response.status, response.statusText);
                        // Handle the error here
                        setOpenErrorModal(true) // Open the modal for duplicate product error
                        setErrorData(errorData.errorCode)
                        setErrorTextFields((prevErrorTextFields: any) => ({
                            ...prevErrorTextFields,
                            [errorData.field]: true,
                        }));
                    }
                } catch (error: unknown) {
                    if (typeof error === 'string') {
                        // 'error' is now narrowed down to type 'string'
                        console.error('Error:', error);
                    } else if (error instanceof Error) {
                        // 'error' is now narrowed down to type 'Error'
                        console.error('Error object:', error.message);
                    } else {
                        // Handle other cases as needed
                    }
                } finally {
                    // setIsLoading(())
                    setIsLoading((prevLoading: any) => ({
                        ...prevLoading,
                        fieldsFetchCreateStock: loadingSuccess,
                    }));
                    setCheckListStock([]);
                    if(loadingSuccess){
                        setOpencloseConfirmChangedPassModal(true)
                    }
                }
            } 
            fetchChangePass();
        }
        
        setOpenSaveChanges(false);
    }

    const handlecloseConfirmChangedPassModal = () => {
        setOpencloseConfirmChangedPassModal(false)
        closeChangePassModal()
    }

    return (
        <Modal
        sx={{backgroundColor: 'rgba(0, 0, 0, .5)'}}
        open={openChangePassModal} 
        onClose={() => closeChangePassModal()}
        > 
            <form
                onKeyDown={(e:any) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        closeChangePassModal(true); // Call your save function?
                        e.stopPropagation()
                    }
                }}
            >
                <Box sx={{...modalStyleExternal, ...modalStyleChangePassExternal}}>
                    <Box sx={{...modalStyleInternal, ...modalStyleChangePassInternal}}>
                    
                        <SaveChanges
                            openSaveChanges={openSaveChanges}
                            closeSaveChanges={handleCloseSaveChanges} 
                        />
                        <ConfirmChangedPassModal
                            openConfirmChangedPassModal={opencloseConfirmChangedPassModal}
                            closeConfirmChangedPassModal={handlecloseConfirmChangedPassModal} 
                        />
                        <ErrorModal
                            openErrorModal={openErrorModal}
                            closeErrorModal={handleCloseErrorModal}
                            errorData={errorData} 
                        />
                        <Typography align="center" variant="h6" className={classes.title}>
                            Change Password
                        </Typography>
                        <Box className={classes.customBoxColumn}>
                            <Box className={classes.customBoxRow}>
                                <TextField
                                    label="Actual password*"
                                    maxRows={1}
                                    size="small"
                                    type={showActualPass ? "text" : "password"}
                                    className= {`${errorTextFields.actualPass ? classes.text_field_error : ""} ${classes.inputMainData} `}
                                    // className={classes.inputMainData}
                                    value={actualPass}
                                    onChange={ handleEditActualPass }
                                    InputProps={{
                                        className: classes.inputClassName,
                                        inputProps: {maxLength: 25}, 
                                        endAdornment: (
                                            <IconButton onClick={showActualPassToggle}>
                                                {showActualPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                            </IconButton>
                                        ),
                                    }}
                                />
                            </Box>
                            <Box className={classes.customBoxRow}>
                                <TextField
                                    label="New password*"
                                    maxRows={1}
                                    size="small"
                                    type={showNewPass ? "text" : "password"}
                                    className= {`${errorTextFields.newPass ? classes.text_field_error : ""} ${classes.inputMainData} `}
                                    // className={classes.inputMainData}
                                    value={newPass}
                                    onChange={ handleEditNewPass }
                                    InputProps={{
                                        className: classes.inputClassName,
                                        inputProps: {maxLength: 25}, 
                                        endAdornment: (
                                            <IconButton onClick={showNewPassToggle}>
                                                {showNewPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                            </IconButton>
                                        ),
                                    }}
                                />
                            </Box>
                            <Box className={classes.customBoxRow}>
                                <TextField
                                    label="Confirm new password*"
                                    maxRows={1}
                                    size="small"
                                    type={showConfirmNewPass ? "text" : "password"}
                                    className= {`${errorTextFields.confirmNewPass ? classes.text_field_error : ""} ${classes.inputMainData} `}
                                    // className={classes.inputMainData}
                                    value={confirmNewPass}
                                    onChange={ handleEditConfirmNewPass }
                                    InputProps={{
                                        className: classes.inputClassName,
                                        inputProps: {maxLength: 25}, 
                                        endAdornment: (
                                            <IconButton onClick={showConfirmNewPassToggle}>
                                                {showConfirmNewPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                            </IconButton>
                                        ),
                                    }}
                                />
                            </Box>
                        </Box>
                        <Box className={classes.finishButtons}>
                            <CancelButton
                            clicked={() => closeChangePassModal()}
                            />
                            <OkButton
                            clicked={() => handleOpenSaveChanges()}
                            />
                        </Box> 
                    </Box>
                </Box>
            </form>
        </Modal>
    )
}