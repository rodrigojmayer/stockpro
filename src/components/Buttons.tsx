import { Box, Button, IconButton } from '@mui/material';
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
import { useContext, useEffect, useState } from 'react';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import EditIcon from '@mui/icons-material/Edit';
import IonTrash from "../assets/ion_trash.svg";
import UpdateArrowCircle from "../assets/akar-icons_arrow-cycle.svg";
import GPlusIco from "../assets/gplus.svg";
import Divider from '@mui/material/Divider';
import { _0themeGlobal, _1themeGlobal, _2themeGlobal, useStylesGlobal } from '../Styles'
import { UserContext } from '../context/UserContext';
import { Theme } from '@mui/material/styles'; // Import the Theme type from your theme library


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

interface ButtonProps {
  sizeIco?: string
  roundedIco?: boolean
  cusField?: {id: number, value: string}
  clicked: (id?: number, value?: string) => void
  direction?: string
  submitOk?: boolean
  disabled?: boolean
  widthIco?: number
}
type ThemeMap = {
  [key: string]: Theme; // Key is a string (background color), value is of type Theme
};
const themeMap : ThemeMap = {
  '0': _0themeGlobal,
  '1': _1themeGlobal,
  '2': _2themeGlobal,
};

export function OkButton({ sizeIco, roundedIco, cusField, clicked, submitOk, widthIco }: ButtonProps ) {

  const { classes } = useStylesGlobal();
  const { user } = useContext<any>(UserContext)
  
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
  
  // Select the theme based on user.background_color
  const selectedTheme = themeMap[user.background_color];

  return (  
      <ThemeProvider theme={selectedTheme}>
      <Button 
        variant="outlined"
        color="success"
        className={`${classes.btnCommonStyle} ${classes[`_${user.background_color}btn_ok` as keyof typeof classes]}`}
        sx={{  
          border: bor, 
          padding:noPadding, 
          paddingTop:0,  
          paddingBottom:0, 
          minWidth: sizeIco, 
          width: widthIco || sizeIco, 
          height: sizeIco,
          borderRadius: borRad,
        }}
        onClick={handleClick}
        >
        <CheckRoundedIcon 
        className={classes[`_${user.background_color}check_rounded_icon_stroke_color` as keyof typeof classes]}
        sx={{ 
          fontSize: fontIco,
          strokeWidth: 2 
        }}></CheckRoundedIcon>
      </Button>
    </ThemeProvider>
  )
}

export function CancelButton({ sizeIco, roundedIco, clicked }: ButtonProps) {

  const { classes } = useStylesGlobal();
  const { user } = useContext<any>(UserContext)
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
  
  const selectedTheme = themeMap[user.background_color];

  return (
    <ThemeProvider theme={selectedTheme}>
      <Button 
        variant="outlined"
        color="warning"
        className={`${classes.btnCommonStyle} ${classes[`_${user.background_color}btn_cancel` as keyof typeof classes]}`}
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
         className={classes[`_${user.background_color}close_rounded_icon_stroke_color` as keyof typeof classes]}
        sx={{ 
          fontSize: fontIco, 
          strokeWidth: 2 ,
        }}>
        </CloseRoundedIcon>
      </Button>
    </ThemeProvider>   
  )
}


