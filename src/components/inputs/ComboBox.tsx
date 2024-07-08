import * as React from 'react'
import { useState, useContext, useEffect, useRef } from "react";
import {TextField} from '@mui/material'
import AutoComplete from '@mui/material/Autocomplete'
import { useStylesGlobal } from '../../Styles';

interface Option {
    label: string,
    // user_email?: string,
    // pass?: string,
}

interface ComboBoxProps {
    optionsData: Option[]
    comboLabel: string;
    comboValue: string ;
    comboHandleValue: (value: string) => void;
    errorTextField: boolean
}

// export default function ComboBox() {
export default function ComboBox({ optionsData, comboLabel, comboValue, comboHandleValue, errorTextField }: ComboBoxProps) {
    const { classes } = useStylesGlobal();
    const [selectedValue, setSelectedValue] = React.useState<{ label: string }>({label:""});
    const [inputValue, setInputValue] = React.useState('');
    const firstInputRef = useRef<HTMLInputElement>(null)
    const isOptionEqualToValue = (option: any, value: any) => option.label === value?.label;
    // React.useEffect(() => {
    useEffect(() => {
        if(optionsData){
            // const foundOption = optionsData.find((option) => isOptionEqualToValue(option, selectedValue));
            if (comboValue ) {
                setInputValue(comboValue);
                setSelectedValue({label:""});
            }
        }
    }, [comboValue, selectedValue, isOptionEqualToValue]);
    useEffect(() => {
        
        if (firstInputRef.current) {
            // console.log("[] firstInputRef.current: ", firstInputRef.current)
            firstInputRef.current.focus()
        }
    }, [])
    return (
        <AutoComplete
            disablePortal
            disableClearable={true}
            id="combo-box-demo"
            options={optionsData}
            sx={{ width: 300 }}
            value={selectedValue}
            inputValue={inputValue}
            onChange={(event:any, newValue:any) => {
                setSelectedValue(newValue);
                // console.log("newValue: ", newValue)
                if (newValue) {
                    comboHandleValue(newValue.label);
                }
            }}
            onInputChange={(event:any, newInputValue:any) => {
                setInputValue(newInputValue);
            }}
            getOptionLabel={(option: any) => option.label || inputValue}
            isOptionEqualToValue={isOptionEqualToValue}
            freeSolo 
            renderInput={(params: any) => 
                <TextField 
                    value={comboValue}
                    {...params} 
                    label={comboLabel}
                    onChange={ (event:any) => comboHandleValue(event.target.value) }
                    maxRows={1}
                    size="small"
                    className={`${errorTextField ? classes.text_field_error : ""} ${classes.inputMainData} `}
                    InputProps={{
                        className: classes.inputClassName,
                    }}
                    inputRef={firstInputRef}
                />
            }
            ListboxProps={{ style: { maxHeight: 100 } }}
        />
    )
}