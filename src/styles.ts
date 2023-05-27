import { makeStyles } from 'tss-react/mui';

export const useStylesGlobal = makeStyles()({
    finishButtons: {
        display: "flex",
        justifyContent:  "center",
        gap: 20,
        margin: "20px",
    },

    formControlUsers: {
        width: "300px",
        // backgroundColor: "white",
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
        // display: "flex",
        // flexDirection: "column",
        // alignItems: "center", 
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        width: "90%",
        // alignItems:  "flex-end",
        gap: 8,
    },
    customBoxRow: {
        display: "flex",
        justifyContent:  "center",
        alignItems: "center",
        gap: 8,
    },
    newEmailField: {        
        backgroundColor: "white",
        borderRadius: 10,
        minWidth: "150px",
        width: "100%",
        maxWidth: "250px",
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
    customBoxRowRight: {
        justifyContent:  "end",
    },
    inputMainData: {
        backgroundColor: "white",
        borderRadius: 10,
        width: "100%",
        // width: "70%",
        // minWidth: "70%",
        // width: "70%",
        // height:"34px",
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
    top: 74,
    maxWidth: "700px",
    width: "calc(100% - 32px)",
    maxHeight: "520px",
    // height: "520px",
    backgroundColor: "rgb(45,72, 91, 1)",
    borderRadius: "10px",
    margin: "auto",
    padding: "3px",
    color: "white",
    overflow: "scroll",
    overflowX: "hidden",

};


export const modalStyleSaveExternal = {
    position: 'absolute',
    display: "flex",
    justifyContent: "center",
    top: "40%",
    width: "100%",
    overflowX: "hidden",
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