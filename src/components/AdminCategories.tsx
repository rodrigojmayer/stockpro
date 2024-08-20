import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from 'tss-react/mui';
import { Box,
         Container,
         Grid,
         IconButton,
         Modal,
         TextField,
         Typography,
         OutlinedInput,
         InputLabel,
         MenuItem,
         Select,
         FormControl,
         Stack,
         Chip,
         Button,
         TableCell,
         Tooltip,
         tooltipClasses,
         TableContainer,
         Table,
         TableHead, 
         TableRow, 
         TableBody
        } from '@mui/material';
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import Paper from '@mui/material/Paper/Paper';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"

import { OkButton,
         CancelButton, 
         PlusButton,
         AddButton,
        } from './Buttons';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import ControlPointTwoToneIcon from '@mui/icons-material/ControlPointTwoTone';
import EditIcon from '@mui/icons-material/Edit';
import List from '@mui/material/List/List';
import IonTrash from "../assets/ion_trash.svg";
import SaveChanges from './SaveChanges';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { useStylesGlobal, modalStyleExternal, modalStyleInternal } from '../Styles'
import { ColumnDataCategories, ColumnDataCustom, ChildProps, UserEditData, Data } from '../types';
import { UserContext } from '../context/UserContext';
import { IsLoadingContext } from '../context/IsLoadingContext';
import { LanguageLabelsContext } from '../context/LanguageLabelsContext';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ErrorModal from './ErrorModal';
import { UsersContext } from '../context/UsersContext';
import ManageUser from './ManageUser';
import { CheckListStockContext } from '../context/CheckListStockContext';
import { TableComponents, TableVirtuoso } from 'react-virtuoso';
import { CategoriesSubContext } from '../context/CategoriesSubContext';
import { CategoriesContext } from '../context/CategoriesContext';


