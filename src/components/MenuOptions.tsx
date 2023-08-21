import React from 'react'
import { makeStyles } from 'tss-react/mui';
// import MenuList from '@mui/material/MenuList/MenuList';
// import Box from '@mui/material/Box';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import ButtonGroup from '@mui/material/ButtonGroup';


const useStyles = makeStyles()({
    menuOptions: {
        position: "absolute",
        bottom: 48,
        zIndex: 500,
        width: "100%",
        height: "70%",
        backgroundColor: "red !important"
    }
})

const style = {
    position: 'absolute',
    bottom: 64,
    width: "100%",
    height: "70%",
    backgroundColor: "rgb(18, 35, 46, 1)",
    '&  > :nth-of-type(1)': {
        width: "100%",
        justifyContent: "space-evenly",
        height: "100%",
    },
    '& Button': {
        color: "white",
        height: "100%",
    },
};

interface ChildProps {
    open:  boolean
    handleClose: (newData: boolean) => void
    // openOptionF: (newData: boolean) => void
    // openOptionA: (newData: boolean) => void
    onData: (data: { option: string, open: boolean }) => void;
}



export default function MenuOptions({ open, handleClose,  onData}: ChildProps) {

    const { classes } = useStyles()
    const close = () => {
        handleClose(false)
    }

    const selOp = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const buttonElement = e.currentTarget.value 
        // console.log("buttonElement: ", buttonElement)
        onData({option:buttonElement, open: true})
        // if(buttonElement === "fields")
        //     // openOptionF(true)
        //     onData({option:"fields", open: true})
        // else if(buttonElement === "alerts")
        //     onData({option:"alerts", open: true})
            // openOptionA(["alerts", true])
        handleClose(false)
    }

    const  buttons = [
        <Button value="fields" key="fields" variant="text" onClick={selOp}>Fields</Button>,
        <Button value="alerts" key="alerts" variant="text" onClick={selOp}>Alerts</Button>,
        <Button value="massive-upload" key="massive-upload" variant="text" onClick={selOp}>Massive upload</Button>,
        <Button value="users" key="users" variant="text" onClick={selOp}>Users</Button>,
        <Button value="profile" key="profile" variant="text" onClick={selOp}>Profile</Button>,
        <Button value="preferences" key="preferences" variant="text" onClick={selOp}>Preferences</Button>,
    ];

    return (
        <Modal
            open={open} 
            onClose={close}
            > 
            <Box sx={style}>
                <ButtonGroup 
                    orientation="vertical"
                    // variant="text"    
                >
                    {buttons}
                </ButtonGroup>
            </Box>
        </Modal>
    )
}