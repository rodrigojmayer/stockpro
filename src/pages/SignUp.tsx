import { useState, useContext, useEffect } from "react";
import { useNavigate, 
        NavLink 
        } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Box,
        Divider,
        Modal,
        IconButton,
        TextField,
        Typography,
        Switch,
        // Link
        } from "@mui/material";
import { OkButton } from "../components/Buttons";
import { useStylesGlobal, modalStyleSaveExternal, modalStyleErrorInternal, modalLoginInternal } from "../Styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { UserContext } from "../context/UserContext";
import { UsersContext } from "../context/UsersContext";
import useUser from "../hooks/useUser";
import { IsLoadingContext } from "../context/IsLoadingContext";
import { RememberLabelUsersData, RememberUserData, RememberUsersPassData, UserData, UserEditData } from "../types";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useAddUser from "../hooks/addUser";
// import ComboBox from "../components/inputs/ComboBox";

const theme = createTheme({
    typography: {
        fontFamily: [
            '"Asap Condensed"',
        ].join(','),
        fontSize: 20,
    },
    palette: {
        secondary: {
            main: '#c1e8fb',
        },
        action: {
            disabled: 'red',
        }
    },
    components: {
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    '&.Mui-focused': {
                        marginTop: 4
                    },
                    '&.MuiInputLabel-shrink': {
                        marginTop: 4
                    },
                },
            },
        },
    },
})

