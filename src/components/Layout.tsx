import { Outlet } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';


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

const Layout = () => {
    return (
        <main className="App">
            <ThemeProvider theme={theme}>
                <Outlet />
            </ThemeProvider>
        </main>
    )
}

export default Layout