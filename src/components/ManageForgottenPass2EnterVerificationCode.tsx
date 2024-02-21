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
    verificationCode: string
    verificationCodeChange: (newData: string )=> void
    // stockAmountTemp: number | string
    // onStockAmountChange: (newData: number  )=> void
    // measureArray: mainData[]
    // stockMeasureTemp: string
    // onStockMeasureChange: (newData: any )=> void
    // stockCodeTemp: string | null
    // onStockCodeChange: (newData: string )=> void
    // categoryArray: mainData[]
    // stockCategoryTemp: (Category | null)
    // onStockCategoryChange: (newData: any )=> void
    // stockSubCategoryTemp: string
    // onStockSubCategoryChange: (newData: string )=> void    
}

export default function ManageForgottenPass2EnterVerificationCode(
        {   hiddenPanel, 
            verificationCode, 
            verificationCodeChange,
        }: ChildProps )  {
    const { classes } = useStylesGlobal();

    return (
        <div
            hidden= {hiddenPanel}
        >
            <Typography align='center' variant='h6'>Main data</Typography>
            <Box className={`${classes.customBoxColumn} ${classes.customBoxColumnStockOptions}`}>
                <Box className={classes.customBoxRow}>
                    <TextField
                        label="Verification Code"
                        maxRows={1}
                        size="small"
                        type= "text"
                        className={classes.inputMainData}
                        // className= {`${errorTextFields.email ? classes.text_field_error : ""} ${classes.inputMainData} `}
                        value={verificationCode}
                        onChange={ (event) => verificationCodeChange(event.target.value) }
                        InputProps={{
                            className: classes.inputClassName,
                        }}
                    /> 
                </Box>
            </Box>
        </div>
    )
}