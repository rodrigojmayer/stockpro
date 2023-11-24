import { makeStyles } from 'tss-react/mui';
import {  Theme } from '@mui/material/styles';

export const useStylesGlobal = makeStyles()({
    finishButtons: {
        display: "flex",
        justifyContent:  "center",
        gap: 20,
        margin: "20px",
    },

    formControlUsers: {
        width: "300px",
        backgroundColor: "rgb(255,255, 255, .1)",
        borderRadius: "10px",
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
            },
            '&.Mui-focused': {
                },
            "&.Mui-focused fieldset": {
            }
        }
    },
    selectUsers: {
    },
    inputLabelUsers: {
    },
    stackUsers: {
    },
    chipUsers: {
        backgroundColor: "rgb(255,255, 255, .8)",
    },
    cancelIconUsers: {
        '& > *': {
            color: 'rgb(255, 47, 47, .9)',
        }
    },
    menuItemUsers: {
        "&.Mui-selected": {
        },
    },
    customBoxColumn: { 
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        width: "90%",
        gap: 8,
    },
    customBoxColumnStockOptions: {
        minHeight: "330px",
    },
    updateBoxColumn: {
        marginTop: "16px",
        minHeight: "250px",
    },
    customBoxRow: {
        display: "flex",
        justifyContent:  "center",
        gap: 8,
    },
    customImgRow: {
        display: "flex",
        justifyContent:  "flex-end",
        alignItems: "center", 
        gap: 35,
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
    customBoxRowArrowButton: {
        marginTop: "auto",
        height: "70px"
    },
    inputMainData: {
        backgroundColor: "white",
        borderRadius: 10,
        width: "100%",
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
    },
    table: {
        width: "calc(100% - 6px)",
        margin: "3px",
        padding: "6px 0",
        borderRadius: "10px",
        backgroundColor: "rgb(69, 144, 186)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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
    page: {
        display: "inline-block",
        margin: "2%",
        width: "30%",
        height: "30%",
        backgroundColor: "white",
    },
    dropped_widget: {
        color: "red",
    },
    backPlus: {
        color: "rgb(255, 47, 47, 1)",
        width: "32px", 
        height: "32px",
        '& svg': {
            width: "32px", 
            height: "32px",
        }
    },
    plusIcon: {
        color: "rgb(32, 205, 60, 1)",
        width: "32px", 
        height: "32px",
        '& svg': {
            width: "32px", 
            height: "32px",
        }
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
    }
})

export const modalStyleExternal = {
    position: 'absolute',
    display: "flex",
    justifyContent: "center",
    top: 74,
    width: "100%",
    overflowX: "hidden",
};
export const modalStyleInternal = {
    // top: 74,
    maxWidth: "700px",
    width: "calc(100% - 32px)",
    // height: "520px",
    maxHeight: "520px",
    // minHeight: "490px",
    backgroundColor: "rgb(45,72, 91, 1)",
    borderRadius: "10px",
    // margin: "auto",
    padding: "3px",
    color: "white",
    overflow: "scroll",
    overflowX: "hidden",

};



export const modalStyleSaveExternal = {
    position: 'absolute',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: "50%",
    transform: "translateY(-50%)", // Center vertically using transform
    width: "100%",
    overflowX: "hidden",
    margin: "auto",
};
export const modalStyleSaveInternal = {
    top: 74,
    width: "220px",
    backgroundColor: "rgb(45,72, 91, 1)",
    borderRadius: "10px",
    margin: "auto",
    padding: "3px",
    color: "white",
    overflow: "scroll",
    overflowX: "hidden",
};

export const modalStyleErrorModalInternal = {
    top: 74,
    width: "270px",
    backgroundColor: "rgb(45,72, 91, 1)",
    borderRadius: "10px",
    margin: "auto",
    padding: "3px",
    color: "white",
    overflow: "scroll",
    overflowX: "hidden",
};
// export const TableStyles = makeStyles((theme: Theme) => ({
export const tableStyles = makeStyles()({
    alert_on : {
        backgroundColor: "rgb(290, 10, 50, .6)", 
        color:"white",
    },
    rows : {
        padding: "8px 0",
        border:0,
    },
    row_even: {
        backgroundColor: "rgb(69, 144, 186)", 
    },
    row_odd: {
        backgroundColor:"rgb(162, 199, 220)", 
    },
           
// }))
})
