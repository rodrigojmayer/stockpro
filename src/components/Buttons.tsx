

import { Typography } from '@mui/material'
import { Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { makeStyles } from 'tss-react/mui';




const theme = createTheme({
    palette: {
      success: {
        main: 'rgb(32, 205, 60, 1)',
        contrastText: 'rgb(32, 205, 60, .2)',
      },
      warning: {
        main: 'rgb(255, 47, 47, 1)',
        contrastText: 'rgb(255, 47, 47, .2)',
      },
    },
  });
  
  const colorOk = {
    main: 'rgb(32, 205, 60, 1)',
    // dark: 
  }
  
  const useStyles = makeStyles()({
    btnCancel: {
      backgroundColor: theme.palette.warning.contrastText,
      transition: ".5s",
      "& > *": {
        transition: ".5s",
  
      },
      '&:hover': {
        borderWidth: "5px",
        borderColor: theme.palette.warning.dark,
        backgroundColor: theme.palette.warning.contrastText,
        "& > *": {
          transition: ".5s",
          stroke: theme.palette.warning.dark
  
        }
      }
    },
    btnOk: {
       backgroundColor: theme.palette.success.contrastText,
      transition: ".5s",
      "& > *": {
        transition: ".5s",
  
      },
      '&:hover': {
        borderWidth: "5px",
        borderColor: theme.palette.success.dark,
        backgroundColor: theme.palette.success.contrastText,
        "& > *": {
          transition: ".5s",
          stroke: theme.palette.success.dark
  
        }
      }
    }
  })
  



  export function OkButton() {

    const { classes } = useStyles()
    const colorOk = theme.palette.success.main
    
  
    return (  
      <ThemeProvider theme={theme}>
        <Button 
          variant="outlined"
          color="success"
          sx={{  border: 5, paddingTop:0,  paddingBottom:0, 
          }}
          className={classes.btnOk}
        >
          <CheckRoundedIcon sx={{ fontSize: 35, stroke: colorOk, strokeWidth: 2 }}></CheckRoundedIcon>
        </Button>
      </ThemeProvider>
    )
  }
  
  export function CancelButton() {

    const { classes } = useStyles()
    const colorCancel = theme.palette.warning.main
    
  
    return (
      <ThemeProvider theme={theme}>
        <Button 
          variant="outlined"
          color="warning"
          sx={{  border: 5 , paddingTop:0,  paddingBottom:0,
          }}
          className={classes.btnCancel}
        >
          
          <CloseRoundedIcon sx={{ fontSize: 35, stroke: colorCancel, strokeWidth: 2 }}></CloseRoundedIcon>
        </Button>
      </ThemeProvider>   
    )
  }
  