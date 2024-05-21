import { makeStyles } from 'tss-react/mui';
import {  Theme, createTheme } from '@mui/material/styles';

// 0: Deep ocean
// 1: Dark metal
// 2: Fresh blue
// 3: White solid

const _0linkColor = '#c1e8fb';  // Is used without a user so it should be only one
const _0mainColor = 'rgb(45, 72, 91, 1)';
const _0mainColorLighter = 'rgb(115, 142, 161, 1)';
const _0mainColor3 = 'rgb(38,55, 66, 1)'; // is used just in the menu options with large screens
const _0mainColorD = 'rgb(25, 54, 72)';
const _0mainColorDD = 'rgb(18, 35, 46, 1)';
const _0tableHeaderColor = 'rgb(255, 255, 255, 1)';
const _0tableAlertOnBackground = 'rgb(290, 10, 50, .6)';
const _0tableAlertOnColor = 'rgb(255, 255, 255, 1)';
const _0tableRowColor = '#222';
const _0rowEvenBackground = 'rgb(69, 144, 186)';
const _0rowOddBackground = 'rgb(162, 199, 220)';
const _0menuItem = '#DCF2F1';

const _0succesMain = 'rgb(32, 205, 60, 1)';
const _0succesContrastText = 'rgb(32, 205, 60, .2)';
const _0succesDark = 'rgb(2, 145, 10, 1)';
const _0warningMain = 'rgb(255, 47, 47, 1)';
const _0warningContrastText = 'rgb(255, 47, 47, .2)';
const _0warningDark = 'rgb(155, 27, 27, 1)';
const _0neutralMain = 'rgb(255, 255, 255, 1)';
const _0neutralContrastText = 'rgb(255, 255, 255, .2)';
const _0neutralDark = 'rgb(155, 155, 155, 1)';
const _0plusIcon = 'rgb(77, 168, 218, 1)';
// const _0modalInternalColor = 'rgb(77, 168, 218, 1)';
// const _0modalColor = 'rgb(210, 210, 250, 1)';
// const _0modalColor = 'rgb(210, 210, 250, 1)';

// ----------------------------------------

const _1mainColor = 'rgb(80, 80, 80, 1)';
const _1mainColorLighter = 'rgb(130, 130, 130, 1)';
const _1mainColor3 = 'rgb(10, 10, 10, 1)'; // is used just in the menu options with large screens
const _1mainColorD = 'rgb(20, 20, 20, 1)';////////
const _1mainColorDD = 'rgb(4, 1, 1, 1)';
const _1tableHeaderColor = 'rgb(255, 255, 255, 1)';
const _1tableAlertOnBackground = 'rgb(200, 10, 50, .6)';
const _1tableAlertOnColor = 'rgb(255, 255, 255, 1)';
const _1tableRowColor = 'rgb(255, 255, 255, 1)';
const _1rowEvenBackground = 'rgb(120, 120, 120)';
const _1rowOddBackground = 'rgb(60, 60, 60)';
const _1menuItem = 'rgb(200, 200, 200)';

const _1succesMain = 'rgb(144,238,144, 1)';
const _1succesContrastText = 'rgb(144,238,144, .2)';
const _1succesDark = 'rgb(0,255,127, 1)';
const _1warningMain = 'rgb(250, 128, 114, 1)';
const _1warningContrastText = 'rgb(250, 128, 114, .2)';
const _1warningDark = 'rgb(255, 160, 122, 1)';
const _1neutralMain = 'rgb(200, 200, 200, 1)';
const _1neutralContrastText = 'rgb(200, 200, 200, .2)';
const _1neutralDark = 'rgb(155, 155, 155, 1)';

const _1plusIcon = 'rgb(100, 50, 250, 1)';
const _1modalColor = 'rgb(200, 200, 200)';


// ----------------------------------------

