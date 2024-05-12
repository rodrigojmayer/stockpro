import { useState, useEffect, useContext } from 'react';
import { Box, 
         Modal, 
         Typography, 
        } from '@mui/material';
import { OkButton } from './Buttons';
import { useStylesGlobal, modalStyleSaveExternal, modalStyleErrorInternal } from '../Styles'
import Slider from '@mui/material/Slider';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';


// const PrettoSlider = styled(Slider)({
//     color: '#52af77',
//     height: 25,
//     borderRadius: '7px',
//     //borderRadius: '0 7px 7px 0',
//     // paddingLeft: '40px' ,
//    // paddingRight: '25px',
//     '& .MuiSlider-track': {
//       border: 'none',
//       borderRadius: '7px 0 0 7px',
//     },
//     '& .MuiSlider-thumb': {
//       height: 25,
//       width: 40,
//     //   marginLeft: '21px',
//       //paddingRight: '25px', 
//       borderRadius: '7px',
//       backgroundColor: '#fff',
//       border: '1px solid currentColor',
//       '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
//         //boxShadow:  'inherit',
//       },
//       '&:before': {
//         display: 'none',
//       },
//     },
// });

type ConfirmCreatedUserModalProps = {
    openConfirmCreatedUserModal: boolean;
    closeConfirmCreatedUserModal: (newData?: boolean) => void;
    source: string
    data?: string
}
export default function ConfirmCreatedUserModal( props: ConfirmCreatedUserModalProps) {
    const { openConfirmCreatedUserModal, closeConfirmCreatedUserModal } = props;
    const { classes } = useStylesGlobal();
    const { user } = useContext<any>(UserContext);
    
    const navigate = useNavigate();
    
    const handleOkButton = async() => {
        closeConfirmCreatedUserModal(false)
        navigate('/login')
    };
    
    return (
        <Modal
        className={classes.modal_external_background}
            open={openConfirmCreatedUserModal} 
            onClose={() => closeConfirmCreatedUserModal()}
        > 
            <Box sx={modalStyleSaveExternal}>
                <Box 
                    sx={{ ...modalStyleErrorInternal }}
                    className={classes[`_${user.background_color}main_background_color` as keyof typeof classes]}
                >
                    <Box 
                        margin="20px 10px"
                    >
                        <Typography variant='body1' align="center" >
                            Thanks for signing up to StockPro
                        </Typography> 
                        <Typography variant='body2' align="center" >
                            <MarkEmailReadIcon/>
                        </Typography> 
                        <Typography variant='body2' align="center" >
                            We have sent you an email confirmation. 
                            <br/> 
                            Please check your inbox
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