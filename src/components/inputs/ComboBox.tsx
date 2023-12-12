import * as React from 'react'
import { useState, useContext, useEffect } from "react";
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
    //   console.log("optionsData: ", optionsData)
    // const [errorTextFields, setErrorTextFields] = useState({
    //     "user_name_email": false,
    //     "user_pass": false,
    // });
    // const [ inputText, setInputText ] = useState<string>("")

    // const handleInput = (value: string) => {
    //     setInputText
    // }
    const [selectedValue, setSelectedValue] = React.useState<{ label: string }>({label:""});
    const [inputValue, setInputValue] = React.useState('');

    const isOptionEqualToValue = (option: any, value: any) => option.label === value?.label;
    // React.useEffect(() => {
    //     if (comboValue) {
    //         setSelectedValue({ label: comboValue });
    //     }
    // }, [comboValue]);
    React.useEffect(() => {
        if(optionsData){

            const foundOption = optionsData.find((option) => isOptionEqualToValue(option, selectedValue));
            if (comboValue && !foundOption) {
                setInputValue(comboValue);
                setSelectedValue({label:""});
            }
        }
    }, [comboValue, selectedValue, isOptionEqualToValue]);

    return (
        <AutoComplete
            disablePortal
            disableClearable={true}
            id="combo-box-demo"
            // options={optionsData || [{"label": ""}]}
            options={optionsData}
            sx={{ width: 300 }}
            // isOptionEqualToValue={(label, comboValue) => label === comboValue}
            // isOptionEqualToValue={(option: any, value: any) => option.label === value.label}
            // value={{"label": comboValue}}
            value={selectedValue}
            inputValue={inputValue}
            onChange={(event, newValue:any) => {
                setSelectedValue(newValue);
                console.log("newValue: ", newValue)
                if (newValue) {
                    // console.log("newValue.label: ", newValue.label)
                    comboHandleValue(newValue.label);
                }
            }}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            getOptionLabel={(option: any) => option.label}
            isOptionEqualToValue={isOptionEqualToValue}
            freeSolo 
            // isOptionEqualToValue={(option, value) => option.label === value.label}
            renderInput={(params: any) => 
                <TextField 
                    value={comboValue}
                    {...params} 
                    label={comboLabel}
                    onChange={ (event) => comboHandleValue(event.target.value) }
                    maxRows={1}
                    size="small"
                    className= {`${errorTextField ? classes.text_field_error : ""} ${classes.inputMainData} `}
                    // InputProps={{
                    //     className: classes.inputClassName,
                    //   }}
                />
            }
        />
    )
}




// const optionsData = [
//     {label: 'The Shawshank Redemption'},
//     {label: 'test'},
//     {label: 'The Dark Knight'},
// ]