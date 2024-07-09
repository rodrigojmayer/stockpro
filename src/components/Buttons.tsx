import { Box, Button, IconButton, Select, MenuItem } from '@mui/material';
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
import _0IonTrash from "../assets/_0ion_trash.svg";
import _1IonTrash from "../assets/_1ion_trash.svg";
import _2IonTrash from "../assets/_2ion_trash.svg";
import _3IonTrash from "../assets/_3ion_trash.svg";
import en_flag_btn from "../assets/en_flag_btn.png";
import sp_flag_btn from "../assets/sp_flag_btn.png";
import dk_flag_btn from "../assets/dk_flag_btn.png";
import pg_flag_btn from "../assets/pg_flag_btn.png";
import gm_flag_btn from "../assets/gm_flag_btn.png";
import it_flag_btn from "../assets/it_flag_btn.png";
import ch_flag_btn from "../assets/ch_flag_btn.png";
import fr_flag_btn from "../assets/fr_flag_btn.png";
import UpdateArrowCircle from "../assets/akar-icons_arrow-cycle.svg";
import GPlusIco from "../assets/gplus.svg";
import Divider from '@mui/material/Divider';
import { _0themeGlobal, _1themeGlobal, _2themeGlobal, _3themeGlobal, useStylesGlobal } from '../Styles'
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
  '3': _3themeGlobal,
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
  // let trashIcon;
  // if (user.background_color === 0) {
  //   trashIcon = _0IonTrash;
  // } else if (user.background_color === 1) {
  //   trashIcon = _1IonTrash;
  // } else if (user.background_color === 2) {
  //   trashIcon = _2IonTrash;
  // } else if (user.background_color === 3) {
  //   trashIcon = _3IonTrash;
  // }
  
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

          {/* <img 
            // src={_2IonTrash} 
            src={trashIcon} 
            alt="Trash"
            // style={{ filter: "brightness(0) invert(100%)" }}  
            
          width= {28}   
          /> */}
          {/* <svg width="28" height="28" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"> */}
          <svg width="28" height="28" viewBox="0 0 25 25">
            <title>Delete</title>
            <path 
              d="M21.0938 4.6875H16.4062V3.51562C16.4062 2.99762 16.2005 2.50084 15.8342 2.13456C15.4679 1.76828 14.9711 1.5625 14.4531 1.5625H10.5469C10.0289 1.5625 9.53209 1.76828 9.16581 2.13456C8.79953 2.50084 8.59375 2.99762 8.59375 3.51562V4.6875H3.90625C3.69905 4.6875 3.50034 4.76981 3.35382 4.91632C3.20731 5.06284 3.125 5.26155 3.125 5.46875C3.125 5.67595 3.20731 5.87466 3.35382 6.02118C3.50034 6.16769 3.69905 6.25 3.90625 6.25H4.73633L5.66406 21.1387C5.7334 22.4497 6.73828 23.4375 8.00781 23.4375H16.9922C18.2681 23.4375 19.2529 22.4717 19.3359 21.1426L20.2637 6.25H21.0938C21.301 6.25 21.4997 6.16769 21.6462 6.02118C21.7927 5.87466 21.875 5.67595 21.875 5.46875C21.875 5.26155 21.7927 5.06284 21.6462 4.91632C21.4997 4.76981 21.301 4.6875 21.0938 4.6875ZM9.40283 20.3125H9.375C9.17253 20.3126 8.97792 20.2341 8.83218 20.0936C8.68645 19.9531 8.60096 19.7614 8.59375 19.5591L8.20312 8.62158C8.19574 8.41438 8.27097 8.21274 8.41227 8.061C8.55356 7.90927 8.74934 7.81988 8.95654 7.8125C9.16374 7.80512 9.36539 7.88035 9.51712 8.02164C9.66885 8.16294 9.75824 8.35872 9.76562 8.56592L10.1562 19.5034C10.16 19.606 10.1434 19.7084 10.1076 19.8046C10.0717 19.9008 10.0172 19.989 9.94726 20.0641C9.87728 20.1393 9.79318 20.1999 9.69977 20.2425C9.60635 20.2851 9.50545 20.3089 9.40283 20.3125ZM13.2812 19.5312C13.2812 19.7385 13.1989 19.9372 13.0524 20.0837C12.9059 20.2302 12.7072 20.3125 12.5 20.3125C12.2928 20.3125 12.0941 20.2302 11.9476 20.0837C11.8011 19.9372 11.7188 19.7385 11.7188 19.5312V8.59375C11.7188 8.38655 11.8011 8.18784 11.9476 8.04132C12.0941 7.89481 12.2928 7.8125 12.5 7.8125C12.7072 7.8125 12.9059 7.89481 13.0524 8.04132C13.1989 8.18784 13.2812 8.38655 13.2812 8.59375V19.5312ZM14.8438 4.6875H10.1562V3.51562C10.1557 3.46416 10.1654 3.4131 10.1848 3.36545C10.2042 3.31779 10.233 3.27449 10.2693 3.2381C10.3057 3.20171 10.349 3.17296 10.3967 3.15354C10.4444 3.13411 10.4954 3.12441 10.5469 3.125H14.4531C14.5046 3.12441 14.5556 3.13411 14.6033 3.15354C14.651 3.17296 14.6943 3.20171 14.7307 3.2381C14.767 3.27449 14.7958 3.31779 14.8152 3.36545C14.8346 3.4131 14.8443 3.46416 14.8438 3.51562V4.6875ZM16.4062 19.5591C16.399 19.7614 16.3136 19.9531 16.1678 20.0936C16.0221 20.2341 15.8275 20.3126 15.625 20.3125H15.5967C15.4941 20.3088 15.3933 20.285 15.2999 20.2424C15.2065 20.1997 15.1225 20.1391 15.0526 20.064C14.9826 19.9888 14.9282 19.9007 14.8924 19.8045C14.8566 19.7083 14.84 19.606 14.8438 19.5034L15.2344 8.56592C15.238 8.46332 15.2619 8.36245 15.3045 8.26906C15.3471 8.17568 15.4077 8.0916 15.4829 8.02164C15.558 7.95168 15.6462 7.8972 15.7424 7.86132C15.8386 7.82543 15.9409 7.80885 16.0435 7.8125C16.1461 7.81615 16.2469 7.83998 16.3403 7.88262C16.4337 7.92526 16.5178 7.98587 16.5877 8.061C16.6577 8.13613 16.7122 8.22431 16.7481 8.32049C16.7839 8.41668 16.8005 8.51899 16.7969 8.62158L16.4062 19.5591Z" 
              // fill="rgb(255, 255, 255, 1)"
              fill={selectedTheme.palette.neutral.main}
            />
          </svg>

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
  const { user } = useContext<any>(UserContext)
 
  const handleClick:any = () => {
    onDataChanged(true)
  }

  return (
    <IconButton
      onClick={handleClick}
      className={`${classes.menuIcon} ${classes[`_${user.background_color}menu_icon_color` as keyof typeof classes]}`}
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

export function SelectLanguageButton({ sizeIco, roundedIco, cusField, clicked, disabled }: ButtonProps ) {
  const { user, setUser } = useContext<any>(UserContext)
  const { classes } = useStylesGlobal();
  let  noPadding, borRad, filterColor = 0
  if(disabled) {
    filterColor = 35
  }
  noPadding=0
  borRad="50px !important"
  // const handleHover:any = (() => {
  //   console.log("hover")
  // })
  // const handleOut:any = (() => {
  //   console.log("handleOut")
  // })

  const selectedTheme = themeMap[user.background_color];
  
  const languages = [
    { lang_lab:"English", flag: en_flag_btn},
    { lang_lab:"Español", flag: sp_flag_btn},
    // { lang_lab:"Dansk", flag: dk_flag_btn},
    // { lang_lab:"Italiano", flag: it_flag_btn},
    // { lang_lab:"Deutsch", flag: gm_flag_btn},
    // { lang_lab:"Français", flag: fr_flag_btn},
    // { lang_lab:"Português", flag: pg_flag_btn},
    // { lang_lab:"中国人", flag: ch_flag_btn},
  ]

  const [selectedLanguage, setSelectedLanguage] = useState(languages[user.language].lang_lab);
  useEffect(()=> {
    setSelectedLanguage(languages[user.language].lang_lab)
  }, [user])
  const handleLanguageSelect = (event: any) => {
      setSelectedLanguage(event.target.value)
      const indx = languages
        .map((lang:any, index: number) => lang.lang_lab === event.target.value ? index : -1)
        .filter(index => index !== -1)[0]
      const updatedUser = {
        ...user,
        language: indx
    }
    setUser(updatedUser)
    // console.log(`Selected language: ${event.target.value}`);
    // Add additional logic if needed
  };
  return (
    // <div 
    // >
    <ThemeProvider theme={selectedTheme}>
      <Select
        labelId="language-selector-label"
        value={selectedLanguage}
          // label="Select "
        onChange={handleLanguageSelect}
        className={` ${classes[`_${user.background_color}lang_menu_item_background_color` as keyof typeof classes]}`} 
        sx={{
          margin:2,
          position: "fixed",
          right: 0,
          width:155,
          color: 'white',
        }}
        MenuProps={{
          PaperProps: {
            className: classes._0lang_menu_props_background_color
          }
        }}
        // label="Select Language"
      >
        {languages.map((lang:any, index) => (
          <MenuItem 
            key={index} 
            value={lang.lang_lab}
            className={` ${classes[`_${user.background_color}lang_menu_item_background_color` as keyof typeof classes]}`} 
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img 
                src={lang.flag}
                alt={`${lang.lang_lab} flag`} 
                style={{ height: 20 }}
              />
              <span style={{ marginLeft: 10 }}>{lang.lang_lab}</span>
            </div>
          </MenuItem>
        ))}
      </Select>
    </ThemeProvider>
    // </div>
  )
}