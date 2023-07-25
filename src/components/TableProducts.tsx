import * as React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { TableVirtuoso, TableComponents } from 'react-virtuoso';
import { useState, useEffect, useContext } from 'react';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import TextField from '@mui/material/TextField';
import { Data, DataTable, ColumnData } from '../types';
import { UserContext } from '../context/UserContext'
import { ColumnsContext } from '../context/ColumnsContext'



const INITIAL_STATE = {
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

// const additionalFields = {
//   custom_fields: {},
// }
// const mergedInitialState = {
//   ...INITIAL_STATE,
//   ...additionalFields,
// }
// interface DataMerged {
//   id: number;
//   product: string;
//   amount: number;
//   measure: string;
//   category: string;
//   sub_category: string;
//   [key: string]: any;
//   custom_fields: object;
// }

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


function rowContent(_index: number, row: Data, columns: ColumnData[]) {

  
    // console.log("_index: ", _index)
    // console.log("row: ", row)
    // console.log("row.custom_fields: ", row.custom_fields)
    // console.log("row.custom_fields: ", row.custom_fields)
    // console.log("columns: ", columns)
      let newRow = { ...row } // Create a copy of the item to add in the same level the custom_fields

      // console.log("newRow: ", newRow)
      if (newRow.custom_fields) {
        // Merge the custom_fields into the item and delete the initial custom_fields object
        // newRow = {
        //   ...newRow,
        //   ...newRow.custom_fields,
        //   custom_fields: undefined,
        // }
        newRow.custom_fields.map((custom_fields:any) => {
          
          newRow = {
              ...newRow,
              ...custom_fields
            }
            })
      }
      
      // console.log("newRow: ", newRow)

  return (
    <React.Fragment >
      {columns.map((column) => (
        <TableCell
          key={column.id}
          align='center'
          // align={column.numeric || false ? 'right' : 'left'}
          style={{ 
            backgroundColor: _index%2?"rgb(162, 199, 220)":"rgb(69, 144, 186)", 
            border:0,
          }}
          sx={{
            padding: "8px 0",
          }}
        >

          <Typography noWrap 
          sx={{
            padding: "0 4px ",
          }}>
            { newRow[column.dataKey] }
            {/* {column.dataKey} */}

          </Typography>

        </TableCell>
      ))}
    </React.Fragment>
  );
}

export default function TableProducts({ data }:  DataTable ) {
  // export default function TableProducts({ data, columns }:  DataTable ) {
// export default function TableProducts({ data }: { data: Data[] }) {
  const breakpointLG = useMediaQuery('(min-width:1024px)');

  const { user } = useContext<any>(UserContext);
  const { defaultColumns, customColumns, columnsUserOrder, filteredColumnsCustom  } = useContext<any>(ColumnsContext);

  const columns = columnsUserOrder
  
  const [filteredRows, setFilteredRows] = useState<Data>(INITIAL_STATE);
  // const [filteredRows, setFilteredRows] = useState<Data>(INITIAL_STATE);
    // console.log("data: ", data)
  const [filteredData, setFilteredData] = useState(data)

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilteredRows({ ...filteredRows, [event.target.id]: (event.target.value) })
  };
  useEffect(() => {
    // console.log("data: ", data)
    // console.log("filteredRows: ", filteredRows)
    // console.log("filteredData: ", filteredData)
    // console.log("columns: ", columns)
    setFilteredData(data.filter((item) => {
      let vals = true
      Object.keys(filteredRows).forEach((arg)=> {
        const str = arg as string;
        let value = filteredRows[str as keyof typeof filteredRows]

        // console.log("value: ", value)
        if (typeof value == "string")
          value = value.toString().toLowerCase()
        else if (isNaN(value))
          value = ""
        if (value !== "" ){
          // console.log("item: ", item)
          // console.log("str: ", str)
          // console.log("str as keyof typeof item: ", str as keyof typeof item)
          // console.log("item[str as keyof typeof item]: ", item[str as keyof typeof item])
          // console.log("item.custom_fields: ", item.custom_fields)
          // if(item.custom_fields)
          //   console.log("item.custom_fields[0][str as keyof typeof item]: ", item.custom_fields[0][str as keyof typeof item])
          
          if(item[str as keyof typeof item]){
            // console.log("llega aqui?")

            if(!item[str as keyof typeof item].toString().toLowerCase().includes(value.toString())){
              vals = false
              // console.log("a_________________________")
              // return 
            }
          } 
          else if(item.custom_fields ){
            // console.log("item.custom_fields: ", item.custom_fields)
            if(item.custom_fields[0]){
              // console.log("item.custom_fields[0]: ", item.custom_fields[0])
              if(item.custom_fields[0][str as keyof typeof item] || item.custom_fields[0][str as keyof typeof item] == ""){
                // console.log("item.custom_fields[0][str as keyof typeof item]: ", item.custom_fields[0][str as keyof typeof item])
                if(!item.custom_fields[0][str as keyof typeof item].toString().toLowerCase().includes(value.toString())){
                  
                  // console.log("llega aqui?")
                  vals = false
                  // console.log("s_________________________")
                  // return 
                }
              }
              else{
                vals = false
                // return

              }
            }
            else{
              vals = false
              // return

            }
          }
        }
      })
      // console.log("d_________________________")
      return vals
    }))
    // console.log("filteredRows: ", filteredRows)
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
                      <TextField
                        // id={column.dataKey}
                        id={column.dataKey.toString()}
                        // id="filled-multiline-flexible"
                        // value={filters[0].dataKey}
                        onChange={handleFilterChange}
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
                      />
                  </TableCell>
                ))}
              </TableRow>
            );
          }}
        // itemContent={rowContent}
        itemContent={(index: number) =>
          rowContent(index, filteredData[index], columns)
        }
        style={{backgroundColor: "rgb(45, 72, 91)", borderRadius: "10px"}}
        
      />
    </Paper>
  );
}