const _2mainColor = 'rgb(190, 220, 250, 1)';
const _2mainColorLighter = 'rgb(250, 250, 250, 1)';
const _2mainColor3 = 'rgb(57, 138, 208, 1)'; // is used just in the menu options with large screens
const _2mainColorD = 'rgb(7, 78, 158, 1)';////////
const _2mainColorDD = 'rgb(0, 58, 130, 1)';
const _2tableHeaderColor = 'rgb(255, 255, 255, 1)';
const _2tableAlertOnBackground = 'rgb(250, 0, 0, .8)';
const _2tableAlertOnColor = 'rgb(250, 250, 250, 1)';
const _2tableRowColor = 'rgb(0, 0, 0, 1)';
const _2rowOddBackground = 'rgb(200, 240, 250)';
const _2rowEvenBackground = 'rgb(87, 178, 238, 1)';
const _2menuItem = 'rgb(210, 230, 250, 1)';

const _2succesMain = 'rgb(0,200,0, 1)';
const _2succesContrastText = 'rgb(0,250,0, .2)';
const _2succesDark = 'rgb(0,150,0, 1)';
const _2warningMain = 'rgb(250, 0, 0, 1)';
const _2warningContrastText = 'rgb(200, 0, 0, .2)';
const _2warningDark = 'rgb(200, 45, 45, 1)';
const _2neutralMain = 'rgb(60, 118, 190, 1)';
const _2neutralContrastText = 'rgb(0, 58, 130, .2)';
const _2neutralDark = 'rgb(10, 89, 170, 1)';

const _2plusIcon = 'rgb(220, 200, 0, 1)';
const _2modalColor = 'rgb(0, 58, 130, 1)';


// ----------------------------------------

const _3mainColor = 'rgb(225, 225, 225, 1)';
const _3mainColorLighter = 'rgb(255, 255, 255, 1)';
const _3mainColor3 = 'rgb(225, 225, 225, 1)'; // is used just in the menu options with large screens
const _3mainColorD = 'rgb(200, 200, 200, 1)';////////
const _3mainColorDD = 'rgb(210, 210, 210, 1)';
const _3tableHeaderColor = 'rgb(70, 70, 70, 1)';
const _3tableAlertOnBackground = 'rgb(255, 70, 100, .6)';
const _3tableAlertOnColor = 'rgb(250, 250, 250, 1)';
const _3tableRowColor = 'rgb(0, 0, 0, 1)';
const _3rowOddBackground = 'rgb(220, 220, 220)';
const _3rowEvenBackground = 'rgb(250, 250, 250, 1)';
const _3menuItem = 'rgb(255, 250, 255, 1)';

const _3succesMain = 'rgb(0,200,0, 1)';
const _3succesContrastText = 'rgb(0,250,0, .2)';
const _3succesDark = 'rgb(0,150,0, 1)';
const _3warningMain = 'rgb(250, 0, 0, 1)';
const _3warningContrastText = 'rgb(200, 0, 0, .2)';
const _3warningDark = 'rgb(200, 45, 45, 1)';
const _3neutralMain = 'rgb(145, 145, 145, 1)';
const _3neutralContrastText = 'rgb(145, 145, 145, .2)';
const _3neutralDark = 'rgb(125, 125, 125, 1)';

const _3plusIcon = 'rgb(70, 70, 70, 1)';
const _3modalColor = 'rgb(0, 58, 130, 1)';


export const _0themeGlobal = createTheme({
    palette: {
      success: {
        main: _0succesMain,
        contrastText: _0succesContrastText,
      },
      warning: {
        main: _0warningMain,
        contrastText: _0warningContrastText,
      },
      neutral: {
        main: _0neutralMain,
        contrastText: _0neutralContrastText,
        dark: _0neutralDark,
      },
    },
});
export const _1themeGlobal = createTheme({
    palette: {
        success: {
            main: _1succesMain,
            contrastText: _1succesContrastText,
        },
        warning: {
            main: _1warningMain,
            contrastText: _1warningContrastText,
        },
        neutral: {
            main: _1neutralMain,
            contrastText: _1neutralContrastText,
            dark: _1neutralDark,
        },
    },
});
export const _2themeGlobal = createTheme({
    palette: {
        success: {
            main: _2succesMain,
            contrastText: _2succesContrastText,
        },
        warning: {
            main: _2warningMain,
            contrastText: _2warningContrastText,
        },
        neutral: {
            main: _2neutralMain,
            contrastText: _2neutralContrastText,
            dark: _2neutralDark,
        },
    },
});
export const _3themeGlobal = createTheme({
    palette: {
        success: {
            main: _3succesMain,
            contrastText: _3succesContrastText,
        },
        warning: {
            main: _3warningMain,
            contrastText: _3warningContrastText,
        },
        neutral: {
            main: _3neutralMain,
            contrastText: _3neutralContrastText,
            dark: _3neutralDark,
        },
    },
});

