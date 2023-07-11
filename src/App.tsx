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

// const columnsDefault: ColumnData[] = [
//   { id: 1, width: 120, label: 'Product', dataKey: 'product', numeric: false, deleted: false },
//   { id: 2, width: 80, label: 'Amount', dataKey: 'amount', numeric: true, deleted: false  },
//   { id: 3, width: 80, label: 'Measure', dataKey: 'measure', numeric: false, deleted: false  },
//   { id: 4, width: 100, label: 'Category', dataKey: 'category', numeric: true, deleted: false  },
//   { id: 5, width: 100, label: 'Sub Category', dataKey: 'sub_category', numeric: true, deleted: false  },
// ];
// const columnsCustom: ColumnData[] = [
//   { id: 16, width: 120, label: 'Size', dataKey: 'size', id_client: 2, deleted: true  },
//   { id: 17, width: 100, label: 'Color client 2', dataKey: 'color', id_client: 2, deleted: false  },
//   { id: 18, width: 100, label: 'Color client 3', dataKey: 'color', id_client: 3, deleted: false  }
// ];
let filteredColumnsCustom : ColumnData[] 
// const filteredColumnsCustom : ColumnData[] =  columnsCustom.filter((element) => {
//   return element.id_client === user.client && element.deleted === false
// })

// // const columns: ColumnData[] = columnsDefault.concat(
// //   columnsCustom.filter((column) => column.id_client === user.client && column.deleted === false)
// // );
// const columns: ColumnData[] = columnsDefault.concat(filteredColumnsCustom);

const idColumnsTableOrder: Number[] = [1, 2, 3, 4];
// const idColumnsHiddenFields: Number[] = [5, 6, 17];

     

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(sample)
  

  const [showCreateStock, setShowCreateStock] = useState(false);


  
  const handleCloseCreateStock = () => setShowCreateStock(false)
  const openCreateStock = () => setShowCreateStock(true)

  const [defaultColumns, setDefaultColumns] = useState<ColumnData[]>([])
  const [customColumns, setCustomColumns] = useState<ColumnData[]>([])
  const [columns, setColumns] = useState<ColumnData[]>([])
  // const columns: ColumnData[] = columnsDefault.concat(filteredColumnsCustom);
  const [isLoading, setIsLoading] = useState({
    defaultColumns: true,
    customColumns: true,
    columns: true,
  }); // New state for loading status

  useEffect(() => {

    const fetchDefaultColumns = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/defaultColumns/')
        if (response.ok) {
          const json = await response.json()
          setDefaultColumns(json)
        } else {
        // Handle the case where the response is not OK (e.g., show an error message)
      }
      } catch (error) {
        // Handle any network or fetch-related errors
      } finally {
        setIsLoading((prevLoading) => ({
          ...prevLoading,
          defaultColumns: false,
        }));
      }
    }
    const fetchCustomColumns = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/customColumns/')
        if (response.ok) {
          const json = await response.json()
          setCustomColumns(json)
        } else {
        // Handle the case where the response is not OK (e.g., show an error message)
      }
      } catch (error) {
        // Handle any network or fetch-related errors
      } finally {
        setIsLoading((prevLoading) => ({
          ...prevLoading,
          customColumns: false,
        }));
      }
    }
    fetchDefaultColumns();
    fetchCustomColumns();

    setFilteredData(sample.filter((item) => {

      return item.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.amount.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.measure.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sub_category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    }

    ));
    // console.log("filteredData: ", filteredData)
}, [ ]) 

useEffect(() => {
  if (!isLoading.defaultColumns && !isLoading.customColumns) {
    const filteredColumnsCustom = customColumns.filter((element) => {
      return element.id_client === user.client && element.deleted === false;
    });
    setColumns(defaultColumns.concat(filteredColumnsCustom));
    setIsLoading((prevLoading) => ({
      ...prevLoading,
      columns: false,
    }));
  }
}, [defaultColumns, customColumns, isLoading.defaultColumns, isLoading.customColumns]);



  // Wait for the defaultColumns to be fetched before rendering the TableProducts component
  if (isLoading.defaultColumns || isLoading.customColumns || isLoading.columns) {
    return <div>Loading...</div>;
  }

  console.log("defaultColumns: ", defaultColumns)
  console.log("customColumns: ", customColumns)
  console.log("columns: ", columns)
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Layout 
        // columns={columns} 
        // columnsDefault={columnsDefault} 
        // columnsCustom={columnsCustom}
        columnsDefault={defaultColumns} 
        columnsCustom={customColumns}
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