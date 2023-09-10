import { Box, Button, IconButton  } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import { makeStyles } from 'tss-react/mui';
import ControlPointTwoToneIcon from '@mui/icons-material/ControlPointTwoTone';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import FolderOpenRoundedIcon from '@mui/icons-material/FolderOpenRounded';
import { useEffect, useState } from 'react';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import EditIcon from '@mui/icons-material/Edit';
import IonTrash from "../assets/ion_trash.svg";

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
    neutral: {
      main: 'rgb(255, 255, 255, 1)',
      contrastText: 'rgb(255, 255, 255, .2)',
      dark: 'rgb(155, 155, 155, 1)',
    },
  },
});
declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
  }
}

// @babel-ignore-comment-in-output Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}


const colorOk = {
  main: 'rgb(32, 205, 60, 1)',
  // dark: 
}

const useStyles = makeStyles()({
  btnCommonStyle: {
    borderRadius: "10px",
    transition: ".5s",
    "& > *": {
      transition: ".5s",
    },
    '&:hover': {
      borderWidth: "5px",
      "& > *": {
        transition: ".5s",
      }
    }
  },
  btnCancel: {
    backgroundColor: theme.palette.warning.contrastText,
    '&:hover': {
      borderColor: theme.palette.warning.dark,
      backgroundColor: theme.palette.warning.contrastText,
      "& > *": {
        stroke: theme.palette.warning.dark
      }
    }
  },
  btnOk: {
    backgroundColor: theme.palette.success.contrastText,
    '&:hover': {
      borderColor: theme.palette.success.dark,
      backgroundColor: theme.palette.success.contrastText,
      "& > *": {
        stroke: theme.palette.success.dark
      }
    }
  },  
  btnEdit: {
    backgroundColor: theme.palette.neutral.contrastText,
    '&:hover': {
      borderColor: theme.palette.neutral.dark,
      backgroundColor: theme.palette.neutral.contrastText,
      "& > *": {
        color:theme.palette.neutral.dark,
      }
    },
  },
  btnAdd: {
    backgroundColor: theme.palette.neutral.contrastText,
    '&:hover': {
      borderColor: theme.palette.neutral.dark,
      backgroundColor: theme.palette.neutral.contrastText,
      "& > *": {
        color:theme.palette.neutral.dark,
        stroke: theme.palette.neutral.dark
      }
    },
  },
  menuIcon: {
    // color: "white !important",
    color: theme.palette.neutral.main,
    '& .MuiSvgIcon-root': {
      width: '2.9rem',
      height: '2.9rem',
    },
  },  
  plusIcon: {
    color: "rgb(77, 168, 218, 1)",
    margin: "0 5px",
    padding: "1px 1px",
    backgroundColor: "rgb(77, 168, 218, 0)",
    '& .MuiSvgIcon-root': {
      width: '2.9rem',
      height: '2.9rem',
    },
  },
  backPlus: {
    color: "red",
  },
})


interface ButtonProps {
  sizeIco?: string
  roundedIco?: boolean
  cusField?: {id: number, value: string}
  clicked: (id?: number, value?: string) => void
  direction?: string
  submitOk?: boolean
}

export function OkButton({ sizeIco, roundedIco, cusField, clicked, submitOk }: ButtonProps ) {

  const { classes } = useStyles()
  const colorOk = theme.palette.success.main
  
  let fontIco = 35, noPadding, bor = 5, borRad
  if(sizeIco) {
    fontIco = (parseInt(sizeIco) - 12)
    bor = 3
  }
  if(roundedIco){
    noPadding=0
    borRad="50px !important"
  } 
  const handleClick:any = (() => {
    if(cusField)
      clicked(cusField.id, cusField.value)
    else
      clicked()
  })

  return (  
    <ThemeProvider theme={theme}>
      <Button 
        variant="outlined"
        color="success"
        className={`${classes.btnCommonStyle} ${classes.btnOk}`}
        sx={{  
          border: bor, 
          padding:noPadding, 
          paddingTop:0,  
          paddingBottom:0, 
          minWidth: sizeIco, 
          width: sizeIco, 
          height: sizeIco,
          borderRadius: borRad,
        }}
        onClick={handleClick}
        >
        <CheckRoundedIcon 
        sx={{ 
          fontSize: fontIco,
          stroke: colorOk, 
          strokeWidth: 2 
        }}></CheckRoundedIcon>
      </Button>
    </ThemeProvider>
  )
}

