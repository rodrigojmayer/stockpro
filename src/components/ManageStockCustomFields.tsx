import React, { useState, useRef, useEffect } from 'react';
import { Box,
         TextField,
         Typography,
         useMediaQuery,
        } from '@mui/material';
import { UpButton } from './Buttons';
import { useStylesGlobal } from '../Styles'
import { ColumnData, ColumnDataCustom } from '../types';

interface ChildProps {
    hiddenPanel:  boolean
    openOptionsCreate: (newData: string )=> void
    columnsCustom: ColumnData[] 
    stockCustomValuesTemp: object
    onStockCustomValuesTemp: (newData: string, name:string )=> void
}

export default function ManageStockCustomFields(
    {   hiddenPanel, 
        openOptionsCreate,
        columnsCustom,
        stockCustomValuesTemp,
        onStockCustomValuesTemp,
    }: ChildProps )  {
        
    const breakpointLG = useMediaQuery('(min-width:1024px)');
    const { classes } = useStylesGlobal();
    const firstInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (!hiddenPanel) {
            if (firstInputRef.current) {
                firstInputRef.current.focus()
            }
        }
    }, [hiddenPanel])

    const close = () => {}
    const handleCloseSaveChanges = (ans?:boolean) => {
        if(ans){
            close()
        }
        setOpenSaveChanges(false);
    }
    const columns: ColumnData[] = columnsCustom;
    const columnsCustomNew: ColumnDataCustom[] = columnsCustom
    .map((obj) => {
        return {...obj, okButtonShow: false, fieldRepeatedShow: false}
    });
    const [measure, setMeasure] = useState('');
    const [measureTemp, setMeasureTemp] = useState('');
    const [category, setCategory] = useState('');
    const [categoryTemp, setCategoryTemp] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [subCategoryTemp, setSubCategoryTemp] = useState('');
    const [customFields, setCustomFields] = useState<ColumnDataCustom[]>(columnsCustomNew) 
    const [customFieldsTemp, setCustomFieldsTemp] = useState<ColumnDataCustom[]>(columnsCustomNew) 
    const [customFieldsNew, setCustomFieldsNew] = useState<ColumnDataCustom[]>(columnsCustomNew)
    const [customFieldsNewTemp, setCustomFieldsNewTemp] = useState<ColumnDataCustom[]>(columnsCustomNew)
    const [addButtonShow, setAddButtonShow] = useState<boolean>(true)
    const [openSaveChanges, setOpenSaveChanges] = useState(false);  
    const handleOpenSaveChanges = () => setOpenSaveChanges(true);
    const handleEditCustomFieldNew = (event: React.ChangeEvent<HTMLInputElement>) => {
        const index = customFieldsNewTemp.findIndex((field: { id: number }) => field.id === Number(event.currentTarget.id))
        const updateFieldsNew = JSON.parse(JSON.stringify(customFieldsNewTemp))
        updateFieldsNew[index].label = event.currentTarget.value
        const updateDefectFieldsRepeated = columns.filter((col) => {
            if(((col.label).toLowerCase()) == (event.currentTarget.value).toLowerCase() && !col.deleted && col.id !== updateFieldsNew[index].id)
                return col
        })
        const updateCustomFieldsRepeated = customFieldsNew.filter((col) => {
            if(((col.label).toLowerCase()) == (event.currentTarget.value).toLowerCase() && !col.deleted && col.id !== updateFieldsNew[index].id)
                return col
        })
        const updateCustomFieldsTempRepeated = customFieldsNewTemp.filter((col) => {
            if(((col.label).toLowerCase()) == (event.currentTarget.value).toLowerCase() && !col.deleted && col.id !== updateFieldsNew[index].id)
                return col
        })
        if(updateDefectFieldsRepeated[0] || updateCustomFieldsRepeated[0] || updateCustomFieldsTempRepeated[0]){
            updateFieldsNew[index].fieldRepeatedShow = true
            updateFieldsNew[index].okButtonShow = false
            setAddButtonShow(false)
        }else{
            updateFieldsNew[index].fieldRepeatedShow = false
            setAddButtonShow(true)
            if(customFieldsTemp[index]){
                if(updateFieldsNew[index].label == customFieldsTemp[index].label || updateFieldsNew[index].label == ''){
                    updateFieldsNew[index].okButtonShow = false
                    setAddButtonShow(true)
                }
                else{
                    updateFieldsNew[index].okButtonShow = true
                    setAddButtonShow(false)
                }
            }else if(updateFieldsNew[index].label !='' ){
                updateFieldsNew[index].okButtonShow = true
                setAddButtonShow(false)
            }else if (updateFieldsNew[index].label ==='' ){
                updateFieldsNew[index].okButtonShow = false
                setAddButtonShow(true)
            }
        }
        setCustomFieldsNewTemp(updateFieldsNew)
    }
    const saveCustomField = (id:number, label: string) => {
        const updateFields = [...customFieldsTemp.map(obj => ({ ...obj }))]
        const updateFieldsNew = [...customFieldsNewTemp.map(obj => ({ ...obj }))]
        let index = customFieldsTemp.findIndex(field => field.id === id)
        if(index !== -1){
            updateFields[index].label = label
        }else{
            index = customFieldsNewTemp.findIndex(field => field.id === id)
            const fieldsToOmit = ['okButtonShow']
            const newObj = Object.assign({}, customFieldsNewTemp[index])
            fieldsToOmit.forEach(field => delete newObj[field as keyof ColumnDataCustom])
            updateFields.push(newObj)
        }
        setCustomFieldsTemp(updateFields)
        updateFieldsNew[index].okButtonShow = false
        setAddButtonShow(true)
        setCustomFieldsNewTemp(updateFieldsNew)
    }
    const deleteField = (id:number) => {
        const updateFields = [...customFieldsTemp.map(obj => ({ ...obj }))]
        const updateFieldsNew = [...customFieldsNewTemp.map(obj => ({ ...obj }))]
        let index = customFieldsTemp.findIndex(field => field.id === id)
        if (index !== -1) {
            updateFields[index].deleted = true
            setCustomFieldsTemp(updateFields)
            updateFieldsNew[index].deleted = true
        } else {
            index = customFieldsNewTemp.findIndex(field => field.id === id)
            updateFieldsNew.splice(index, 1)
        }
        setCustomFieldsNewTemp(updateFieldsNew)
    }
    const handleHiddenOptions = (changeTo:string) =>  {
        openOptionsCreate(changeTo)
    }
    const containerRef = useRef<HTMLDivElement | null>(null);// Create a ref for the Box element and manage the scroll
    const [isScrollbarVisible, setIsScrollbarVisible] = useState(false);

    useEffect(() => {
        const box = containerRef.current;
        if (box) { 
            setIsScrollbarVisible(box.scrollHeight > box.clientHeight);
        }
    }, [hiddenPanel]); // Include containerRef.current as a dependency to re-run the effect whenever it changes

    return (
        <div
        hidden= {hiddenPanel}
        >
            <Typography align='center' variant='h6'>Custom fields</Typography>
            <Box 
                ref={containerRef}    
                className={`${classes.customBoxColumn} ${classes.customBoxColumnCustomFields} ${breakpointLG ? classes.scrollBarHide : ""} ${ isScrollbarVisible ? "" : classes.scrollBarHideInsufficientHeight }`}
            >
                {customFieldsNewTemp.map((cusField: ColumnDataCustom, index: number) => {
                    // if (!cusField.deleted) {
                        return (
                            <Box className={classes.customBoxRow}
                                key={cusField.id}
                            >
                                <TextField
                                    label={cusField.label}
                                    size="small"
                                    className={`${classes.inputMainData} ${classes.inputMainDataMargin}`}
                                    value={stockCustomValuesTemp[cusField.dataKey as keyof typeof stockCustomValuesTemp] || ''}
                                    onChange={ (event:any) => onStockCustomValuesTemp(event.target.value, cusField.dataKey) }
                                    InputProps={{
                                        style: { borderRadius: 10 },
                                        inputProps: { maxLength: 30 }
                                    }}
                                    // inputRef={(index===0 ? input => input && input.focus() : "")}
                                    // inputRef={index===0 ? input => input && input.focus() : undefined}
                                    inputRef={index===0 ? firstInputRef : undefined}
                                />
                            </Box>
                        )
                    // }
                })}
            </Box>
            <Box className={`${classes.customBoxRow} ${classes.customBoxRowArrowButton} `}>
                <div className={classes.customBoxCenter}>
                    <UpButton
                        direction="left"
                        clicked={() => handleHiddenOptions("alerts")}
                    />
                    <Typography align="left" sx={{ width: "95px" }}>Alerts</Typography>
                <Typography align="right" sx={{ width: "169px" }}></Typography>
                </div>
            </Box>
        </div>
    )
}