import { Box,
         TextField,
         Typography,
         IconButton,
        } from '@mui/material';
import { useStylesGlobal } from '../Styles'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';

interface ChildProps {
    hiddenPanel:  boolean
    newPass: string
    newPassChange: (newData: string )=> void
    confirmNewPass: string
    confirmNewPassChange: (newData: string )=> void
    errorTextFields: any  
}

export default function ManageForgottenPass3ChangePass(
        {   hiddenPanel, 
            newPass, 
            newPassChange, 
            confirmNewPass, 
            confirmNewPassChange,
            errorTextFields,
        }: ChildProps )  {
    const { classes } = useStylesGlobal();

    const[ showNewPass, setShowNewPass ] = useState<boolean>(false)
    const[ showConfirmNewPass, setShowConfirmNewPass ] = useState<boolean>(false)

    const showNewPassToggle = () => {
        setShowNewPass(!showNewPass)
    }
    const showConfirmNewPassToggle = () => {
        setShowConfirmNewPass(!showConfirmNewPass)
    }
    return (
        <div
            hidden= {hiddenPanel}
        >
            <Box padding="0 5px 7px 5px">
                <Typography align='center' variant='body2'>Create a new password</Typography>
            </Box>
            <Box className={`${classes.customBoxColumn}`}>
                <Box className={classes.customBoxRow}>
                    <TextField
                        label="New Password"
                        maxRows={1}
                        size="small"
                        // type= "password"
                        type={showNewPass ? "text" : "password"}
                        className= {`${errorTextFields.new_password ? classes.text_field_error : ""} ${classes.inputMainData} `}
                        value={newPass}
                        onChange={ (event) => newPassChange(event.target.value) }
                        InputProps={{
                            className: classes.inputClassName,
                            endAdornment: (
                                <IconButton onClick={showNewPassToggle}>
                                    {showNewPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </IconButton>
                            ),
                        }}
                    /> 
                </Box>
                <Box className={classes.customBoxRow}>
                    <TextField
                        label="Confirm Password"
                        maxRows={1}
                        size="small"
                        // type= "password"
                        type={showConfirmNewPass ? "text" : "password"}
                        className= {`${errorTextFields.confirm_new_password ? classes.text_field_error : ""} ${classes.inputMainData} `}
                        value={confirmNewPass}
                        onChange={ (event) => confirmNewPassChange(event.target.value) }
                        InputProps={{
                            className: classes.inputClassName,
                            endAdornment: (
                                <IconButton onClick={showConfirmNewPassToggle}>
                                    {showConfirmNewPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </IconButton>
                            ),
                        }}
                    /> 
                </Box>
            </Box>
        </div>
    )
}