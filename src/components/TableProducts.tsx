import * as React from 'react';
import { 
  TableContainer, 
  Table, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody, 
  Paper, 
  Box, 
  Switch,
  Tooltip
} from '@mui/material';
import { tooltipClasses } from '@mui/material/Tooltip';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import { TableVirtuoso, TableComponents } from 'react-virtuoso';
import { useState, useEffect, useContext } from 'react';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { Data, DataTable, ColumnData, ProductUpdateData } from '../types';
import { UserContext } from '../context/UserContext'
import { ColumnsContext } from '../context/ColumnsContext'
import { tableStyles, useStylesGlobal } from '../Styles';
import { blueGrey } from '@mui/material/colors';
import { CheckListStockContext } from '../context/CheckListStockContext';
import ShowImgModal from './ShowImgModal';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import LockIcon from '@mui/icons-material/Lock';
import { Anchor } from '@mui/icons-material';
import CustomFields from './CustomFields';


// type TableClasses = ReturnType<typeof useStyles>;

const INITIAL_STATE = {
  _id: "",
  id: NaN,
  id_client: NaN,
  product: "",
  amount: NaN,
  measure: "",
  category: "",
  sub_category: "",
  // custom_fields: [],
  // id_custom_field_product: NaN,
}

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
// function rowContent(_index: number, row: Data, columnsTable: ColumnData[], classes: TableClasses) {
// function rowContent(_index: number, row: Data, columnsTable: ColumnData[], classes: any, openUpdateAmountStock:(newData: ProductUpdateData) => void) {
function rowContent(
    _index: number, 
    row: Data, 
    columnsTable: ColumnData[], 
    classes: any, 
    openUpdateAmountStock:(newData: Data) => void, 
    checkListStock:any, 
    checkingRow:(id_row: any) => void,
    handleOpenShowImg:(selectedImgUrlHandle: string) => void,
  ) {

  let newRow = { ...row } // Create a copy of the item to add in the same level the custom_fields

  if (newRow.custom_fields) {
    for (const key in newRow.custom_fields) {
      newRow = {
            ...newRow,
            ...newRow.custom_fields
          }
    }
  }

  return (
    <React.Fragment >
      {columnsTable.map((column) => (
        <TableCell
          key={column.id}
          align='center'
          onClick={() => openUpdateAmountStock({
              "_id":newRow._id, 
              "id": newRow.id, 
              "id_client": newRow.id_client, 
              "product": newRow.product, 
              "amount": newRow.amount, 
              "measure": newRow.measure, 
              "category": newRow.category, 
              "sub_category": newRow.sub_category, 
              "code": newRow.code, 
              "price": newRow.price, 
              "description": newRow.description, 
              "url_image": newRow.url_image, 
              "alert_amount": newRow.alert_amount, 
              "alert_amount_enabled": newRow.alert_amount_enabled, 
              "alerted_amount": newRow.alerted_amount, 
              "alert_date": newRow.alert_date, 
              "alert_date_enabled": newRow.alert_date_enabled, 
              "alerted_date": newRow.alerted_date, 
              "newRow": newRow})}
          className={`${ _index%2 ? classes.row_odd  : classes.row_even }`}
          style={{ 
             border:0,
          }}
          sx={{
            padding: "0",
          }}
        >
          <div 
            className={`${ ((newRow.alerted_amount && newRow.alert_amount_enabled) || (newRow.alerted_date && newRow.alert_date_enabled)) ? classes.alert_on  : "" } ${classes.rows}`}
          > 
          { ( column.dataKey === "check_stock" ) ? 
            <Checkbox 
              checked={checkListStock.includes(newRow._id)? true : false}
              onClick={(e:any)=> {
                e.stopPropagation() // Prevent the click event from propagating to the parent cell
                checkingRow(newRow._id)
              }}
              sx={{
                  padding: 0,
              }}
              color="default"
            />
          : ( column.dataKey !== "url_image"  || !newRow[column.dataKey]) ?
              <Tooltip 
                title={newRow[column.dataKey]} 
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
                  padding: "0 4px ",
                }}>
                  { ( newRow[column.dataKey] || newRow[column.dataKey] === 0 ) ? newRow[column.dataKey] : "-"}
                </Typography>
              </Tooltip> 
            :
              <img 
                style={{
                  display: "block", // Ensure the image is treated as a block element
                  margin: "auto",   // Set margins to auto to horizontally center the image
                  objectFit: 'contain',
                  paddingTop: "0.3px ", // Set to avoid small space when the row is alerted
                }} 
                // src={newRow[column.dataKey]} 
                src={`https://cdn.filestackcontent.com/resize=w:34,h:34,fit:crop/auto_image/compress/${newRow[column.dataKey]}`} 
                onClick={(e:any)=> {
                  e.stopPropagation() // Prevent the click event from propagating to the parent cell
                  handleOpenShowImg(newRow[column.dataKey])
                }}
              /> 
          }
          </div>
        </TableCell>
      ))}
    </React.Fragment>
  );
}

