import React, { useState, useEffect } from 'react';
import { Box,
         Modal, 
         Typography,
        } from '@mui/material';
import { 
         CancelButton, 
        } from './Buttons';
import { useStylesGlobal, modalStyleSaveExternal, modalStyleErrorModalInternal } from '../Styles'
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';


const PrettoSlider = styled(Slider)({
    color: '#52af77',
    height: 25,
    borderRadius: '7px',
    //borderRadius: '0 7px 7px 0',
    paddingLeft: '40px' ,
   // paddingRight: '25px',
    '& .MuiSlider-track': {
      border: 'none',
      borderRadius: '7px 0 0 7px',
    },
    '& .MuiSlider-thumb': {
      height: 25,
      width: 50,
      marginLeft: '21px',
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
    '& .MuiSlider-valueLabel': {
      display: 'none',
      lineHeight: 10.2,
      fontSize: 12,
      background: 'unset',
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: '50% 50% 50% 0',
      backgroundColor: '#52af77',
      transformOrigin: 'bottom left',
      transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
      '&:before': { display: 'none' },
      '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
      },
      '& > *': {
        transform: 'rotate(45deg)',
      },
    },
  });

type ConfirmDeleteModalProps = {
    openConfirmDeleteModal: boolean;
    closeConfirmDeleteModal: (newData?: boolean) => void;
    data: string
}
export default function ConfirmDeleteModal( props: ConfirmDeleteModalProps) {
    const { openConfirmDeleteModal, closeConfirmDeleteModal } = props;
    const { classes } = useStylesGlobal();
    let title = "Deletear"
    let subTitle = props.data


    // if(props.errorData === "missing_data"){
    //     title="Missing required data"
    //     subTitle="Name*"
    // } else if (props.errorData === "duplicate_product"){
    //     title="Duplicated data"
    //     subTitle=`This product already exists`
    // } else if (props.errorData === "negative_amount"){
    //     title="Shortfall"
    //     subTitle=`The amount cannot be negative`
    // }


    const [isThumbPressed, setIsThumbPressed] = useState(true);
    const [valueSlider, setValueSlider] = useState(30);
    
    const handleThumbMouseDown = () => {
        console.log('handleThumbMouseDown');
      setIsThumbPressed(true);
    };
  
    const handleThumbMouseUp = () => {
        console.log('handleThumbMouseUp');
        console.log('valueSlider: ', valueSlider);
        if(valueSlider<100)
            setValueSlider(0)
        setIsThumbPressed(false);
    };
  
    const handleSliderChange = (event: Event, newValue: number | number[], activeThumb: number) => {
        const value = typeof newValue === 'number' ? newValue : newValue[activeThumb];
         if (isThumbPressed) {
            if(valueSlider-20 <= value && value <= valueSlider+20){
                console.log('Thumb pressed:', value);
                setValueSlider(value)
            }
        } else {
            setValueSlider(0)
        }
    };

    
    return (
        <Modal
        open={openConfirmDeleteModal} 
        onClose={() => closeConfirmDeleteModal()}
        > 
            <Box sx={modalStyleSaveExternal}>
                <Box sx={modalStyleErrorModalInternal}>
                    <Typography align="center" variant="h6">
                        {title}
                    </Typography>
                    <Typography align="center" >
                        {subTitle}
                    </Typography>
                    

                    
                    <Box sx={{ width: 100 }}>
                        <PrettoSlider
                            aria-label="Temperature"
                            // defaultValue={30}
                            value={valueSlider}
                            // getAriaValueText={valuetext}
                            color="secondary"
                            // disabled={isThumbPressed}
                            onMouseDown={handleThumbMouseDown} // Attach the event handler when thumb is pressed
                            onMouseUp={handleThumbMouseUp}     // Attach the event handler when thumb is released
                            onTouchStart={handleThumbMouseDown} // Attach the event handler when thumb is pressed
                            onTouchEnd={handleThumbMouseUp}     // Attach the event handler when thumb is released
                            onChange={handleSliderChange}
                        />
                    </Box>

                    

                    <Box className={classes.finishButtons}>
                        <CancelButton
                        clicked={() => closeConfirmDeleteModal(false)}
                        />
                    </Box> 
                </Box>
            </Box>
        </Modal>
    )
}