import { useState, useContext, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom"
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode  } from 'jwt-decode'
import { Box,
        Divider,
        Modal, 
        IconButton,
        TextField,
        Typography,
        Switch,
        } from '@mui/material';
import { OkButton } from '../components/Buttons';
import ErrorModal from '../components/ErrorModal';
import { useStylesGlobal, modalStyleSaveExternal, modalStyleErrorInternal, modalLoginInternal  } from '../Styles'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { UserContext } from '../context/UserContext';
import useUser from '../hooks/useUser';
import { IsLoadingContext } from "../context/IsLoadingContext";
import { RememberLabelUsersData, RememberUsersPassData, JwtPayload } from "../types";
import ComboBox from "../components/inputs/ComboBox";
import { CheckListStockContext } from "../context/CheckListStockContext";
import Cookies from 'js-cookie';
import ConfirmUserValidatedModal from '../components/ConfirmUserValidatedModal';
import ManageForgottenPass from "../components/ManageForgottenPass";
import Paper from '@mui/material/Paper/Paper';

export default function Login () {

  const { classes } = useStylesGlobal();
  const { loginUser } = useUser()
  const { setGmailUserLogged } = useContext<any>(UserContext); 
  const { isLoading, setIsLoading } = useContext<any>(IsLoadingContext);
  const { setCheckListStock } = useContext<any>(CheckListStockContext);
  
  const [errorTextFields, setErrorTextFields] = useState({
    "user_name_email": false,
    "user_pass": false,
  });
   
  const [openErrorModal, setOpenErrorModal] = useState(false);  
  const [errorData, setErrorData] = useState("");  
  const [textData, setTextData] = useState("");  
  const [userNameEmail, setUserNameEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [showProfilePass, setShowProfilePass] = useState<boolean>(false);
  const [allowShowProfilePass, setAllowShowProfilePass] = useState<boolean>(true);
  const [rememberUser, setRememberUser] = useState<boolean>(false);
  const [rememberLabelUsers, setRememberLabelUsers] = useState<RememberLabelUsersData[]>([]);
  const [rememberUsersPass, setRememberUsersPass] = useState<RememberUsersPassData[] | any>();
  const [openConfirmUserValidatedModal, setOpenConfirmUserValidatedModal] = useState(false);  
  const [openManageForgottenPass, setOpenManageForgottenPass] = useState(false);  

  useEffect(() => {
    setOpenErrorModal(false)
    setErrorData("")
  }, [])

  const showProfilePassToggle = () => {
    if(allowShowProfilePass)
      setShowProfilePass(!showProfilePass)
  }
  const rememberEnabledChange = (value: boolean) => {
    setRememberUser(value)
  }
  
  useEffect(() => {  
    if(rememberUsersPass) {
      const passSelected = rememberUsersPass.filter((person: any) => {
        const key = Object.keys(person)[0];
        const cleanPersonEmail = key.trim().toLowerCase();
        const cleanUserNameEmail = userNameEmail.trim().toLowerCase();
        return cleanPersonEmail === cleanUserNameEmail;
      });
      
      if(passSelected.length > 0){
        const key = Object.keys(passSelected[0])[0];
        handleUserPass(passSelected[0][key])
        setAllowShowProfilePass(false)
        setShowProfilePass(false)
        setRememberUser(true)
      } else {
        setAllowShowProfilePass(true)
        handleUserPass("")
        setRememberUser(false)
      }
    }
  }, [userNameEmail])

  const handleUserNameEmail = (value: string) => {
    setUserNameEmail(value) 
    setErrorTextFields((prevErrorTextFields: any) => ({
      ...prevErrorTextFields,
      user_name_email: false,
    }));
  }
  const handleUserPass = (value: string) => {
    setUserPass(value)   
    setErrorTextFields((prevErrorTextFields: any) => ({
        ...prevErrorTextFields,
        user_pass: false,
    }));
  }
  
  const handleLogin = async () => {
    let dataOk: boolean = true
    setErrorTextFields({
      "user_name_email": false,
      "user_pass": false,
  });
    if(userNameEmail===""){
      setOpenErrorModal(true)
      setErrorData("missing_user_name_email")
      setErrorTextFields((prevErrorTextFields: any) => ({
          ...prevErrorTextFields,
          user_name_email: true,
      }));
      dataOk = false
    }
    if(userPass===""){
      setOpenErrorModal(true)
      setErrorData("missing_user_password")
      setErrorTextFields((prevErrorTextFields: any) => ({
          ...prevErrorTextFields,
          user_pass: true,
      }));
      dataOk = false
    }
    if(!dataOk) return
    const login = async() => {
      const rta = await loginUser(userNameEmail, userPass, rememberUser)
      if(!rta.loadingSuccess){
        setOpenErrorModal(true) // Open the modal for duplicate product error
        setErrorData(rta.errorCode)
        setErrorTextFields((prevErrorTextFields: any) => ({
            ...prevErrorTextFields,
            [rta.field]: true,
        }));
      }
    }
    login();
  }
  
  const handleLoginGoogleSuccess = async (response: any) => {
    // Handle the successful Google login response here
    const googleDecodedToken:JwtPayload = jwtDecode(response.credential);
    const userEmailData = googleDecodedToken
    setGmailUserLogged(userEmailData)     //////////// check for what is this
    const login = async() => {
      const rta = await loginUser(googleDecodedToken.email, "", false, googleDecodedToken)
      if(!rta.loadingSuccess){
        setOpenErrorModal(true) // Open the modal for duplicate product error
        setErrorData(rta.errorCode)
        setErrorTextFields((prevErrorTextFields: any) => ({
            ...prevErrorTextFields,
            [rta.field]: true,
        }));
      }
    }
    login();
  };

  const handleLoginGoogleFailure = (error: any) => {
    // Handle the failure/error during Google login here
  }; 
  
  const handleCloseErrorModal = () => {
    setOpenErrorModal(false)
  }

  useEffect(() => {
    setCheckListStock([]) 

    const rmb = Cookies.get('rmb')
    if (rmb) {
      let rmbU: RememberLabelUsersData[] = []
      let rmbP: RememberUsersPassData[] = []
      JSON.parse(rmb).forEach((obj:any) => {

        rmbU.push({label: obj.u})
        rmbP.push({[obj.u]: obj.p})
      })
      setRememberLabelUsers(rmbU)
      setRememberUsersPass(rmbP)
    }
    
  }, [])
  
const handlecloseConfirmUserValidatedModal = () => {
  setOpenConfirmUserValidatedModal(false)
}
const handlecloseManageForgottenPass = () => {
  setOpenManageForgottenPass(false)
}

useEffect(() => {
  //     // Check if JWT exists in cookies
  if (isLoading.openFirstTimeValidateUser) {//  Only will set open when the user open the web from the button in the email to validate

    const activateUser = async () => {   
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL_BACKEND}/register/validateUser/${isLoading.openFirstTimeValidateUser}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json', // Set the appropriate content-type for my API
            },
        })
        const responseData = await response.json() // parse the response data

        // Check if the response status is successful
        if (response.ok) {
           setOpenConfirmUserValidatedModal(true)
           setTextData(responseData.message)
        } else {
          // Handle the error here
          setOpenErrorModal(true) // Open the modal for duplicate product error
          setErrorData(responseData.errorCode)
        }
      } catch (error: unknown) {
          
      } finally {
        setIsLoading((prevLoading: any) => ({
          ...prevLoading,
          openFirstTimeValidateUser: "",
        }));
      }
    }
    activateUser();
  }
}, [isLoading.openFirstTimeValidateUser])

