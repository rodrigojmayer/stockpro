import { useState, useEffect } from 'react';
import { Box, 
         Modal, 
         Typography, 
        } from '@mui/material';
import { OkButton } from './Buttons';
import { useStylesGlobal, modalStyleSaveExternal, modalStyleErrorInternal } from '../Styles'
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';


const PrettoSlider = styled(Slider)({
    color: '#52af77',
    height: 25,
    borderRadius: '7px',
    //borderRadius: '0 7px 7px 0',
    // paddingLeft: '40px' ,
   // paddingRight: '25px',
    '& .MuiSlider-track': {
      border: 'none',
      borderRadius: '7px 0 0 7px',
    },
    '& .MuiSlider-thumb': {
      height: 25,
      width: 40,
    //   marginLeft: '21px',
      //paddingRight: '25px', 
      borderRadius: '7px',
      backgroundColor: '#fff',
      border: '1px solid currentColor',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        //boxShadow:  'inherit',
      },
      '&:before': {
        display: 'none',
      },
    },
});

type ConfirmChangedPassModalProps = {
    openConfirmChangedPassModal: boolean;
    closeConfirmChangedPassModal: (newData?: boolean) => void;
}
export default function ConfirmChangedPassModal( props: ConfirmChangedPassModalProps) {
    const { openConfirmChangedPassModal, closeConfirmChangedPassModal } = props;
    const { classes } = useStylesGlobal();
    
    
    const handleOkButton = async() => {
        closeConfirmChangedPassModal(true)
    };
    
    return (
        <Modal
            open={openConfirmChangedPassModal} 
            onClose={() => closeConfirmChangedPassModal()}
        > 
            <Box sx={modalStyleSaveExternal}>
                <Box sx={modalStyleErrorInternal}>
                    <Box 
                        margin="20px 10px"
                    >
                        {/* <Typography variant='body1' align="center" >
                            Thanks for signing up to StockPro
                        </Typography>  */}
                        <Typography variant='body2' align="center" >
                            Your password has been successfully changed  
                        </Typography> 
                    </Box>
                    <Box className={classes.finishButtons}>
                        <OkButton
                            clicked={() => handleOkButton()}
                        />
                    </Box> 
                </Box>
            </Box>
        </Modal>
    )
}