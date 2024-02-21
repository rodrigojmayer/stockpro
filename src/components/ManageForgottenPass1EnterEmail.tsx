import { useState } from 'react';
import { Box,
         TextField,
         Typography,
         MenuItem,
        } from '@mui/material';
import { UpButton } from './Buttons';
import { useStylesGlobal } from '../Styles'

interface mainData {
    id: number;
    name: string;
}
interface Category {
    _id: string;
    id: number;
    name: string;
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    sub_categories: string[];
}

interface ChildProps {
    hiddenPanel:  boolean
    emailForgottenPass: string
    emailForgottenPassChange: (newData: string )=> void   
}

export default function ManageForgottenPass1EnterEmail(
        {   hiddenPanel, 
            emailForgottenPass, 
            emailForgottenPassChange, 
        }: ChildProps )  {
    const { classes } = useStylesGlobal();
    const close = () => {}
    const [openSaveChanges, setOpenSaveChanges] = useState(false);  
    const handleCloseSaveChanges = (ans?:boolean) => {
        if(ans){
            close()
        }
        setOpenSaveChanges(false);
    }
    

    return (
        <div
            hidden= {hiddenPanel}
        >
            <Typography align='center' variant='h6'>Main data</Typography>
            <Box className={`${classes.customBoxColumn} ${classes.customBoxColumnStockOptions}`}>
                <Box className={classes.customBoxRow}>
                    <TextField
                        label="Email"
                        maxRows={1}
                        size="small"
                        type= "text"
                        className={classes.inputMainData}
                        // className= {`${errorTextFields.email ? classes.text_field_error : ""} ${classes.inputMainData} `}
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