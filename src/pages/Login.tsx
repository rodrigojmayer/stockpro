import { useState, useContext, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom"
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
import { useStylesGlobal, modalStyleSaveExternal, modalStyleErrorInternal, modalLoginInternal  } from '../Styles'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { UserContext } from '../context/UserContext';
import { UsersContext } from '../context/UsersContext';
import useUser from '../hooks/useUser';
import { IsLoadingContext } from "../context/IsLoadingContext";
import { RememberLabelUsersData, RememberUserData, RememberUsersPassData, UserData, UserEditData } from "../types";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ComboBox from "../components/inputs/ComboBox";
import useAddUser from "../hooks/addUser";

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

export default function Login () {

  const addUser = useAddUser(); 
  const { classes } = useStylesGlobal();
  const { isLogged, login, logout } = useUser()
  const { INITIAL_USER, user, setUser, gmailUserLogged, setGmailUserLogged, _IdUserLogged, set_IdUserLogged } = useContext<any>(UserContext); 
  const { users, setUsers } = useContext<any>(UsersContext); 
  const { isLoading, setIsLoading } = useContext<any>(IsLoadingContext);
  
  const [errorTextFields, setErrorTextFields] = useState({
    "user_name_email": false,
    "user_pass": false,
  });
   
  const [openErrorModal, setOpenErrorModal] = useState(false);  
  const [errorData, setErrorData] = useState("");  

  const [userNameEmail, setUserNameEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [showProfilePass, setShowProfilePass] = useState<boolean>(false);
  const [allowShowProfilePass, setAllowShowProfilePass] = useState<boolean>(true);
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
    if(allowShowProfilePass)
      setShowProfilePass(!showProfilePass)
  }
  const rememberEnabledChange = (value: boolean) => {
    setRememberUser((prevRememberUser: RememberUserData) => ({
      ...prevRememberUser,
      enabled: value
    }))
  }
  
  useEffect(() => {  
    if(rememberUsersPass) {
      const passSelected = rememberUsersPass.filter((person: { user_email: string; }) => {
        const cleanPersonEmail = person.user_email.trim().toLowerCase();
        const cleanUserNameEmail = userNameEmail.trim().toLowerCase();
        return cleanPersonEmail === cleanUserNameEmail;
      });
      if(passSelected.length > 0){
        handleUserPass(passSelected[0].pass)
        setAllowShowProfilePass(false)
        setShowProfilePass(false)
        setRememberUser((prevRememberUser: RememberUserData) => ({
          ...prevRememberUser,
          enabled: true
        }))
      } else {
        setAllowShowProfilePass(true)
        handleUserPass("")
        setRememberUser((prevRememberUser: RememberUserData) => ({
          ...prevRememberUser,
          enabled: false
        }))
      }
    }
  }, [userNameEmail])

  useEffect(() => {
    console.log("useEffect userPass: ", userPass)
  }, [userPass])

  const handleUserNameEmail = (value: string) => {
    setUserNameEmail(value)    
    setRememberUser((prevRememberUser: RememberUserData) => ({
      ...prevRememberUser,
      user_email: value
    }))
    setErrorTextFields((prevErrorTextFields: any) => ({
      ...prevErrorTextFields,
      user_name_email: false,
    }));
  }
  const handleUserPass = (value: string) => {
    setUserPass(value)   
    setRememberUser((prevRememberUser: RememberUserData) => ({
      ...prevRememberUser,
      pass: value
    }))
    setErrorTextFields((prevErrorTextFields: any) => ({
        ...prevErrorTextFields,
        user_pass: false,
    }));
  }
  const handleLogin = () => {
    let dataOk: boolean = true
    if(userNameEmail===""){
      setErrorTextFields((prevErrorTextFields: any) => ({
          ...prevErrorTextFields,
          user_name_email: true,
      }));
      dataOk = false
    }
    if(userPass===""){
      setErrorTextFields((prevErrorTextFields: any) => ({
          ...prevErrorTextFields,
          user_pass: true,
      }));
      dataOk = false
    }
    if(!dataOk) return

    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/users/login/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Set the appropriate content-type for my API
            // Add any other requires headers here
          },
          body:JSON.stringify({
            "user_email": userNameEmail,
            "pass": userPass
          })
        });
        if (response.ok) {
          const json = await response.json();
          if(json){
            login(json, rememberUser);
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
    // Handle the successful Google login response here
    interface JwtPayload {
      email: string,
      given_name: string,
      family_name: string,
    }
    const decodedToken:JwtPayload = jwtDecode(response.credential);
    const userEmailData = decodedToken
    setGmailUserLogged(userEmailData)
  };
  const handleLoginGoogleFailure = (error: any) => {
    console.error('Login Google Failure:', error);
    // Handle the failure/error during Google login here
  };
  
  useEffect(() => {
    if(gmailUserLogged.email && gmailUserLogged.email !== user.email){
      const fetchUserByGmail = async () => {
        try {
          const response = await fetch(`http://localhost:4000/api/users/logingmail/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body:JSON.stringify(gmailUserLogged)
          });
          if (response.ok) {
            const json = await response.json();
            console.log("json: ", json.error)
            if (json.error){
              // postClient()
              const bodyCreate: UserEditData = {}
              bodyCreate.deleted = false
              bodyCreate.language =  1    //  FIX LANGUAGE SELECTED
              bodyCreate.background_color = 0
              bodyCreate.alerts_enabled = false
              bodyCreate.ordered_fields = [1,2,3,4,5]
              bodyCreate.id_access_level = 4
              bodyCreate.user = gmailUserLogged.email?.split("@")[0] || ""
              bodyCreate.email = gmailUserLogged.email
              bodyCreate.name= gmailUserLogged.given_name,
              bodyCreate.last_name= gmailUserLogged.family_name,
              bodyCreate.enabled = true
              // bodyCreate.pass = pass
              // addUser(bodyCreate);
              const createUser = async () => {
                  await addUser(bodyCreate);
              };
              createUser();
            }
            else{
            login(json);
            }
          }
        } catch (error) {
          console.log("error: ", error)
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
      fetchUserByGmail();
    }
  }, [gmailUserLogged]);

  // const postClient = async () => {
  //   const bodyUser: UserData= {
  //     ...INITIAL_USER,
  //     "email": gmailUserLogged.email,
  //     "name": gmailUserLogged.given_name,
  //     "last_name": gmailUserLogged.family_name,
  //     "user": gmailUserLogged.email?.split("@")[0] || "",
  //     "language": 1,  ///////////////////////////////// FIX
  //   }
  //   try {
  //     const response = await fetch(`http://localhost:4000/api/clients/`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json', // Set the appropriate content-type for my API
  //         // Add any other requires headers here
  //       },
  //       body:JSON.stringify({
  //         "deleted": false,
  //         "enabled": true
  //       })
  //     })

  //     // Check if the response status is successful
  //     if (response.ok) {
  //       const responseData = await response.json() // parse the response data
  //       bodyUser.id_client = responseData.id
  //     } else if (response.status === 400) {
  //       // Handle non-successful responses
  //       const errorData = await response.json()
  //       console.error('Request failed 2: ', errorData.error)
  //       // Handle the error here
  //       if (errorData.errorCode === 'duplicate_product') {
  //         // setOpenErrorModal(true) // Open the modal for duplicate product error
  //         // setErrorData(errorData.errorCode)
  //       }
  //     }
  //   } catch (error: unknown) {
  //     if (typeof error === 'string') {
  //       // 'error' is now narrowed down to type 'string'
  //       console.error('Error:', error)
  //     } else if (error instanceof Error) {
  //       // 'error' is now narrowed down to type 'Error'
  //       console.error('Error object:', error.message)
  //     } else {
  //       // Handle other cases as needed
  //     }
  //   } finally {
  //     if(bodyUser.id_client)
  //       postUser(bodyUser)
  //   }
  // } 
  // const postUser = async (bodyUser:UserData) => {
  //   // console.log('Login.tsx postUser bodyUser: ', bodyUser)
  //   let loadingSuccess: boolean = false
  //   try {
  //     const response = await fetch(`http://localhost:4000/api/users/`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json', // Set the appropriate content-type for my API
  //         // Add any other requires headers here
  //       },
  //       body:JSON.stringify(bodyUser)
  //     })

  //     // Check if the response status is successful
  //     if (response.ok) {
  //       const responseData = await response.json() // parse the response data
  //       loadingSuccess = true
  //       // set_IdUserLogged(responseData._id)
  //       setGmailUserLogged(responseData)
  //     } else if (response.status === 400) {
  //       // Handle non-successful responses
  //       console.error('Request failed: ', response.status, response.statusText)
  //       const errorData = await response.json()
  //       console.error('Request failed 2: ', errorData.error)
  //       // Handle the error here
  //       if (errorData.errorCode === 'duplicate_product') {
  //         // setOpenErrorModal(true) // Open the modal for duplicate product error
  //         // setErrorData(errorData.errorCode)
  //       }
  //     }
  //   } catch (error: unknown) {
  //     if (typeof error === 'string') {
  //       // 'error' is now narrowed down to type 'string'
  //       console.error('Error:', error)
  //     } else if (error instanceof Error) {
  //       // 'error' is now narrowed down to type 'Error'
  //       console.error('Error object:', error.message)
  //     } else {
  //       // Handle other cases as needed
  //     }
  //   } finally {
  //     // console.log("loadingSuccess: ", loadingSuccess)
  //     setIsLoading((prevLoading: any) => ({
  //       ...prevLoading,
  //       fieldsFetchCreateStock: loadingSuccess,
  //     }));
  //   }
  // }

  return (
    <div>
    <ThemeProvider theme={theme}>
      <Modal open={true} > 
        <Box sx={modalStyleSaveExternal}>
          <Box sx={{...modalStyleErrorInternal, ...modalLoginInternal}}>
            <Typography className={classes.finishButtons} align="center" variant='h5' >
                Login
            </Typography> 
            <Box className={classes.customBoxColumn}>
              <Box className={classes.customBoxRow}>

              <ComboBox
                // optionsData={[{label: "test"}, {label: "test2"}]}
                optionsData={rememberLabelUsers}
                
                comboLabel="Username or Email"
                comboValue={userNameEmail}
                comboHandleValue={handleUserNameEmail}
                errorTextField={errorTextFields.user_name_email}
                />


                {/* <TextField
                  label="Username or Email"
                  value={userNameEmail}
                  onChange={ (event) => handleUserNameEmail(event.target.value) }
                  maxRows={1}
                  size="small"
                  className= {`${errorTextFields.user_name_email ? classes.text_field_error : ""} ${classes.inputMainData} `}
                  InputProps={{
                    className: classes.inputClassName,
                  }}
                /> */}
              </Box>
              <Box className={classes.customBoxRow}>
                <TextField
                  label="Password"
                  maxRows={1}
                  size="small"
                  value={userPass}
                  type={ showProfilePass ? "text" : "password" }
                  onChange={ (event) => handleUserPass(event.target.value) }
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
              {/* <Box className={classes.customBoxRowEnd}> */}
                <Box>
                  <Switch 
                    color='success' 
                    checked={rememberUser.enabled}
                    onChange={(event) => {
                      rememberEnabledChange(event.target.checked)
                    }}
                  />Remember me 
                </Box>
                    
                {/* <Box > */}
                {/* <Box > */}
                <OkButton
                  clicked={() => handleLogin()}
                  widthIco={100}
                />
                {/* </Box> */}
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
            <Box className={classes.customBoxRowSpaceAround} sx={{ typography: 'subtitle2' }}>
                <NavLink 
                  style={{ color: theme.palette.secondary.main }}
                  to="/signup"
                >
                  Forgot Password? 
                </NavLink>
                {/* <Box className={classes.customBoxRow}> */}
                    {/* New here?  */}
                  <NavLink 
                    style={{ color: theme.palette.secondary.main }}
                    to="/signup"
                  >
                    Sign Up 
                  </NavLink>
                {/* </Box> */}
            </Box>
          </Box>
        </Box>
      </Modal>  
      </ThemeProvider>
    </div>
  )
}