export default function SignUp () {
    const addUser = useAddUser(); 

    

    const { classes } = useStylesGlobal();
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
    const [openErrorModal, setOpenErrorModal] = useState(false);
    const [errorData, setErrorData] = useState("");
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [showProfilePass, setShowProfilePass] = useState<boolean>(false);
    const [showProfileConfirmPass, setShowProfileConfirmPass] = useState<boolean>(false);
    const [termsAndPrivacy, setTermsAndPrivacy] = useState<boolean>(false);
    const [rememberUser, setRememberUser] = useState<RememberUserData>({enabled:false});
    const [rememberLabelUsers, setRememberLabelUsers] = useState<RememberLabelUsersData[]>([]);
    const [rememberUsersPass, setRememberUsersPass] = useState<RememberUsersPassData[] | any>();
    
     
    // Get the keys from localStorage
    let localStorageKeys = Object.keys(localStorage)
    let varrememberUsersPass: any[] = []
  
    useEffect(() => {
      // Define a filter criterion
      const filterCriterion = 'remember_profile_'
      // Filter the localStorage keys based on the criterion
      const filteredKeys = localStorageKeys.filter(key => {
        // Check if the key matches your criteria
        return key.startsWith(filterCriterion)
      })
      let storedUserEmail=[]
      for(const key of filteredKeys) {
        const storedData = localStorage.getItem(key)
        if (storedData) {
          const parsedData = JSON.parse(storedData)
          storedUserEmail.push({"label": parsedData.user_email})
          varrememberUsersPass.push(parsedData) 
        }
        setRememberLabelUsers(storedUserEmail) 
        setRememberUsersPass(varrememberUsersPass)
      }
    }, [])
  


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
    const rememberEnabledChange = (value: boolean) => {
        setRememberUser((prevRememberUser: RememberUserData) => ({
            ...prevRememberUser,
            enabled: value
        }))
    }
    
    const handleUser = (value: string) => {
        setUser(value)
        setRememberUser((prevRememberUser: RememberUserData) => ({
            ...prevRememberUser,
            user: value
        }))
        setErrorTextFields((prevErrorTextFields: any) => ({
            ...prevErrorTextFields,
            user: false,
        }));
    }
    const handleEmail = (value: string) => {
        setEmail(value)
        setRememberUser((prevRememberUser: RememberUserData) => ({
            ...prevRememberUser,
            email: value
        }))
        setErrorTextFields((prevErrorTextFields: any) => ({
            ...prevErrorTextFields,
            email: false,
        }));
    }
    const handlePass = (value: string) => {
        setPass(value)
        // setRememberUser((prevRememberUser: RememberUserData) => ({
        //     ...prevRememberUser,
        //     pass: value
        // }))
        setErrorTextFields((prevErrorTextFields: any) => ({
            ...prevErrorTextFields,
            pass: false,
        }));
    }
    const handleConfirmPass = (value: string) => {
        setConfirmPass(value)
        // setRememberUser((prevRememberUser: RememberUserData) => ({
        //     ...prevRememberUser,
        //     pass: value
        // }))
        setErrorTextFields((prevErrorTextFields: any) => ({
            ...prevErrorTextFields,
            confirmPass: false,
        }));
    }

    
    const handleSignUp = () => {
        let dataOk: boolean = true
        if(user===""){
          setErrorTextFields((prevErrorTextFields: any) => ({
              ...prevErrorTextFields,
              user: true,
          }));
          dataOk = false
        }
        if(email===""){
          setErrorTextFields((prevErrorTextFields: any) => ({
              ...prevErrorTextFields,
              email: true,
          }));
          dataOk = false
        }
        if(pass===""){
          setErrorTextFields((prevErrorTextFields: any) => ({
              ...prevErrorTextFields,
              pass: true,
          }));
          dataOk = false
        }
        if(confirmPass==="" || confirmPass !== pass){
          setErrorTextFields((prevErrorTextFields: any) => ({
              ...prevErrorTextFields,
              confirmPass: true,
          }));
          dataOk = false
        }
        if(!termsAndPrivacy){
          setErrorTextFields((prevErrorTextFields: any) => ({
              ...prevErrorTextFields,
              termsAndPrivacy: true,
          }));
          dataOk = false
        }
        if(!dataOk) return



        // console.log("testing addUser1")

        // postClient()
        const bodyCreate: UserEditData = {}
        bodyCreate.deleted = false
        bodyCreate.language =  1    //  FIX LANGUAGE SELECTED
        bodyCreate.background_color = 0
        bodyCreate.alerts_enabled = false
        bodyCreate.ordered_fields = [1,2,3,4,5]
        bodyCreate.id_access_level = 4
        bodyCreate.user = user
        bodyCreate.email = email
        bodyCreate.enabled = true
        bodyCreate.pass = pass

        // addUser(bodyCreate);

        const createUser = async () => {
            await addUser(bodyCreate);
        };
        createUser();


        // const postClient = async () => {
        //     try {
        //         const response = await fetch('http://localhost:4000/api/clients/', {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //             },
        //             body:JSON.stringify({
        //                 "id_client_assigned": true
        //             })
        //         })
        //         if (response.ok) {
        //             const json = await response.json()
        //             bodyCreate.id_client = json[0].id_client+1
        //         } else {
        //             console.error("error last user")
        //         }
        //     } catch (error) {
        //         console.log("error last user not found?: ", error)
        //     } finally{
        //         fetchCreateUser()
        //     }
        // }

        // const fetchCreateUser = async () => {
        //     let loadingSuccess: boolean = false
        //     try {
        //         const response = await fetch(`http://localhost:4000/api/users/`, {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json'
        //             },
        //             body:JSON.stringify(bodyCreate)
        //         })
        //         if (response.ok) {
        //             const responseData = await response.json()
        //             loadingSuccess = true
        //         } else if (response.status === 400) {
        //             console.error('Request f: ', response)
        //             console.error('Request failed: ', response.status, response.statusText)
        //             const errorData = await response.json()
        //             console.error('Request failed 2: ', errorData.error)
        //             if (errorData.errorCode === 'duplicate_product') {
        //                 setOpenErrorModal(true)
        //                 setErrorData(errorData.errorCode)
        //             }
        //         }
        //     } catch (error: unknown) {
        //         if (typeof error === 'string') {
        //             console.error('Error: ', error)
        //         } else if (error instanceof Error) {
        //             console.error('Error object: ', error.message)
        //         } else {
        //             // Handle other cases as needed
        //         }
        //     } finally {
        //         setIsLoading((prevLoading: any) => ({
        //             ...prevLoading,
        //             fieldsFetchCreateStock: loadingSuccess
        //         }))
        //     }
        // }
    }



/////////// AAAAAAAAAAADDDDDDDDDDEmail format error 
    return (
        <div>
            <ThemeProvider theme={theme}>
                <Modal open={true} >
                    <Box sx={modalStyleSaveExternal}>
                        <Box sx={{...modalStyleErrorInternal, ...modalLoginInternal}}>
                            <Typography className={classes.finishButtons} align="center" variant='h5'>
                                Sign Up
                            </Typography>
                            <Box className={classes.customBoxColumn}>
                                <Box className={classes.customBoxRow}>
                                    <TextField
                                        label="Username"
                                        value={user}
                                        onChange={ (event) => handleUser(event.target.value)}
                                        maxRows={1}
                                        size="small"
                                        type="text"
                                        className= {`${errorTextFields.user ? classes.text_field_error : ""} ${classes.inputMainData} `}
                                        InputProps={{
                                          className: classes.inputClassName,
                                        }}
                                    />
                                </Box>
                                <Box className={classes.customBoxRow}>
                                    <TextField
                                        label="Email"
                                        value={email}
                                        onChange={ (event) => handleEmail(event.target.value)}
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
                                    label="Password"
                                    maxRows={1}
                                    size="small"
                                    value={pass}
                                    type={ showProfilePass ? "text" : "password" }
                                    onChange={ (event) => handlePass(event.target.value) }
                                    className= {`${errorTextFields.pass ? classes.text_field_error : ""} ${classes.inputMainData} `}
                                    InputProps={{
                                        className: classes.inputClassName,
                                        endAdornment: (
                                        <IconButton onClick={showProfilePassToggle}>
                                            {showProfilePass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                        ),
                                    }}
                                    />
                                </Box>
                                <Box className={classes.customBoxRow}>
                                    <TextField
                                    label="Confirm password"
                                    maxRows={1}
                                    size="small"
                                    value={confirmPass}
                                    type={ showProfileConfirmPass ? "text" : "password" }
                                    onChange={ (event) => handleConfirmPass(event.target.value) }
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
                                <Box className={classes.customBoxRow} >
                                    <Box>
                                        By creating an account you agree to our 
                                        <br/>
                                        <NavLink 
                                            style={{ color: theme.palette.secondary.main }}
                                            to="/login"
                                        >
                                            Terms & Privacy
                                        </NavLink>
                                        <Switch 
                                            color='success' 
                                            className= {`${errorTextFields.termsAndPrivacy ? classes.switch_error : ""} `}
                                            checked={termsAndPrivacy}
                                            onChange={termsAndPrivacyEnabledChange}
                                        /> 
                                    </Box>
                                </Box>
                                <Box className={classes.customBoxRowSpaceBetween}>
                                    <Box>
                                        <Switch 
                                            color='success' 
                                            checked={rememberUser.enabled}
                                            onChange={(event) => {
                                            rememberEnabledChange(event.target.checked)
                                            }}
                                        />Remember me 
                                    </Box>
                                    <OkButton
                                        clicked={() => handleSignUp()}
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
                                    Already have an account?
                                    <NavLink 
                                        style={{ color: theme.palette.secondary.main }}
                                        to="/login"
                                    >
                                        Login
                                    </NavLink> 
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Modal>
            </ThemeProvider>
        </div>
    )
}