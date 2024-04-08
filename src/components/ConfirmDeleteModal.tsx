import { useState, useEffect } from 'react';
import { Box, 
         Modal, 
         Typography, 
        } from '@mui/material';
import { CancelButton } from './Buttons';
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

type ConfirmDeleteModalProps = {
    openConfirmDeleteModal: boolean;
    closeConfirmDeleteModal: (newData?: boolean) => void;
    source: string
    data: string
    confirmDelete: (newData?: boolean) => void
}
export default function ConfirmDeleteModal( props: ConfirmDeleteModalProps) {
    const { openConfirmDeleteModal, closeConfirmDeleteModal } = props;
    const { classes } = useStylesGlobal();
    // console.log("props: ", props)
    let subTitle = `Swipe to confirm ${props.source} "${props.data}" deletion`



    const [isThumbPressed, setIsThumbPressed] = useState(true);
    const [valueSlider, setValueSlider] = useState(0);
    
    const handleThumbMouseDown = () => {
      setIsThumbPressed(true);
    };
  
    const handleThumbMouseUp = () => {
        if(valueSlider<100)
            setValueSlider(0)
        setIsThumbPressed(false);
    };
  
    const handleSliderChange = (event: Event, newValue: number | number[], activeThumb: number) => {
        const value = typeof newValue === 'number' ? newValue : newValue[activeThumb];
         if (isThumbPressed) {
            if(valueSlider-20 <= value && value <= valueSlider+35){
                // console.log('Thumb pressed:', value);
                setValueSlider(value)
            }
        } else {
            setValueSlider(0)
        }
    };

    useEffect(() => {
        if(valueSlider===100 && !isThumbPressed){
            props.confirmDelete(true)
        }
    }, [valueSlider, isThumbPressed])

    
    return (
        <Modal
        sx={{backgroundColor: 'rgba(0, 0, 0, .5)'}}
        open={openConfirmDeleteModal} 
        onClose={() => closeConfirmDeleteModal()}
        > 
            <Box sx={modalStyleSaveExternal}>
                <Box sx={modalStyleErrorInternal}>
                    <Typography className={classes.finishButtons} align="center" >
                        {subTitle}
                    </Typography> 
                    <Box 
                        margin="auto"
                        sx={{ width: 100 }}
                    >
                        <PrettoSlider
                            aria-label="Temperature"
                            value={valueSlider}
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