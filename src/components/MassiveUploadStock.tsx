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
import dayjs, { Dayjs } from 'dayjs';
import ErrorModal from './ErrorModal';
import { TableVirtuoso, TableComponents } from 'react-virtuoso';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ColumnsContext } from '../context/ColumnsContext'

const INITIAL_CREATESTOCK_OPTIONS = {
    mainData: false,  
    secondaryData: true,
    alerts: true,    
    customFields: true,
}


const INITIAL_STATE = {
    _id: NaN,
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
  // function rowContent(_index: number, row: Data, columns: ColumnData[], classes: TableClasses) {
    // function rowContent(_index: number, row: Data, columns: ColumnData[], classes: any, openUpdateAmountStock:(newData: ProductUpdateData) => void) {
  function rowContent(_index: number, row: Data, columns: ColumnData[], classes: any) {
  
    let newRow = { ...row } // Create a copy of the item to add in the same level the custom_fields
  
    if (newRow.custom_fields) {
      for (const key in newRow.custom_fields) {
        newRow = {
              ...newRow,
              ...newRow.custom_fields
            }
      }
    }

    const RowContent = (item:any) => {
        console.log("item.column: ", item.column)
        let lab
        if (item.column._id === 0){
            return(
                <Typography noWrap 
                    sx={{
                        // paddingLeft: "-5px",
                        margin: "-5px",
                    }}>
                   <PlusButton 
                            clicked={()=>alert("holis")} 
                            sizeIco={"30px !important"}
                        />
                </Typography>
            )
        } else if (item.column._id === 1){
            return(
                <Typography noWrap 
                    sx={{
                        padding: "0 4px ",
                    }}>
                        {/* INPUT HERE */}
                </Typography>
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
            className={`${ _index%2 ? classes.row_odd  : classes.row_even }`}
            style={{ 
               border:0,
            }}
            sx={{
              // padding: "8px 0",
              padding: "0",
            }}
          >
            <div 
              className={`${ ((newRow.alerted_amount && newRow.alert_amount_enabled) || (newRow.alerted_date && newRow.alert_date_enabled)) ? classes.alert_on  : "" } ${classes.rows}`}
            >
              <RowContent column={column} />

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
    // columnsCustom: ColumnData[] 
}

export default function MassiveUploadStock( 
    {   open, 
        handleClose, 
        data,
        // columnsCustom,
    }: ChildProps) {

    const { classes } = globalClasses();
    const { classes: tableClassNames } = tableClasses() 

    const breakpointLG = useMediaQuery('(min-width:1024px)');
    const { defaultColumns, customColumns, columnsUserOrder, filteredColumnsCustom  } = useContext<any>(ColumnsContext);
    // const modifiedColumns  = defaultColumns
    const columns  = defaultColumns
        .filter((column:any) => column.dataKey=="product" || column.dataKey=="amount"  )
        .map((column:any) => ({...column, width:column.width }))

    // const columns = [...modifiedColumns , { label: "fs"}]

    columns.push({ 
        _id: 0,
        label: "plus_minus" , 
        dataKey: "plus_minus",
        width: 30
    },{ 
        _id: 1,
        label: "update_amount" , 
        dataKey: "update_amount",
        width: 50
    });

    // columns.
    // const columns = [""]
    // console.log("columns: ", columns.find((column:any) => { column.dataKey=="amount"}))
    console.log("defaultColumns: ", defaultColumns)
    console.log("columns: ", columns)

    const ColumnLabel = (item:any) => {
        // console.log("column: ", column)
        let lab
        if (item.column._id === 0){
            lab = ""
        } else if (item.column._id === 1){
            lab =   <>
                        <PlusButton 
                            clicked={()=>alert("holis")} 
                            sizeIco={"40px !important"}
                        />
                        {/* <MinusButton 
                            clicked={()=>alert("holis")} 
                            sizeIco={"30px !important"}
                        />  */}
                    </> 
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
    


    const [filteredRows, setFilteredRows] = useState<Data>(INITIAL_STATE);
    const [filteredData, setFilteredData] = useState(data)

    console.log("INITIAL_STATE: ", INITIAL_STATE)
    console.log("data: ", data)


    const close = () => {
        handleClose(false)
    } 
    
    const { categories } = useContext<any>(CategoriesContext) 
    const categoryArray = categories
    const { measures } = useContext<any>(MeasuresContext)
    const measureArray = measures
    const { user } = useContext<any>(UserContext)
    const { isLoading, setIsLoading, openBackdrop, setOpenBackdrop } = useContext<any>(IsLoadingContext)
    // const edition = (data._id!==0 ? true : false)
    const [titleStat, setTitleStat] = useState<string>("Edit ");
    const [openOptionsCreate, setOpenOptionsCreate] = useState<DataCreateStockOptions>(INITIAL_CREATESTOCK_OPTIONS);
   
    const [openSaveChanges, setOpenSaveChanges] = useState(false); 
    const [openErrorModal, setOpenErrorModal] = useState(false);  
    const [messageBeforeSave, setMessageBeforeSave] = useState("");  
    const [errorData, setErrorData] = useState("");  
    const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);  
   
    const handleCloseSaveChanges = (ans?:boolean) => {
        if(ans){
            const bodyUpdate: ProductEditData = {}
            bodyUpdate.id_client = user.id_client
            bodyUpdate.deleted = false


            close()
        }
        setOpenSaveChanges(false);
    }
    
    const handleCloseErrorModal = () => {
        setOpenErrorModal(false)
    }

    const handleOpenSaveChanges = () => {
        // console.log("stockNameTemp: ", stockNameTemp)

        // if(stockNameTemp===""){
        //     setOpenErrorModal(true)
        //     setErrorData("missing_data")
        // }else if(Number(stockAmountTemp)<0){
        //     setOpenErrorModal(true)
        //     setErrorData("negative_amount")
        // }
        // else{
        //     setOpenSaveChanges(true);
        // }
    }

    const handleOpenOptionsCreate = (newData:  string) => {
        const updatedOptions = { ...openOptionsCreate };
        for (const key in updatedOptions) {
            if (Object.prototype.hasOwnProperty.call(updatedOptions, key)) 
            updatedOptions[key as keyof typeof updatedOptions] = (newData===key ? false : true );
        }
        setOpenOptionsCreate(updatedOptions);
    }
    
    const handleDeleteProduct = () => {
        setOpenConfirmDeleteModal(true)
    }
    const handleCloseConfirmDeleteModal = () => {
        setOpenConfirmDeleteModal(false)
    }
    
    useEffect(() => {
        if(isLoading.fieldsFetchCreateStock){
            window.location.reload();
        }
    }, [isLoading]) // To know if after save should reload the page
    useEffect(() => {
        setFilteredData(data.filter((item) => {
          let vals = true
          Object.keys(filteredRows).forEach((arg)=> {
            const str = arg as string;
            let value = filteredRows[str as keyof typeof filteredRows]
    
            if (typeof value == "string")
              value = value.toString().toLowerCase()
            else if (isNaN(value))
              value = ""
            if (value !== "" ){
              if(item[str as keyof typeof item]){
    
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
                    

                    <Paper style={{ height: `calc(100vh - ${(breakpointLG?"375px":"295px")})`, width: '87vw', margin: "12px auto 0 auto" ,borderRadius: "10px"}}>
                        <TableVirtuoso 
                            data={filteredData}
                            // data={data}
                            components={VirtuosoTableComponents}
                            // fixedHeaderContent={fixedHeaderContent}
                            fixedHeaderContent={() => {
                                return (
                                <TableRow>
                                    {columns.map((column:any) => (
                                    <TableCell
                                        key={column._id}
                                        variant="head"
                                        align='center'
                                        style={{ 
                                        width: column.width, 
                                        backgroundColor:"rgb(25, 54, 72)", 
                                        border:0
                                        }}
                                        sx={{
                                        color: "white",
                                        padding: "8px 0",
                                        }}
                                    >
                                    {/* {filters[0].dataKey} */}
                                    {/*                                         
                                        <Typography noWrap
                                            sx={{
                                            padding: "0 4px ",
                                            }}
                                        >
                                            {column.label}
                                        </Typography> */}

                                        <ColumnLabel
                                            column={column}
                                        />
                                        {/* </ColumnLabel> */}


                                        {/* <TextField
                                            // id={column.dataKey}
                                            id={column.dataKey.toString()}
                                            // id="filled-multiline-flexible"
                                            // value={filters[0].dataKey}
                                            // onChange={handleFilterChange}
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
                                        /> */}
                                    </TableCell>
                                    ))}
                                </TableRow>
                                );
                            }}
                            // itemContent={rowContent}
                            itemContent={(index: number) =>
                            // rowContent(index, filteredData[index], columns, classes, openUpdateAmountStock) 
                            rowContent(index, filteredData[index], columns, tableClassNames) 
                            // rowContent(index, filteredData[index], columns)
                            }
                            style={{backgroundColor: "rgb(45, 72, 91)", borderRadius: "10px"}}
                            
                        />
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