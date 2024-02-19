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
    openOptionsCreate: (newData: string )=> void
    stockNameTemp: string
    onStockNameChange: (newData: string )=> void
    stockAmountTemp: number | string
    onStockAmountChange: (newData: number  )=> void
    measureArray: mainData[]
    stockMeasureTemp: string
    onStockMeasureChange: (newData: any )=> void
    stockCodeTemp: string | null
    onStockCodeChange: (newData: string )=> void
    categoryArray: mainData[]
    stockCategoryTemp: (Category | null)
    onStockCategoryChange: (newData: any )=> void
    stockSubCategoryTemp: string
    onStockSubCategoryChange: (newData: string )=> void    
}

export default function ManageStockMainData(
        {   hiddenPanel, 
            openOptionsCreate,
            stockNameTemp, 
            onStockNameChange,
            stockAmountTemp, 
            onStockAmountChange,
            measureArray,  
            stockMeasureTemp, 
            onStockMeasureChange,
            stockCodeTemp, 
            onStockCodeChange,
            categoryArray, 
            stockCategoryTemp, 
            onStockCategoryChange,
            stockSubCategoryTemp, 
            onStockSubCategoryChange, 
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
    const handleHiddenOptions = (changeTo:string) =>  {
        openOptionsCreate(changeTo)
    }

    return (
        <div
            hidden= {hiddenPanel}
        >
            <Typography align='center' variant='h6'>Main data</Typography>
            <Box className={`${classes.customBoxColumn} ${classes.customBoxColumnStockOptions}`}>
                <Box className={classes.customBoxRow}>
                    <TextField
                        label="Name*"
                        value={stockNameTemp}
                        onChange={ (event) => onStockNameChange(event.target.value) }
                        maxRows={1}
                        size="small"
                        className={classes.inputMainData}
                        InputProps={{
                            className: classes.inputClassName,
                        }}
                    />
                </Box> 
                <Box className={classes.customBoxRow}>
                    <TextField
                        label="Code"
                        value={stockCodeTemp}
                        onChange={ (event) => onStockCodeChange(event.target.value) }
                        maxRows={1}
                        size="small"
                        className={classes.inputMainData}
                        InputProps={{
                            className: classes.inputClassName,
                        }}
                    />
                </Box> 
                <Box className={classes.customBoxRow}>
                    <TextField
                        label="Amount"
                        value={stockAmountTemp}
                        onChange={ (event) => onStockAmountChange(Number(event.target.value)) }
                        maxRows={1}
                        size="small"
                        // type="number"
                        className={classes.inputMainData}
                        InputProps={{  className: classes.inputClassName }}
                    />
                    <TextField 
                        label="Measure"
                        size="small"
                        select
                        className={classes.inputMainData}
                        InputProps={{className: classes.inputClassName}}
                        value={stockMeasureTemp}
                        onChange={ (event) => onStockMeasureChange(event.target.value) }
                        >
                            {measureArray.map((measure) => (
                                <MenuItem 
                                    className={classes.menuItemUsers}
                                    key={measure.id} 
                                    value={measure.name}
                                    sx={{ justifyContent: "space-between" }}
                                >
                                    {measure.name}
                                </MenuItem>
                            ))}
                    </TextField>
                </Box> 
                <Box className={classes.customBoxRow}>
                    <TextField 
                        label="Category"
                        size="small"
                        select
                        className={classes.inputMainData}
                        InputProps={{className: classes.inputClassName}}
                        value={stockCategoryTemp?.id || ''}
                        onChange={ (event) => onStockCategoryChange(event.target.value) }
                    >
                        {categoryArray.map((category) => (
                            <MenuItem 
                                className={classes.menuItemUsers}
                                key={category.id} 
                                value={category.id}
                                sx={{ justifyContent: "space-between" }}
                            >
                                {category.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField  
                        label="Sub-Categ." 
                        size="small"
                        select
                        disabled={stockCategoryTemp ? false : true}
                        className={classes.inputMainData}
                        InputProps={{className: classes.inputClassName}}
                        value={stockSubCategoryTemp}
                        onChange={ (event) => onStockSubCategoryChange(event.target.value) }
                    >
                        {stockCategoryTemp ? stockCategoryTemp.sub_categories.map((subCategory, index) => (
                            <MenuItem 
                                className={classes.menuItemUsers}
                                key={index} 
                                value={subCategory}
                                sx={{ justifyContent: "space-between" }}
                            >
                                {subCategory}
                            </MenuItem>
                        )) : <MenuItem></MenuItem>
                        }
                    </TextField>
                </Box> 
                <Box className={`${classes.customBoxRow} ${classes.customBoxRowArrowButton} `}>
                    <div className={classes.customBoxCenter}>
                        <Typography align="left" sx={{ width: "169px" }}></Typography>
                        <Typography align="right" sx={{ width: "95px" }}>Secondary data</Typography>
                        <UpButton
                            direction="right"
                            clicked={() => handleHiddenOptions("secondaryData")}
                        />
                    </div> 
                </Box>
            </Box>
        </div>
    )
}