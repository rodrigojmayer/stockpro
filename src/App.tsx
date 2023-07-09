import { useEffect, useState } from 'react'
import { Container, Typography, Grid } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { OkButton, CancelButton, PlusButton } from './components/Buttons';
import Layout from './components/Layout';
import MainSearch from './components/MainSearch';
import TableProducts from './components/TableProducts';
import CreateStock from './components/CreateStock';
import { Data, ColumnData, CustomValueData, UserData } from './types';
// import {  } from './data';

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

const user: UserData = {
  id: 1, client: 2, name: "Rodrigo", user: "rmayer", pass: "123", deleted: false, enabled: true
}

const sample:  Data[] = [
  {id: 1, product: 'Apples', amount: 20, measure: "U", category: "Food", sub_category: "Fruit", customFields: [{ color: "Red"}],},
  {id: 2, product: 'Ice cream sandwich', amount: 237, measure: "U", category: "Food", sub_category: "Dessert", customFields: [{ color: "Black"}],},
  {id: 3, product: 'Sugar', amount: 26, measure: "Kgs", category: "Food", sub_category: "Seasoning", customFields: [{ color: "White"}],},
  {id: 4, product: 'Milk', amount: 305, measure: "Lts", category: "Food", sub_category: "Dairy"},
  {id: 5, product: 'Chairs', amount: 57, measure: "U", category: "Furniture", sub_category: "-"},
  {id: 6, product: 'Tables', amount: 36, measure: "U", category: "Furniture", sub_category: "-"},
  {id: 7, product: 'Apples', amount: 20, measure: "U", category: "Food", sub_category: "Fruit"},
  {id: 8, product: 'Ice cream sandwich', amount: 237, measure: "U", category: "Food", sub_category: "Dessert"},
  {id: 9, product: 'Sugar', amount: 26, measure: "Kgs", category: "Food", sub_category: "Seasoning"},
  {id: 10, product: 'Milk', amount: 305, measure: "Lts", category: "Food", sub_category: "Dairy"},
  {id: 11, product: 'Chairs', amount: 57, measure: "U", category: "Furniture", sub_category: "-"},
  {id: 12, product: 'Tables', amount: 36, measure: "U", category: "Furniture", sub_category: "-"},
];

const columnsDefault: ColumnData[] = [
  { id: 1, width: 120, label: 'Product', dataKey: 'product', deleted: false },
  { id: 2, width: 80, label: 'Amount', dataKey: 'amount', numeric: true, deleted: false  },
  { id: 3, width: 80, label: 'Measure', dataKey: 'measure', deleted: false  },
  { id: 4, width: 100, label: 'Category', dataKey: 'category', numeric: true, deleted: false  },
  { id: 5, width: 100, label: 'Sub Category', dataKey: 'sub_category', numeric: true, deleted: false  },
];
const columnsCustom: ColumnData[] = [
  { id: 16, width: 120, label: 'Size', dataKey: 'size', id_client: 2, deleted: true  },
  { id: 17, width: 100, label: 'Color client 2', dataKey: 'color', id_client: 2, deleted: false  },
  { id: 18, width: 100, label: 'Color client 3', dataKey: 'color', id_client: 3, deleted: false  }
];

const filteredColumnsCustom : ColumnData[] =  columnsCustom.filter((element) => {
  return element.id_client === user.client && element.deleted === false
})

// const columns: ColumnData[] = columnsDefault.concat(
//   columnsCustom.filter((column) => column.id_client === user.client && column.deleted === false)
// );
const columns: ColumnData[] = columnsDefault.concat(filteredColumnsCustom);

const idColumnsTableOrder: Number[] = [1, 2, 3, 4];
// const idColumnsHiddenFields: Number[] = [5, 6, 17];

     

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(sample)
  

  const [showCreateStock, setShowCreateStock] = useState(false);


  
  const handleCloseCreateStock = () => setShowCreateStock(false)
  const openCreateStock = () => setShowCreateStock(true)

  useEffect(() => {
    
    setFilteredData(sample.filter((item) => {

      // console.log("item: ", item)
      // let newItem = { ...item } // Create a copy of the item to add in the same level the customFields

      // // console.log("newItem: ", newItem)
      // if (newItem.customFields) {
      //   // Merge the customFields into the item and delete the initial customFields object
      //   newItem.customFields.map((customField:any) => {
          
      //   newItem = {
      //     ...newItem,
      //     ...customField.id_custom_field_product
      //   }
      //   })
        
      // }
      // console.log("newItem: ", newItem)

      return item.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.amount.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.measure.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sub_category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    }

    ));
    // console.log("filteredData: ", filteredData)
}, [ ])

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Layout 
        // columns={columns} 
        columnsDefault={columnsDefault} 
        columnsCustom={columnsCustom}
        idColumnsTableOrder={idColumnsTableOrder} 

        // columnsHiddenFields={idColumnsHiddenFields} 
        >
          <Container maxWidth="md" style={{padding: "0"}} >
            <Grid container>
              <Grid item xs={10} >
                <MainSearch setSearchQuery={setSearchQuery} />
              </Grid>
              <Grid item xs={2} >
                <PlusButton
                  clicked={openCreateStock} 
                />
              </Grid>
            </Grid>
          </Container>
          <TableProducts data={filteredData} columns={columns} />
        </Layout>
        <CreateStock
            open={showCreateStock} 
            handleClose={handleCloseCreateStock} 
            data={filteredData}
            columnsCustom={filteredColumnsCustom}
        />
      </ThemeProvider>
      
    </div>
  )
}
export default App