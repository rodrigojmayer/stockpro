import React, { useState, useEffect, useContext, useRef } from 'react';
import { Box,
         Modal, 
         Typography, 
         TableContainer, 
         Table, 
         TableHead, 
         TableRow, 
         TableCell, 
         TableBody, 
         Paper,
         TextField,
         Tooltip
        } from '@mui/material';
        import { tooltipClasses } from '@mui/material/Tooltip';
import { OkButton,
         CancelButton,
         PlusButton,
         MinusButton
        } from './Buttons';
import  SaveChanges from './SaveChanges';
import { useStylesGlobal as globalClasses, 
        modalStyleExternal, 
        modalStyleInternal, 
        // tableStyles as tableClasses 
    } from '../Styles'
import { DataCreateStockOptions, 
        ColumnData, 
        ProductEditData,  
        Data, 
        DataTable,
        ProductUpdateData } from '../types';
import { CategoriesContext } from '../context/CategoriesContext';
import { MeasuresContext } from '../context/MeasuresContext';
import { UserContext } from '../context/UserContext';
import { IsLoadingContext } from '../context/IsLoadingContext';
import ErrorModal from './ErrorModal';
import { TableVirtuoso, TableComponents } from 'react-virtuoso';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ColumnsContext } from '../context/ColumnsContext'
import { CheckListStockContext } from '../context/CheckListStockContext';

const INITIAL_CREATESTOCK_OPTIONS = {
    mainData: false,  
    secondaryData: true,
    alerts: true,    
    customFields: true,
}


