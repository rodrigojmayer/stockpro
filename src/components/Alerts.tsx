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
    // position: 'absolute',
    // bottom: 64,
    // width: "100%",
    // height: "70%",
    // backgroundColor: "rgb(18, 35, 46, 1)",
    
    color: "white",
    // '&  > :nth-of-type(1)': {
    //     width: "100%",
    //     justifyContent: "space-evenly",
    //     height: "100%",
    //     color: "white",
    // },
};

interface ChildProps {
    open:  boolean
    handleClose: (newData: boolean) => void
}


export default function Fields({ open, handleClose }: ChildProps) {


    const { classes } = useStyles()
    const close = () => {
        handleClose(false)
    }






    return (
        <Modal
            open={open} 
            onClose={close}
            > 

            <Box sx={style}>
            
            <Typography>
                Alerts
            </Typography>

            </Box>
        </Modal>
    )
}