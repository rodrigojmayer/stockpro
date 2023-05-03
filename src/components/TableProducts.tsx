import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso, TableComponents } from 'react-virtuoso';

interface Data {
  amount: number;
  category: string;
  product: string;
  unit: string;
  id: number;
  sub_category: string;
}

interface ColumnData {
  dataKey: keyof Data;
  label: string;
  numeric?: boolean;
  width: number;
}

type Sample = [string, number, string, string, string];

const sample: readonly Sample[] = [
  ['Apples', 20, "U", "Food", "Fruit"],
  ['Ice cream sandwich ', 237, "U", "Food", "Dessert"],
  ['Sugar', 26, "Kgs", "Food", "Seasoning"],
  ['Milk', 305, "Lts", "Comida", "Lácteo"],
  ['Chairs', 57, "U", "Furniture", "-"],
  ['Tables', 36, "U", "Furniture", "-"],
];

function createData(
  id: number,
  product: string,
  amount: number,
  unit: string,
  category: string,
  sub_category: string,
): Data {
  return { id, product, amount, unit, category, sub_category };
}

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

const rows: Data[] = Array.from({ length: 20 }, (_, index) => {
  const randomSelection = sample[Math.floor(Math.random() * sample.length)];
  return createData(index, ...randomSelection);
});

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

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column, id) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align='center'
          // align={column.numeric || false ? 'right' : 'left'}
          style={{ 
            width: column.width, 
            backgroundColor:"rgb(25, 54, 72)", 
            border:0
          }}
          sx={{
            // backgroundColor: 'background.paper',
            color: "white",
            padding: "8px 0",
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

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

export default function TableProducts() {
  return (
    <Paper style={{ height: 490, width: '90vw', margin: "auto"}}>
      <TableVirtuoso
        data={rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}