return (
  <Modal 
    sx={{backgroundColor: 'rgba(0, 0, 0, .5)'}}
    open={true} 
  > 
    <Paper style={{ margin: 0 }}>
      <Box sx={modalStyleSaveExternal}>
        <Box sx={{...modalStyleErrorInternal, ...modalLoginInternal}}>
          <ErrorModal
            openErrorModal={openErrorModal}
            closeErrorModal={handleCloseErrorModal}
            errorData={errorData} 
          />
          <ConfirmUserValidatedModal
              openConfirmUserValidatedModal={openConfirmUserValidatedModal}
              closeConfirmUserValidatedModal={handlecloseConfirmUserValidatedModal} 
              textData={textData}
          />  
          <ManageForgottenPass
              openManageForgottenPass={openManageForgottenPass}
              closeManageForgottenPass={handlecloseManageForgottenPass} 
          />           
          <Typography className={classes.finishButtons} align="center" variant='h5' >
              Login
          </Typography> 
          <form
              onKeyDown={(e:any) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleLogin(); // Call your login function
                  e.stopPropagation();
                }
              }}
            >
            <Box className={classes.customBoxColumn}>
              <Box className={classes.customBoxRow}>
                <ComboBox
                  optionsData={rememberLabelUsers}
                  comboLabel="Username or Email"
                  comboValue={userNameEmail}
                  comboHandleValue={handleUserNameEmail}
                  errorTextField={errorTextFields.user_name_email}
                />
              </Box>
              <Box className={classes.customBoxRow}>
                <TextField
                  label="Password"
                  maxRows={1}
                  size="small"
                  value={userPass}
                  type={ showProfilePass ? "text" : "password" }
                  onChange={ (event:any) => handleUserPass(event.target.value) }
                  className= {`${errorTextFields.user_pass ? classes.text_field_error : ""} ${classes.inputMainData} `}
                  InputProps={{
                    className: classes.inputClassName,
                    endAdornment: (
                      <IconButton onClick={showProfilePassToggle}>
                        {(allowShowProfilePass && showProfilePass) ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    ),
                  }}
                />
              </Box>
              <Box className={classes.customBoxRowSpaceBetween}>
                <Box>
                  <Switch 
                    color='success' 
                    checked={rememberUser}
                    onChange={(event:any) => {
                      rememberEnabledChange(event.target.checked)
                    }}
                  />Remember me 
                </Box>
                <OkButton
                  clicked={() => handleLogin()}
                  widthIco={100}
                  // type="submit"
                />
              </Box>
            </Box>
          </form>
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
              onError={() => handleLoginGoogleFailure}
              onSuccess={handleLoginGoogleSuccess}
            />
          </Box>
          <Box className={classes.customBoxRow}>
              <Divider 
                  className={classes.customDivider} 
                  variant="middle" 
              />
          </Box>
          <Box className={classes.customBoxRowSpaceAround} sx={{ typography: 'subtitle2' }}>
              <NavLink 
                style={{ color: '#c1e8fb' }}
                to=""
                onClick={() => setOpenManageForgottenPass(true)}

              >
                Forgot Password? 
              </NavLink>
                <NavLink 
                  style={{ color: '#c1e8fb' }}
                  to="/signup"
                >
                  Sign Up 
                </NavLink>
          </Box>
        </Box>
      </Box>
    </Paper>
  </Modal>  
  )
}