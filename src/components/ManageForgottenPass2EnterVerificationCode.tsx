import { Box,
         TextField,
         Typography,
        } from '@mui/material';
import { useStylesGlobal } from '../Styles'

interface ChildProps {
    hiddenPanel:  boolean;
    emailForgottenPass: string;
    verificationCode: string;
    verificationCodeChange: (newData: string )=> void;
    errorTextFields: any  
}

export default function ManageForgottenPass2EnterVerificationCode(
        {   hiddenPanel, 
            emailForgottenPass,
            verificationCode, 
            verificationCodeChange,
            errorTextFields,
        }: ChildProps )  {
    const { classes } = useStylesGlobal();

    return (
        <div
            hidden= {hiddenPanel}
        >
            <Box padding="0 5px 7px 5px">
                <Typography align='center' variant='body2'>A verification code was sent to {emailForgottenPass}</Typography>
            </Box>   
            <Box className={`${classes.customBoxColumn}`}>
                <Box className={classes.customBoxRow}>
                    <TextField
                        label="Verification Code"
                        maxRows={1}
                        size="small"
                        type= "text"
                        className= {`${errorTextFields.email ? classes.text_field_error : ""} ${classes.inputMainData} `}
                        value={verificationCode}
                        onChange={ (event:any) => verificationCodeChange(event.target.value) }
                        InputProps={{
                            className: classes.inputClassName,
                        }}
                    /> 
                </Box>
            </Box>
        </div>
    )
}