const INITIAL_STATE = {
    _id: NaN,
    // id: NaN,
    // id_client: NaN,
    product: "",
    amount: NaN,
    // measure: "",
    // category: "",
    // sub_category: "",
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
  // function rowContent(_index: number, row: Data, columns: ColumnData[], classes: TableClasses) {
    // function rowContent(_index: number, row: Data, columns: ColumnData[], classes: any, openUpdateAmountStock:(newData: ProductUpdateData) => void) {
  function rowContent(_index: number, row: Data, columns: ColumnData[], classes: any, writeValue:any, firstInputRef: any, user_background_color: any) {
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
                    onChange={ (event:any) => writeValue(event, newRow._id) }
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
                    inputRef={(_index===0 && firstInputRef ? input => input && input.focus() : undefined)}
                />
            )
        } else {
            return(
                
              <Tooltip 
                title={newRow[item.column.dataKey]} 
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
                        { ( newRow[item.column.dataKey] || newRow[item.column.dataKey] === 0 ) ? newRow[item.column.dataKey] : "-"}
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

interface ChildProps {
    open:  boolean
    handleClose: (newData: boolean) => void
    data: Data[]
}

export default function MassiveUpdateStock( 
    {   open, 
        handleClose, 
        data,
    }: ChildProps) {

    const { classes } = globalClasses();
    // const { classes: tableClassNames } = tableClasses() 

    const breakpointLG = useMediaQuery('(min-width:1024px)');
    const { defaultColumns, customColumns, columnsUserOrder, filteredColumnsCustom  } = useContext<any>(ColumnsContext);
    const { checkListStock, setCheckListStock } = useContext<any>(CheckListStockContext)
    // const modifiedColumns  = defaultColumns
    const columns  = defaultColumns
        .filter((column:any) => column.dataKey=="product" || column.dataKey=="amount"  )
        .map((column:any) => ({...column, width:column.width }))

    // const columns = [...modifiedColumns , { label: "fs"}]

    columns.push({ 
    //     _id: 0,
    //     label: "plus_minus" , 
    //     dataKey: "plus_minus",
    //     width: 30
    // },{ 
        _id: 1,
        label: "update_amount" , 
        dataKey: "update_amount",
        width: 57
    });

    const [ signUpdate, setSignUpdate ] = useState<number>(-1)
    let ButtonOperator:any
    let buttonOperatorColor:any
    if (Number(signUpdate) > 0 ){
        ButtonOperator = PlusButton 
        buttonOperatorColor = "rgb(100, 200, 100)"
    } else {
        ButtonOperator = MinusButton       
        buttonOperatorColor = "rgb(250, 100, 100)"

    }
    const swapOperator = () => {
        setFirstInputRef(false)
        let newSign = -(signUpdate)
        if(newSign < 0){
            const updatedData = filteredData.map((item:any) => {
                if (item.update_amount > item.amount) {
                    return { 
                        ...item,
                        update_amount: item.amount
                    };
                }
                return item;
            });
            setFilteredData(updatedData);
        }else{
            const updatedData = filteredData.map((item:any) => {
                const topValue = 999 - item.amount
                if (item.update_amount > topValue) {
                    return { 
                        ...item,
                        update_amount: topValue
                    };
                }
                return item;
            });
            setFilteredData(updatedData);
        }
        setSignUpdate(newSign)
    }
    const writeValue = (e:any, _id: string) => {
        setFirstInputRef(false)
        const productAmount = filteredData.filter((item:any) => item._id===_id)[0].amount
        const topValue = 999 - productAmount
        let newValue = parseInt(e.target.value.replace(/[+\-e]/g, ''), 10);
        if(e.target.value==="")
            newValue = 0
        if(!isNaN(newValue)){
            if(newValue > productAmount && signUpdate < 0){
                newValue = productAmount
            }else if(newValue > topValue && signUpdate > 0){
                newValue = topValue
            }
            const updatedData = filteredData.map((item:any) => {
                if (item._id === _id) {
                    return { 
                        ...item, 
                        update_amount: newValue 
                    };
                }
                return item;
            });
            setFilteredData(updatedData);
        }
    }

    const ColumnLabel = (item:any) => {
        let lab
        if (item.column._id === 0){
            lab = ""
        } else if (item.column._id === 1){
            lab = 
                  <ButtonOperator
                      sizeIcoExt="35px !important"
                      sizeIcoInt="42px !important"
                      // colorIco = "white"  // Fix color
                      colorIco = {buttonOperatorColor}
                      clicked={() => swapOperator()}
                  />
        } else {
            lab = item.column.label
        }
        return(
            <Typography noWrap
                sx={{
                    padding: "0 4px ",
                }}
            >
                {lab}
            </Typography>
        )
    }
    const [filteredRows, setFilteredRows] = useState<any>(INITIAL_STATE);
    const filteredFields = data.map((item) => {
      return {
      _id: item._id,
      product: item.product,
      amount: item.amount,
      update_amount: '',
      alert_amount: item.alert_amount,
      alert_amount_enabled: item.alert_amount_enabled,
      alerted_amount: item.alerted_amount,
      alerted_date: item.alerted_date,
      alert_date_enabled: item.alert_date_enabled,
    }})
    const [filteredData, setFilteredData] = useState<any>(filteredFields)
    const close = () => {
        handleClose(false)
    } 
    
    const { user } = useContext<any>(UserContext)
    const { isLoading, setIsLoading, openBackdrop, setOpenBackdrop } = useContext<any>(IsLoadingContext)
    const [openSaveChanges, setOpenSaveChanges] = useState(false); 
    const [openErrorModal, setOpenErrorModal] = useState(false);  
    const [messageBeforeSave, setMessageBeforeSave] = useState("");  
    const [errorData, setErrorData] = useState("");  
    const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);  
    const handleCloseSaveChanges = (ans?:boolean) => {
        ///////////////////  Make the put here!!!!!!!!!!!!!!!!!!
        if(ans){
            filteredData.forEach((stock:any) => {
                if(stock.update_amount){
                    const newAmount = (stock.update_amount * signUpdate) + stock.amount
                    const alertedAmount = (stock.alert_amount_enabled && (stock.alert_amount >= newAmount))
                    const fetchMassiveUpdateStock = async () => {
                        let loadingSuccess: boolean = false
                        try {
                            const response = await fetch(`${import.meta.env.VITE_API_URL_BACKEND}/products/${stock._id}`, {
                                method: 'PATCH',
                                headers: {
                                    'Content-Type': 'application/json', // Set the appropriate content-type for my API
                                    // Add any other requires headers here
                                },
                                body:JSON.stringify({
                                    "amount": newAmount,
                                    "alerted_amount": alertedAmount
                                })
                            })
                            // Check if the response status is successful
                            if (response.ok) {
                                const responseData = await response.json() // parse the response data
                                // console.log('POST request successful: ', responseData)
                                loadingSuccess = true
                            } else {
                                // Handle non-successful responses
                                console.error('Request failed: ', response.status, response.statusText)
                                // Handle the error here
                            }
                        } catch (error: unknown) {
                            if (typeof error === 'string') {
                                // 'error' is now narrowed down to type 'string'
                                console.error('Error:', error)
                            } else if (error instanceof Error) {
                                // 'error' is now narrowed down to type 'Error'
                                console.error('Error object:', error.message)
                            } else {
                                // Handle other cases as needed
                            }
                        } finally {
                            // setIsLoading(())
                            setIsLoading((prevLoading: any) => ({
                                ...prevLoading,
                                fieldsFetchCreateStock: loadingSuccess,
                            }));
                            setCheckListStock([])
                        }
                    } 
                    fetchMassiveUpdateStock()        //////////Change the name for update
                }
            });
            close()
        }
        setOpenSaveChanges(false);
    }
    
    const handleCloseErrorModal = () => {
        setOpenErrorModal(false)
    }

    const handleOpenSaveChanges = () => {
        console.log("signUpdate: ", signUpdate)
        console.log("filteredData: ", filteredData)
        setOpenSaveChanges(true);
    }

    const handleCloseConfirmDeleteModal = () => {
        setOpenConfirmDeleteModal(false)
    }
    
    // useEffect(() => {
    //     if(isLoading.fieldsFetchCreateStock){
    //         alert("MassiveUpdateStock.tsx here used to be a window.location.reload()")
    //         // window.location.reload();
    //     }
    // }, [isLoading]) // To know if after save should reload the page
    const [firstInputRef, setFirstInputRef] = useState(true)
    useEffect(() => {
        setFilteredData(filteredFields)
        setFirstInputRef(true)
      }, [ open]);
    
    
    return (
        <Modal
        className={classes.modal_external_background}
            open={open} 
            onClose={close}
        > 
            <form
                onKeyDown={(e:any) => {
                    if (e.key === "Enter") {
                        e.preventDefault()
                        handleOpenSaveChanges()
                        e.stopPropagation()
                    }
                }}
            >
                <Box sx={modalStyleExternal}>
                    <Box 
                        sx={{ ...modalStyleInternal }}
                        className={`${classes[`_${user.background_color}main_background_color` as keyof typeof classes]} ${classes[`_${user.background_color}modal_color` as keyof typeof classes]}`}
                    >
                       <SaveChanges
                            openSaveChanges={openSaveChanges}
                            closeSaveChanges={handleCloseSaveChanges} 
                            messageBeforeSave={messageBeforeSave}
                        />
                        <ErrorModal
                            openErrorModal={openErrorModal}
                            closeErrorModal={handleCloseErrorModal}
                            errorData={errorData} 
                        />
                        <Typography align='center' variant="h5"  className={classes.title}>Massive upload</Typography>

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
                                                {columns.map((column:any, index:number) => (
                                                <TableCell
                                                    key={column._id}
                                                    variant="head"
                                                    align='center'
                                                    // className= {classes._0main_background_colorD}
                                                    // className= {classes[`_${user.background_color}main_background_colorD` as keyof typeof classes]}
                                                    // className={`${classes[`_${user.background_color}main_background_colorD` as keyof typeof classes]} ${classes[`_${user.background_color}table_header_color` as keyof typeof classes]} ${index === columns.length - 1 ? classes[`_${user.background_color}gradient_effect` as keyof typeof classes] : "" }`}
                                                    className={`${classes[`_${user.background_color}main_background_colorD` as keyof typeof classes]} ${classes[`_${user.background_color}table_header_color` as keyof typeof classes]} ${index === columns.length - 1 ? classes.gradient_effect : "" }`}

                                                    style={{ 
                                                        width: column.width, 
                                                        border:0,
                                                    }}
                                                    sx={{
                                                    padding: "8px 0",
                                                    }}
                                                >
                                                    <ColumnLabel
                                                        column={column}
                                                    />
                                                </TableCell>
                                                ))}
                                            </TableRow>
                                        );
                                    }}
                                    itemContent={(index: number) =>
                                        rowContent(index, filteredData[index], columns, classes, writeValue, firstInputRef, user.background_color) 
                                    }
                                />
                            </div>
                        </Paper>

                        <Box className={classes.finishButtons}>
                            <CancelButton
                                clicked={() => close()}
                            />
                            <OkButton
                                clicked={() => handleOpenSaveChanges()}
                            />
                        </Box> 
                    </Box>
                </Box>
            </form>
        </Modal>
    )
}