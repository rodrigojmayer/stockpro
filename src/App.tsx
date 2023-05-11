import { useEffect, useState } from 'react'
import List from './components/List'
import { Container, Typography, Grid } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { OkButton, CancelButton, PlusButton } from './components/Buttons';
import Layout from './components/Layout';
import MainSearch from './components/MainSearch';
import TableProducts from './components/TableProducts';

const INITIAL_DATA = [
  {id: 1, name: "Product A"},
  {id: 2, name: "Product B"},
  {id: 3, name: "Product C"},
]

const theme = createTheme({
  typography: {
    fontFamily: [
      '"Asap Condensed"',
    ].join(','),
    fontSize: 20,
  },
});

type Data = {
  id: number;
  product: string;
  amount: number;
  unit: string;
  category: string;
  sub_category: string;
}
const sample:  Data[] = [
  {id: 1, product: 'Apples', amount: 20, unit: "U", category: "Food", sub_category: "Fruit"},
  {id: 2, product: 'Ice cream sandwich ', amount: 237, unit: "U", category: "Food", sub_category: "Dessert"},
  {id: 3, product: 'Sugar', amount: 26, unit: "Kgs", category: "Food", sub_category: "Seasoning"},
  {id: 4, product: 'Milk', amount: 305, unit: "Lts", category: "Food", sub_category: "Dairy"},
  {id: 5, product: 'Chairs', amount: 57, unit: "U", category: "Furniture", sub_category: "-"},
  {id: 6, product: 'Tables', amount: 36, unit: "U", category: "Furniture", sub_category: "-"},
  {id: 1, product: 'Apples', amount: 20, unit: "U", category: "Food", sub_category: "Fruit"},
  {id: 2, product: 'Ice cream sandwich ', amount: 237, unit: "U", category: "Food", sub_category: "Dessert"},
  {id: 3, product: 'Sugar', amount: 26, unit: "Kgs", category: "Food", sub_category: "Seasoning"},
  {id: 4, product: 'Milk', amount: 305, unit: "Lts", category: "Food", sub_category: "Dairy"},
  {id: 5, product: 'Chairs', amount: 57, unit: "U", category: "Furniture", sub_category: "-"},
  {id: 6, product: 'Tables', amount: 36, unit: "U", category: "Furniture", sub_category: "-"},
];

interface ColumnData {
  id: number;
  dataKey: string;
  label: string;
  numeric?: boolean;
  width: number;
}
type Sample = [number, string, number, string, string, string];
const columns: ColumnData[] = [
  { id: 1, width: 120, label: 'Product', dataKey: 'product' },
  { id: 2, width: 80, label: 'Amount', dataKey: 'amount', numeric: true },
  { id: 3, width: 80, label: 'Unit', dataKey: 'unit' },
  { id: 4, width: 100, label: 'Category', dataKey: 'category', numeric: true },
  { id: 5, width: 100, label: 'Sub Category', dataKey: 'sub_category', numeric: true },
];
const columnsCustom: ColumnData[] = [
  { id: 16, width: 120, label: 'Product', dataKey: 'product2' },
  { id: 17, width: 80, label: 'Amount', dataKey: 'amount2', numeric: true },
];

const columnsTableOrder: ColumnData[] = [
  { id: 1, width: 120, label: 'Product', dataKey: 'product' },
  { id: 2, width: 80, label: 'Amount', dataKey: 'amount', numeric: true },
  { id: 3, width: 80, label: 'Unit', dataKey: 'unit' },
  { id: 4, width: 100, label: 'Category', dataKey: 'category', numeric: true },
];
const columnsHiddenFields: ColumnData[] = [
  { id: 5, width: 100, label: 'Sub Category', dataKey: 'sub_category', numeric: true },
  { id: 6, width: 120, label: 'Product2', dataKey: 'product2' },
  { id: 17, width: 80, label: 'Amount2', dataKey: 'amount2', numeric: true },
];
function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(sample)

  useEffect(() => {
    setFilteredData(sample.filter((item) => {
     return item.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.amount.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.unit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sub_category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())

    }
    ));
}, [ searchQuery])

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Layout 
        columns={columns} 
        columnsTableOrder={columnsTableOrder} 
        columnsHiddenFields={columnsHiddenFields} 
        columnsCustom={columnsCustom}
        >
          <Container maxWidth="md" style={{padding: "0"}} >
            <Grid container>
              <Grid item xs={10} >
                <MainSearch setSearchQuery={setSearchQuery} />
              </Grid>
              <Grid item xs={2} >
                <PlusButton/>
              </Grid>
            </Grid>
          </Container>
          <TableProducts data={filteredData} columns={columns} />
        </Layout>
      </ThemeProvider>
    </div>
  )
}
export default App