export function EditButton({ sizeIco, roundedIco, cusField, clicked, submitOk }: ButtonProps ) {

  const { classes } = useStylesGlobal();
  const { user } = useContext<any>(UserContext)
  
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

  const selectedTheme = themeMap[user.background_color];

  return (
    <ThemeProvider theme={selectedTheme}>
      <Button 
        variant="outlined"
        color="neutral"
        className={`${classes.btnCommonStyle} ${classes[`_${user.background_color}btn_edit` as keyof typeof classes]}`}
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

  const { classes } = useStylesGlobal();
  const { user } = useContext<any>(UserContext)
  
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

  const selectedTheme = themeMap[user.background_color];

  return (
    <ThemeProvider theme={selectedTheme}>
      <Button 
        variant="outlined"
        color="neutral"
        className={`${classes.btnCommonStyle} ${classes[`_${user.background_color}btn_edit` as keyof typeof classes]}`}
        sx={{  
          border: bor, 
          padding:noPadding, 
          paddingTop:0,  
          paddingBottom:0, 
          width: 74.6, 
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
      </Button>
    </ThemeProvider>
  )
}

export function AddButton({ sizeIco, roundedIco, cusField, clicked, submitOk }: ButtonProps ) {

  const { classes } = useStylesGlobal();
  const { user } = useContext<any>(UserContext)

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

  const selectedTheme = themeMap[user.background_color];

  return (
    <ThemeProvider theme={selectedTheme}>
      <Button 
        variant="outlined"
        color="neutral"
        className={`${classes.btnCommonStyle} ${classes[`_${user.background_color}btn_add` as keyof typeof classes]}`}
        sx={{  
          border: bor, 
          padding:noPadding, 
          paddingTop:0,  
          paddingBottom:0, 
          width: 74.6, 
          borderRadius: borRad,
        }}
        onClick={handleClick}
        >
          <AddRoundedIcon 
          className={classes[`_${user.background_color}add_rounded_icon_stroke_color` as keyof typeof classes]}
            sx={{ 
              fontSize: fontIco, 
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

  const { classes } = useStylesGlobal();
 
  const handleClick:any = () => {
    onDataChanged(true)
  }

  return (
    <IconButton
      onClick={handleClick}
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

  const { classes } = useStylesGlobal();
  const { user } = useContext<any>(UserContext)

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
      className={`${classes.plusIcon} ${classes[`_${user.background_color}plus_icon_color` as keyof typeof classes]}`}
      id="plusButton"
      sx={{width: sizeIcoExt, height: sizeIcoExt}}
      onClick={handleClick}
      >
        <ControlPointTwoToneIcon 
        sx={{width: sizeIcoInt, height: sizeIcoInt, color: colorIco}}
        />
    </IconButton>
  )
}


export function MinusButton({ sizeIco, sizeIcoExt, sizeIcoInt, colorIco, clicked }:  PlusButtonProps ) {

  const { classes } = useStylesGlobal();

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
          sx={{width: sizeIcoInt, height: sizeIcoInt, color: colorIco}}
        />
    </IconButton>
  )
}

export function UpButton({ sizeIco, roundedIco, cusField, clicked, direction }: ButtonProps ) {

  const { classes } = useStylesGlobal();
  const { user } = useContext<any>(UserContext)
  sizeIco = "50px"
  roundedIco = true
  
  let fontIco = 35, noPadding, bor = 5, borRad
  if(sizeIco) {
    fontIco = (parseInt(sizeIco))
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

  const selectedTheme = themeMap[user.background_color];

  return (
    <ThemeProvider theme={selectedTheme}>
      <Button 
        variant="outlined"
        color="neutral"
        className={`${classes.btnCommonStyle} ${classes[`_${user.background_color}btn_edit` as keyof typeof classes]}`}
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
        }}/>
      </Button>
    </ThemeProvider>
  )
}

interface SelectImageButtonProps{
  imageUrlHandle:string
  setImageUrl:(newData: string) => void
}

export function SelectImageButton( { imageUrlHandle, setImageUrl } : SelectImageButtonProps) {

  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const { user } = useContext<any>(UserContext)

  useEffect(() => {
    if(selectedImage){
      setImageUrl(URL.createObjectURL(selectedImage))
    }
  }, [selectedImage])

  const selectedTheme = themeMap[user.background_color];

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
        <ThemeProvider theme={selectedTheme}>
          <Button color='neutral' 
         component='span' sx={{ outline: "dotted  1px", padding: "0", height:"130px", width: "230px" }}>
            { imageUrlHandle && selectedImage ? (
                  <img 
                    src={imageUrlHandle} 
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

export function AddImageButton( { sizeIco, roundedIco, cusField, clicked, submitOk }: ButtonProps ) {

  const { classes } = useStylesGlobal();
  const { user } = useContext<any>(UserContext)


  let  noPadding, borRad, bor = 5
  borRad="50px !important"
  sizeIco = "50px"
  roundedIco = true

  const selectedTheme = themeMap[user.background_color];

  return (
    <ThemeProvider theme={selectedTheme}>
          <Button 
            variant="outlined"
            className={`${classes.btnCommonStyle} ${classes[`_${user.background_color}btn_edit` as keyof typeof classes]}`}
            color='neutral' 
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
            onClick={() => clicked()}
          >
            <AddAPhotoIcon /> 
          </Button>
        </ThemeProvider>

  )
}

export function UpdateButton({ sizeIco, roundedIco, cusField, clicked, disabled }: ButtonProps ) {

  const { user } = useContext<any>(UserContext)
  let  noPadding, borRad, filterColor = 0
  if(disabled) {
    filterColor = 35
  }
  noPadding=0
  borRad="50px !important"
  // } 
  const handleClick:any = (() => {
    if(cusField)
      clicked(cusField.id, cusField.value)
    else
      clicked()
  })

  const selectedTheme = themeMap[user.background_color];

  return (
    <ThemeProvider theme={selectedTheme}>
      <Button 
          disabled={disabled}
          sx={{  
            display: "flex", 
            margin:"auto",  
            borderRadius: borRad,
            minWidth: 40, 
            minHeight: 40, 
          }}
          onClick={handleClick}
        >
          <img 
            src={UpdateArrowCircle} 
            alt="Update"
            style={{ filter: `invert(${filterColor}%)` }}  
            width= {38}   
          />
      </Button>
    </ThemeProvider>
  )
}

export function GoogleButton({ clicked }: ButtonProps ) {

  const { classes } = useStylesGlobal();
  const { user } = useContext<any>(UserContext)
  
  const handleClick:any = (() => {
      clicked()
  })

  const selectedTheme = themeMap[user.background_color];

  return (
    <ThemeProvider theme={selectedTheme}>
      <Button 
        variant="contained"
        color="error"
        startIcon={
          <img 
            src={GPlusIco} 
            alt="G"
            style={{ filter: "brightness(0) invert(100%)"}}  
            width= {20}   
          />
        }
        onClick={handleClick}
        >
          <Divider 
            orientation="vertical"  
            flexItem
            className={classes.customDividerVertical} 
          />
          Google
      </Button>
    </ThemeProvider>
  )
}
