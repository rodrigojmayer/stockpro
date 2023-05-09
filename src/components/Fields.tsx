import React from 'react'
import { useEffect } from 'react'
import { makeStyles } from 'tss-react/mui';
// import MenuList from '@mui/material/MenuList/MenuList';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Container, Typography, Grid } from '@mui/material';
import Modal from '@mui/material/Modal';

import ControlPointTwoToneIcon from '@mui/icons-material/ControlPointTwoTone';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import ButtonGroup from '@mui/material/ButtonGroup';


const useStyles = makeStyles()({
    table: {
        // position: "absolute",
        // bottom: 48,
        // zIndex: 500,
        width: "calc(100% - 6px)",
        height: "100%",
        margin: "3px",
        padding: "6px 0",
        // backgroundColor: "red !important"
        backgroundColor: "rgb(69, 144, 186)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        gap: "9px",
    },
    buttonsGroup: {
        width: "100%",
        height: "100%",
    },
    buttonFields: {
        backgroundColor: "white",
        width: "calc(100% - 12px)",
        // width: "auto",
        // margin: "8px",
        height: "32px",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "space-between",
        '&  svg': {
            // color: "red !important",
        }
        
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

type Data = {
    id: number;
    product: string;
    amount: number;
    unit: string;
    category: string;
    sub_category: string;
  }
interface ColumnData {
    dataKey: keyof Data
    label: string
    numeric?: boolean
    width: number
  }
interface ChildProps {
    open:  boolean
    handleClose: (newData: boolean) => void
    columns: ColumnData[]
}


export default function Fields({ open, handleClose, columns }: ChildProps) {


    const { classes } = useStyles()
    const close = () => {
        handleClose(false)
    }


    useEffect(() => {
        console.log("Fields columns: ", columns)
    }, [])


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
              <Grid item xs={6} >
                <Typography align="center" >
                    Table order
                </Typography>
              </Grid>
              <Grid item xs={6} >
              </Grid>
              <Grid item xs={6} >
                <Box className={classes.table}>
                    {columns.map((column) => (
                        <Button
                        key={column.dataKey} 
                        className={classes.buttonFields}
                        endIcon={<RemoveCircleTwoToneIcon sx={{color: "rgb(255, 47, 47, 1)"}}/>}
                        >
                            {column.label}
                        </Button>
                    ))}

                </Box>
              </Grid>
              <Grid item xs={6} >
                <Box className={classes.table}>
                {columns.map((column) => (
                        <Button
                        key={column.dataKey} 
                        className={classes.buttonFields}
                        endIcon={<ControlPointTwoToneIcon  sx={{color: "rgb(32, 205, 60, 1)"}}/>}
                        >
                            {column.label}
                        </Button>
                    ))}
                </Box>
              </Grid>
            </Grid>

            </Box>
        </Modal>
    )
}