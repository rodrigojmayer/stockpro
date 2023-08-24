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
// import { useState } from 'react';

// import Box from '@mui/material/Box';
// import Slider from '@mui/material/Slider';

// import Slider from 'react-native-slide-to-unlock';

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
            if(valueSlider-5 <= value &&  value <= valueSlider+5){
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
                        <Slider
                            aria-label="Temperature"
                            // defaultValue={30}
                            value={valueSlider}
                            // getAriaValueText={valuetext}
                            color="secondary"
                            // disabled={isThumbPressed}
                            onMouseDown={handleThumbMouseDown} // Attach the event handler when thumb is pressed
                            onMouseUp={handleThumbMouseUp}     // Attach the event handler when thumb is released
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