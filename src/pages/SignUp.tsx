import { useState, useContext, useEffect, useRef, useLayoutEffect  } from "react";
import { NavLink } from "react-router-dom";
import { Box,
        Divider,
        Modal,
        IconButton,
        TextField,
        Typography,
        Switch
        } from "@mui/material";
import { OkButton, SelectLanguageButton } from '../components/Buttons';
import SaveChanges from '../components/SaveChanges';
import ErrorModal from '../components/ErrorModal';
import { useStylesGlobal, modalStyleSaveExternal, modalStyleSignUpExternal, modalStyleErrorInternal, modalLoginInternal } from "../Styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { UserContext } from "../context/UserContext";
import { IsLoadingContext } from "../context/IsLoadingContext";
// import { RememberLabelUsersData, RememberUserData, RememberUsersPassData, UserData, UserEditData } from "../types";
import { UserData, UserEditData } from "../types";
import useAddUser from "../hooks/addUser";
import ConfirmCreatedUserModal from "../components/ConfirmCreatedUserModal";
import ConfirmTermsAndPrivacyModal from "../components/ConfirmTermsAndPrivacyModal";
import Paper from '@mui/material/Paper/Paper';
import { LanguageLabelsContext } from '../context/LanguageLabelsContext';

export default function SignUp () {
    // const addUser = useAddUser(); 
    const postUser = useAddUser(); 
    
    const { classes } = useStylesGlobal();
    const {  user } = useContext<any>(UserContext);
    const { labelsSignUp } = useContext<any>(LanguageLabelsContext)
  // const { isLogged, login }
    const { INITIAL_USER, gmailUserLogged, setGmailUserLogged, _IdUserLogged, set_IdUserLogged } = useContext<any>(UserContext); 
    const { isLoading, setIsLoading } = useContext<any>(IsLoadingContext);
    const [errorTextFields, setErrorTextFields] = useState({
        "user": false,
        "email": false,
        "pass": false,
        "confirmPass": false,
        "termsAndPrivacy": false
    });
    const [openSaveChanges, setOpenSaveChanges] = useState(false);
    const [openErrorModal, setOpenErrorModal] = useState(false);
    const [errorData, setErrorData] = useState("");
    const [userState, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [showProfilePass, setShowProfilePass] = useState<boolean>(false);
    const [showProfileConfirmPass, setShowProfileConfirmPass] = useState<boolean>(false);
    const [termsAndPrivacy, setTermsAndPrivacy] = useState<boolean>(false);
    // const [rememberUser, setRememberUser] = useState<RememberUserData>({enabled:false});
    // const [rememberLabelUsers, setRememberLabelUsers] = useState<RememberLabelUsersData[]>([]);
    // const [rememberUsersPass, setRememberUsersPass] = useState<RememberUsersPassData[] | any>();
    const [openConfirmCreatedUserModal, setOpenConfirmCreatedUserModal] = useState<any>(false);
    const [openConfirmTermsAndPrivacyModal, setOpenConfirmTermsAndPrivacyModal] = useState<any>(false);
    const firstInputRef = useRef<HTMLInputElement>(null)

    const [stockNameTemp, setStockNameTemp] = useState<any>();
     
    // Get the keys from localStorage
    let localStorageKeys = Object.keys(localStorage)
    // let varrememberUsersPass: any[] = []
  
    // useEffect(() => {
    //   // Define a filter criterion
    //   const filterCriterion = 'remember_profile_'
    //   // Filter the localStorage keys based on the criterion
    //   const filteredKeys = localStorageKeys.filter(key => {
    //     // Check if the key matches your criteria
    //     return key.startsWith(filterCriterion)
    //   })
    //   let storedUserEmail=[]
    //   for(const key of filteredKeys) {
    //     const storedData = localStorage.getItem(key)
    //     if (storedData) {
    //       const parsedData = JSON.parse(storedData)
    //       storedUserEmail.push({"label": parsedData.user_email})
    //       varrememberUsersPass.push(parsedData) 
    //     }
    //     setRememberLabelUsers(storedUserEmail) 
    //     setRememberUsersPass(varrememberUsersPass)
    //   }
    // }, [])
    const [ reloadUseEffect, setReloadUseEffect] = useState(true)
    useEffect (() => {
        if (firstInputRef.current) {
            firstInputRef.current.focus()
        } else {
            setReloadUseEffect(!reloadUseEffect)
        }
    }, [firstInputRef.current, reloadUseEffect])
    
    const showProfilePassToggle = () => {
        setShowProfilePass(!showProfilePass)
    }
    const showProfileConfirmPassToggle = () => {
        setShowProfileConfirmPass(!showProfileConfirmPass)
    }
    const termsAndPrivacyEnabledChange = () => {
        setTermsAndPrivacy(!termsAndPrivacy)
        setErrorTextFields((prevErrorTextFields: any) => ({
            ...prevErrorTextFields,
            termsAndPrivacy: false,
        }));
    }
    // const rememberEnabledChange = (value: boolean) => {
    //     setRememberUser((prevRememberUser: RememberUserData) => ({
    //         ...prevRememberUser,
    //         enabled: value
    //     }))
    // }
    
    const handleUser = (value: string) => {
        setUser(value)
        // setRememberUser((prevRememberUser: RememberUserData) => ({
        //     ...prevRememberUser,
        //     userState: value
        // }))
        setErrorTextFields((prevErrorTextFields: any) => ({
            ...prevErrorTextFields,
            user: false,
        }));
    }
    const handleEmail = (value: string) => {
        setEmail(value)
        // setRememberUser((prevRememberUser: RememberUserData) => ({
        //     ...prevRememberUser,
        //     email: value
        // }))
        setErrorTextFields((prevErrorTextFields: any) => ({
            ...prevErrorTextFields,
            email: false,
        }));
    }
    const handlePass = (value: string) => {
        setPass(value)
        setErrorTextFields((prevErrorTextFields: any) => ({
            ...prevErrorTextFields,
            pass: false,
        }));
    }
    const handleConfirmPass = (value: string) => {
        setConfirmPass(value)
        setErrorTextFields((prevErrorTextFields: any) => ({
            ...prevErrorTextFields,
            confirmPass: false,
        }));
    }
    

    // const handleSignUp = () => {
    const handleOpenSaveChanges = () => {
        setErrorTextFields({
            "user": false,
            "email": false,
            "pass": false,
            "confirmPass": false,
            "termsAndPrivacy": false
        });
        if(userState===""){
            setOpenErrorModal(true)
            setErrorData("missing_user_name")
            setErrorTextFields((prevErrorTextFields: any) => ({
                ...prevErrorTextFields,
                user: true,
            }));
        }else if(email===""){
            setOpenErrorModal(true)
            setErrorData("missing_email")
            setErrorTextFields((prevErrorTextFields: any) => ({
                ...prevErrorTextFields,
                email: true,
            }));
        }else if(pass===""){
            setOpenErrorModal(true)
            setErrorData("missing_user_password")
            setErrorTextFields((prevErrorTextFields: any) => ({
                ...prevErrorTextFields,
                pass: true,
            }));
        }else if(confirmPass==="" || confirmPass !== pass){
            setOpenErrorModal(true)
            setErrorData("confirm_password_must_match")
            setErrorTextFields((prevErrorTextFields: any) => ({
                ...prevErrorTextFields,
                confirmPass: true,
            }));
        }else if(!termsAndPrivacy){
            setOpenErrorModal(true)
            setErrorData("missing_terms_and_privacy")
            setErrorTextFields((prevErrorTextFields: any) => ({
                ...prevErrorTextFields,
                termsAndPrivacy: true,
            }));
        }else{
            setOpenSaveChanges(true);
        }
    }

    const handleCloseSaveChanges = (ans?:boolean) => {
        if(ans){
            // postClient()
            const bodyCreate: UserEditData = {}
            bodyCreate.deleted = false
            bodyCreate.language =  1    //  FIX LANGUAGE SELECTED
            bodyCreate.background_color = 0
            bodyCreate.alerts_enabled = false
            bodyCreate.ordered_fields = [-1,-2,-3,-4,-5]
            // bodyCreate.id_access_level = 3
            bodyCreate.user = userState
            bodyCreate.email = email
            bodyCreate.enabled = true
            bodyCreate.pass = pass

            const createUser = async() => {
                const rta = await postUser(bodyCreate);
                // console.log("rta: ", rta)
                if(rta.loadingSuccess)
                    setOpenConfirmCreatedUserModal(true);
                else{
                    // console.error(rta.errorCode)
                    // console.error(rta.field)
                    setOpenErrorModal(true) // Open the modal for duplicate product error
                    setErrorData(rta.errorCode)
                    setErrorTextFields((prevErrorTextFields: any) => ({
                        ...prevErrorTextFields,
                        [rta.field]: true,
                    }));
                }
            };
            createUser();
        }
        setOpenSaveChanges(false);
    }

    const handleCloseErrorModal = () => {
        setOpenErrorModal(false)
    }

    const handleCloseConfirmCreatedUserModal = () => {
        setOpenConfirmCreatedUserModal(false)
    }
    const handleCloseConfirmTermsAndPrivacyModal = () => {
        setOpenConfirmTermsAndPrivacyModal(false)
    }
    
    
/////////// AAAAAAAAAAADDDDDDDDDDEmail format error 
/////////// AAAAAAAAAAADDDDDDDDDD ConfirmCreatedUserModal send email of confirmation before to enable the user, and if is not confirmated in the next 15 minutes should delete the user an the client creates(?)

    return (
        <Modal 
            className={`${classes[`_${user.background_color}main_background_color` as keyof typeof classes]} ${classes[`_${user.background_color}modal_color` as keyof typeof classes]}`}
            open={true} 
        >
            <form
                onKeyDown={(e:any) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        handleOpenSaveChanges(); 
                        e.stopPropagation();
                    }
                }}
            >
                <SelectLanguageButton
                    clicked={()=>console.log("update")}
                />
                <Paper style={{margin:0}} >
                    <Box sx={{ ...modalStyleSaveExternal, ...modalStyleSignUpExternal}}>
                        <Box 
                            sx={{ ...modalStyleErrorInternal, ...modalLoginInternal }}
                            className={`${classes[`_${user.background_color}main_background_color` as keyof typeof classes]} ${classes[`_${user.background_color}modal_color` as keyof typeof classes]}`}
                        >
                            <SaveChanges
                                openSaveChanges={openSaveChanges}
                                closeSaveChanges={handleCloseSaveChanges} 
                            />
                            <ErrorModal
                                openErrorModal={openErrorModal}
                                closeErrorModal={handleCloseErrorModal}
                                errorData={errorData} 
                            />
                            <ConfirmCreatedUserModal
                                openConfirmCreatedUserModal={openConfirmCreatedUserModal}
                                closeConfirmCreatedUserModal={handleCloseConfirmCreatedUserModal}
                                source={"Confirm created user"}
                                data={stockNameTemp} 
                                // confirmCreatedUser={handleConfirmDelete}
                                
                            />
                            <ConfirmTermsAndPrivacyModal
                                openConfirmTermsAndPrivacyModal={openConfirmTermsAndPrivacyModal}
                                closeConfirmTermsAndPrivacyModal={handleCloseConfirmTermsAndPrivacyModal}
                                handleSetTermsAndPrivacy={setTermsAndPrivacy}
                            />
                            <Typography className={classes.finishButtons} align="center" variant='h5'>
                                {labelsSignUp.sign_up}
                            </Typography>
                            <Box className={classes.customBoxColumn}>
                                <Box className={classes.customBoxRow}>
                                    <TextField
                                        label={labelsSignUp.username}
                                        value={userState}
                                        onChange={ (event:any) => handleUser(event.target.value)}
                                        maxRows={1}
                                        size="small"
                                        type="text"
                                        className= {`${errorTextFields.user ? classes.text_field_error : ""} ${classes.inputMainData} `}
                                        InputProps={{
                                            className: classes.inputClassName,
                                            inputProps: {maxLength: 20}
                                        }}
                                        inputRef={firstInputRef}
                                        // inputRef={firstInputRef ? 
                                        //     (firstInputRef.current) ?
                                        //     input => input && input.select() : firstInputRef: undefined}
                                        // autoFocus={false} // This prop can be set to false because we're manually focusing.
                                    />

                                </Box>
                                <Box className={classes.customBoxRow}>
                                    <TextField
                                        label={labelsSignUp.email}
                                        value={email}
                                        onChange={ (event:any) => handleEmail(event.target.value)}
                                        maxRows={1}
                                        size="small"
                                        type="email"
                                        className= {`${errorTextFields.email ? classes.text_field_error : ""} ${classes.inputMainData} `}
                                        InputProps={{
                                            className: classes.inputClassName,
                                        }}
                                    />
                                </Box>
                                <Box className={classes.customBoxRow}>
                                    <TextField
                                        label={labelsSignUp.password}
                                        maxRows={1}
                                        size="small"
                                        value={pass}
                                        type={ showProfilePass ? "text" : "password" }
                                        onChange={ (event:any) => handlePass(event.target.value) }
                                        className= {`${errorTextFields.pass ? classes.text_field_error : ""} ${classes.inputMainData} `}
                                        InputProps={{
                                            className: classes.inputClassName,
                                            endAdornment: (
                                            <IconButton onClick={showProfilePassToggle}>
                                                {showProfilePass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                            </IconButton>
                                            ),
                                            inputProps: {maxLength: 25}
                                        }}
                                    />
                                </Box>
                                <Box className={classes.customBoxRow}>
                                    <TextField
                                        label={labelsSignUp.confirm_password}
                                        maxRows={1}
                                        size="small"
                                        value={confirmPass}
                                        type={ showProfileConfirmPass ? "text" : "password" }
                                        onChange={ (event:any) => handleConfirmPass(event.target.value) }
                                        className= {`${errorTextFields.confirmPass ? classes.text_field_error : ""} ${classes.inputMainData} `}
                                        InputProps={{
                                            className: classes.inputClassName,
                                            endAdornment: (
                                                <IconButton onClick={showProfileConfirmPassToggle}>
                                                    {showProfileConfirmPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                </IconButton>
                                            ),
                                        }}
                                    />
                                </Box>
                                {/* <Box> */}
                                <Box className={classes.customBoxRow}>
                                    <Box>
                                        {labelsSignUp.by_creating_account}
                                        <br/>
                                        <NavLink 
                                            className={classes._0link_color}
                                            to="/signup"
                                            onClick={() => setOpenConfirmTermsAndPrivacyModal(true)}
                                        >
                                            {labelsSignUp.terms_privacy}
                                        </NavLink>
                                        <Switch 
                                            color='success' 
                                            className= {`${errorTextFields.termsAndPrivacy ? classes.switch_error : ""} `}
                                            checked={termsAndPrivacy}
                                            onChange={termsAndPrivacyEnabledChange}
                                        /> 
                                    </Box>
                                </Box>
                                <Box className={classes.customBoxRow} >
                                {/* <Box className={classes.customBoxRowSpaceBetween}> */}
                                    {/* <Box>
                                        <Switch 
                                            color='success' 
                                            checked={rememberUser.enabled}
                                            onChange={(event) => {
                                                rememberEnabledChange(event.target.checked)
                                            }}
                                        />Remember me 
                                    </Box> */}
                                    <OkButton
                                        // clicked={() => handleSignUp()}
                                        clicked={() => handleOpenSaveChanges()}
                                        widthIco={100}
                                    />
                                </Box>
                                <Box className={classes.customBoxRow}>
                                    <Divider 
                                        className={classes.customDivider} 
                                        variant="middle" 
                                    />
                                </Box>
                                <Box className={classes.customBoxRow} sx={{ typography: 'subtitle2' }}>
                                {/* <Box  */}
                                    {labelsSignUp.already_account}
                                    <NavLink 
                                        className={classes._0link_color}
                                        to="/login"
                                    >
                                        {labelsSignUp.login}
                                    </NavLink> 
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Paper>
            </form>
        </Modal>
    )
}