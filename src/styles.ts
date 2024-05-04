import { makeStyles } from 'tss-react/mui';
import {  Theme } from '@mui/material/styles';


// 0: Space blue
// 1: Dark
// 2: Light
// 3: Minimal warm

const _0linkColor = '#c1e8fb';
const linkColor = '#c1e8fb';
const mainColor = 'rgb(45, 72, 91, 1)';
const mainColor3 = 'rgb(38,55, 66, 1)'; // is used just in the menu options with large screens

const mainColorD = 'rgb(25, 54, 72)';
const mainColorDD = 'rgb(18, 35, 46, 1)';
// const mainColor = 'green';
const tableHeaderColor = '#FFF';
const tableAlertOnBackground = 'rgb(290, 10, 50, .6)';
const tableAlertOnColor = '#FFF';
const tableRowColor = '#222';
const rowEvenBackground = 'rgb(69, 144, 186)';
const rowOddBackground = 'rgb(162, 199, 220)';

const menuItem = '#DCF2F1';

export const useStylesGlobal = makeStyles()({
    finishButtons: {
        display: "flex",
        justifyContent:  "center",
        gap: 20,
        margin: "20px",
    },
    link: {
        color: linkColor,
    },
    mainColor: {
        color: mainColor,
    },
    mainBackGroundColor: {
        backgroundColor: mainColor,
    },
    mainBackGroundColorD: {
        backgroundColor: mainColorD,
    },
    // formControlUsers: {
    //     width: "300px",
    //     backgroundColor: "rgb(255,255, 255, .1)",
    //     borderRadius: "10px",
    //     "& .MuiOutlinedInput-root": {
    //         "& fieldset": {
    //         },
    //         '&.Mui-focused': {
    //             },
    //         "&.Mui-focused fieldset": {
    //         }
    //     }
    // },
    // selectUsers: {
    // },
    // inputLabelUsers: {
    // },
    // stackUsers: {
    // },
    // chipUsers: {
    //     backgroundColor: "rgb(255,255, 255, .8)",
    // },
    // cancelIconUsers: {
    //     '& > *': {
    //         color: 'rgb(255, 47, 47, .9)',
    //     }
    // },
    // menuItemUsers: {
    //     "&.Mui-selected": {
    //     },
    // },
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
        // paddingRight: '11px',
        // paddingRight: "auto",
        // overflow: 'hidden', // Hide any overflow
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
    // table: {
    //     width: "calc(100% - 6px)",
    //     margin: "3px",
    //     padding: "6px 0",
    //     borderRadius: "10px",
    //     backgroundColor: "rgb(695, 144, 186)",
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "center",
    // },
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
    page: {
        display: "inline-block",
        margin: "2%",
        width: "30%",
        height: "30%",
        backgroundColor: "white",
    },
    // dropped_widget: {
    //     color: "red",
    // },
    // backPlus: {
    //     color: "rgb(255, 47, 47, 1)",
    //     width: "32px", 
    //     height: "32px",
    //     '& svg': {
    //         width: "32px", 
    //         height: "32px",
    //     }
    // },
    // plusIcon: {
    //     color: "rgb(32, 205, 60, 1)",
    //     width: "32px", 
    //     height: "32px",
    //     '& svg': {
    //         width: "32px", 
    //         height: "32px",
    //     }
    // },
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
        // position: "relative",
        // top: 0,
        // visibility: "visible",
        // flexGrow: "5",
    },
    hide: {
        display: "none",
        // position: "relative",
        // top: 0,
        // visibility: "hidden",
        // flexGrow: "6",
    },
    hideShowSpace: {
        width: "10%", 
        // flexGrow: ".5",
    },

    // testt: {
    //     backgroundColor: "red",
    //     minHeight: "74%",
    //     display: "flex",
    //     // flex-direction: "column",
    // },

    alert_on : {
        color: "red",
    },
    text_field_error: {
        // color:"blue",
        borderColor: "red",
        '& label': {
            color: 'red !important',
        },
        '& .MuiInput-underline:after': {
            // borderBottomColor: 'green',
            color: 'red',
        },
        '& .MuiOutlinedInput-root': {
            // color: 'red',
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
        backgroundColor: mainColorDD,
        height: "64px",
        display: "flex",
        justifyContent: "center",
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
        backgroundColor: mainColorDD,
    },
    menu_options_LG : {
        top: 64,
        right: 0,
        width: "15%",
        backgroundColor: mainColor3,
        height: "30%",
        borderRadius: "0 0 10px 10px",
    },
    table_header_color: {
        color: tableHeaderColor,
        '&.Mui-checked': {
            color: tableHeaderColor,
          },
    },
    table_rows : {
        padding: "8px 0",
        border:0,
    },
    table_rows_color : {
        color:tableRowColor,
    },
    table_alert_on_background : {
        backgroundColor: tableAlertOnBackground, 
    },
    table_alert_on_color : {
        color: tableAlertOnColor,
    },
    table_row_even: {
        backgroundColor: rowEvenBackground, 
    },
    table_row_odd: {
        backgroundColor: rowOddBackground, 
    },
    table_menu : {
        borderRadius: '4px', // Set border-radius to mimic scrollbar radius
        '& .MuiPaper-root': {  
            overflow: 'hidden', // Hide any overflow
            overflowY: 'auto', // Show scrollbar on hover
            borderRadius: '4px', // Set border-radius to mimic scrollbar radius
            // paddingRight: '12px',
            scrollbarColor: 'rgba(0, 0, 0, 0) rgba(0, 0, 0, 0)', // Adjust the color of the scrollbar
            backgroundColor: menuItem,
            scrollbarWidth: 'thin', // Hide scrollbar for Firefox
            '&:hover': {
                scrollbarColor: 'rgba(0, 0, 0, .3) rgba(0, 0, 0, 0)', // Adjust the color of the scrollbar
                backgroundColor: menuItem,
                overflowY: 'auto', // Show scrollbar on hover
                // paddingRight: '0',
                overflowX: 'hidden',
            },
        },
    },
    table_disabled: {
        backgroundColor: "rgb(255,255, 255, .3)",
    },
    menu_item: {
        padding: '0 5px',
        backgroundColor: menuItem,
    }
})