export function CancelButton({ sizeIco, roundedIco, clicked }: ButtonProps) {

  const { classes } = useStyles()
  const colorCancel = theme.palette.warning.main
  let fontIco = 35, noPadding, bor = 5, borRad
  if(sizeIco) {
    fontIco = (parseInt(sizeIco) - 12)
    bor = 3
  }
  if(roundedIco){
    noPadding=0
    borRad="50px !important"
  } 
  
  const handleClick = (() => {
      clicked()
  })
  return (
    <ThemeProvider theme={theme}>
      <Button 
        variant="outlined"
        color="warning"
        className={`${classes.btnCommonStyle} ${classes.btnCancel}`}
        sx={{  
          border: bor , 
          padding:noPadding, 
          paddingTop:0,  
          paddingBottom:0, 
          minWidth: sizeIco, 
          width: sizeIco, 
          height: sizeIco,
          borderRadius: borRad,
        }}
        onClick={handleClick}
      >
        
        <CloseRoundedIcon 
        sx={{ 
          fontSize: fontIco, 
          stroke: colorCancel, 
          strokeWidth: 2 ,
        }}>
        </CloseRoundedIcon>
      </Button>
    </ThemeProvider>   
  )
}


export function EditButton({ sizeIco, roundedIco, cusField, clicked, submitOk }: ButtonProps ) {

  const { classes } = useStyles()
  const colorOk = theme.palette.neutral.main
  
  let fontIco = 35, noPadding, bor = 5, borRad
  if(sizeIco) {
    fontIco = (parseInt(sizeIco) - 12)
    bor = 3
  }
  if(roundedIco){
    noPadding=0
    borRad="50px !important"
  } 
  const handleClick:any = (() => {
    if(cusField)
      clicked(cusField.id, cusField.value)
    else
      clicked()
  })

  return (  
    <ThemeProvider theme={theme}>
      <Button 
        variant="outlined"
        color="neutral"
        className={`${classes.btnCommonStyle} ${classes.btnEdit}`}
        sx={{  
          border: bor, 
          padding:noPadding, 
          paddingTop:0,  
          paddingBottom:0, 
          minWidth: sizeIco, 
          width: sizeIco, 
          height: sizeIco,
          borderRadius: borRad,
        }}
        onClick={handleClick}
        >
        <EditIcon 
        sx={{ 
          fontSize: fontIco,
        }}></EditIcon>
      </Button>
    </ThemeProvider>
  )
}


export function DeleteButton({ sizeIco, roundedIco, cusField, clicked, submitOk }: ButtonProps ) {

  const { classes } = useStyles()
  const colorOk = theme.palette.neutral.main
  
  let fontIco = 28, noPadding, bor = 5, borRad
  if(sizeIco) {
    fontIco = (parseInt(sizeIco) - 12)
    bor = 3
  }
  if(roundedIco){
    noPadding=0
    borRad="50px !important"
  } 
  const handleClick:any = (() => {
    if(cusField)
      clicked(cusField.id, cusField.value)
    else
      clicked()
  })

  return (  
    <ThemeProvider theme={theme}>
      <Button 
        variant="outlined"
        color="neutral"
        className={`${classes.btnCommonStyle} ${classes.btnEdit}`}
        sx={{  
          border: bor, 
          padding:noPadding, 
          paddingTop:0,  
          paddingBottom:0, 
          // minWidth: sizeIco, 
          width: 74.6, 
          // height: sizeIco,
          borderRadius: borRad,
        }}
        onClick={handleClick}
        >

          <img 
            src={IonTrash} 
            alt="Trash"
            style={{ filter: "brightness(0) invert(100%)" }}  
            
          width= {28}   
          />


        {/* <EditIcon 
        sx={{ 
          fontSize: fontIco,
        }}></EditIcon> */}
      </Button>
    </ThemeProvider>
  )
}