export const useStylesGlobal = makeStyles()({
    
    modal_external_background:{
        backgroundColor: 'rgba(900, 900, 900, .1)',
        backdropFilter: "blur(1px)",
    },
    finishButtons: {
        display: "flex",
        justifyContent:  "center",
        gap: 20,
        margin: "20px",
    },
    _0link_color: {
        color: _0linkColor,
    },
    _0main_color: {
        color: _0mainColor,
    },
    _1main_color: {
        color: _1mainColor,
    },
    _2main_color: {
        color: _2mainColor,
    },
    _3main_color: {
        color: _3mainColor,
    },
    _0main_background_color: {
        backgroundColor: _0mainColor,
        backgroundImage: `linear-gradient(45deg, ${_0mainColor} 50%, ${_0mainColorLighter})`,
        boxShadow: `-20px 20px 20px 2px ${_1mainColorDD} `,
    },
    _1main_background_color: {
        backgroundColor: _1mainColor,
        backgroundImage: `linear-gradient(45deg, ${_1mainColor} 50%, ${_1mainColorLighter}) `,
        boxShadow: `-20px 20px 20px 2px ${_1mainColorDD} `,
    },
    _2main_background_color: {
        backgroundColor: _2mainColor,
        backgroundImage: `linear-gradient(45deg, ${_2mainColor} 50%, ${_2mainColorLighter}) `,
        boxShadow: `-20px 20px 20px 2px ${_1mainColorDD} `,
    },
    _3main_background_color: {
        backgroundColor: _3mainColor,
        backgroundImage: `linear-gradient(45deg, ${_3mainColor} 50%, ${_3mainColorLighter}) `,
        boxShadow: `-20px 20px 20px 2px ${_1mainColorDD} `,
    },
    _0warning_color: {
        color: _0warningMain,
    },
    _1warning_color: {
        color: _1warningMain,
    },
    _2warning_color: {
        color: _2warningMain,
    },
    _3warning_color: {
        color: _3warningMain,
    },
    _0modal_color: {
        // color: _0modalColor,
        color: _0neutralMain,
    },
    _1modal_color: {
        color: _1neutralMain,
    },
    _2modal_color: {
        color: _2neutralMain,
    },
    _3modal_color: {
        color: _3neutralMain,
    },
    
    gradient_effect: {
        backgroundImage: `linear-gradient(45deg, rgb(250, 250, 250, 0) 50%, rgb(250, 250, 250, 0.1) 75%,  rgb(250, 250, 250, 0.5) 100%)`,
    },
    shadow_effect: {
        boxShadow: `-20px 20px 20px 2px ${_1mainColorDD} `,
    },
    AppDiv: {
        height:"100vh",
        margin: "0",
        padding: "0",
    },
    _0main_background_colorD: {
        backgroundColor: _0mainColorD,
    },
    _1main_background_colorD: {
        backgroundColor: _1mainColorD,
    },
    _2main_background_colorD: {
        backgroundColor: _2mainColorD,
    },
    _3main_background_colorD: {
        backgroundColor: _3mainColorD,
    },
    customBoxColumn: { 
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        width: "90%",
        gap: 8,
    },
    customBoxColumnCustomFields: { 
        // maxHeight:"50vh", 
        height:"260px",
        // width: "300px",
        overflowX: "hidden",
        backgroundColor: "rgb(255,255, 255, .2)",
        paddingTop: "8px",   
        paddingBottom: "8px",   
        // paddingLeft: "8px",    
        borderRadius: 10, 
        
    },
    scrollBarHide: {
        overflow: 'auto', // Hide any overflow
        scrollbarWidth: 'thin', // Hide scrollbar for Firefox
        scrollbarColor: 'rgba(0, 0, 0, 0) rgba(0, 0, 0, 0)', // Adjust the color of the scrollbar
        '&:hover': {
            scrollbarColor: 'rgba(0, 0, 0, .3) rgba(0, 0, 0, 0)', // Adjust the color of the scrollbar
            overflowY: 'auto', // Show scrollbar on hover
            // paddingRight: '0',
            overflowX: 'hidden',
        },
    },
    scrollBarHideInsufficientHeight : {
        paddingRight: '10px',
    },
    customBoxColumnStockOptions: {
        minHeight: "330px",
    },
    customBoxRow: {
        display: "flex",
        justifyContent:  "center",
        alignItems: "center",
        gap: 8,
    },
    customBoxRowHideSpace: {
        height: "40px",
        marginTop: "10px"
    },
    customBoxRowSpaceBetween: {
        display: "flex",
        justifyContent:  "space-between",
        alignItems: "center",
        // gap: 8,
    },
    customBoxRowSpaceAround: {
        display: "flex",
        justifyContent:  "space-around",
        alignItems: "center",
        gap: 8,
    },
    customImgRow: {
        display: "flex",
        justifyContent:  "flex-end",
        alignItems: "center", 
        gap: 30,
    },
    customZIndexTop: {
        zIndex:999,
    },
    customBoxCenter: {
        display: "flex",
        alignItems: "center", 
    },
    customBoxRowLeft: {
        justifyContent:  "start",
    },
    customBoxRowRight: {
        justifyContent:  "end",
    },
    customBoxRowEnd: {
        display: "flex",
        justifyContent:  "flex-end",
    },
    customBoxRowArrowButton: {
        marginTop: "auto",
        height: "70px"
    },
    inputMainData: {
        backgroundColor: "white",
        borderRadius: 10,
        width: "100%",
    },
    inputMainDataMargin: {
        margin: "0 16px",
    },
    newEmailField: {        
        backgroundColor: "transparent",
        borderRadius: 10,
        minWidth: "150px",
        width: "100%",
        maxWidth: "250px",
        "& .MuiOutlinedInput-input": {
            backgroundColor: "white", // Set the outline background to white
            borderRadius: 10, 
        },
        "& .MuiFormHelperText-root": {
          fontSize: "20px",
          color: "rgb(255, 147, 147, 1)",
        },
    },
    ionTrash:{
        color: "rgb(255, 47, 47, 1)",
        padding: "0",
        marginBottom: "4px",
        width: "37px", 
        height: "37px",
        '& img': {
            width: "37px", 
            height: "37px",
        },
    },
    inputUpdateAmountStock: {
        margin: "auto",
        width: "65px",
        
    },
    inputClassName: {
        borderRadius: 10,
        // autoComplete: 'new-password',
    },
    buttonsGroup: {
        width: "100%",
        height: "100%",
    },
    buttonFields: {
        backgroundColor: "white",
        width: "calc(100% - 12px)",
        margin: "5px",
        paddingLeft: "8px",
        paddingRight: "4px",
        height: "40px",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        
    },
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
    _0btn_cancel: {
      backgroundColor: _0warningContrastText,
      '&:hover': {
        borderColor: _0warningDark,
        backgroundColor: _0warningContrastText,
        "& > *": {
          stroke: _0warningDark
        }
      }
    },
    _0btn_ok: {
      backgroundColor: _0succesContrastText,
      '&:hover': {
        borderColor: _0succesDark,
        backgroundColor: _0succesContrastText,
        "& > *": {
          stroke: _0succesDark
        }
      }
    },  
    _0btn_edit: {
      backgroundColor: _0neutralContrastText,
      '&:hover': {
        borderColor: _0neutralDark,
        backgroundColor: _0neutralContrastText,
        "& > *": {
          color: _0neutralDark,
        }
      },
    },
    _0btn_add: {
      backgroundColor: _0neutralContrastText,
      '&:hover': {
        borderColor: _0neutralDark,
        backgroundColor: _0neutralContrastText,
        "& > *": {
          color: _0neutralDark,
          stroke: _0neutralDark
        }
      },
    },
    _1btn_cancel: {
        backgroundColor: _1warningContrastText,
        '&:hover': {
        borderColor: _1warningDark,
        backgroundColor: _1warningContrastText,
        "& > *": {
            stroke: _1warningDark
        }
      }
    },
    _1btn_ok: {
      backgroundColor: _1succesContrastText,
      '&:hover': {
        borderColor: _1succesDark,
        backgroundColor: _1succesContrastText,
        "& > *": {
          stroke: _1succesDark
        }
      }
    },  
    _1btn_edit: {
      backgroundColor: _1neutralContrastText,
      '&:hover': {
        borderColor: _1neutralDark,
        backgroundColor: _1neutralContrastText,
        "& > *": {
          color: _1neutralDark,
        }
      },
    },
    _1btn_add: {
      backgroundColor: _1neutralContrastText,
      '&:hover': {
        borderColor: _1neutralDark,
        backgroundColor: _1neutralContrastText,
        "& > *": {
          color: _1neutralDark,
          stroke: _1neutralDark
        }
      },
    },
    _2btn_cancel: {
        backgroundColor: _2warningContrastText,
        '&:hover': {
        borderColor: _2warningDark,
        backgroundColor: _2warningContrastText,
        "& > *": {
            stroke: _2warningDark
        }
      }
    },
    _2btn_ok: {
      backgroundColor: _2succesContrastText,
      '&:hover': {
        borderColor: _2succesDark,
        backgroundColor: _2succesContrastText,
        "& > *": {
          stroke: _2succesDark
        }
      }
    },  
    _2btn_edit: {
      backgroundColor: _2neutralContrastText,
      '&:hover': {
        borderColor: _2neutralDark,
        backgroundColor: _2neutralContrastText,
        "& > *": {
          color: _2neutralDark,
        }
      },
    },
    _2btn_add: {
        backgroundColor: _2neutralContrastText,
        color: _2neutralMain,
        '&:hover': {
            borderColor: _2neutralDark,
            backgroundColor: _2neutralContrastText,
            "& > *": {
            color: _2neutralDark,
            stroke: _2neutralDark
            }
        },
    },
    _3btn_cancel: {
        backgroundColor: _3warningContrastText,
        '&:hover': {
        borderColor: _3warningDark,
        backgroundColor: _3warningContrastText,
        "& > *": {
            stroke: _3warningDark
        }
      }
    },
    _3btn_ok: {
      backgroundColor: _3succesContrastText,
      '&:hover': {
        borderColor: _3succesDark,
        backgroundColor: _3succesContrastText,
        "& > *": {
          stroke: _3succesDark
        }
      }
    },  
    _3btn_edit: {
      backgroundColor: _3neutralContrastText,
      '&:hover': {
        borderColor: _3neutralDark,
        backgroundColor: _3neutralContrastText,
        "& > *": {
          color: _3neutralDark,
        }
      },
    },
    _3btn_add: {
        backgroundColor: _3neutralContrastText,
        color: _3neutralMain,
        '&:hover': {
            borderColor: _3neutralDark,
            backgroundColor: _3neutralContrastText,
            "& > *": {
            color: _3neutralDark,
            stroke: _3neutralDark
            }
        },
    },
    menuIcon: {
      color: _0neutralMain,
      '& .MuiSvgIcon-root': {
        width: '2.9rem',
        height: '2.9rem',
      },
      display: 'flex',
      margin: "auto",
      marginRight: "0",
    },
    _3menu_icon_color: {
      color: _3plusIcon,
    },   
    plusIcon: {
      display: "flex",
      // margin: "0 5px",
      margin: "auto",
      padding: "1px 1px",
      backgroundColor: "rgb(77, 168, 218, 0)",
      '& .MuiSvgIcon-root': {
        width: '2.9rem',
        height: '2.9rem',
      },
    },
    _0plus_icon_color: {
      color: _0plusIcon,
    },
    _1plus_icon_color: {
      color: _1plusIcon,
    },
    _2plus_icon_color: {
      color: _2plusIcon,
    },
    _3plus_icon_color: {
      color: _3plusIcon,
    },
    backPlus: {
      color: "red",
    },
    _0check_rounded_icon_stroke_color: {
        stroke: _0succesMain,
    },
    _0close_rounded_icon_stroke_color: {
        stroke: _0warningMain,
    },
    _0add_rounded_icon_stroke_color: {
        stroke: _0neutralMain,
    },
    _1check_rounded_icon_stroke_color: {
        stroke: _1succesMain,
    },
    _1close_rounded_icon_stroke_color: {
        stroke: _1warningMain,
    },
    _1add_rounded_icon_stroke_color: {
        stroke: _1neutralMain,
    },
    _2check_rounded_icon_stroke_color: {
        stroke: _2succesMain,
    },
    _2close_rounded_icon_stroke_color: {
        stroke: _2warningMain,
    },
    _2add_rounded_icon_stroke_color: {
        stroke: _2neutralMain,
    },
    _3check_rounded_icon_stroke_color: {
        stroke: _3succesMain,
    },
    _3close_rounded_icon_stroke_color: {
        stroke: _3warningMain,
    },
    _3add_rounded_icon_stroke_color: {
        stroke: _3neutralMain,
    },
    page: {
        display: "inline-block",
        margin: "2%",
        width: "30%",
        height: "30%",
        backgroundColor: "white",
    },
    editIcon: {
        width: "32px", 
        height: "32px",
        marginBottom: "6px"
    },
    newCustomField: {
        backgroundColor: "white",
        borderRadius: 10,
        minWidth: "150px",
        width: "40%",
        maxWidth: "250px",
    },
    show: {
        display: "block",
    },
    hide: {
        display: "none",
    },
    hideShowSpace: {
        width: "10%", 
    },

    alert_on : {
        color: "red",
    },
    text_field_error: {
        borderColor: "red",
        '& label': {
            color: 'red !important',
        },
        '& .MuiInput-underline:after': {
            color: 'red',
        },
        '& .MuiOutlinedInput-root': {
            borderColor: 'red',
            '& fieldset': {
                borderWidth: "2px",
                borderColor: 'red',
                color: 'red',
            },
            '&:hover fieldset': {
                borderColor: 'red',
                color: 'red',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'red',
                color: 'red',
            },
        },
    },
    switch_error: {
        "& .MuiSwitch-thumb": {
            backgroundColor: 'red', // Change this color to your desired thumb color
        },
        '& .MuiSwitch-track': {
            backgroundColor: 'red', // Change this color to your desired track color
        },
    },
    customDivider : {
        borderColor: "white",
        width: "90%", 
        size: "320px",
        margin: "14px",
        marginTop: "20px",
    },
    customDividerVertical : {
        borderColor: "white",
        size: "50px",
        marginRight: "10px",
        marginLeft: "1px",
    },
    
    title : {
        marginTop: "5px",
        marginBottom: "10px",
    },
    menu_appbar: {
        position: "fixed",
        left: 0,
        bottom: 0,
        height: "64px",
        display: "flex",
        justifyContent: "center",
    },
    _0main_background_colorDD: {
        backgroundColor: _0mainColorDD,
    },
    _1main_background_colorDD: {
        backgroundColor: _1mainColorDD,
    },
    _2main_background_colorDD: {
        backgroundColor: _2mainColorDD,
    },
    _3main_background_colorDD: {
        backgroundColor: _3mainColorDD,
    },
    _3main_colorDD: {
        color: _3tableHeaderColor,
    },
    menu_toolbar: {
        height: "64px",
        margin: "auto",
    },
    menu_logo: {
        flexGrow: 1,
    },
    menu_page: {
        padding: "12px !important",
        margin: "0",

    },
    menu_footer: {
        left: 0,
        bottom:  '64px',
        color: "white",
        backgroundColor: "rgb(255, 47, 47, .25)",
        height: "32px",
        width: '100%',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    menu_options : {
        position: 'absolute',
        '&  > :nth-of-type(1)': {
            width: "100%",
            height: "100%",
        },
        '& Button': {
            color: "white",
            height: "100%",
        },
    },
    menu_options_SM : {
        bottom: 64,
        width: "100%",
    },
    menu_options_LG : {
        top: 64,
        right: 0,
        width: "15%",
        height: "30%",
        borderRadius: "0 0 10px 10px",
    },
    _0background_color3 : {
        backgroundColor: _0mainColor3,
    },
    _1background_color3 : {
        backgroundColor: _1mainColor3,
    },
    _2background_color3 : {
        backgroundColor: _2mainColor3,
    },
    _3background_color3 : {
        backgroundColor: _3mainColor3,
    },
    _0table_header_color: {
        color: _0tableHeaderColor,
        '&.Mui-checked': {
            color: _0tableHeaderColor,
        },
    },
    _1table_header_color: {
        color: _1tableHeaderColor,
        '&.Mui-checked': {
            color: _1tableHeaderColor,
        },
    },
    _2table_header_color: {
        color: _2tableHeaderColor,
        '&.Mui-checked': {
            color: _2tableHeaderColor,
        },
    },
    _3table_header_color: {
        color: _3tableHeaderColor,
        '&.Mui-checked': {
            color: _3tableHeaderColor,
        },
    },
    table_rows : {
        padding: "8px 0",
        border: 0,
    },
    _0table_rows_color : {
        color:_0tableRowColor,
    },
    _0table_alert_on_background : {
        backgroundColor: _0tableAlertOnBackground, 
    },
    _0table_alert_on_color : {
        color: _0tableAlertOnColor,
    },
    _0table_row_even: {
        backgroundColor: _0rowEvenBackground, 
    },
    _0table_row_odd: {
        backgroundColor: _0rowOddBackground, 
    },
    _1table_rows_color : {
        color:_1tableRowColor,
    },
    _1table_alert_on_background : {
        backgroundColor: _1tableAlertOnBackground, 
    },
    _1table_alert_on_color : {
        color: _1tableAlertOnColor,
    },
    _1table_row_even: {
        backgroundColor: _1rowEvenBackground, 
    },
    _1table_row_odd: {
        backgroundColor: _1rowOddBackground, 
    },
    _2table_rows_color : {
        color:_2tableRowColor,
    },
    _2table_alert_on_background : {
        backgroundColor: _2tableAlertOnBackground, 
    },
    _2table_alert_on_color : {
        color: _2tableAlertOnColor,
    },
    _2table_row_even: {
        backgroundColor: _2rowEvenBackground, 
    },
    _2table_row_odd: {
        backgroundColor: _2rowOddBackground, 
    },
    _3table_rows_color : {
        color:_3tableRowColor,
    },
    _3table_alert_on_background : {
        backgroundColor: _3tableAlertOnBackground, 
    },
    _3table_alert_on_color : {
        color: _3tableAlertOnColor,
    },
    _3table_row_even: {
        backgroundColor: _3rowEvenBackground, 
    },
    _3table_row_odd: {
        backgroundColor: _3rowOddBackground, 
    },
    table_menu : {
        borderRadius: '4px', // Set border-radius to mimic scrollbar radius
        '& .MuiPaper-root': {  
            overflow: 'hidden', // Hide any overflow
            overflowY: 'auto', // Show scrollbar on hover
            borderRadius: '4px', // Set border-radius to mimic scrollbar radius
            // paddingRight: '12px',
            scrollbarColor: 'rgba(0, 0, 0, 0) rgba(0, 0, 0, 0)', // Adjust the color of the scrollbar
            scrollbarWidth: 'thin', // Hide scrollbar for Firefox
            '&:hover': {
                scrollbarColor: 'rgba(0, 0, 0, .3) rgba(0, 0, 0, 0)', // Adjust the color of the scrollbar
                overflowY: 'auto', // Show scrollbar on hover
                // paddingRight: '0',
                overflowX: 'hidden',
            },
        },
    },
    _0table_menu_background_color : {
        '& .MuiPaper-root': { 
            backgroundColor: _0menuItem,
            '&:hover': {
                backgroundColor: _0menuItem,
             },
        },
    },
    _1table_menu_background_color : {
        '& .MuiPaper-root': { 
            backgroundColor: _1menuItem,
            '&:hover': {
                backgroundColor: _1menuItem,
             },
        },
    },
    _2table_menu_background_color : {
        '& .MuiPaper-root': { 
            backgroundColor: _2menuItem,
            '&:hover': {
                backgroundColor: _2menuItem,
             },
        },
    },
    _3table_menu_background_color : {
        '& .MuiPaper-root': { 
            backgroundColor: _3menuItem,
            '&:hover': {
                backgroundColor: _3menuItem,
             },
        },
    },
    table_disabled: {
        backgroundColor: "rgb(255,255, 255, .3)",
    },
    menu_item: {
        padding: '0 5px',
    },
    // menu_item: {
    _0menu_item_background_color: {
        backgroundColor: _0menuItem,
        '&:hover': {
            backgroundColor: _0menuItem,
        },
    },
    _1menu_item_background_color: {
        backgroundColor: _1menuItem,
        '&:hover': {
            backgroundColor: _1menuItem,
        },
    },
    _2menu_item_background_color: {
        backgroundColor: _2menuItem,
        '&:hover': {
            backgroundColor: _2menuItem,
        },
    },
    _3menu_item_background_color: {
        backgroundColor: _3menuItem,
        '&:hover': {
            backgroundColor: _3menuItem,
        },
    },
})

export const modalStyleExternal = {
    overflowX: "hidden",
    scrollbarWidth: "none",
    
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    
};
export const modalStyleInternal = {
    maxWidth: "350px",
    width: "calc(100% - 50px)",
    // maxHeight: "520px",
    maxHeight: "85vh",
    borderRadius: "10px",
    padding: "5px",
    // color: "white",
    // overflow: "scroll",
    overflowX: "hidden",
    scrollbarWidth: "none",
    // overflowX: "hidden",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
};
export const modalStyleInternalConfirmTermsAndPrivacy = {
    maxWidth: "900px",
}
export const modalStyleInternalForgottenPass = {
    width: "280px",
}

export const modalStyleChangePassExternal = {
    top: "23%",
};

export const modalStyleChangePassInternal = {
    width: "calc(100% - 64px)",
};
export const modalStyleSaveExternal = {
    position: 'absolute',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: "50%",
    transform: "translateY(-50%)", // Center vertically using transform
    width: "100%",
    // overflow: "hidden",
    overflowX: "hidden",
    scrollbarWidth: "none",
    margin: "auto",
    padding:"40px 0"
};
export const modalStyleSaveInternal = {
    top: 74,
    width: "220px",
    borderRadius: "10px",
    margin: "auto",
    padding: "3px",
    color: "white",
    // overflow: "scroll",
    // overflow: "hidden",
    overflowX: "hidden",
    scrollbarWidth: "none",
};

export const modalStyleErrorInternal = {
    top: 74,
    width: "270px",
    borderRadius: "10px",
    margin: "auto",
    padding: "3px",
    color: "white",
    // overflow: "hidden",
    overflowX: "hidden",
    scrollbarWidth: "none",
};
export const modalLoginInternal = {
    width: "320px",
    paddingBottom: "20px",
};
export const modalStyleImageExternal = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};
export const modalStyleImageInternal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
};
