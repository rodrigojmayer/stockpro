import { useEffect, useState, useContext, useCallback } from 'react'
import { Container, Typography, Grid } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

import { OkButton, CancelButton, PlusButton } from './components/Buttons';
import Layout from './components/Layout';
import MainSearch from './components/MainSearch';
import TableProducts from './components/TableProducts';
import CreateStock from './components/CreateStock';
import UpdateAmountStock from './components/UpdateAmountStock';
import { Data, ColumnData, CustomValueData, UserData, ProductUpdateData } from './types';
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
})

const idColumnsTableOrder: Number[] = [1, 2, 3, 4]
    

function App() {
  // console.log("Rerender App: ")

  const [ searchQuery, setSearchQuery ] = useState("")
  
  
  const [ showCreateStock, setShowCreateStock ] = useState(false)
  const handleCloseCreateStock = () => setShowCreateStock(false)
  const openCreateStock = () => setShowCreateStock(true)

  // const [ productUpdate, setProductUpdate ] = useState<ProductUpdateData>({
  //   "id_prod": 0,
  //   "name_prod": "",
  //   "amount_prod": 0,
  //   "measure_prod": "",
  //   "alert_amount": 0,
  // })
  const [ productUpdate, setProductUpdate ] = useState<Data>({
    "_id":0,
    "id": 0,
    "id_client": 0,
    "product": "",
    "amount": 0,
    "measure": "",
    "category": "",
    "sub_category": "",
    "code": "",
    "price": "",
    "description": "",
    "url_image": "",
    "alert_amount": 0,
    "alert_date": "",
    // "alert_on": false,
  })
  const [ showUpdateAmountStock, setShowUpdateAmountStock ] = useState(false)
  const handleCloseUpdateAmountStock = () => setShowUpdateAmountStock(false)
  // const openUpdateAmountStock = (newData:ProductUpdateData) => {
  const openUpdateAmountStock = (newData:Data) => {
    setShowUpdateAmountStock(true)
    // setProductUpdate({
    //   "id_prod": newData.id_prod,
    //   "name_prod": newData.name_prod,
    //   "amount_prod": newData.amount_prod,
    //   "measure_prod": newData.measure_prod,
    //   "alert_amount": newData.alert_amount
    // })
    let dateObject
    let formattedDate
    // console.log("newData.alert_date: ", newData.alert_date)
    if(typeof newData.alert_date === 'string'){
      // console.log("newData.alert_date.substring(0,2): ", newData.alert_date.substring(0,2))
      const dateDay = newData.alert_date.substring(0,2)
      const dateMonth = newData.alert_date.substring(3,5)
      const dateYear = newData.alert_date.substring(6,10)
      // console.log("dateDay: ", dateDay)
      // console.log("dateMonth: ", dateMonth)
      // console.log("dateYear: ", dateYear)
      const dateString = `${dateYear}-${dateMonth}-${dateDay}T00:00:00Z`
      dateObject = new Date(dateString)
      formattedDate = dateObject.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      });
    } else {
      dateObject = newData.alert_date
      formattedDate = newData.alert_date
    }

    console.log("dateObject: ", dateObject)
    console.log("formattedDate: ", formattedDate)

    setProductUpdate({
      "_id": newData._id,
      "id": newData.id,
      "id_client": newData.id_client,
      "product": newData.product,
      "amount": newData.amount,
      "measure": newData.measure,
      "category": newData.category,
      "code": newData.code,
      "price": newData.price,
      "description": newData.description,
      "url_image": newData.url_image,
      "sub_category": newData.sub_category,
      "alert_amount": newData.alert_amount,
      "alert_date": formattedDate,
      // "alert_on": newData.alert_on,
    })
  }  

  const { user } = useContext<any>(UserContext);
  const { isLoading, setIsLoading, openBackdrop, setOpenBackdrop } = useContext<any>(IsLoadingContext);
  const { defaultColumns, customColumns, columns, columnsUserOrder, filteredColumnsCustom  } = useContext<any>(ColumnsContext);
  const { products } = useContext<any>(ProductsContext)
  

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
                <TableProducts data={filteredData} columns={columnsUserOrder} openUpdateAmountStock={openUpdateAmountStock} />
              }
              
            </Layout>
            <CreateStock
                open={showCreateStock} 
                handleClose={handleCloseCreateStock} 
                data={filteredData}
                columnsCustom={filteredColumnsCustom}
            />
            <UpdateAmountStock
                open={showUpdateAmountStock} 
                handleClose={handleCloseUpdateAmountStock} 

                productUpdate={productUpdate} 
            />
          </ThemeProvider>
        </div>
  )
}
export default App