import React from 'react'
import { makeStyles } from 'tss-react/mui';
// import MenuList from '@mui/material/MenuList/MenuList';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';



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
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface ChildProps {
    open:  boolean
    handleClose: (newData: boolean) => void
  }

// export default function MenuOptions({ open }: ChildProps, { handleClose }: ChildProps) {
export default function MenuOptions({ open, handleClose }: ChildProps) {
    // export default function MenuOptions({ disp }: ChildProps) {

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
                //  aria-labelledby="modal-modal-title" 
                //  aria-describedby="modal-modal-description" 
             > 
                <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Text in a modal
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>
                </Box>
            </Modal>
        </div>
    )
}