export default function TableProducts(
  { data, 
    openUpdateAmountStock, 
    handleDisabledUpdateButton, 
  }:  DataTable ) {

  const  {classes} = tableStyles()
  const breakpointLG = useMediaQuery('(min-width:1024px)');

  const { user } = useContext<any>(UserContext);
  const { defaultColumns, customColumns, columns, columnsUserOrder, setColumnsUserOrder, filteredColumnsCustom  } = useContext<any>(ColumnsContext);
  const { checkListStock, setCheckListStock } = useContext<any>(CheckListStockContext)
  // console.log("defaultColumns: ", defaultColumns)
  // console.log("customColumns: ", customColumns)
  // console.log("columns: ", columns)
  // console.log("columnsUserOrder: ", columnsUserOrder)
  // console.log("filteredColumnsCustom: ", filteredColumnsCustom)
  
  // const columnsTable = columnsUserOrder
  const elementToAdd = {dataKey: "check_stock", id: 0, width: 40,}
  const columnsTable = [elementToAdd, ...columnsUserOrder];
  const initialManageColumns = columns.map((column:any) => {
    const foundColumn = columnsUserOrder.find((columnUserOrder:any) => columnUserOrder._id === column._id)
    // console.log("foundColumn: ", foundColumn)
    const isInArray = foundColumn !== undefined ? true : false;
    return {_id:column._id, id:column.id, width:column.width, label: column.label, dataKey:column.dataKey, showInTable: isInArray}
  })
  initialManageColumns.sort((a:any, b:any) => {
    if (a.label.toLowerCase() < b.label.toLowerCase()) return -1;
    if (a.label.toLowerCase() > b.label.toLowerCase()) return 1;
    return 0;
  })

  const [manageColumns, setManageColumns] = useState(initialManageColumns)
  // console.log("columnsTable: ", columnsTable)
  const [filteredRows, setFilteredRows] = useState<Data>(INITIAL_STATE);
  const [filteredData, setFilteredData] = useState(data)
  const [sortedData, setSortedData] = useState(data)
  const [rowsUserSort, setRowsUserSort] = useState({
    field: "_id",
    asc: true
  })
  // const [alertsOnTopUserSort, setAlertsOnTopUserSort] = useState(true)
  const [alertsOnTopUserSort, setAlertsOnTopUserSort] = useState(user.alerts_on_top)
  // const [rowsUserSort, setRowsUserSort] = useState("_id_ASC")

  const checkingRow = (id_row:any) => {
    // console.log("checkingRow _id: ", id_row)
    const updatedCheckListStock = checkListStock.includes(id_row)
    ? checkListStock.filter((item: any) => item !== id_row)
    : [...checkListStock, id_row];
    setCheckListStock(updatedCheckListStock)
  }
  const checkingAll = () => {
    const all_ids = filteredData.map((data) => {
      return data._id
      // console.log("filteredData: ", all_ids)
    })
    // if (all_ids.every((id) => checkListStock.includes(id))) {
    if (all_ids.every((id) => checkListStock.includes(id))) {
      // If all IDs are already in checkListStock, remove them
      // console.log("all_ids[0]: ", all_ids[0])
      // console.log("typeof id: ", typeof all_ids[0])
      const updatedCheckListStock = checkListStock.filter((stockId: any) => !all_ids.includes(stockId));
      setCheckListStock(updatedCheckListStock);
    } else {
      // If not all IDs are in checkListStock, add the missing ones
      const missingIds = all_ids.filter((id) => !checkListStock.includes(id));
      const updatedCheckListStock = [...checkListStock, ...missingIds];
      setCheckListStock(updatedCheckListStock);
    }
  }

  const formatAlertDate = (dateString: string | null) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return date.getTime() // Returns the time in miliseconds since January 1, 1970 (UNIX timestamp)
  }

  // const [dataVersion, setDataVersion] = useState(0);
  const orderByField = (field: any, calledFrom: string) => {
    if(field==="url_image")
      return


    // console.log("rowsUserSort: ", rowsUserSort)
    let newSortAsc:boolean = true
    if(calledFrom === "onClick"){
      newSortAsc = (field === rowsUserSort.field ? !rowsUserSort.asc: rowsUserSort.asc)
    } else{
      newSortAsc = rowsUserSort.asc
    }
    console.log("field out: ", field)
    let arraySorted = filteredData.slice();
    setRowsUserSort({field: field, asc: newSortAsc});
    let aField, bField
    // if(newSortAsc ){
    arraySorted.sort((a, b) => {
      // console.log(" a[field]: ", a[field])
      // console.log("typeof a[field]: ", typeof a[field])
      // console.log(" a[field]: ", a[field])
      // console.log("typeof a[field]: ", typeof a[field])
      if (typeof a[field] === "string"){
        aField = a[field].toLowerCase()
      } else if (a[field] === undefined){
        aField ="-"
      } else {
        aField = a[field]
      }
      if (typeof b[field] === "string"){
        bField = b[field].toLowerCase()
      } else if (b[field] === undefined){
        bField ="-"
      } else {
        bField = b[field]
      }
      
      if(newSortAsc ){
        if (aField < bField) return -1;
        if (aField > bField) return 1;
        return 0;
      } else {
        if (aField < bField) return 1;
        if (aField > bField) return -1;
        return 0;
      }
    })
    
    if(alertsOnTopUserSort){
      // Sort the products array by the 'alert_on' field
      arraySorted.sort((a:any, b:any) => {
        const alertOnA = formatAlertDate((a.alerted_amount && a.alert_amount_enabled) || (a.alerted_date && a.alert_date_enabled))
        const alertOnB = formatAlertDate((b.alerted_amount && b.alert_amount_enabled) || (b.alerted_date && b.alert_date_enabled))
        if (alertOnA && alertOnB) {
          return alertOnA - alertOnB
        }
        // If one of the dates is null or undefined, place it at the end
        return alertOnA ? -1 : 1
      })
      
    }


    // setFilteredData(arraySorted);
    setSortedData(arraySorted);
    // console.log("array: ", array)
  }
  
  const handleOpenShowImg = (selectedImgUrlHandle: string) => {
    setShowImgModal(selectedImgUrlHandle)
    setOpenShowImgModal(true)
  }
  const handleCloseShowImgModal = () => {
    setOpenShowImgModal(false)
  }
  
  const [showImgModal, setShowImgModal] = useState(""); 
  const [openShowImgModal, setOpenShowImgModal] = useState(false); 
  const [openCustomFieldsModal, setOpenCustomFieldsModal] = useState(false); 

  const handleCloseCustomFieldsModal = () => {
    setOpenCustomFieldsModal(false)
  }
  
  const handleOpenCustomFieldsModal = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setAnchorEl(null);
    setOpenCustomFieldsModal(true)
  }
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);
  const openTableOptions = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget);
    setCheckListStock([])
  };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  const handleClose = () => {
    // Delay resetting anchorEl until after the menu has closed
    // setTimeout(() => {
      // if(anchorEl)
        setAnchorEl(null);
    // }, 100); // Adjust the delay as needed
};
  
  const handleAlertsOnTop = () => {
   
    setAlertsOnTopUserSort(!alertsOnTopUserSort)
    // handleClose()
    
    const fetchEditUsersAlertsOnTop = async () => {
      let loadingSuccess: boolean = false
      try {
          const response = await fetch(`${import.meta.env.VITE_API_URL_BACKEND}/users/${user._id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                alerts_on_top: !alertsOnTopUserSort
            })
          })
          if (response) {
              loadingSuccess = true
          } else {
              console.error('Update failed.')
          }
      } catch (error: unknown) {
          // Handle the case where the response is not OK (e.g., show an error message)
      }
  }
  fetchEditUsersAlertsOnTop()
  }
  
  const openSubTableOptions = (event: React.MouseEvent<HTMLElement>) => {
    // console.log("manageColumns: ", manageColumns)
    event.stopPropagation()
    setAnchorEl2(event.currentTarget);
    // handleClose()
    // setAnchorEl(null);
  }
  
  const handleClose2 = () => {
    // if(anchorEl2)
    setAnchorEl(null);
    setAnchorEl2(null);
      // handleClose()
  };

  const handlePickColumn = (columnSelected: any) => {
    // console.log("columnSelected: ", columnSelected)
    // console.log("manageColumns: ", manageColumns)
    if(columnSelected.id === -1) return
    const indexColumnUserOrder = columnsUserOrder.findIndex((columnUserOrder:any) => columnUserOrder._id === columnSelected._id);
    const actualColumnUserOrder = columnsUserOrder
    const indexManageColumn = manageColumns.findIndex((manageColumn:any) => manageColumn._id === columnSelected._id);
    const actualManageColumn = manageColumns
    if (indexColumnUserOrder !== -1) {
      actualColumnUserOrder.splice(indexColumnUserOrder, 1);
      actualManageColumn[indexManageColumn].showInTable = false
    } else {
      actualColumnUserOrder.push(columnSelected)
      actualManageColumn[indexManageColumn].showInTable = true
    }

    const array_ordered_fields = actualColumnUserOrder.map((col:any)=>col.id)
    
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
        } catch (error: unknown) {
            // Handle the case where the response is not OK (e.g., show an error message)
        }
    }
    fetchEditUsersFieldsOrder()

    setManageColumns(actualManageColumn)
    // setColumnsUserOrder(actualColumnUserOrder)
  }

  useEffect(()=> {
    if(checkListStock.length>0)
      handleDisabledUpdateButton(false)
    else
      handleDisabledUpdateButton(true)
  }, [checkListStock])

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  
    setFilteredRows({ ...filteredRows, [event.target.id]: (event.target.value) })
  };
  useEffect(() => {
    setFilteredData(data.filter((item) => {
      let vals = true
      Object.keys(filteredRows).forEach((arg)=> {
        const str = arg as string;

        // console.log("filteredRows: ", filteredRows)
        let value = filteredRows[str as keyof typeof filteredRows]
        if(arg=== "amount") {
          // console.log("item: ", item)
          // console.log("item.amount: ", item.amount)
          // console.log("arg: ", arg)
          // console.log("value: ", value)
          // console.log("isNaN(value): ", isNaN(value))
        }

        if (typeof value == "string")
        // if (typeof value == "string" || value===0)
          value = value.toString().toLowerCase()
        // else if (isNaN(value))
        else if (isNaN(value))
          value = ""
        if (value !== "" ){
          // console.log("item[str as keyof typeof item]: ", item[str as keyof typeof item])

          if(item[str as keyof typeof item] || item[str as keyof typeof item] === 0){
            // console.log("item.amount2: ", item.amount)

            if(!item[str as keyof typeof item].toString().toLowerCase().includes(value.toString())){
              vals = false
            }
          } 
          else if(item.custom_fields ){
            if(item.custom_fields[str as keyof typeof item] || item.custom_fields[str as keyof typeof item] == ""){
              if(!item.custom_fields[str as keyof typeof item].toString().toLowerCase().includes(value.toString())){
                vals = false
              }
            }
            else{
              vals = false
            }
          }
          else{
            vals = false
          }
        }
      })
      return vals
    }))
  }, [ filteredRows, data]);
  const [initialRender, setInitialRender] = useState(true);
  useEffect(() => {
    if (initialRender) {
      // console.log("Initial rendering");
      setInitialRender(false); // Update the flag after the initial rendering
      return; // Exit early to prevent further execution of the effect
    }
    // console.log("rowsUserSort: ", rowsUserSort)
      orderByField(rowsUserSort.field, "useEffect")
  }, [filteredData, alertsOnTopUserSort])

  return (
    
<div>
    <ShowImgModal
        openShowImgModal={openShowImgModal}
        closeShowImgModal={handleCloseShowImgModal} 
        showImgModal={showImgModal}
    />
    <CustomFields 
        open={openCustomFieldsModal} 
        handleClose={handleCloseCustomFieldsModal}  
    /> 
    <Paper style={{ height: `calc(100vh - ${(breakpointLG?"105px":"150px")})`, width: (breakpointLG?"98vw":"94vw"), margin: "12px auto 0 auto" ,borderRadius: "10px"}}>
      <TableVirtuoso 
        data={sortedData}
        components={VirtuosoTableComponents}
        style={{
          backgroundColor: "rgb(45, 72, 91)", 
          borderRadius: "10px", 
          scrollbarWidth: "none",
          cursor: "pointer"
        }}
        fixedHeaderContent={() => {
            return (
              <TableRow>
                {columnsTable.map((columnTable:any) => (
                  <TableCell
                    key={columnTable.id}
                    variant="head"
                    align='center'
                    style={{ 
                      // width: "100px", 
                      width: columnTable.width, 
                      backgroundColor:"rgb(25, 54, 72)", 
                      border:0
                    }}
                    sx={{
                      color: "white",
                      padding: "8px 0",
                    }}
                  >
                    <Typography noWrap
                      sx={{
                        padding: "0 4px ",
                      }}
                      onClick={(e:any)=> {
                        e.stopPropagation() // Prevent the click event from propagating to the parent cell
                        orderByField(columnTable.dataKey, "onClick")
                      }} 
                    >
                      { columnTable.label ? 
                            columnTable.label 
                          : 
                          <>
                            <IconButton
                              onClick={
                                openTableOptions
                              }
                            style={{ 
                              width: "30px", 
                              border:0
                            }}
                            sx={{
                              color: "white",
                              padding: "0",
                              //  paddingTop: "-10px",
                              top: "-5px",
                            }}
                            >
                              <MoreVertIcon fontSize="small" />
                            </IconButton>  
                            <Menu
                              disableScrollLock={true}
                              id="demo-positioned-menu"
                              aria-labelledby="demo-positioned-button"
                              anchorEl={anchorEl}
                              open={open}
                              onClose={handleClose}
                              // onExited={() => setAnchorEl(null)} 
                              anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                              }}
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                              }}
                              style={{ 
                                marginTop: '20px', 
                                marginLeft: '15px',
                              }}

                              MenuListProps={{
                                  sx: { padding: 0,  
                                  },
                              }}
                              // PaperProps={{
                              //   sx: { borderRadius: '5px' }, // Adjust the value as needed
                              // }}
                            >
                              <MenuItem 
                                onClick={() => handleAlertsOnTop()}
                                  style={{
                                    padding: '0 5px',
                                    backgroundColor: "#DCF2F1",
                                  }}
                              >
                                <Typography 
                                  align="center" 
                                  variant="body2" 
                                > 
                                  <Switch 
                                    size='small'
                                    color='success'  
                                    checked={alertsOnTopUserSort}
                                  />  
                                  Alerts on top
                                </Typography>
                              </MenuItem>
                              <MenuItem 
                                onClick={ openSubTableOptions }
                                style={{
                                  padding: '0 5px',
                                  backgroundColor: "#DCF2F1",
                                }}
                              >
                                <Typography 
                                  align="center" 
                                  variant="body2" 
                                > 
                                  Manage columns
                                </Typography>
                              </MenuItem>
                              <MenuItem 
                                onClick={ handleOpenCustomFieldsModal  }
                                style={{
                                  padding: '0 5px',
                                  backgroundColor: "#DCF2F1",
                                }}
                              >
                                <Typography 
                                  align="center" 
                                  variant="body2" 
                                > 
                                  Custom fields
                                </Typography>
                              </MenuItem>
                            </Menu>
                            <Menu
                            // <Paper style={{ height: `calc(100vh - ${(breakpointLG?"32px":"150px")})`, width: '94vw', margin: "12px auto 0 auto" ,borderRadius: "10px"}}>
                              className={breakpointLG ? classes.menu : ""}
                              //  className={classes.menu} 
                              id="demo-positioned-menu2"
                              aria-labelledby="demo-positioned-button2"
                              anchorEl={anchorEl2}
                              open={open2}
                              onClose={handleClose2}
                              anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                              }}
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                              }}
                              style={{ 
                                marginTop: '-57px', 
                                marginLeft: '0px',
                                height: '370px',
                              }}
                              MenuListProps={{
                                  sx: { padding: 0,
                                  },
                                  
                              }}
                              // PaperProps={{
                              //   sx: { borderRadius: '7px' }, // Adjust the value as needed
                              // }}
                            >
                              {manageColumns.map((manageColumn:any) => (
                                <MenuItem 
                                  key={manageColumn.id}
                                  onClick={() => 
                                    handlePickColumn(manageColumn)}
                                  style={{
                                    padding: '0 5px',
                                    backgroundColor: "#DCF2F1",
                                  }}
                                >
                                  <Typography 
                                    align="center" 
                                    variant="body2" 
                                  > 
                                    <Switch 
                                      size='small'
                                      color='success'  
                                      checked={manageColumn.showInTable}
                                    />  
                                      {manageColumn.label}
                                      {manageColumn.id==-1 ? 
                                        <LockIcon 
                                          style={{
                                            paddingTop: "10px",
                                          }}
                                          fontSize='small'
                                        /> 
                                      : 
                                        "" }
                                  </Typography>
                                </MenuItem> 
                              ))}
                            </Menu>
                          </>
                        }
                        </Typography>
                       
                      { ( columnTable.dataKey === "check_stock" ) ? 
                        <Checkbox  
                          checked={(checkListStock.length===data.length && data.length!==0 )? true : false}
                          onClick={(e:any)=> {
                            e.stopPropagation() // Prevent the click event from propagating to the parent cell
                            checkingAll()
                          }} 
                          sx={{
                            color: blueGrey[50],
                            padding: 0,
                            '&.Mui-checked': {
                              color: blueGrey[50],
                            },
                          }}
                          // color="default"
                        />
                      :
                          <TextField
                            // id={column.dataKey}
                            id={columnTable.dataKey.toString()}
                            // id="filled-multiline-flexible"
                            // value={filters[0].dataKey}
                            onChange={handleFilterChange}
                            maxRows={1}
                            size="small"
                            sx={{
                              backgroundColor: "white",
                              borderRadius: 1,
                              margin: "8px",
                            }}
                            InputProps={{
                              style: {
                                height:"36px",
                              },
                            }}
                          />
                        }
                  </TableCell>
                ))}
              </TableRow>
            );
          }}
        // itemContent={rowContent}
        itemContent={(index: number) =>
          rowContent(
              index, 
              // filteredData[index], 
              sortedData[index], 
              columnsTable, 
              classes, 
              openUpdateAmountStock, 
              checkListStock, 
              checkingRow,
              handleOpenShowImg
          ) 
          // rowContent(index, filteredData[index], columnsTable)
        }
        
      />
    </Paper>

</div>

  
  );
}