export function AddButton({ sizeIco, roundedIco, cusField, clicked, submitOk }: ButtonProps ) {

  const { classes } = useStyles()
  const colorNeutral = theme.palette.neutral.main
  
  const colorCancel = theme.palette.warning.main

  let fontIco = 35, noPadding, bor = 5, borRad
  if(sizeIco) {
    fontIco = (parseInt(sizeIco) - 12)
    bor = 3
  }
  if(roundedIco){
    noPadding=0
    borRad="50px !important"
  } 
  const handleClick:any = (() => {
    if(cusField)
      clicked(cusField.id, cusField.value)
    else
      clicked()
  })

  return (  
    <ThemeProvider theme={theme}>
      <Button 
        variant="outlined"
        color="neutral"
        className={`${classes.btnCommonStyle} ${classes.btnAdd}`}
        sx={{  
          border: bor, 
          padding:noPadding, 
          paddingTop:0,  
          paddingBottom:0, 
          // minWidth: sizeIco, 
          width: 74.6, 
          // height: sizeIco,
          borderRadius: borRad,
        }}
        onClick={handleClick}
        >
          <AddRoundedIcon 
            sx={{ 
              fontSize: fontIco, 
              stroke: colorNeutral, 
              strokeWidth: 1.7,
            }}>
          </AddRoundedIcon>
      </Button>
    </ThemeProvider>
  )
}


interface ChildProps {
  onDataChanged: (newData: boolean) => void;
}

export function MenuButton({ onDataChanged }: ChildProps) {

  const { classes } = useStyles()
 
  const handleClick = () => {
    onDataChanged(true)
  }

  return (
    <IconButton
      onClick={handleClick}
      // onClick={() => setDrawerOpen(true)}
      className={classes.menuIcon}
      id="hamburgerMenuButton">
      <MenuRoundedIcon />
    </IconButton>
  )
}


interface PlusButtonProps {
  sizeIco?: string
  sizeIcoExt?: string
  sizeIcoInt?: string
  colorIco?: string
  clicked?: () => void
}

export function PlusButton({ sizeIco, sizeIcoExt, sizeIcoInt, colorIco, clicked }:  PlusButtonProps ) {
  const { classes } = useStyles()
  // console.log("sizeIco: ", sizeIco)

  const handleClick = () => {
    if (clicked)
      clicked()
  }
  if (sizeIco) {
    sizeIcoExt = sizeIco
    sizeIcoInt = sizeIco
  }
  
  return(
    <IconButton
      className={classes.plusIcon}
      id="plusButton"
      sx={{width: sizeIcoExt, height: sizeIcoExt}}
      onClick={handleClick}
      >
        <ControlPointTwoToneIcon 
        // sx={{width: sizeIco, height: sizeIco}}
        sx={{width: sizeIcoInt, height: sizeIcoInt, color: colorIco}}
        />
    </IconButton>
  )
}


export function MinusButton({ sizeIco, sizeIcoExt, sizeIcoInt, colorIco, clicked }:  PlusButtonProps ) {
  const { classes } = useStyles()
  // console.log("sizeIco: ", sizeIco)

  const handleClick = () => {
    if (clicked)
      clicked()
  }
  if (sizeIco) {
    sizeIcoExt = sizeIco
    sizeIcoInt = sizeIco
  }
  
  return(
    <IconButton
      className={classes.plusIcon}
      id="minusButton"
      sx={{width: sizeIcoExt, height: sizeIcoExt}}
      onClick={handleClick}
      >
        <RemoveCircleTwoToneIcon 
        // sx={{width: sizeIco, height: sizeIco}}
        sx={{width: sizeIcoInt, height: sizeIcoInt, color: colorIco}}
        />
    </IconButton>
  )
}

