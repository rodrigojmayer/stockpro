import React from 'react'
import { makeStyles } from 'tss-react/mui';
// import MenuList from '@mui/material/MenuList/MenuList';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
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
    '&  > :nth-child(1)': {
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
}




// export default function MenuOptions({ open }: ChildProps, { handleClose }: ChildProps) {
export default function MenuOptions({ open, handleClose }: ChildProps) {
    // export default function MenuOptions({ disp }: ChildProps) {

    const  buttons = [
        <Button key="fields" variant="text">Fields</Button>,
        <Button key="alerts" variant="text">Alerts</Button>,
        <Button key="massive-upload" variant="text">Massive upload</Button>,
        <Button key="users" variant="text">Users</Button>,
        <Button key="profile" variant="text">Profile</Button>,
        <Button key="preferences" variant="text">Preferences</Button>,
    ];

    const { classes } = useStyles()
    const close = () => {
        handleClose(false)
    }

    return (
        <div>
            {/* <menu  */}
            {/* className={classes.menuOptions} */}
            {/* // style={{disp}} */}
            {/* > */}
                {/* {disp} */}
                
            {/* </menu> */}

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
        </div>
    )
}