const VirtuosoTableComponents: TableComponents<Data> = {
    Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
    ),
    TableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
    TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };
  
  // const { classes } = useStylesGlobal()
  // function rowContent(_index: number, row: Data, columns: ColumnData[], classes: TableClasses) {
    // function rowContent(_index: number, row: Data, columns: ColumnData[], classes: any, openUpdateAmountStock:(newData: ProductUpdateData) => void) {
  function rowContent(_index: number, row: Data, columns: ColumnDataCategories[], classes: any, user_background_color: any) {
    let newRow = { ...row } // Create a copy of the item to add in the same level the custom_fields
    console.log("newRow: ", newRow)
    const RowContent = (item:any) => {
        let lab
        if (item.column._id === 1){
            return(
                <TextField
                    // key="password"
                    sx= {{
                        margin: "0 auto",
                        width: "90% !important",
                    }}
                    maxRows={1}
                    size="small"
                //   type="number"
                    className={`${classes.inputMainData} `}
                    // value={valueUpdate!==null  ? Math.abs(valueUpdate):""}
                    value={newRow[item.column.dataKey]==="" ? newRow[item.column.dataKey] : Math.abs(newRow[item.column.dataKey])}
                    // onChange={ (event:any) => writeValue(event, newRow._id) }
                //   onChange={ () => console.log("testin") }
                    InputProps={{
                        className: classes.inputClassName,
                        inputMode: "numeric",
                        inputProps: {
                            style: { 
                            textAlign: "center", 
                            height: 20,
                            },
                        },
                    }}
                    inputRef={(_index===0  ? input => input && input.focus() : undefined)}
                />
            )
        } else {
            return(
                
              <Tooltip 
                title={newRow[item.column.dataKey]} 
                disableHoverListener={String(newRow[item.column.dataKey]).length <= 10}
                slotProps={{
                    popper: {
                    sx: {
                        [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
                        {
                            marginTop: '0px',
                            marginLeft: '5px',
                        },
                    }
                    }
                }}
              >
                    <Typography noWrap 
                        sx={{
                            // padding: "7.78px 4px",
                            padding: "1.4px 4px",
                        }}
                    >
                        {/* { ( newRow[item.column.dataKey] || newRow[item.column.dataKey] === 0 ) ? newRow[item.column.dataKey] : "-"} */}
                        {  newRow[item.column.name]}
                        {/* {  newRow[item.column]} */}
                        {/* {  "asdf"} */}
                    </Typography>
                </Tooltip>
            )
        }
    }
   
    return (
      <React.Fragment >
        {columns.map((column, index) => (
          <TableCell
            key={column._id}
            align='center'
            // className={`${ _index%2 ? classes._0table_row_odd  : classes._0table_row_even }`}
            className={`${ _index%2 ? classes[`_${user_background_color}table_row_odd` as keyof typeof classes]  : classes[`_${user_background_color}table_row_even` as keyof typeof classes] }`}
            style={{ 
               border:0,
            }}
            sx={{
              padding: "0",
            }}
          >
            <div 
            //   className={`${ ((newRow.alerted_amount && newRow.alert_amount_enabled) || (newRow.alerted_date && newRow.alert_date_enabled)) ? `${classes._0table_alert_on_background} ${classes._0table_alert_on_color}`  : "" } ${classes.table_rows}`}
            //   className={`${ ((newRow.alerted_amount && newRow.alert_amount_enabled) || (newRow.alerted_date && newRow.alert_date_enabled)) ? `${classes[`_${user_background_color}table_alert_on_background` as keyof typeof classes]} ${classes._0table_alert_on_color}`  : "" } ${classes.table_rows}`}
              className={`${ ((newRow.alerted_amount && newRow.alert_amount_enabled) || (newRow.alerted_date && newRow.alert_date_enabled)) ? `${classes[`_${user_background_color}table_alert_on_background` as keyof typeof classes]} ${classes[`_${user_background_color}table_alert_on_color` as keyof typeof classes]}`  : "" } ${classes.table_rows}  ${classes[`_${user_background_color}table_rows_color` as keyof typeof classes]}`}
            >
                {RowContent({column: column})}
            </div>
          </TableCell>
        ))}
      </React.Fragment>
    );
}


export default function AdminCategories( { open, handleClose }: ChildProps) {
    // const { openSaveChanges, closeSaveChanges } = props;
    const { classes } = useStylesGlobal();
    const close = () => {
        handleClose(false)
    }
    const { isLoading, setIsLoading, openBackdrop, setOpenBackdrop } = useContext<any>(IsLoadingContext)
    const { user, setUser } = useContext<any>(UserContext); 
    const { users } = useContext<any>(UsersContext) 
    const { categories } = useContext<any>(CategoriesContext) 
    const categoryArray = categories
    console.log("categoryArray: ", categoryArray)
    const { categoriesSub } = useContext<any>(CategoriesSubContext) 
    const categorySubArray = categoriesSub
    const { labelsUsers } = useContext<any>(LanguageLabelsContext)
    const { checkListStock, setCheckListStock } = useContext<any>(CheckListStockContext)
    // const usersArray = users
    const [ modalDisabled, setModalDisabled ]= useState<boolean>(false); 
    const [usersArray, setUsersArray] = useState<any>(users); 

    const [ showManageUser, setShowManageUser ] = useState(false) 
    const handleCloseManageUser = () => {
        setUserEditData({})  
        setShowManageUser(false)
    }
    
    const openManageUser = () => setShowManageUser(true)
    
    const [ userEditData, setUserEditData ] = useState<UserEditData>({})  
    const selectEditUser = (user:UserEditData) => {
        // console.log("user to edit: ", user)
        setUserEditData(user)
    }  
    const [addButtonShow, setAddButtonShow] = useState<boolean>(true)

    const [openSaveChanges, setOpenSaveChanges] = useState(false);  
    const [openErrorModal, setOpenErrorModal] = useState(false);  
    const [errorData, setErrorData] = useState("");  
    // const filteredFields = categorySubArray.map((category_sub: any) => {
    //     return {
    //         _id: 1,
    //         category: 2,
    //         sub_category: 3,
    //     }})
        
    const filteredFields = categorySubArray
    const [filteredData, setFilteredData] = useState<any>(filteredFields)
    
    const handleCloseErrorModal = () => {
        setOpenErrorModal(false)
    }

    // const columns = [{
    //     _id: "asdcf", 
    //     id: 1,
    //     category: "tessti"
    //     name: string;
    //     name_dan: string;
    //     name_esp: string;
    //     name_ita: string;
    //     deleted: boolean;
    // }]

    useEffect(() => {
        if (Object.keys(userEditData).length !== 0) 
            setShowManageUser(true)
        
    }, [userEditData])

    useEffect(() => {
        // console.log("Users.tsx: ", users)
        setUsersArray(users)
    }, [users])

    return (
        <Modal
        className={classes.modal_external_background}
            open={open} 
            onClose={close}
        > 
            <form
                onKeyDown={(e:any) => {
                    if(e.key === "Enter") {
                        e.preventDefault()
                        openManageUser()
                        e.stopPropagation()
                    }
                }}
            >
                <Box sx={modalStyleExternal }>
                    <Box 
                        sx={{ ...modalStyleInternal }}
                        className={`${classes[`_${user.background_color}main_background_color` as keyof typeof classes]} ${classes[`_${user.background_color}modal_color` as keyof typeof classes]}`}
                    >
                        <ErrorModal
                            openErrorModal={openErrorModal}
                            closeErrorModal={handleCloseErrorModal}
                            errorData={errorData} 
                        />
                        <Typography align="center" variant="h5"  className={classes.title}>
                            Categories
                        </Typography>
                        <Paper 
                            style={{ 
                                height: `60vh`, 
                                width: '87vw', 
                                maxWidth: '90%',
                                margin: "12px auto 0 auto" ,
                                borderRadius: "10px",
                                backgroundColor: "rgb(0, 0, 0, 0)", 
                            }}
                        > 
                            <div style={{ overflow: 'auto', height: '100%',
                                        borderRadius: "10px", boxShadow: `-5px 5px 20px 2px black `, }}>
                                <TableVirtuoso 
                                    data={filteredData}
                                    components={VirtuosoTableComponents}
                                    style={{
                                        // backgroundColor: "rgb(45, 72, 91)", 
                                        backgroundColor: "rgb(0, 0, 0, 0)", 
                                        borderRadius: "10px",
                                        margin: "-1px",
                                        scrollbarWidth: "none" 
                                        
                                    }}
                                    fixedHeaderContent={() => {
                                        return (
                                            <TableRow 
                                            >
                                                {categoryArray.map((column:any, index:number) => (
                                                <TableCell
                                                    key={column._id}
                                                    variant="head"
                                                    align='center'
                                                    // className= {classes._0main_background_colorD}
                                                    // className= {classes[`_${user.background_color}main_background_colorD` as keyof typeof classes]}
                                                    // className={`${classes[`_${user.background_color}main_background_colorD` as keyof typeof classes]} ${classes[`_${user.background_color}table_header_color` as keyof typeof classes]} ${index === columns.length - 1 ? classes[`_${user.background_color}gradient_effect` as keyof typeof classes] : "" }`}
                                                    className={`${classes[`_${user.background_color}main_background_colorD` as keyof typeof classes]} ${classes[`_${user.background_color}table_header_color` as keyof typeof classes]} ${index === categoryArray.length - 1 ? classes.gradient_effect : "" }`}

                                                    style={{ 
                                                        width: column.width, 
                                                        border:0,
                                                    }}
                                                    sx={{
                                                    padding: "8px 0",
                                                    }}
                                                >
                                                    {/* <ColumnLabel
                                                        column={column}
                                                    /> */}
                                                </TableCell>
                                                ))}
                                            </TableRow>
                                        );
                                    }}
                                    itemContent={(index: number) =>
                                        rowContent(index, filteredData[index], categoryArray, classes, user.background_color) 
                                    }
                                />
                            </div>
                        </Paper>

                        <Box className={classes.finishButtons}>
                            <CancelButton
                            clicked={() => close()}
                            />
                            <AddButton 
                                clicked={ openManageUser}
                            /> 
                        </Box> 
                    </Box>
                </Box>
            </form>
        </Modal>
    )
}