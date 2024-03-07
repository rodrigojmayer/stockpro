import { useState, useContext, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom"
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
import { UsersContext } from '../context/UsersContext';
import useUser from '../hooks/useUser';
import { IsLoadingContext } from "../context/IsLoadingContext";
import { RememberLabelUsersData, RememberUserData, RememberUsersPassData, UserData, UserEditData, JwtPayload } from "../types";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ComboBox from "../components/inputs/ComboBox";
import useAddUser from "../hooks/addUser";
import { CheckListStockContext } from "../context/CheckListStockContext";
import Cookies from 'js-cookie';
import ConfirmUserValidatedModal from '../components/ConfirmUserValidatedModal';
import ManageForgottenPass from "../components/ManageForgottenPass";
import Paper from '@mui/material/Paper/Paper';

// const theme = createTheme({
//   palette: {
//     secondary: {
//       main: '#c1e8fb',
//     },
//   },
// })

export default function Login () {

  const addUser = useAddUser(); 
  const { classes } = useStylesGlobal();
  // const { isLogged, loginLocalStorage, loginUser } = useUser()
  const { isLogged, loginUser } = useUser()
  const { INITIAL_USER, user, setUser, gmailUserLogged, setGmailUserLogged, _IdUserLogged, set_IdUserLogged } = useContext<any>(UserContext); 
  const { users, setUsers } = useContext<any>(UsersContext); 
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
    
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { hash, pathname, search } = location;

  // Get the keys from localStorage
  // let localStorageKeys = Object.keys(localStorage)
  // let varrememberUsersPass: any[] = []
  useEffect(() => {
    setOpenErrorModal(false)
    setErrorData("")
  }, [])
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

  // useEffect(() => {
  //   userRef.current.focus()
  // }, [])

  const showProfilePassToggle = () => {
    if(allowShowProfilePass)
      setShowProfilePass(!showProfilePass)
  }
  const rememberEnabledChange = (value: boolean) => {
    setRememberUser(value)
    // setRememberUser((prevRememberUser: RememberUserData) => ({
    //   ...prevRememberUser,
    //   enabled: value
    // }))
  }
  
  useEffect(() => {  
    if(rememberUsersPass) {
      // const passSelected = rememberUsersPass.filter((person: { user_email: string; }) => {
      const passSelected = rememberUsersPass.filter((person: any) => {
        const key = Object.keys(person)[0];
        // console.log("key: ", key);
        // console.log("person[key]: ", person[key]);
        const cleanPersonEmail = key.trim().toLowerCase();
        const cleanUserNameEmail = userNameEmail.trim().toLowerCase();
        // console.log("cleanPersonEmail: ", cleanPersonEmail);
        // console.log("cleanUserNameEmail: ", cleanUserNameEmail);
        return cleanPersonEmail === cleanUserNameEmail;
        // const cleanPersonEmail = person.user_email.trim().toLowerCase();
        // const cleanUserNameEmail = userNameEmail.trim().toLowerCase();
        // return cleanPersonEmail === cleanUserNameEmail;
      });
      // console.log("passSelected: ", passSelected);
      
      if(passSelected.length > 0){
        const key = Object.keys(passSelected[0])[0];
        // console.log("key: ", key);
        // console.log("passSelected[0]: ", passSelected[0]);
        // console.log("passSelected[0][key]: ", passSelected[0][key]);
        handleUserPass(passSelected[0][key])
        // handleUserPass(passSelected[0].pass)
        setAllowShowProfilePass(false)
        setShowProfilePass(false)
        setRememberUser(true)
        // setRememberUser((prevRememberUser: RememberUserData) => ({
        //   ...prevRememberUser,
        //   enabled: true
        // }))
      } else {
        setAllowShowProfilePass(true)
        handleUserPass("")
        setRememberUser(false)
        // setRememberUser((prevRememberUser: RememberUserData) => ({
        //   ...prevRememberUser,
        //   enabled: false
        // }))
      }
    }
  }, [userNameEmail])

  const handleUserNameEmail = (value: string) => {
    setUserNameEmail(value) 
    // setRememberUser((prevRememberUser: RememberUserData) => ({
      // ...prevRememberUser,
    //   user_email: value
    // }))
    setErrorTextFields((prevErrorTextFields: any) => ({
      ...prevErrorTextFields,
      user_name_email: false,
    }));
  }
  const handleUserPass = (value: string) => {
    setUserPass(value)   
    // setRememberUser((prevRememberUser: RememberUserData) => ({
    //   ...prevRememberUser,
    //   pass: value
    // }))
    setErrorTextFields((prevErrorTextFields: any) => ({
        ...prevErrorTextFields,
        user_pass: false,
    }));
  }
  
  const handleLogin = async () => {
    console.log("handleLogin userNameEmail: ", userNameEmail)
    console.log("handleLogin userPass: ", userPass)
    console.log("handleLogin rememberUser: ", rememberUser)
    // alert("login submit success")
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
    // navigate(from, { replace: true });
  }
  
  const handleLoginGoogleSuccess = async (response: any) => {
    // Handle the successful Google login response here
    const googleDecodedToken:JwtPayload = jwtDecode(response.credential);
    // console.log("handleLoginGoogleSuccess response.credential: ", response.credential)
    // console.log("handleLoginGoogleSuccess googleDecodedToken: ", googleDecodedToken)
    const userEmailData = googleDecodedToken
    setGmailUserLogged(userEmailData)     //////////// check for what is this
    // Remove special characters from the string, excluding '@' and '.'
    // const emailWithoutSpecialChars = googleDecodedToken.email.replace(/[&\/\\#,+(|°)=$~%.'":*?<>{}@-_!&\-/]/g, '').slice(0, -3);
    // const emailWithoutSpecialChars3 = "google@Decod!#$%&'/(|°)=?ed-_,.Token.email".replace(/[&\/\\#,+(|°)=$~%.'":*?<>{}@-_!&\-/]/g, '');
    await loginUser(googleDecodedToken.email, "", false, googleDecodedToken)
    // await loginUser(emailWithoutSpecialChars, "", false, googleDecodedToken)
  };

  const handleLoginGoogleFailure = (error: any) => {
    // console.error('Login Google Failure:', error);
    // Handle the failure/error during Google login here
  }; 
  
  const handleCloseErrorModal = () => {
    setOpenErrorModal(false)
  }

  // useEffect(() => {
  //   if(gmailUserLogged.email && gmailUserLogged.email !== user.email){
  //     const fetchUserByGmail = async () => {
  //       try {
  //         const response = await fetch(`${import.meta.env.VITE_API_URL_BACKEND}/users/logingmail/`, {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body:JSON.stringify(gmailUserLogged)
  //         });
  //         if (response.ok) {
  //           const json = await response.json();
  //           console.log("json: ", json.error)
  //           if (json.error){
  //             // postClient()
  //             const bodyCreate: UserEditData = {}
  //             bodyCreate.deleted = false
  //             bodyCreate.language =  1    //  FIX LANGUAGE SELECTED
  //             bodyCreate.background_color = 0
  //             bodyCreate.alerts_enabled = false
  //             bodyCreate.ordered_fields = [-1,-2,-3,-4,-5]
  //             bodyCreate.id_access_level = 4
  //             bodyCreate.user = gmailUserLogged.email?.split("@")[0] || ""
  //             bodyCreate.email = gmailUserLogged.email
  //             bodyCreate.name= gmailUserLogged.given_name,
  //             bodyCreate.last_name= gmailUserLogged.family_name,
  //             bodyCreate.enabled = true
  //             bodyCreate.gmail_autocreate = true
  //             bodyCreate.validated = true
  //             // bodyCreate.pass = pass
  //             // addUser(bodyCreate);
  //             const createUser = async () => {
  //                 await addUser(bodyCreate);
  //             };
  //             createUser();
  //           }
  //           else{
  //             // loginLocalStorage(json);

  //           }
  //         }
  //       } catch (error) {
  //         console.log("error: ", error)
  //         // setUser(INITIAL_USER);
  //         // Handle any network or fetch-related errors
  //       } finally {
  //         setIsLoading((prevLoading:any) => ({
  //           ...prevLoading,
  //           user: false,
  //         }));
  //         setGmailUserLogged(INITIAL_USER)  // Resetting after login to allow later the logout
  //       }
  //     };
  //     fetchUserByGmail();
  //   }
  // }, [gmailUserLogged]);

  useEffect(() => {
    setCheckListStock([]) 

    const rmb = Cookies.get('rmb')
    if (rmb) {
      // console.log("rmb: ", rmb)
      // console.log("Array?: ", Array.isArray(rmb))
      // console.log("Array?: ", JSON.parse(rmb))
      // console.log("Array now?: ",  Array.isArray(JSON.parse(rmb)))
      let rmbU: RememberLabelUsersData[] = []
      let rmbP: RememberUsersPassData[] = []
      JSON.parse(rmb).forEach((obj:any) => {
      // console.log("obj.u: ",  obj.u)
      // console.log("obj.p: ",  obj.p)

        rmbU.push({label: obj.u})
        rmbP.push({[obj.u]: obj.p})
      })
      // console.log("rmbU: ", rmbU)
      // console.log("rmbP: ", rmbP)
      setRememberLabelUsers(rmbU)
      setRememberUsersPass(rmbP)
    }
    
  }, [])

//   useEffect(() => {
//   if(isLoading.openFirstTimeValidateUser){ //  Only will set open when the user open the web from the button in the email to validate
//     setOpenConfirmUserValidatedModal(true)
//   }
  
// }, [isLoading])
  
const handlecloseConfirmUserValidatedModal = () => {
  setOpenConfirmUserValidatedModal(false)
}
const handlecloseManageForgottenPass = () => {
  setOpenManageForgottenPass(false)
}

useEffect(() => {
  //     // Check if JWT exists in cookies
  // alert("stop1")
  // console.log("pathname: ", pathname)
  // const subPaths = pathname.split("/")
  // console.log("subPaths: ", subPaths)
  // alert("stop2")
    console.log("isLoading.openFirstTimeValidateUser: ", isLoading.openFirstTimeValidateUser)

  // if (subPaths[1] === "login" && subPaths[2]) {//  Only will set open when the user open the web from the button in the email to validate
  if (isLoading.openFirstTimeValidateUser) {//  Only will set open when the user open the web from the button in the email to validate
    // console.log("subPaths[2]: ", subPaths[2])

    
  // alert("stop3")
    const activateUser = async () => {   
      // let loadingSuccess = false     
      try {
        // const response = await fetch(`${import.meta.env.VITE_API_URL_BACKEND}/register/validateUser/${subPaths[2]}`, {
        const response = await fetch(`${import.meta.env.VITE_API_URL_BACKEND}/register/validateUser/${isLoading.openFirstTimeValidateUser}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json', // Set the appropriate content-type for my API
            },
            // body:JSON.stringify({})
        })
        const responseData = await response.json() // parse the response data

        // Check if the response status is successful
        if (response.ok) {
           setOpenConfirmUserValidatedModal(true)
           setTextData(responseData.message)
        } else {
          // Handle non-successful responses
          // console.error('responseData: ', responseData)
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

// }, [pathname])
}, [isLoading.openFirstTimeValidateUser])



return (
  <Modal open={true} > 
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
                  // optionsData={[{label: "test"}, {label: "test2"}]}
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
              {/* <Box className={classes.customBoxRowEnd}> */}
                <Box>
                  <Switch 
                    color='success' 
                    checked={rememberUser}
                    onChange={(event:any) => {
                      rememberEnabledChange(event.target.checked)
                    }}
                  />Remember me 
                </Box>
                    
                {/* <Box > */}
                {/* <Box > */}
                <OkButton
                  clicked={() => handleLogin()}
                  widthIco={100}
                  // type="submit"
                />
                {/* </Box> */}
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
              {/* <Box className={classes.customBoxRow}> */}
                  {/* New here?  */}
                <NavLink 
                  style={{ color: '#c1e8fb' }}
                  to="/signup"
                >
                  Sign Up 
                </NavLink>
              {/* </Box> */}
          </Box>
        </Box>
      </Box>
    </Paper>
  </Modal>  
  )
}