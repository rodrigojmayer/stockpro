import * as React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { TableVirtuoso, TableComponents } from 'react-virtuoso';
import { useState, useEffect } from 'react';

import useMediaQuery from '@mui/material/useMediaQuery';
import TextField from '@mui/material/TextField';

interface Data {
  id: number;
  product: string;
  amount: number;
  unit: string;
  category: string;
  sub_category: string;
}

const INITIAL_STATE = {
  id: NaN,
  product: "",
  amount: NaN,
  unit: "",
  category: "",
  sub_category: "",
}

interface ColumnData {
  dataKey: keyof Data;
  label: string;
  numeric?: boolean;
  width: number;
}

type Sample = [string, number, string, string, string];

// const sample: readonly Sample[] = [
//   ['Asadfsagdsgdfhgpsples', 20, "U", "Food", "Fruit"],
//   ['Ice cream sandwich ', 237, "U", "Food", "Dessert"],
//   ['Sugar', 26, "Kgs", "Food", "Seasoning"],
//   ['Milk', 305, "Lts", "Comida", "Lácteo"],
//   ['Chairs', 57, "U", "Furniture", "-"],
//   ['Tables', 36, "U", "Furniture", "-"],
// ];

// function createData(
//   id: number,
//   product: string,
//   amount: number,
//   unit: string,
//   category: string,
//   sub_category: string,
// ): Data {
//   return { id, product, amount, unit, category, sub_category };
// }

const columns: ColumnData[] = [
  {
    width: 120,
    label: 'Product',
    dataKey: 'product',
  },
  {
    width: 80,
    // label: 'Calories\u00A0(g)',
    label: 'Amount',
    dataKey: 'amount',
    numeric: true,
  },
  {
    width: 80,
    label: 'Unit',
    dataKey: 'unit',
  },
  {
    width: 100,
    label: 'Category',
    dataKey: 'category',
    numeric: true,
  },
  {
    width: 100,
    label: 'Sub Category',
    dataKey: 'sub_category',
    numeric: true,
  },
];

// let rowsSearch: Data[] = Array.from({ length: 5 }, (_, index) => {
//   const randomSelection = sample[index];
//   // i++
//   return createData(index, ...randomSelection);
 
// });
// let rows: Data[] = Array.from({ length: 5 }, (_, index) => {
//   const randomSelection = sample[index];
//   // i++
//   return createData(index, ...randomSelection);
 
// });
// console.log(rows)
// console.log(sample)

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


// function fixedHeaderContent() {
//   return (
//     <TableRow>
//       {columns.map((column) => (
//         <TableCell
//           key={column.dataKey}
//           variant="head"
//           align='center'
//           // align={column.numeric || false ? 'right' : 'left'}
//           style={{ 
//             width: column.width, 
//             backgroundColor:"rgb(25, 54, 72)", 
//             border:0
//           }}
//           sx={{
//             // backgroundColor: 'background.paper',
//             color: "white",
//             padding: "8px 0",
//           }}
//         >
//           {column.label}
          
          
//             <TextField
//               // defaultValue={pe}
//               id="filled-multiline-flexible"
//               // label="Multiline"
//               // multiline
//               maxRows={1}
//               size="small"
//               // variant="filled"
//               sx={{
//                 // backgroundColor: 'background.paper',
//                 backgroundColor: "white",
//                 borderRadius: 1,
//                 // height: "50px",
//                 // width: "50px",
//                 margin: "8px",
//             }}
//             InputProps={{
//               style: {
//                 height:"36px",
//               },
//             }}
//               // style={{height: "10px"}}
//             />
         


//         </TableCell>
//       ))}
//     </TableRow>
//   );
// }

function rowContent(_index: number, row: Data) {

  return (
    <React.Fragment >
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
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
          {row[column.dataKey]}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

export default function TableProducts({ data }: { data: Data[] }) {
  const breakpointLG = useMediaQuery('(min-width:1024px)');
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
        if (value !== ""){
          if(!item[str as keyof typeof item].toString().toLowerCase().includes(value.toString())){
            vals = false
            return 
          }
        }
      })
      return vals
    }))
  }, [ filteredRows, data]);
  

  return (
    <Paper style={{ height: `calc(100vh - ${(breakpointLG?"32px":"150px")})`, width: '94vw', margin: "12px auto 0 auto"}}>
      <TableVirtuoso
        data={filteredData}
        // data={data}
        components={VirtuosoTableComponents}
        // fixedHeaderContent={fixedHeaderContent}
        fixedHeaderContent={() => {
            return (
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.dataKey}
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
                    {column.label}
                      <TextField
                        id={column.dataKey}
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
        itemContent={rowContent}
        style={{backgroundColor: "rgb(45, 72, 91)"}}
        
      />
    </Paper>
  );
}