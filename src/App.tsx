import { useEffect, useState, useContext, useMemo } from 'react'
import { Container, Typography, Grid } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

import { OkButton, CancelButton, PlusButton } from './components/Buttons';
import Layout from './components/Layout';
import MainSearch from './components/MainSearch';
import TableProducts from './components/TableProducts';
import CreateStock from './components/CreateStock';
import EditStock from './components/EditStock';
import { Data, ColumnData, CustomValueData, UserData } from './types';
import { UserContext } from './context/UserContext';
import { IsLoadingContext } from './context/IsLoadingContext';
import { ColumnsContext } from './context/ColumnsContext';
import { ProductsContext } from './context/ProductsContext';


const theme = createTheme({
  typography: {
    fontFamily: [
      '"Asap Condensed"',
    ].join(','),
    fontSize: 20,
  },
});

const idColumnsTableOrder: Number[] = [1, 2, 3, 4];
    

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  
  
  const [showCreateStock, setShowCreateStock] = useState(false);
  const [showEditStock, setShowEditStock] = useState(false);
  
  const handleCloseCreateStock = () => setShowCreateStock(false)
  const openCreateStock = () => setShowCreateStock(true)

  const handleCloseEditStock = () => setShowEditStock(false)
  // const openEditStock = () => setShowEditStock(true)
  const openEditStock = () => alert("test onlick")
  
  const { user } = useContext<any>(UserContext);
  const { isLoading, setIsLoading, openBackdrop, setOpenBackdrop } = useContext<any>(IsLoadingContext);
  const { defaultColumns, customColumns, columns, columnsUserOrder, filteredColumnsCustom  } = useContext<any>(ColumnsContext);
  const { products } = useContext<any>(ProductsContext);
  

  const [filteredData, setFilteredData] = useState([])
    
  useEffect(() => {
    
  
      setFilteredData(
        products.filter((item:any) => {
          const filteredColumnsCustomUser = filteredColumnsCustom.filter((item1:any) => 
            columnsUserOrder.some((item2: any) => item2.dataKey === item1.dataKey)
          )
          return (
            defaultColumns.some((column:any) => 
              item[column.dataKey] &&
              item[column.dataKey]
                .toString()
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) 
            ) || (
              item.custom_fields &&
              filteredColumnsCustomUser
                .some((customColumn:any) =>
                        Object.entries(item.custom_fields).filter(
                          ([key, value]) => 
                          (value as string).toString().toLowerCase().includes(searchQuery.toLowerCase())
                          && key == customColumn.dataKey
                        ).length
              )
            )
          )
        })
      );

  }, [searchQuery, columns, products]) 


  useEffect(() => {
    if ( isLoading.columns || isLoading.products || isLoading.customColumns || isLoading.fieldsFetchEditCustomColumn || isLoading.fieldsFetchCreateCustomColumn || isLoading.fieldsFetchEditUsersFieldsOrder) {
      setOpenBackdrop(true)
    } else {
      setOpenBackdrop(false)
    }

  }, [isLoading])

  return (
        <div className="App">
          
          <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openBackdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
          <ThemeProvider theme={theme}>
            <Layout 
              columnsDefault={defaultColumns} 
              columnsCustom={customColumns}
              idColumnsTableOrder={idColumnsTableOrder} 
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
              {openBackdrop ? "": 
                <TableProducts data={filteredData} columns={columnsUserOrder} openEditStock={openEditStock} />
              }
              
            </Layout>
            <CreateStock
                open={showCreateStock} 
                handleClose={handleCloseCreateStock} 
                data={filteredData}
                columnsCustom={filteredColumnsCustom}
            />
            <EditStock
                open={showEditStock} 
                handleClose={handleCloseEditStock} 
                data={filteredData}
                columnsCustom={filteredColumnsCustom}
            />
          </ThemeProvider>
        </div>
  )
}
export default App