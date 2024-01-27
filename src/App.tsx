import { useEffect, useState, useContext, useCallback } from 'react'
// import { Container, Typography, Grid } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';
// import Backdrop from '@mui/material/Backdrop'
// import CircularProgress from '@mui/material/CircularProgress'

import { OkButton, CancelButton, PlusButton, UpdateButton } from './components/Buttons';
import Layout from './components/Layout';
// import MainSearch from './components/MainSearch';
// import TableProducts from './components/TableProducts';
// import CreateStock from './components/CreateStock';
// import ManageStock from './components/ManageStock';
// import UpdateAmountStock from './components/UpdateAmountStock';
// import { Data, ColumnData, CustomValueData, UserData, ProductUpdateData } from './types';
// import { UserContext } from './context/UserContext';
// import { IsLoadingContext } from './context/IsLoadingContext';
// import { ColumnsContext } from './context/ColumnsContext';
// import { ProductsContext } from './context/ProductsContext';
// import MassiveUpdateStock from './components/MassiveUpdateStock';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import Redirect from './components/Redirect';
// import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider, Navigate   } from 'react-router-dom';
import { Routes, Route, useNavigate, useLocation  } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { GoogleOAuthProvider } from '@react-oauth/google';

// import Cookies from 'js-cookie';
import useAuth from './hooks/useAuth';


const theme = createTheme({
  typography: {
    fontFamily: [
      '"Asap Condensed"',
    ].join(','),
    fontSize: 20,
  },
})

// const idColumnsTableOrder: Number[] = [1, 2, 3, 4]

function App() {
  const CLIENT_ID = import.meta.env.VITE_CLIENT_ID
  // const { user } = useContext<any>(UserContext);
  // const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const { auth, persist } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { hash, pathname, search } = location;
  // console.log("hash: ", hash)
  // console.log("pathname: ", pathname)
  // console.log("search: ", search)

  // navigate('/home')
//   useEffect(() => {
// //     // Check if JWT exists in cookies

//     // console.log("user._id: ", user._id)
//     if (user._id != "") {
//       console.log("setIsAuthenticated")

// //         // Validate the token if needed
//         setIsAuthenticated(true)
//     } else {
//       setIsAuthenticated(false)

//     }
// }, [user])


// useEffect(() => {
//   const token = Cookies.get('jwt');
//   // console.log("token: ", token)
//   if (token) {
//     setIsAuthenticated(true);
//   }
// }, []);

// useEffect(() => {
//   const token = Cookies.get('jwt');
//   // console.log("token: ", token)
//   if (token) {
//     setIsAuthenticated(true);
//   }
// }, []);
// useEffect(() => {
//   // console.log("App persist: ", persist) 
//   // console.log("App auth?._id: ", auth?._id) 
//   if (auth._id ){
                
//     console.log("!!!!!!!!!!!!!!navigate: ")
//     navigate('/')
//   } else if(pathname === "/signup"){
//     navigate('/signup')
//   } else {
//     navigate('/login')
//   }
// }, [auth]);

// if (auth?._id) {
//   return <Navigate to="/" replace />;
// }
  // const router = createBrowserRouter(
  //   createRoutesFromElements(
  //     <Route>
  //       <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
        
  //       {/* <Route index element={<Home />} /> */}
  //       <Route path="login" element={<Login />} />
  //       <Route path="signup" element={<SignUp />} />
  //       {/* ... etc. */}
  //     </Route>
  //   )
  // );

  // return(
  //   <GoogleOAuthProvider clientId={CLIENT_ID}>
  //     <RouterProvider router={router} />
  //   </GoogleOAuthProvider>
  // )
  return(
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <Routes>
        <Route path="/" element={<Layout />} >

          {/* we want to protect these routes */}
          <Route element={<PersistLogin />} >
            <Route element={<RequireAuth />} >
              <Route path="" element={<Home />} />
              <Route path="*" element={<Home />} />
              <Route path="/*" element={<Home />} />
              {/* <Route path="login" element={<Home />} />
              <Route path="signup" element={<Home />} /> */}
            </Route>


          
          {/* public routes */}
            <Route element={<Redirect />} >
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
              </Route>
          </Route>
            {/* catch all */}
            {/* <Route path="*" element={<Login />}  /> */}
        </Route>
      </Routes>
    </GoogleOAuthProvider>
  )
}
export default App