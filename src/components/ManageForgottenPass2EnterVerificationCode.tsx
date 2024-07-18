import { Box,
         TextField,
         Typography,
        } from '@mui/material';
import { useStylesGlobal } from '../Styles'
import { useContext } from 'react';
import { LanguageLabelsContext } from '../context/LanguageLabelsContext';

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
    const { labelsManageForgottenPass } = useContext<any>(LanguageLabelsContext)

    return (
        <div
            hidden= {hiddenPanel}
        >
            <Box padding="0 5px 7px 5px">
                <Typography align='center' variant='body2'>{labelsManageForgottenPass.verification_code_sent} {emailForgottenPass}</Typography>
            </Box>   
            <Box className={`${classes.customBoxColumn}`}>
                <Box className={classes.customBoxRow}>
                    <TextField
                        label={labelsManageForgottenPass.verification_code}
                        maxRows={1}
                        size="small"
                        type= "text"
                        className= {`${errorTextFields.email ? classes.text_field_error : ""} ${classes.inputMainData} `}
                        value={verificationCode}
                        onChange={ (event:any) => verificationCodeChange(event.target.value) }
                        InputProps={{
                            className: classes.inputClassName,
                            inputMode: "numeric",
                        }}
                    /> 
                </Box>
            </Box>
        </div>
    )
}