import React from 'react'
import { makeStyles } from 'tss-react/mui';
// import MenuList from '@mui/material/MenuList/MenuList';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Container, Typography, Grid } from '@mui/material';
import Modal from '@mui/material/Modal';

import ButtonGroup from '@mui/material/ButtonGroup';


const useStyles = makeStyles()({
    table: {
        // position: "absolute",
        // bottom: 48,
        // zIndex: 500,
        width: "calc(100% - 6px)",
        height: "100%",
        margin: "3px",
        backgroundColor: "red !important"
    }
})

const style = {
    position: 'absolute',
    left: "50%",
    transform: "translate(-50%, 0%)",
    top: 74,
    width: "calc(100% - 32px)",
    height: "70%",
    backgroundColor: "rgb(45,72, 91, 1)",
    margin: "auto",
    padding: "3px",
    
    color: "white",
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
            
                <Typography align="center" variant="h5">
                    Fields
                </Typography>

                <Grid container>
              <Grid item xs={2} >
              </Grid>
              <Grid item xs={10} >
                <Typography>
                    Table order
                </Typography>
              </Grid>
              <Grid item xs={6} >
                <Box className={classes.table}>

                </Box>
                {/* table 1 */}
              </Grid>
              <Grid item xs={6} >
                <Box className={classes.table}>

                </Box>
              </Grid>
            </Grid>



            </Box>
        </Modal>
    )
}