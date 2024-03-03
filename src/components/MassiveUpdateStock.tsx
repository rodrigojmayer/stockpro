import React, { useState, useEffect, useContext } from 'react';
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
         TextField
        } from '@mui/material';
import { OkButton,
         CancelButton,
         PlusButton,
         MinusButton
        } from './Buttons';
import  SaveChanges from './SaveChanges';
import { useStylesGlobal as globalClasses, 
        modalStyleExternal, 
        modalStyleInternal, 
        tableStyles as tableClasses } from '../Styles'
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
import { Grid } from '@material-ui/core';
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
  function rowContent(_index: number, row: Data, columns: ColumnData[], classes: any, tableClassNames: any, writeValue:any) {
  
    let newRow = { ...row } // Create a copy of the item to add in the same level the custom_fields
    // console.log("newRow: ", newRow)
  
    // if (newRow.custom_fields) {
      // for (const key in newRow) {
      //   // console.log("key: ", key)
      //   newRow.update_amount = ""
      // }
    // }
    // console.log("newRow2: ", newRow)

    const RowContent = (item:any) => {
        // console.log("item.column: ", item.column)
        // console.log("item.column: ", item.column)
        // console.log("item.column.dataKey: ", item.column.dataKey)
        // console.log("newRow[item.column.dataKey]: ", newRow[item.column.dataKey])
        
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
                          inputProps: {
                              style: { 
                                textAlign: "center", 
                              },
                          },
                      }}/>
                       

                      // <Typography noWrap 
                      // sx={{
                      //     padding: "0 4px ",
                      // }}>
                      //     {newRow.update_amount}
                      //     {/* {item.column} */}
                      // </Typography>


            )
        } else {
            return(
                <Typography noWrap 
                    sx={{
                        padding: "0 4px ",
                    }}>
                        { ( newRow[item.column.dataKey] || newRow[item.column.dataKey] === 0 ) ? newRow[item.column.dataKey] : "-"}
                  </Typography>
            )

        }
    }
   
    return (
      <React.Fragment >
        {columns.map((column) => (
          <TableCell
            key={column._id}
            align='center'
            className={`${ _index%2 ? tableClassNames.row_odd  : tableClassNames.row_even }`}
            style={{ 
               border:0,
            }}
            sx={{
              // padding: "8px 0",
              padding: "0",
            }}
          >
            <div 
              className={`${ ((newRow.alerted_amount && newRow.alert_amount_enabled) || (newRow.alerted_date && newRow.alert_date_enabled)) ? tableClassNames.alert_on  : "" } ${tableClassNames.rows}`}
            >
                {/* <RowContent column={column} /> */}
                {RowContent({column: column})}

              {/* </RowContent> */}
              {/* <Typography noWrap 
                sx={{
                    padding: "0 4px ",
                }}>
                    { ( newRow[column.dataKey] || newRow[column.dataKey] === 0 ) ? newRow[column.dataKey] : "-"}
              </Typography> */}

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
    const { classes: tableClassNames } = tableClasses() 

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
        width: 50
    });

    // const productsValueUpdate = data.map((item) => {
    //   return {_id:item._id, value_update:"e"}
    // })
    
    // console.log("productsValueUpdate: ", productsValueUpdate[0].value_update)
    // columns.
    // const columns = [""]
    // console.log("columns: ", columns.find((column:any) => { column.dataKey=="amount"}))
    // console.log("defaultColumns: ", defaultColumns)
    // console.log("columns: ", columns)
    const [ signUpdate, setSignUpdate ] = useState<number>(-1)
    // const [ valueUpdate, setValueUpdate ] = useState<number|null>(null)
    // const [ valueUpdate, setValueUpdate ] = useState<Object[]>(productsValueUpdate)
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
    // console.log("data: ", data[0].id)
    const filteredFields = data.map((item) => {
    //   console.log("item: ", item)
      return {
      _id: item._id,
      product: item.product,
      amount: item.amount,
      update_amount: '',
      alert_amount: item.alert_amount,
      alert_amount_enabled: item.alert_amount_enabled,
    }})
    // const filteredFields = data.map(({ _id, product, otherField }) => ({
    //   _id,
    //   product,
    //   otherField, // Add any other fields you want to include here
    // }));
    // console.log("data: ", data)
    // console.log("filteredFields: ", filteredFields)

    const [filteredData, setFilteredData] = useState<any>(filteredFields)

    // console.log("data: ", data)


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
        // console.log("ans close Save: ", ans)
        // console.log("filteredData close Save: ", filteredData)
        
        
        ///////////////////  Make the put here!!!!!!!!!!!!!!!!!!


        if(ans){
            // const bodyUpdate: ProductEditData = {}
            // bodyUpdate.id_client = user.id_client
            // bodyUpdate.deleted = false
            filteredData.forEach((stock:any) => {
                
                if(stock.update_amount){
                    // console.log("enter to element close Save: ", stock)
                    // console.log("(stock.update_amount * signUpdate) + stock.amount: ", (stock.update_amount * signUpdate) + stock.amount)
                    // console.log("stock.alerted_amount: ", stock.alerted_amount)
                    // console.log("stock: ", stock)
                    const newAmount = (stock.update_amount * signUpdate) + stock.amount
                    const alertedAmount = (stock.alert_amount_enabled && (stock.alert_amount >= newAmount))
                    // console.log("newAmount: ", newAmount)
                    // console.log("alertedAmount: ", alertedAmount)
                    const fetchMassiveUpdateStock = async () => {
                        let loadingSuccess: boolean = false
                        try {
                            const response = await fetch(`http://localhost:4000/api/products/${stock._id}`, {
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
        
        // if(stockNameTemp===""){
        //     setOpenErrorModal(true)
        //     setErrorData("missing_data")
        // }else if(Number(stockAmountTemp)<0){
        //     setOpenErrorModal(true)
        //     setErrorData("negative_amount")
        // }
        // else{
            setOpenSaveChanges(true);
        // }
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
    useEffect(() => {
        setFilteredData(filteredFields)
      }, [ open]);
    
    
    return (
        <Modal
        open={open} 
        onClose={close}
        > 
            <Box sx={modalStyleExternal}>
                <Box sx={modalStyleInternal}>
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
                    <Typography align='center' variant="h5">Massive upload</Typography>

                    <Paper style={{ 
                        height: `calc(100vh - ${(breakpointLG?"380px":"300px")})`, 
                        width: '87vw', 
                        margin: "12px auto 0 auto" ,
                        borderRadius: "10px"
                    }}>
                        
                        <div style={{ overflow: 'auto', height: '100%' }}>
                            <TableVirtuoso 
                                data={filteredData}
                                components={VirtuosoTableComponents}
                                fixedHeaderContent={() => {
                                    return (
                                    <TableRow >
                                        {columns.map((column:any) => (
                                        <TableCell
                                            key={column._id}
                                            variant="head"
                                            align='center'
                                            style={{ 
                                            width: column.width, 
                                            backgroundColor:"rgb(25, 54, 72)", 
                                            border:0,
                                            }}
                                            sx={{
                                            color: "white",
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
                                    rowContent(index, filteredData[index], columns, classes, tableClassNames, writeValue) 
                                }
                                style={{
                                    backgroundColor: "rgb(45, 72, 91)", 
                                    borderRadius: "10px",
                                    margin: "-1px",
                                }}
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
        </Modal>
    )
}