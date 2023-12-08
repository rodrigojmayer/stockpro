import { useState, useContext, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import { jwtDecode  } from 'jwt-decode'
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
import { UserContext } from '../context/UserContext';
import { UsersContext } from '../context/UsersContext';
import useUser from '../hooks/useUser';
import { IsLoadingContext } from "../context/IsLoadingContext";
import { UserData } from "../types";

export default function Login () {

  const { classes } = useStylesGlobal();
  const { isLogged, login, logout } = useUser()
  const { INITIAL_USER, user, setUser, gmailUserLogged, setGmailUserLogged, _IdUserLogged, set_IdUserLogged } = useContext<any>(UserContext); 
  const { users, setUsers } = useContext<any>(UsersContext); 
  const { isLoading, setIsLoading } = useContext<any>(IsLoadingContext);
  
  const [errorTextFields, setErrorTextFields] = useState({
    "access_level": false,
    "name": false,
    "email": false,
    "user": false,
    "password": false,
  });
  
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

    // userNameEmail
    // passwordUser
    const urlExt = userNameEmail.includes("@") ? `email` : `user` 

    const fetchUser = async () => {
      try {
        // const response = await fetch(`http://localhost:4000/api/users/email/${userNameEmail}`);
        const response = await fetch(`http://localhost:4000/api/users/${urlExt}/${userNameEmail}`);
        // console.log("user by email response: ", response)
        if (response.ok) {
          const json = await response.json();
          // console.log("user by email json: ", json)
          if(json){
            // setUser(json);
            login(json);
          }
          else{
            console.log("error email not found 1?: ")
          }
        } else {
          console.log("error email not found 2?: ")
        }
      } catch (error) {
        console.log("error email not found?: ", error)
        // setUser(INITIAL_USER);
        // Handle any network or fetch-related errors
      } finally {
        setIsLoading((prevLoading:any) => ({
          ...prevLoading,
          user: false,
        }));
        // setGmailUserLogged(INITIAL_USER)  // Resetting after login to allow later the logout
      }
    };
    fetchUser();

  }

  const navigate = useNavigate()

  useEffect(() => {
    if(isLogged) navigate('/')
  }, [isLogged, navigate])
  
  const handleLoginGoogleSuccess = async (response: any) => {
    // console.log('Login Success:', response);
    // Handle the successful Google login response here
    interface JwtPayload {
      email: string,
      given_name: string,
      family_name: string,
    }
    const decodedToken:JwtPayload = jwtDecode(response.credential);
    console.log('Login decodedToken:', decodedToken);
    const userEmailData = {
      "email": decodedToken.email,       
      "name": decodedToken.given_name,        
      "last_name": decodedToken.family_name, 
    }      
    // console.log('Login userEmailData:', userEmailData);
    // console.log('user context before setGmailUserLogged:', user);
    setGmailUserLogged(userEmailData)
    // console.log('user context after setGmailUserLogged:', user);
    // first check if the gmail user already exists using the usersContext
    // if(userEmail==="rodrigojmayer@gmail.com"){
    // }
    // if exists use the function of userContext to set it
  };
  const handleLoginGoogleFailure = (error: any) => {
    console.error('Login Google Failure:', error);
    // Handle the failure/error during Google login here
  };

  useEffect(() => {
    if(_IdUserLogged){
      // console.log("_IdUserLogged: ", _IdUserLogged)
      const fetchUser = async () => {
        try {
          const response = await fetch(`http://localhost:4000/api/users/${_IdUserLogged}`);
          // const response = await fetch(`http://localhost:4000/api/users/64b1b4b5cc67f2fbd144413c`); //User 1 client 2 id_access_level 1 superadmin
          // const response = await fetch(`http://localhost:4000/api/users/64b6c0553204de99e630a0ac`); //User 2 client 3 id_access_level 2 admin
          // const response = await fetch(`http://localhost:4000/api/users/64f63b7773d98cad83d45fc2`); //User - test client 3 id_access_level 3 superuser
          // const response = await fetch(`http://localhost:4000/api/users/64f704d073d98cad83d461c8`); //User - test client 3 id_access_level 4 user
          console.log("user response: ", response)
          if (response.ok) {
            const json = await response.json();
            // setUser(json);
            login(json);
          } else {
            // setUser(INITIAL_USER);
            // Handle the case where the response is not OK (e.g., show an error message)
          }
        } catch (error) {
          // setUser(INITIAL_USER);
          // Handle any network or fetch-related errors
        } finally {
          setIsLoading((prevLoading:any) => ({
          ...prevLoading,
          user: false,
          }));
        }
      };
      fetchUser();
    }
  }, [_IdUserLogged]);
  
  useEffect(() => {
    // console.log("gmailUserLogged: ", gmailUserLogged.email)
    // console.log("user: ", user)
    if(gmailUserLogged.email && gmailUserLogged.email !== user.email){
      const fetchUserByEmail = async () => {
        try {
          const response = await fetch(`http://localhost:4000/api/users/email/${gmailUserLogged.email}`);
          // console.log("user by email response: ", response)
          if (response.ok) {
            const json = await response.json();
            // console.log("user by email json: ", json)
            if(json){
              // setUser(json);
              login(json);
            }
            else{
              postClient()
            }
          } else {
            console.log("error email not found?: ")
          }
        } catch (error) {
          console.log("error email not found?: ", error)
          // setUser(INITIAL_USER);
          // Handle any network or fetch-related errors
        } finally {
          setIsLoading((prevLoading:any) => ({
            ...prevLoading,
            user: false,
          }));
          setGmailUserLogged(INITIAL_USER)  // Resetting after login to allow later the logout
        }
      };
      fetchUserByEmail();
    }
  }, [gmailUserLogged]);

  const postClient = async () => {
    const bodyUser: UserData= {
      ...INITIAL_USER,
      "email": gmailUserLogged.email,
      "name": gmailUserLogged.name,
      "last_name": gmailUserLogged.last_name,
      "user": gmailUserLogged.email?.split("@")[0] || "",
      "pass": "Changethispassforarandompass@2", //////////////////////  FIX
      "deleted": false, 
      "enabled": true, 
      "id_access_level": 4,
      "ordered_fields": [1,2,3,4,5],
      "language": 1,  ///////////////////////////////// FIX
      "background_color": 0,
      "alerts_enabled": false
    }
    // let loadingSuccess: boolean = false
    try {
      const response = await fetch(`http://localhost:4000/api/clients/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the appropriate content-type for my API
          // Add any other requires headers here
        },
        body:JSON.stringify({
          "deleted": false,
          "enabled": true
        })
      })

      // Check if the response status is successful
      if (response.ok) {
        const responseData = await response.json() // parse the response data
        // loadingSuccess = true
        console.log('UserContext response ok postClient responseData: ', responseData)
        console.log('UserContext response ok postClient responseData.id: ', responseData.id)
        bodyUser.id_client = responseData.id
      } else if (response.status === 400) {
        // Handle non-successful responses
        console.error('Request failed: ', response.status, response.statusText)
        const errorData = await response.json()
        console.error('Request failed 2: ', errorData.error)
        // Handle the error here
        if (errorData.errorCode === 'duplicate_product') {
          // setOpenErrorModal(true) // Open the modal for duplicate product error
          // setErrorData(errorData.errorCode)
        }
      }
    } catch (error: unknown) {
      if (typeof error === 'string') {
        // 'error' is now narrowed down to type 'string'
        console.error('Error:', error)
      } else if (error instanceof Error) {
        // 'error' is now narrowed down to type 'Error'
        console.error('Error object:', error.message)
      } else {
        // Handle other cases as needed
      }
    } finally {
      // console.log("loadingSuccess: ", loadingSuccess)
      // setIsLoading((prevLoading: any) => ({
      //   ...prevLoading,
      //   fieldsFetchCreateStock: loadingSuccess,
      // }));
      if(bodyUser.id_client)
        postUser(bodyUser)
    }
  } 


  const postUser = async (bodyUser:UserData) => {
    console.error('Login.tsx postUser bodyUser: ', bodyUser)
    let loadingSuccess: boolean = false
    try {
      const response = await fetch(`http://localhost:4000/api/users/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the appropriate content-type for my API
          // Add any other requires headers here
        },
        body:JSON.stringify(bodyUser)
      })

      // Check if the response status is successful
      if (response.ok) {
        const responseData = await response.json() // parse the response data
        loadingSuccess = true
        set_IdUserLogged(responseData._id)
      } else if (response.status === 400) {
        // Handle non-successful responses
        console.error('Request failed: ', response.status, response.statusText)
        const errorData = await response.json()
        console.error('Request failed 2: ', errorData.error)
        // Handle the error here
        if (errorData.errorCode === 'duplicate_product') {
          // setOpenErrorModal(true) // Open the modal for duplicate product error
          // setErrorData(errorData.errorCode)
        }
      }
    } catch (error: unknown) {
      if (typeof error === 'string') {
        // 'error' is now narrowed down to type 'string'
        console.error('Error:', error)
      } else if (error instanceof Error) {
        // 'error' is now narrowed down to type 'Error'
        console.error('Error object:', error.message)
      } else {
        // Handle other cases as needed
      }
    } finally {
      // console.log("loadingSuccess: ", loadingSuccess)
      setIsLoading((prevLoading: any) => ({
        ...prevLoading,
        fieldsFetchCreateStock: loadingSuccess,
      }));
    }
  } 




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