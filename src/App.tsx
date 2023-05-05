import { useEffect, useState } from 'react'
// import './App.css'
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



// type Sample = [string, number, string, string, string];
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
];


function App() {

  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState(sample)
  const [filteredData, setFilteredData] = useState(data)

  useEffect(() => {
    setFilteredData(data.filter((item) =>
    item.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.amount.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.unit.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.sub_category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
    ));
  }, [data, searchQuery])

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Layout>
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
          

          <TableProducts data={filteredData} />



        </Layout>
      </ThemeProvider>
      
      
    </div>
  )
}

export default App
