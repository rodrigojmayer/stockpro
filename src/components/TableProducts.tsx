import * as React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Box } from '@mui/material';
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
import { blueGrey } from '@material-ui/core/colors';
// import { useStyles } from '@material-ui/pickers/views/Calendar/SlideTransition';


// type TableClasses = ReturnType<typeof useStyles>;

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
function rowContent(_index: number, row: Data, columns: ColumnData[], classes: any, openUpdateAmountStock:(newData: Data) => void) {

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
      {columns.map((column) => (
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
            // padding: "8px 0",
            padding: "0",
          }}
        >
          <div 
            className={`${ ((newRow.alerted_amount && newRow.alert_amount_enabled) || (newRow.alerted_date && newRow.alert_date_enabled)) ? classes.alert_on  : "" } ${classes.rows}`}
          > 
          { ( column.dataKey === "check_stock" ) ? 
            <Checkbox 
              onClick={(e)=> {
                e.stopPropagation() // Prevent the click event from propagating to the parent cell
                alert()
              }}
              // sx={{
              //   color: blueGrey[50],
              //   '&.Mui-checked': {
              //     color: blueGrey[50],
              //   },
              // }}
              color="default"
            />
          :
            <Typography noWrap 
            sx={{
              padding: "0 4px ",
            }}>
              { ( newRow[column.dataKey] || newRow[column.dataKey] === 0 ) ? newRow[column.dataKey] : "-"}

            </Typography>
          }
          </div>

        </TableCell>
      ))}
    </React.Fragment>
  );
}

export default function TableProducts({ data, openUpdateAmountStock }:  DataTable ) {

  const  {classes} = tableStyles()
  const breakpointLG = useMediaQuery('(min-width:1024px)');

  const { user } = useContext<any>(UserContext);
  const { defaultColumns, customColumns, columnsUserOrder, filteredColumnsCustom  } = useContext<any>(ColumnsContext);

  // const columns = columnsUserOrder
  const columns2 = columnsUserOrder
  const elementToAdd = {dataKey: "check_stock", id: 0, width: 40,}
  // const columns2 = columns
  // columns2.unshift({1: "1"})
  const columns = [elementToAdd, ...columns2];
  // console.log("newArray: ", newArray)
  console.log("columns: ", columns)
  
  const [filteredRows, setFilteredRows] = useState<Data>(INITIAL_STATE);
  const [filteredData, setFilteredData] = useState(data)

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  
    setFilteredRows({ ...filteredRows, [event.target.id]: (event.target.value) })
  };
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
    <Paper style={{ height: `calc(100vh - ${(breakpointLG?"32px":"150px")})`, width: '94vw', margin: "12px auto 0 auto" ,borderRadius: "10px"}}>
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
                    key={column.id}
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
                    
                      <Typography noWrap
                        sx={{
                          padding: "0 4px ",
                        }}
                      >
                        {column.label}
                      </Typography>
                       
                      { ( column.dataKey === "check_stock" ) ? 
                        <Checkbox  
                          onClick={(e)=> {
                            e.stopPropagation() // Prevent the click event from propagating to the parent cell
                            alert()
                          }} 
                          sx={{
                            color: blueGrey[50],
                            '&.Mui-checked': {
                              color: blueGrey[50],
                            },
                          }}
                          // color="default"
                        />
                      :
                          <TextField
                            // id={column.dataKey}
                            id={column.dataKey.toString()}
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
          rowContent(index, filteredData[index], columns, classes, openUpdateAmountStock) 
          // rowContent(index, filteredData[index], columns)
        }
        style={{backgroundColor: "rgb(45, 72, 91)", borderRadius: "10px"}}
        
      />
    </Paper>
  );
}