import { useState, useEffect } from 'react';
import { Box,
         Modal, 
         Grid,
         IconButton,
         TextField,
         Typography,
         MenuItem,
         Switch,
        } from '@mui/material';
import { CancelButton, OkButton } from './Buttons';
import { useStylesGlobal, modalStyleSaveExternal, modalStyleErrorModalInternal } from '../Styles'
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


const PrettoSlider = styled(Slider)({
    color: '#52af77',
    height: 25,
    borderRadius: '7px',
    '& .MuiSlider-track': {
      border: 'none',
      borderRadius: '7px 0 0 7px',
    },
    '& .MuiSlider-thumb': {
      height: 25,
      width: 40,
      borderRadius: '7px',
      backgroundColor: '#fff',
      border: '1px solid currentColor',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        //boxShadow:  'inherit',
      },
      '&:before': {
        display: 'none',
      },
    },
  });

// type LoginModalProps = {
    // openLoginModal: boolean;
    // closeLoginModal: (newData?: boolean) => void;
    // source: string
    // data: string
    // confirmDelete: (newData?: boolean) => void
// }
// export default function LoginModal( props: LoginModalProps) {
export default function LoginModal() {
    // const { openLoginModal, closeLoginModal } = props;
    const { classes } = useStylesGlobal();
    // console.log("props: ", props)
    // let subTitle = `Swipe to confirm ${props.source} "${props.data}" deletion`


    const [errorTextFields, setErrorTextFields] = useState({
        "access_level": false,
        "name": false,
        "email": false,
        "user": false,
        "password": false,
    });
    // const [isThumbPressed, setIsThumbPressed] = useState(true);
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
    
    // const handleThumbMouseDown = () => {
    //   setIsThumbPressed(true);
    // };
  
    const handleUserNameEmail = (value: string) => {
        // console.log("setUserUser value: ", value)
        setUserNameEmail(value)
    }
    const handlePasswordUser = (value: string) => {
        // console.log("setUserUser value: ", value)
        setPasswordUser(value)
    }

    const handleLogin = () => {
        console.log("Login: ")
    }
    
    
    return (
        <Modal
            open={true} 
        // onClose={() => closeLoginModal()}
        > 
            <Box sx={modalStyleSaveExternal}>
                <Box sx={modalStyleErrorModalInternal}>
                    <Typography className={classes.finishButtons} align="center" >
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
                        <Box className={classes.customBoxRowLeft}>
                            <Switch 
                                color='success' 
                                checked={rememberEnabled}
                                onChange={(event) => {
                                    rememberEnabledChange(event.target.checked)
                                }}
                            />Remember me
                        </Box>
                    </Box>
                    <Box className={classes.customBoxRow}>
                        <OkButton
                            clicked={() => handleLogin()}
                        />
                    </Box>
                    ___Or login using___
                    Facebook Google
                    ____________________
                    Forgon Password? New here? Sign Up 
                </Box>
            </Box>
        </Modal>
    )
}