// export const modalStyleExternal = {
//     position: 'absolute',
//     display: "flex",
//     justifyContent: "center",
//     top: 74,
//     width: "100%",
//     overflowX: "hidden",
// };
export const modalStyleExternal = {
    // position: 'absolute',
    // display: "flex",
    // justifyContent: "center",
    // top: 74,
    // width: "100%",
    // overflowX: "hidden",
    // overflow: "hidden",
    // scrollbarWidth: "none",
    overflowX: "hidden",
    scrollbarWidth: "none",
    
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    
};
// export const modalStyleInternal = {
//     // top: 74,
//     maxWidth: "700px",
//     width: "calc(100% - 32px)",
//     // height: "520px",
//     maxHeight: "520px",
//     // minHeight: "490px",
//     backgroundColor: "rgb(45,72, 91, 1)",
//     borderRadius: "10px",
//     // margin: "auto",
//     padding: "3px",
//     color: "white",
//     overflow: "scroll",
//     overflowX: "hidden",
// };
export const modalStyleInternal = {
    maxWidth: "350px",
    width: "calc(100% - 50px)",
    // maxHeight: "520px",
    maxHeight: "85vh",
    // backgroundColor: "rgb(45,72, 91, 1)",
    backgroundColor: mainColor,
    borderRadius: "10px",
    padding: "5px",
    color: "white",
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
    // backgroundColor: "rgb(45,72, 91, 1)",
    backgroundColor: mainColor,
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
};
export const modalStyleSaveInternal = {
    top: 74,
    width: "220px",
    // backgroundColor: "rgb(45,72, 91, 1)",
    backgroundColor: mainColor,
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
    // backgroundColor: "rgb(45,72, 91, 1)",
    backgroundColor: mainColor,
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

// export const TableStyles = makeStyles((theme: Theme) => ({
// export const tableStyles = makeStyles()({
//     alert_on : {
//         backgroundColor: "rgb(290, 10, 50, .6)", 
//         color:"white",
//     },
//     rows : {
//         padding: "8px 0",
//         border:0,
//     },
//     row_even: {
//         backgroundColor: "rgb(69, 144, 186)", 
//     },
//     row_odd: {
//         backgroundColor:"rgb(162, 199, 220)", 
//     },
//     menu : {
//         borderRadius: '4px', // Set border-radius to mimic scrollbar radius
//         '& .MuiPaper-root': {  
//             overflow: 'hidden', // Hide any overflow
//             overflowY: 'auto', // Show scrollbar on hover
//             borderRadius: '4px', // Set border-radius to mimic scrollbar radius
//             // paddingRight: '12px',
//             scrollbarColor: 'rgba(0, 0, 0, 0) rgba(0, 0, 0, 0)', // Adjust the color of the scrollbar
//             scrollbarWidth: 'thin', // Hide scrollbar for Firefox
//             '&:hover': {
//                 scrollbarColor: 'rgba(0, 0, 0, .3) rgba(0, 0, 0, 0)', // Adjust the color of the scrollbar
//                 overflowY: 'auto', // Show scrollbar on hover
//                 // paddingRight: '0',
//                 overflowX: 'hidden',
//             },
//         },
//     },
//     disabled: {
//         backgroundColor: "rgb(255,255, 255, .3)",
//     },
// })
