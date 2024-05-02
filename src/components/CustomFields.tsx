import { useState, useEffect, useContext, useRef } from 'react'
import { Box,
         Container,
         Grid,
         IconButton,
         Modal, 
         TextField,
         Typography,
         useMediaQuery,
        } from '@mui/material';
import Paper from '@mui/material/Paper/Paper';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"

import { OkButton,
         CancelButton, 
         PlusButton,
        } from './Buttons';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import ControlPointTwoToneIcon from '@mui/icons-material/ControlPointTwoTone';
import EditIcon from '@mui/icons-material/Edit';
import List from '@mui/material/List/List';
import IonTrash from "../assets/ion_trash.svg";
import SaveChanges from './SaveChanges';
import { ColumnData, ColumnDataCustom, ChildProps } from '../types';
import { useStylesGlobal, modalStyleExternal, modalStyleInternal } from '../Styles'
import { ColumnsContext } from '../context/ColumnsContext';
import { UserContext } from '../context/UserContext';
import { IsLoadingContext } from '../context/IsLoadingContext'
import { CheckListStockContext } from '../context/CheckListStockContext';
import { gridFilterActiveItemsLookupSelector } from '@mui/x-data-grid-premium';


export default function Fields(
    {   open, 
        handleClose, 
    }: ChildProps) {
        
    // const breakpointLG = useMediaQuery('(min-width:1024px)');
    const breakpointMD = useMediaQuery('(min-width: 724px)');
 
    const { classes } = useStylesGlobal()
    const close = () => {
        handleClose(false)
    } 
    const { isLoading, setIsLoading, openBackdrop, setOpenBackdrop } = useContext<any>(IsLoadingContext)
    const { user, setUser } = useContext<any>(UserContext); 
    const { columns, defaultColumns, customColumns, setCustomColumns, columnsUserOrder, setColumnsUserOrder, filteredColumnsCustom, setFilteredColumnsCustom  } = useContext<any>(ColumnsContext);
    const { checkListStock, setCheckListStock } = useContext<any>(CheckListStockContext)

    const [orderedFields, setOrderedFields] = useState<ColumnData[]>([]) 
    const [unsetFields, setUnsetFields] = useState<ColumnData[]>([]) 
    const [customFields, setCustomFields] = useState<ColumnDataCustom[]>([]) 
    const [customFieldsNew, setCustomFieldsNew] = useState<ColumnDataCustom[]>([])
    const [addButtonShow, setAddButtonShow] = useState<boolean>(true)
    const [openSaveChanges, setOpenSaveChanges] = useState<boolean>(false);  
     
    const handleEditCustomFieldNew = (event: React.ChangeEvent<HTMLInputElement>) => {
        const index = customFieldsNew.findIndex((field: { id: number }) => field.id === Number(event.currentTarget.id))
        if(index !== -1) {
            const updateFieldsNew = JSON.parse(JSON.stringify(customFieldsNew))
            updateFieldsNew[index].label = event.currentTarget.value
            const updateDefectFieldsRepeated = columns.filter((col: any) => {
                    if(((col.label).toLowerCase()) == (event.currentTarget.value).toLowerCase() && col.id !== updateFieldsNew[index].id)
                        return col
            }) 
            const updateCustomFieldsRepeated = customFieldsNew.filter((col) => {
                if(!col.deleted){
                    if(((col.label).toLowerCase()) == (event.currentTarget.value).toLowerCase() && col.id !== updateFieldsNew[index].id)
                        return col
                }
            })
            if(updateDefectFieldsRepeated[0] || updateCustomFieldsRepeated[0] ){
                updateFieldsNew[index].fieldRepeatedShow = true
                updateFieldsNew[index].okButtonShow = false
                updateFieldsNew[index].pre_saved = gridFilterActiveItemsLookupSelector
            } else {
                updateFieldsNew[index].fieldRepeatedShow = false
                if(customFields[index]){
                    if(updateFieldsNew[index].label == customFields[index].label || updateFieldsNew[index].label == ''){
                        updateFieldsNew[index].okButtonShow = false
                        updateFieldsNew[index].pre_saved = false
                        setAddButtonShow(true)
                    }
                    else{
                        updateFieldsNew[index].okButtonShow = true
                        updateFieldsNew[index].pre_saved = false
                    }
                }else if(updateFieldsNew[index].label !='' ){
                    updateFieldsNew[index].okButtonShow = true
                    updateFieldsNew[index].pre_saved = false
                }else if (updateFieldsNew[index].label ==='' ){
                    updateFieldsNew[index].okButtonShow = false
                }
            }
            setCustomFieldsNew(updateFieldsNew)
        }
    }

    const preSaveCustomField = (_id:number, id:number, label: string) => {
        const updateFields = [...customFields.map(obj => ({ ...obj }))]
        const updateFieldsNew = [...customFieldsNew.map(obj => ({ ...obj }))]
        const updateOrderedFieldsTemp = [...orderedFields.map((obj: any) => ({ ...obj }))]
        const updateUnsetFields = [...unsetFields.map(obj => ({ ...obj }))]
        let index = customFields.findIndex(field => field.id === id)
        let indexOrdered = orderedFields.findIndex((field: any) => field.id === id)
        let indexUnset = unsetFields.findIndex(field => field.id === id)
        if(index !== -1){
            updateFields[index].label = label
            if(indexOrdered !== -1){
                updateOrderedFieldsTemp[indexOrdered].label = label
                setOrderedFields(updateOrderedFieldsTemp)
            }
            if(indexUnset !== -1){
                updateUnsetFields[indexUnset].label = label
                updateUnsetFields.sort((a,b) => (a.label.toLowerCase() > b.label.toLowerCase()) ? 1 : ((b.label.toLowerCase() > a.label.toLowerCase()) ? -1 : 0))
                setUnsetFields(updateUnsetFields)
            }
        }else{
            index = customFieldsNew.findIndex(field => field.id === id)
            const fieldsToOmit = ['okButtonShow']
            const newObj = Object.assign({}, customFieldsNew[index])
            fieldsToOmit.forEach(field => delete newObj[field as keyof ColumnDataCustom])
            updateFields.push(newObj)
            updateUnsetFields.push(newObj)
            updateUnsetFields.sort((a,b) => (a.label.toLowerCase() > b.label.toLowerCase()) ? 1 : ((b.label.toLowerCase() > a.label.toLowerCase()) ? -1 : 0))
            setUnsetFields(updateUnsetFields)
        }
        setCustomFields(updateFields)
        updateFieldsNew[index].okButtonShow = false
        updateFieldsNew[index].pre_saved = true
        if(_id)
            updateFieldsNew[index].edited = true
        setCustomFieldsNew(updateFieldsNew)
    }

    const deleteField = (_id:any, id:number) => {
        const updateFields = [...customFields.map(obj => ({ ...obj }))]
        const updateFieldsNew = [...customFieldsNew.map(obj => ({ ...obj }))]
        const updateOrderedFieldsTemp = [...orderedFields.map((obj: any) => ({ ...obj }))]
        const updateUnsetFieldsTemp = [...unsetFields.map(obj => ({ ...obj }))]
        let index = customFields.findIndex(field => field.id === id)
        let indexOrdered = orderedFields.findIndex((field: any) => field.id === id)
        let indexUnset = unsetFields.findIndex(field => field.id === id)
        if (index !== -1) {
            updateFields[index].deleted = true
            setCustomFields(updateFields)
            updateFieldsNew[index].deleted = true
            if(indexOrdered !== -1){
                updateOrderedFieldsTemp[indexOrdered].deleted = true
                setOrderedFields(updateOrderedFieldsTemp)
            }
            if(indexUnset !== -1){
                updateUnsetFieldsTemp[indexUnset].deleted = true
                setUnsetFields(updateUnsetFieldsTemp)
            }
        } else {
            index = customFieldsNew.findIndex(field => field.id === id)
            updateFieldsNew.splice(index, 1)

        }
        if(_id)
            updateFieldsNew[index].edited = true
        setCustomFieldsNew(updateFieldsNew)
    }
    
    const containerRef = useRef<HTMLDivElement | null>(null);   // Create a ref for the Box element and manage the scroll
    const lastInputRef = useRef<HTMLDivElement | null>(null);   //  Create a ref for the focus after add a new input
    const addInputCustomField = async() => {
        const lastObj = customFieldsNew.length ? customFieldsNew[customFieldsNew.length - 1] : customColumns[customColumns.length - 1]
        const nextId = lastObj? lastObj.id + 1 : 1
        const updateFieldsNew = [...customFieldsNew, {id:nextId, dataKey: "", label: "", width: 100, id_client: user.id_client, deleted: false, okButtonShow: false, fieldRepeatedShow:false, pre_saved: false}]

        await setCustomFieldsNew(updateFieldsNew)
        
        if (containerRef.current) { // To scroll to the bottom to add a new input custom field 
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        } 
        if (lastInputRef.current) {
            lastInputRef.current.focus();
        }
    }
    
    const [isScrollbarVisible, setIsScrollbarVisible] = useState(false);
    
    const handleCloseSaveChanges = (ans?:boolean) => {
        if(ans){            
        /////////// Should I check if there have been any changes in the custom columns before or is it already checking that?
            customFieldsNew.forEach((obj) => { 
                if(obj._id) {
                    const fetchEditCustomColumn = async () => {
                        let loadingSuccess: boolean = false
                        try {
                            const response = await fetch(`${import.meta.env.VITE_API_URL_BACKEND}/customColumns/${obj._id}/`, {
                                method: 'PATCH',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    label: obj.label,
                                    deleted: obj.deleted
                                })
                            })
                            if (response.ok) {
                                loadingSuccess = true
                            } else {
                                console.error('Update failed.');
                            }
                        }catch (error:any) {
                            // Handle the case where the response is not OK (e.g., show an error message)
                                
                        } finally {
                            setIsLoading((prevLoading: any) => ({
                                ...prevLoading,
                                fieldsFetchEditCustomColumn: loadingSuccess,
                            }));
                            setCheckListStock([])
                        }
                    }
                    if(obj.edited) 
                        fetchEditCustomColumn()
                     
                } else if(!obj.deleted){    // To avoid fields created and deleted in the moment
                    const fetchCreateCustomColumn = async () => {
                        let loadingSuccess: boolean = false
                        try {
                            const response = await fetch(`${import.meta.env.VITE_API_URL_BACKEND}/customColumns/`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json', // Set the appropriate content-type for my API
                                    // Add any other required headers here
                                },
                                body: JSON.stringify({
                                    "id": obj.id, 
                                    "width": 100, 
                                    "label": obj.label, 
                                    "dataKey": obj.label.toLowerCase(),  
                                    "id_client": obj.id_client, 
                                    "deleted": false
                                })
                            })
                            // Check if the response status is successful (2xx range)
                            if (response.ok) {
                                loadingSuccess = true
                            } else {
                                // Handle non-successful responses (e.g., 4xx or 5xx status codes)
                                console.error('Request failed: ', response.status, response.statusText)
                                // Handle the error here
                            }
                        } catch (error: unknown) {
                            if (typeof error === 'string') {
                                // 'error' is now narrowed down to type 'string'
                                console.error('Error:', error);
                            } else if (error instanceof Error) {
                                // 'error' is now narrowed down to type 'Error'
                                console.error('Error object:', error.message);
                            } else {
                                // Handle other cases as needed
                            }
                        } finally {
                            setIsLoading((prevLoading: any) => ({
                                ...prevLoading,
                                fieldsFetchCreateCustomColumn: loadingSuccess,
                            }));
                            setCheckListStock([])
                        }
                    }
                    fetchCreateCustomColumn()
                }
                // close()
            })
            
            const array_ordered_fields = orderedFields.map((col)=>col.id)
            if(JSON.stringify(user.ordered_fields) !== JSON.stringify(array_ordered_fields)){
                const fetchEditUsersFieldsOrder = async () => {
                    let loadingSuccess: boolean = false
                    try {
                        const response = await fetch(`${import.meta.env.VITE_API_URL_BACKEND}/users/${user._id}/`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                ordered_fields: array_ordered_fields
                            })
                        })
                        if (response) {
                            loadingSuccess = true
                        } else {
                            console.error('Update failed.')
                        }
                    } catch (error) {
                        // Handle the case where the response is not OK (e.g., show an error message)
                    } finally {
                        setIsLoading((prevLoading: any) => ({
                            ...prevLoading,
                            fieldsFetchEditUsersFieldsOrder: loadingSuccess,
                        }));
                        setCheckListStock([])
                    }
                }
                fetchEditUsersFieldsOrder()
            }
            close()
        }
        setOpenSaveChanges(false);
    }
    const handleOpenSaveChanges = () => {
        setOpenSaveChanges(true);
    }

    useEffect(() => {
        const columnsHiddenFields =  columns.filter((col: any) => {
            if(!columnsUserOrder.includes(col))
            return col
        })
        const ColumnsCustom: ColumnDataCustom[] = filteredColumnsCustom
        .map((obj:any) => ({...obj, okButtonShow: false, fieldRepeatedShow: false, pre_saved: true}));
        
        setOrderedFields(columnsUserOrder)
        columnsHiddenFields.sort((a:any,b:any) => (a.label.toLowerCase() > b.label.toLowerCase()) ? 1 : ((b.label.toLowerCase() > a.label.toLowerCase()) ? -1 : 0))
        setUnsetFields(columnsHiddenFields)
        setCustomFields(ColumnsCustom)
        setCustomFieldsNew(ColumnsCustom.sort((a:any,b:any) => ((b.id > a.id) ? -1 : 0)))
    }, [open])
    
    useEffect(() => {
        const box = containerRef.current;
        if (box) {
        setIsScrollbarVisible(box.scrollHeight > box.clientHeight);
        }
    }, [containerRef.current]); // Include containerRef.current as a dependency to re-run the effect whenever it changes

    useEffect(() => {
        if(customFieldsNew.find((obj) => { if(obj.pre_saved==false && obj.deleted==false)  return true})){
            setAddButtonShow(false)  
        } else {
            setAddButtonShow(true)
        }
        const box = containerRef.current;
        if (box) {
            setIsScrollbarVisible(box.scrollHeight > box.clientHeight);
        }
    }, [customFieldsNew])
    
    return (
        <Modal
            sx={{backgroundColor: 'rgba(0, 0, 0, .5)'}}
            open={open} 
            onClose={close}
        >
            <form
                onKeyDown={(e:any) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        handleOpenSaveChanges();
                        e.stopPropagation();
                    }
                }} 
            >
                <Box sx={modalStyleExternal}>
                    <Box sx={modalStyleInternal}>
                        <SaveChanges
                            openSaveChanges={openSaveChanges}
                            closeSaveChanges={handleCloseSaveChanges} 
                        />
                        <Typography align="center" variant="h5" className={classes.title}>
                            Custom fields
                        </Typography>
                        {user.id_access_level <4 ? 
                            <Box 
                                ref={containerRef} 
                                className={`${classes.customBoxColumn} ${classes.customBoxColumnCustomFields} ${breakpointMD ? classes.scrollBarHide : ""} ${ isScrollbarVisible ? "" : classes.scrollBarHideInsufficientHeight }`}
                            >
                                    {customFieldsNew.map((cusField: ColumnDataCustom) => {
                                        if (!cusField.deleted) {
                                            return (
                                                <Box className={classes.customBoxRow}
                                                    key={cusField.id}
                                                >
                                                    <TextField
                                                        id={String(cusField.id)}
                                                        // id={column.dataKey.toString()}
                                                        // id="filled-multiline-flexible"
                                                        inputRef={lastInputRef}
                                                        value={cusField.label}
                                                        // onChange={handleFilterChange}
                                                        onChange={ handleEditCustomFieldNew }
                                                        maxRows={1}
                                                        size="small"
                                                        className={classes.newCustomField}
                                                        InputProps={{
                                                            style: {
                                                                // height:"36px",
                                                                borderRadius: 10,
                                                            },
                                                            inputProps: {maxLength: 15}, 
                                                        }}
                                                    />
                                                    <div className={classes.customBoxCenter}> 
                                                        <IconButton
                                                            className={classes.ionTrash}
                                                            onClick={() => deleteField(cusField._id, cusField.id)}
                                                            // id="plusButton"
                                                            // value={column.id}
                                                        >
                                                            <img 
                                                            src={IonTrash} 
                                                            alt="Trash"
                                                            />
                                                        </IconButton>
                                                    </div>
                                                    {/* className={`${classes.customBoxRow} ${classes.customBoxRowArrowButton} `} */}
                                                    <div className={`${classes.customBoxCenter} ${classes.hideShowSpace} `}> 
                                                    {/* <div className={classes.customBoxCenter}>  */}
                                                        {/* <div className={classes.hideShowSpace}> */}
                                                        <div className={cusField.okButtonShow ? classes.show : classes.hide}>
                                                            <OkButton
                                                                sizeIco={"34px"}
                                                                roundedIco={true}
                                                                cusField = {{id: cusField.id, value: cusField.label}}
                                                                clicked={() => preSaveCustomField(cusField._id, cusField.id, cusField.label)}
                                                            />
                                                        </div>
                                                        <div className={cusField.fieldRepeatedShow ? classes.show : classes.hide}>
                                                            Field repeated
                                                        {/* </div> */}
                                                        </div>
                                                    </div>
                                                </Box>
                                            )
                                        }
                                    })}
                            </Box>
                        :""}
                        <Box className={`${classes.customBoxRow} ${classes.customBoxRowHideSpace}`}>
                            <div className={(addButtonShow? "" : classes.hide)}>
                            <PlusButton
                                sizeIco={"45px !important"}
                                clicked={addInputCustomField}
                            />
                            </div>
                        </Box>
                        <Box className={classes.finishButtons}>
                            <CancelButton
                            clicked={() => close()}
                            />
                            <OkButton
                            clicked={() => handleOpenSaveChanges()}
                            // submitOk={true}
                            />
                        </Box>
                    </Box>
                </Box>
            </form>
        </Modal>
    )
}