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
    openOptions: (newData: string )=> void
    emailForgottenPass: string
    emailForgottenPassChange: (newData: string )=> void
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

export default function ManageForgottenPass1EnterEmail(
        {   hiddenPanel, 
            openOptions,
            emailForgottenPass, 
            emailForgottenPassChange,
            // stockAmountTemp, 
            // onStockAmountChange,
            // measureArray,  
            // stockMeasureTemp, 
            // onStockMeasureChange,
            // stockCodeTemp, 
            // onStockCodeChange,
            // categoryArray, 
            // stockCategoryTemp, 
            // onStockCategoryChange,
            // stockSubCategoryTemp, 
            // onStockSubCategoryChange, 
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
    const handleOpenSaveChanges = () => setOpenSaveChanges(true);
    // const handleHiddenOptions = (changeTo:string) =>  {
    //     openOptionsCreate(changeTo)
    // }

    return (
        <div
            hidden= {hiddenPanel}
        >
            <Typography align='center' variant='h6'>Main data</Typography>
            <Box className={`${classes.customBoxColumn} ${classes.customBoxColumnStockOptions}`}>
                {/* <Box className={classes.customBoxRow}>
                    <TextField
                        label="Name*"
                        value={emailForgottenPass}
                        onChange={ (event) => emailForgottenPassChange(event.target.value) }
                        maxRows={1}
                        size="small"
                        className={classes.inputMainData}
                        InputProps={{
                            className: classes.inputClassName,
                        }}
                    />
                </Box>  */}
                {/* <Box className={classes.customBoxColumn}> */}
                <Box className={classes.customBoxRow}>
                    {/* { true ?  */}
                    {/* { false ?  */}
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
                    {/* // : 
                    // <Box>
                    //     <Box marginBottom="10px">
                    //         <Typography variant='body2' align="center" >
                    //             An email with a verification code was just sent to {emailForgottenPass} 
                    //         </Typography>
                    //     </Box>
                    //     <TextField
                    //         label="Verification Code"
                    //         maxRows={1}
                    //         size="small"
                    //         type= "text"
                    //         className= {`${errorTextFields.verification_code ? classes.text_field_error : ""} ${classes.inputMainData} `}
                    //         value={emailForgottenPass}
                    //         onChange={ (event) => handleEditEmailForgottenPass(event.target.value) }
                    //         InputProps={{
                    //             className: classes.inputClassName,
                    //         }}
                    //     />
                    // </Box>
                    // } */}
                </Box>
            </Box>
        </div>
    )
}