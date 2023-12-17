import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Box,
        Divider,
        Modal,
        IconButton,
        TextField,
        Typography,
        Switch,
        Link
        } from "@mui/material";
import { OkButton } from "../components/Buttons";
import { useStylesGlobal, modalStyleSaveExternal, modalStyleErrorInternal, modalLoginInternal } from "../Styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { UserContext } from "../context/UserContext";
import { UsersContext } from "../context/UsersContext";
import useUser from "../hooks/useUser";
import { IsLoadingContext } from "../context/IsLoadingContext";
import { RememberLabelUsersData, RememberUserData, RememberUsersPassData, UserData } from "../types";
import { ThemeProvider, createTheme } from "@mui/material/styles";
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

    const { classes } = useStylesGlobal();
    // const { isLogged, login }
    const { isLoading, setIsLoading } = useContext<any>(IsLoadingContext);
    const [errorTextFields, setErrorTextFields] = useState({
        "user": false,
        "email": false,
        "pass": false,
        "confirmPass": false
    });
    const [openErrorModal, setOpenErrorModal] = useState(false);
    const [errorData, setErrorData] = useState("");
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [showProfilePass, setShowProfilePass] = useState<boolean>(false);
    const [showProfileConfirmPass, setShowProfileConfirmPass] = useState<boolean>(false);
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
        alert("sign upppp")
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
        if(confirmPass===""){
          setErrorTextFields((prevErrorTextFields: any) => ({
              ...prevErrorTextFields,
              confirmPass: true,
          }));
          dataOk = false
        }
        if(!dataOk) return
    
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
                            </Box>
                        </Box>
                    </Box>
                </Modal>
            </ThemeProvider>
        </div>
    )
}