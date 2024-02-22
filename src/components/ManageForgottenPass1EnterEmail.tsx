import { Box,
         TextField,
         Typography,
        } from '@mui/material';
import { useStylesGlobal } from '../Styles'

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

    return (
        <div
            hidden= {hiddenPanel}
        >
            <Box padding="0 5px 7px 5px">
                <Typography align='center' variant='body2'>To get a verification code, first confirm the recovery email address</Typography>
            </Box>
            <Box className={`${classes.customBoxColumn}`}>
                <Box className={classes.customBoxRow}>
                    <TextField
                        label="Email"
                        maxRows={1}
                        size="small"
                        type= "text"
                        className= {`${errorTextFields.email ? classes.text_field_error : ""} ${classes.inputMainData} `}
                        value={emailForgottenPass}
                        onChange={ (event) => emailForgottenPassChange(event.target.value) }
                        InputProps={{
                            className: classes.inputClassName,
                        }}
                    /> 
                </Box>
            </Box>
        </div>
    )
}