export function UpButton({ sizeIco, roundedIco, cusField, clicked, direction }: ButtonProps ) {
  const { classes } = useStyles()
  // const colorOk = theme.palette.success.main
  // const colorOk = "white"
  sizeIco = "50px"
  roundedIco = true
  
  let fontIco = 35, noPadding, bor = 5, borRad
  if(sizeIco) {
    fontIco = (parseInt(sizeIco))
    // bor = 3
  }
  if(roundedIco){
    noPadding=0
    borRad="50px !important"
  } 

  const handleClick = (() => {
    if(cusField)
      clicked(cusField.id, cusField.value)
    else
      clicked()
  })
  let Arrow 
  if(direction === "up") Arrow = ArrowDropUpIcon
  else if(direction === "down") Arrow = ArrowDropDownIcon
  else if(direction === "left") Arrow = ArrowLeftIcon
  else Arrow = ArrowRightIcon

  return (  
    <ThemeProvider theme={theme}>
      <Button 
        variant="outlined"
        color="neutral"
        className={`${classes.btnCommonStyle} ${classes.btnEdit}`}
        sx={{  
          border: bor, 
          padding:noPadding, 
          paddingTop:0,  
          paddingBottom:0, 
          minWidth: sizeIco, 
          width: sizeIco, 
          height: sizeIco,
          borderRadius: borRad,
          margin: 1,
        }}
        onClick={handleClick}
      >
        <Arrow 
        sx={{ 
          fontSize: fontIco,
          // stroke: colorOk, 
          // strokeWidth: 2 
        }}/>
      </Button>
    </ThemeProvider>
  )
}

export function FolderButton({ sizeIco, roundedIco, cusField, clicked, direction }: ButtonProps ) {
  sizeIco = "50px"
  roundedIco = true
  
  let fontIco = 35, noPadding, bor = 5, borRad
  if(sizeIco) {
    fontIco = (parseInt(sizeIco))
    // bor = 3
  }
  if(roundedIco){
    noPadding=0
    borRad="50px !important"
  } 
  const handleClick = (() => {
      clicked()
  })

  return (
    <ThemeProvider theme={theme}>
      <Button
        color="neutral"
        sx={{  
          // border: bor, 
          padding:noPadding, 
          paddingTop:0,  
          paddingBottom:0, 
          minWidth: sizeIco, 
          width: sizeIco, 
          height: sizeIco,
          borderRadius: borRad,
          color: "rgb(45,72, 91, 1)" ,
        }}
        onClick={handleClick}
        >
        <FolderOpenRoundedIcon></FolderOpenRoundedIcon>
      </Button>
    </ThemeProvider>

  )
}

interface SelectImageButtonProps{
  imageUrl:string
  setImageUrl:(newData: string) => void
}

export function SelectImageButton( { imageUrl, setImageUrl } : SelectImageButtonProps) {

  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  useEffect(() => {
    if(selectedImage){
      // console.log("selectedImage: ", selectedImage)
      // console.log("URL: ", URL.createObjectURL(selectedImage))
      setImageUrl(URL.createObjectURL(selectedImage))

    }
  }, [selectedImage])
  return (
    <>
      <input 
        accept='image/' 
        type='file' 
        id='select-image' 
        style={{ display:'none'}}  
        onChange={e => {
          if (e.target.files) {setSelectedImage(e.target.files[0])}
          }}
      />
      <label htmlFor='select-image'>
        <ThemeProvider theme={theme}>
          <Button color='neutral' 
         component='span' sx={{ outline: "dotted  1px", padding: "0", height:"130px", width: "230px" }}>
            { imageUrl && selectedImage ? (
                  <img 
                    src={imageUrl} 
                    alt={selectedImage.name} 
                    style={{ borderRadius:"3px", height: "100%", width: "100%", objectFit: "contain" }}
                  />
               ) : <AddAPhotoIcon /> 
              
               } 
          </Button>
        </ThemeProvider>
      </label>
      </>
  )
}

