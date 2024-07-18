import { Box,
         TextField,
         Typography,
        } from '@mui/material';
import { useStylesGlobal } from '../Styles'
import { useContext } from 'react';
import { LanguageLabelsContext } from '../context/LanguageLabelsContext';

interface ChildProps {
    hiddenPanel:  boolean
    emailForgottenPass: string
    emailForgottenPassChange: (newData: string )=> void 
    errorTextFields: any  
}

export default function ManageForgottenPass1EnterEmail(
        {   hiddenPanel, 
            emailForgottenPass, 
            emailForgottenPassChange, 
            errorTextFields,
        }: ChildProps )  {
    const { classes } = useStylesGlobal();    
    const { labelsManageForgottenPass } = useContext<any>(LanguageLabelsContext)

    return (
        <div
            hidden= {hiddenPanel}
        >
            <Box padding="0 5px 7px 5px">
                <Typography align='center' variant='body2'>{labelsManageForgottenPass.confirm_recovery_email}</Typography>
            </Box>
            <Box className={`${classes.customBoxColumn}`}>
                <Box className={classes.customBoxRow}>
                    <TextField
                        label={labelsManageForgottenPass.email}
                        maxRows={1}
                        size="small"
                        type= "text"
                        className= {`${errorTextFields.email ? classes.text_field_error : ""} ${classes.inputMainData} `}
                        value={emailForgottenPass}
                        onChange={ (event:any) => emailForgottenPassChange(event.target.value) }
                        InputProps={{
                            className: classes.inputClassName,
                        }}
                    /> 
                </Box>
            </Box>
        </div>
    )
}