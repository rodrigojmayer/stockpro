import { useContext, useEffect, useRef, useState } from 'react';
import { Box, 
         TextField, 
         Typography, 
         MenuItem, 
         Tooltip, 
        } from '@mui/material';
import { UpButton } from './Buttons';
import { useStylesGlobal } from '../Styles'
import { LanguageLabelsContext } from '../context/LanguageLabelsContext';

interface mainData {
    id: number;
    name: string;
    name_esp: string;
    name_dan: string;
    name_ita: string;
}
interface Category {
    _id: string;
    id: number;
    name: string;
    name_esp: string;
    name_dan: string;
    name_ita: string;
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
    onStockSubCategoryChange: (newData: any )=> void    
    categorySubArray: mainData[]
    stockCategorySubTemp: mainData[]
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
            categorySubArray,
            stockCategorySubTemp 
        }: ChildProps )  {
    const { classes } = useStylesGlobal();
    const firstInputRef = useRef<HTMLInputElement>(null);
    const { labelsManageStock } = useContext<any>(LanguageLabelsContext)

    console.log("categorySubArray: ", categorySubArray)
    console.log("stockCategorySubTemp: ", stockCategorySubTemp)
    
    useEffect(() => {
        if (!hiddenPanel) {
            if (firstInputRef.current) {
                firstInputRef.current.focus()
            }
        }
    }, [hiddenPanel])

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
            <Typography align='center' variant='h6'>{labelsManageStock.main_data}</Typography>
            <Box className={`${classes.customBoxColumn} ${classes.customBoxColumnStockOptions}`}>
                <Box className={classes.customBoxRow}>
                    <TextField
                        label={labelsManageStock.name}
                        value={stockNameTemp}
                        onChange={ (event:any) => onStockNameChange(event.target.value) }
                        maxRows={1}
                        size="small"
                        className={classes.inputMainData}
                        InputProps={{
                            className: classes.inputClassName,
                            inputProps: {maxLength: 30}
                        }}
                        // inputRef={input => input && input.focus()}
                        inputRef={firstInputRef} // Set the ref to the first input    
                    />
                </Box> 
                <Box className={classes.customBoxRow}>
                    <TextField
                        label={labelsManageStock.code}
                        value={stockCodeTemp}
                        onChange={ (event:any) => onStockCodeChange(event.target.value) }
                        maxRows={1}
                        size="small"
                        className={classes.inputMainData}
                        InputProps={{
                            className: classes.inputClassName,
                            inputProps: {maxLength: 25}
                        }}
                    />
                </Box> 
                <Box className={classes.customBoxRow}>
                    <TextField
                        label={labelsManageStock.amount}
                        value={stockAmountTemp}
                        onChange={ (event:any) => onStockAmountChange(Number(event.target.value)) }
                        maxRows={1}
                        size="small"
                        // type="number"
                        className={classes.inputMainData}
                        InputProps={{  
                            className: classes.inputClassName,    
                            inputMode: "numeric",
                        }}
                    />
                    <TextField 
                        label={labelsManageStock.measure}
                        size="small"
                        select
                        className={classes.inputMainData}
                        InputProps={{className: classes.inputClassName}}
                        value={stockMeasureTemp}
                        onChange={ (event:any) => onStockMeasureChange(event.target.value) }
                        >
                            {measureArray.map((measure) => (
                                <MenuItem 
                                    key={measure.id} 
                                    value={measure.name}
                                    sx={{ justifyContent: "space-between" }}
                                >
                                    {measure.name}
                                </MenuItem>
                            ))}
                    </TextField>
                </Box> 
                {/* <Box className={classes.customBoxRow}>
                    <TextField 
                        label={labelsManageStock.category}
                        size="small"
                        select
                        className={classes.inputMainData}
                        InputProps={{className: classes.inputClassName}}
                        value={stockCategoryTemp?.id || ''} // Ensure the value corresponds to the category ID
                        onChange={ (event:any) => onStockCategoryChange(event.target.value) }
                        SelectProps={{
                            MenuProps: {
                                PaperProps: {
                                    sx: {
                                        maxHeight: 200, // Set the desired max height
                                        maxWidth: 200,  // Set the desired max width
                                        overflowY: 'auto', // Show scrollbar on hover
                                        scrollbarColor: 'rgba(0, 0, 0, 0) rgba(0, 0, 0, 0)', // Adjust the color of the scrollbar
                                        scrollbarWidth: 'thin', // Hide scrollbar for Firefox
                                        '&:hover': {
                                            scrollbarColor: 'rgba(0, 0, 0, .3) rgba(0, 0, 0, 0)', // Adjust the color of the scrollbar
                                        },
                                    },
                                },
                            },
                        }}
                    >
                        {categoryArray.map((category:any) => 
                            <MenuItem
                                key={category.id}
                                value={category.id}
                                sx={{
                                justifyContent: 'space-between',
                                }}
                            >
                                <Tooltip
                                    title={category[labelsManageStock.category_name]}
                                    disableHoverListener={category[labelsManageStock.category_name]?.length <= 9}
                                    arrow
                                    key={category.id}
                                    placement="right"
                                    PopperProps={{
                                        modifiers: [{
                                            name: 'offset',
                                            options: {offset: [0, -8]},
                                        },],
                                    }}
                                >
                                    <Box className={classes.menuItemContent} >
                                        {category[labelsManageStock.category_name]}
                                        
                                    </Box>
                                </Tooltip>
                            </MenuItem>
                        )}
                    </TextField>
                    <TextField  
                        label={labelsManageStock.sub_category}
                        size="small"
                        select
                        disabled={stockCategoryTemp ? false : true}
                        className={classes.inputMainData}
                        InputProps={{className: classes.inputClassName}}
                        value={stockSubCategoryTemp}
                        onChange={ (event:any) => onStockSubCategoryChange(event.target.value) }
                        SelectProps={{
                            MenuProps: {
                                PaperProps: {
                                    sx: {
                                        maxHeight: 200, // Set the desired max height
                                        maxWidth: 200,  // Set the desired max width
                                        overflowY: 'auto', // Show scrollbar on hover
                                        scrollbarColor: 'rgba(0, 0, 0, 0) rgba(0, 0, 0, 0)', // Adjust the color of the scrollbar
                                        scrollbarWidth: 'thin', // Hide scrollbar for Firefox
                                        '&:hover': {
                                            scrollbarColor: 'rgba(0, 0, 0, .3) rgba(0, 0, 0, 0)', // Adjust the color of the scrollbar
                                        },
                                    },
                                },
                            },
                        }}
                    >
                        {stockCategoryTemp ? 
                            stockCategoryTemp.sub_categories.map((subCategory: string, index: any) => 
                                <MenuItem 
                                    key={index} 
                                    value={subCategory}
                                    sx={{ justifyContent: "space-between" }}
                                >
                                    <Tooltip
                                        title={subCategory}
                                        disableHoverListener={subCategory.length <= 9}
                                        arrow
                                        key={index}
                                        placement="right"
                                        PopperProps={{
                                            modifiers: [{
                                                name: 'offset',
                                                options: {offset: [0, -8]},
                                            },],
                                        }}
                                    >
                                        <Box className={classes.menuItemContent}>
                                            {subCategory}
                                        </Box>
                                    </Tooltip>
                                </MenuItem> 
                            )
                        : 
                            <MenuItem></MenuItem>
                        }
                    </TextField>
                </Box>  */}
                <Box className={classes.customBoxRow}>
                    <TextField 
                        label={labelsManageStock.category}
                        size="small"
                        select
                        className={classes.inputMainData}
                        InputProps={{className: classes.inputClassName}}
                        value={stockCategoryTemp?.id || ''} // Ensure the value corresponds to the category ID
                        onChange={ (event:any) => onStockCategoryChange(event.target.value) }
                        SelectProps={{
                            MenuProps: {
                                PaperProps: {
                                    sx: {
                                        maxHeight: 200, // Set the desired max height
                                        maxWidth: 200,  // Set the desired max width
                                        overflowY: 'auto', // Show scrollbar on hover
                                        scrollbarColor: 'rgba(0, 0, 0, 0) rgba(0, 0, 0, 0)', // Adjust the color of the scrollbar
                                        scrollbarWidth: 'thin', // Hide scrollbar for Firefox
                                        '&:hover': {
                                            scrollbarColor: 'rgba(0, 0, 0, .3) rgba(0, 0, 0, 0)', // Adjust the color of the scrollbar
                                        },
                                    },
                                },
                            },
                        }}
                    >
                        {categoryArray.map((category:any) => 
                            <MenuItem
                                key={category.id}
                                value={category.id}
                                sx={{
                                justifyContent: 'space-between',
                                }}
                            >
                                <Tooltip
                                    title={category[labelsManageStock.category_name]}
                                    disableHoverListener={category[labelsManageStock.category_name]?.length <= 9}
                                    arrow
                                    key={category.id}
                                    placement="right"
                                    PopperProps={{
                                        modifiers: [{
                                            name: 'offset',
                                            options: {offset: [0, -8]},
                                        },],
                                    }}
                                >
                                    <Box className={classes.menuItemContent} >
                                        {category[labelsManageStock.category_name]}
                                        
                                    </Box>
                                </Tooltip>
                            </MenuItem>
                        )}
                    </TextField>
                    <TextField  
                        label={labelsManageStock.sub_category}
                        size="small"
                        select
                        // disabled={stockCategoryTemp ? false : true}
                        className={classes.inputMainData}
                        InputProps={{className: classes.inputClassName}}
                        value={stockSubCategoryTemp}
                        onChange={ (event:any) => onStockSubCategoryChange(event.target.value) }
                        SelectProps={{
                            MenuProps: {
                                PaperProps: {
                                    sx: {
                                        maxHeight: 200, // Set the desired max height
                                        maxWidth: 200,  // Set the desired max width
                                        overflowY: 'auto', // Show scrollbar on hover
                                        scrollbarColor: 'rgba(0, 0, 0, 0) rgba(0, 0, 0, 0)', // Adjust the color of the scrollbar
                                        scrollbarWidth: 'thin', // Hide scrollbar for Firefox
                                        '&:hover': {
                                            scrollbarColor: 'rgba(0, 0, 0, .3) rgba(0, 0, 0, 0)', // Adjust the color of the scrollbar
                                        },
                                    },
                                },
                            },
                        }}
                    >
                        {
                            
                            // categorySubArray.map((subCategory: any, index: any) => 
                            stockCategorySubTemp.map((subCategory: any, index: any) => 
                                <MenuItem 
                                    key={index} 
                                    value={subCategory.name}
                                    sx={{ justifyContent: "space-between" }}
                                >
                                    <Tooltip
                                        title={subCategory.name}
                                        disableHoverListener={subCategory.length <= 9}
                                        arrow
                                        key={index}
                                        placement="right"
                                        PopperProps={{
                                            modifiers: [{
                                                name: 'offset',
                                                options: {offset: [0, -8]},
                                            },],
                                        }}
                                    >
                                        <Box className={classes.menuItemContent}>
                                            {subCategory.name}
                                        </Box>
                                    </Tooltip>
                                </MenuItem> 
                            )
                        
                        }
                    </TextField>
                </Box> 
                


                <Box className={`${classes.customBoxRow} ${classes.customBoxRowArrowButton} `}>
                    <div className={classes.customBoxCenter}>
                        <Typography align="left" sx={{ width: "169px" }}></Typography>
                        <Typography align="right" sx={{ width: "95px" }}>{labelsManageStock.secondary_data}</Typography>
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