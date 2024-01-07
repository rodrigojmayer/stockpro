import { useEffect, useState, useContext, useCallback } from 'react'
import { Container, Typography, Grid } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

import { OkButton, CancelButton, PlusButton, UpdateButton } from './components/Buttons';
import Layout from './components/Layout';
import MainSearch from './components/MainSearch';
import TableProducts from './components/TableProducts';
// import CreateStock from './components/CreateStock';
import ManageStock from './components/ManageStock';
import UpdateAmountStock from './components/UpdateAmountStock';
import { Data, ColumnData, CustomValueData, UserData, ProductUpdateData } from './types';
import { UserContext } from './context/UserContext';
import { IsLoadingContext } from './context/IsLoadingContext';
import { ColumnsContext } from './context/ColumnsContext';
import { ProductsContext } from './context/ProductsContext';
import MassiveUpdateStock from './components/MassiveUpdateStock';
import RequireAuth from './components/RequireAuth';
// import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider, Navigate   } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Cookies from 'js-cookie';


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
  const { user } = useContext<any>(UserContext);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  useEffect(() => {
//     // Check if JWT exists in cookies

    console.log("user._id: ", user._id)
    if (user._id != "") {
      console.log("setIsAuthenticated")

//         // Validate the token if needed
        setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)

    }
}, [user])


useEffect(() => {
  const token = Cookies.get('jwt');
  console.log("token: ", token)
  if (token) {
    setIsAuthenticated(true);
  }
}, []);


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
          {/* public routes */}
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />

          {/* we want to protext these routes */}
          <Route element={<RequireAuth />} >
            <Route path="/" element={<Home />} />
          </Route>
          {/* catch all */}
          {/* <Route path="*" element={<Missing />}  /> */}
        </Route>
      </Routes>
    </GoogleOAuthProvider>
  )
}
export default App