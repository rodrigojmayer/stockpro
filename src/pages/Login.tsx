import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom"
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
// import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login'
import { Box,
     Divider,
     Modal, 
     IconButton,
     TextField,
     Typography,
     Switch,
     Link,
     Button,
    } from '@mui/material';
    import { GoogleButton, OkButton } from '../components/Buttons';
    import { useStylesGlobal, modalStyleSaveExternal, modalStyleErrorInternal, modalLoginInternal  } from '../Styles'
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function Login () {

    const { classes } = useStylesGlobal();
    const [errorTextFields, setErrorTextFields] = useState({
        "access_level": false,
        "name": false,
        "email": false,
        "user": false,
        "password": false,
    });
    const CLIENT_ID = import.meta.env.VITE_CLIENT_ID
    const [userNameEmail, setUserNameEmail] = useState("");
    const [passwordUser, setPasswordUser] = useState("");
    const [showProfilePass, setShowProfilePass] = useState<boolean>(false);
    const [rememberEnabled, setRememberEnabled] = useState<boolean>(false);
    const showProfilePassToggle = () => {
        setShowProfilePass(!showProfilePass)
    }
    const rememberEnabledChange = (value: boolean) => {
        setRememberEnabled(value)
    }
    const handleUserNameEmail = (value: string) => {
        setUserNameEmail(value)
    }
    const handlePasswordUser = (value: string) => {
        setPasswordUser(value)
    }
    const handleLogin = () => {
        console.log("Login: ")
    }


    
    
    // const handleLoginSuccess = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    const handleLoginSuccess = (response: any) => {
        console.log('Login Success:', response);
        // Handle the successful Google login response here
      };
    
      const handleLoginFailure = (error: any) => {
        console.error('Login Failure:', error);
        // Handle the failure/error during Google login here
      };



    return (
        <div>
            <Modal open={true} > 
                <Box sx={modalStyleSaveExternal}>
                    <Box sx={{...modalStyleErrorInternal, ...modalLoginInternal}}>
                        <Typography className={classes.finishButtons} align="center" variant='h5' >
                            Login
                        </Typography> 
                        <Box className={classes.customBoxColumn}>
                            <Box className={classes.customBoxRow}>
                                <TextField
                                    label="Username or Email"
                                    value={userNameEmail}
                                    onChange={ (event) => handleUserNameEmail(event.target.value) }
                                    maxRows={1}
                                    size="small"
                                    className= {`${errorTextFields.user ? classes.text_field_error : ""} ${classes.inputMainData} `}
                                    InputProps={{
                                        className: classes.inputClassName,
                                    }}
                                />
                            </Box>
                            <Box className={classes.customBoxRow}>
                                <TextField
                                    label="Password*"
                                    maxRows={1}
                                    size="small"
                                    value={passwordUser}
                                    type={ showProfilePass ? "text" : "password" }
                                    onChange={ (event) => handlePasswordUser(event.target.value) }
                                    className= {`${errorTextFields.password ? classes.text_field_error : ""} ${classes.inputMainData} `}
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
                            <Box className={classes.customBoxRowSpaceBetween}>
                                <Box>
                                    <Switch 
                                        color='success' 
                                        checked={rememberEnabled}
                                        onChange={(event) => {
                                            rememberEnabledChange(event.target.checked)
                                        }}
                                    />Remember me 
                                </Box>
                                    
                                <Box>
                                    <OkButton
                                    clicked={() => handleLogin()}
                                />
                                </Box>
                            </Box>
                        </Box>
                        <Box className={classes.customBoxRow}>
                            <Divider 
                                className={classes.customDivider} 
                                sx={{
                                    "&::before, &::after": {
                                    borderColor: "white",
                                    },
                                }}
                                variant="middle"  
                            >
                                Or login using
                            </Divider>
                        </Box>

                        <Box className={classes.customBoxRow}>
                            <GoogleLogin
                                onError={() => handleLoginFailure}
                                onSuccess={handleLoginSuccess}
                            />
                        </Box>
                        <Box className={classes.customBoxRow}>
                            <Divider 
                                className={classes.customDivider} 
                                variant="middle" 
                            />
                        </Box>
                        <Box className={classes.customBoxRowSpaceAround}>
                            <Link>
                                Forgot Password? 
                            </Link>
                            <Box className={classes.customBoxRow}>
                                New here? 
                                <Link>
                                    Sign Up 
                                </Link>
                            </Box>
                        </Box>
                        <NavLink to="/">Home</NavLink>
                    </Box>
                </Box>
            </Modal>  
        </div>
    )
}