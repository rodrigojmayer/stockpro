import { useEffect, useState, useContext } from 'react'
import { Container, Grid } from '@mui/material'
// import { ThemeProvider, createTheme } from '@mui/material/styles';
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import { PlusButton, UpdateButton } from '../components/Buttons';
import ModalsGroup from '../components/ModalsGroup';
import MainSearch from '../components/MainSearch';
import TableProducts from '../components/TableProducts';
import ManageStock from '../components/ManageStock';
import UpdateAmountStock from '../components/UpdateAmountStock';
import { Data } from '../types';
import { UserContext } from '../context/UserContext';
import { IsLoadingContext } from '../context/IsLoadingContext';
import { ColumnsContext } from '../context/ColumnsContext';
import { ProductsContext } from '../context/ProductsContext';
import MassiveUpdateStock from '../components/MassiveUpdateStock';
import { CheckListStockContext } from '../context/CheckListStockContext';
import useMediaQuery from '@mui/material/useMediaQuery';
import { LanguageLabelsContext } from '../context/LanguageLabelsContext';

const idColumnsTableOrder: Number[] = [-1, -2, -3, -4]

function Home() {
  const breakpointLG = useMediaQuery('(min-width:1024px)');
  const { isLoading, setIsLoading, openBackdrop, setOpenBackdrop } = useContext<any>(IsLoadingContext);
  const { defaultColumns, customColumns, columns, columnsUserOrder, filteredColumnsCustom  } = useContext<any>(ColumnsContext);
  const { products } = useContext<any>(ProductsContext)
  const { labelsManageStock } = useContext<any>(LanguageLabelsContext)
  // console.log("products: ", products)
  const { checkListStock, setCheckListStock } = useContext<any>(CheckListStockContext)
  const [ searchQuery, setSearchQuery ] = useState("")
  const [ showCreateStock, setShowCreateStock ] = useState(false)
  const handleCloseCreateStock = () => setShowCreateStock(false)
  const openCreateStock = () => setShowCreateStock(true)
  const [ productUpdate, setProductUpdate ] = useState<Data>({
    "_id": "",
    "id": 0,
    "id_client": 0,
    "product": "",
    "amount": 0,
    "measure": "",
    "category": "",
    "sub_category": "",
    "id_sub_category": 1,
    "code": "",
    "price": "",
    "description": "",
    "url_image": "",
    "alert_amount": 0,
    "alert_amount_enabled": true,
    "alerted_amount": false,
    "alert_date": "",
    "alert_date_enabled": true,
    "alerted_date": false,
    "custom_fields": [],
  })
  const [ showUpdateAmountStock, setShowUpdateAmountStock ] = useState(false)
  const handleCloseUpdateAmountStock = () => setShowUpdateAmountStock(false)
  const openUpdateAmountStock = (newData:Data) => {
    // console.log("products: ", products)
    // console.log("newData: ", newData)

    setShowUpdateAmountStock(true)
    let dateObject
    let formattedDate
    if(typeof newData.alert_date === 'string'){
      const dateDay = newData.alert_date.substring(0,2)
      const dateMonth = newData.alert_date.substring(3,5)
      const dateYear = newData.alert_date.substring(6,10)
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
      "id_sub_category": newData.id_sub_category,
      "alert_amount": newData.alert_amount,
      "alert_amount_enabled": newData.alert_amount_enabled,
      "alerted_amount": newData.alerted_amount,
      "alert_date": formattedDate,
      "alert_date_enabled": newData.alert_date_enabled,
      "alerted_date": newData.alerted_date,
      "custom_fields": newData.newRow.custom_fields,
    })
  }  

  const [ disabledUpdateButton, setDisabledUpdateButton ] = useState<boolean>(true)
  const handleDisabledUpdateButton = (value_disable:boolean) => {
    setDisabledUpdateButton(value_disable)
  }
  
  const [ massiveUpdate, setMassiveUpdate] = useState<Data[]>([{
    "_id": "",
    "id": 0,
    "id_client": 0,
    "product": "",
    "amount": 0,
    "measure": "",
    "category": "",
    "sub_category": "",
    "id_sub_category": 1,
    "code": "",
    "price": "",
    "description": "",
    "url_image": "",
    "alert_amount": 0,
    "alert_amount_enabled": true,
    "alerted_amount": false,
    "alert_date": "",
    "alert_date_enabled": true,
    "alerted_date": false,
    "custom_fields": [],
  }])
  const [ showMassiveUpdateStock, setShowMassiveUpdateStock ] = useState(false)
  const handleMassiveUpdateStock = () => setShowMassiveUpdateStock(false)
  const openMassiveUpdateStock = (newData:String) => {
    setShowMassiveUpdateStock(true)
    setMassiveUpdate(
      products.filter((item:any) => {
        return (
          checkListStock.includes(item._id)
        )
      })
    );
  }
  
  const [filteredData, setFilteredData] = useState<Data[]>([])
    
  useEffect(() => {
      setFilteredData(
        products.filter((item:any) => {
          // console.log("item: ", item)
          item.category = item.category_obj[labelsManageStock.category_name]
          // item.sub_category = item.sub_category_obj[labelsManageStock.category_name]
          item.sub_category = item.sub_category_obj[labelsManageStock.sub_category_name]
          // item.category= "pepe"
          const columnsUserOrderWithoutImages = columnsUserOrder.filter((column:any) => column.dataKey !=="url_image")
          const filteredColumnsCustomUser = filteredColumnsCustom.filter((item1:any) => 
            columnsUserOrder.some((item2: any) => item2.dataKey === item1.dataKey)
          )
          return (
            columnsUserOrderWithoutImages.some((column:any) => 
              (item[column.dataKey] || item[column.dataKey]===0) &&
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
  }, [searchQuery, products, columnsUserOrder]) 


  useEffect(() => {
    if (  
          isLoading.user || 
          isLoading.measures || 
          isLoading.filestack || 
          isLoading.accessLevels || 
          isLoading.categories || 
          isLoading.categories_sub || 
          isLoading.defaultColumns || 
          isLoading.columns || 
          isLoading.products || 
          isLoading.customColumns || 
          isLoading.fieldsFetchEditCustomColumn || 
          isLoading.fieldsFetchCreateCustomColumn || 
          isLoading.fieldsFetchEditUsersFieldsOrder
    ) {
      setOpenBackdrop(true)
    } else {
      setOpenBackdrop(false)
    }

  }, [isLoading])

  
  useEffect(() => {
    setProductUpdate({
      "_id": "",
      "id": 0,
      "id_client": 0,
      "product": "",
      "amount": 0,
      "measure": "",
      "category": "",
      "sub_category": "",
      "id_sub_category": 1,
      "code": "",
      "price": "",
      "description": "",
      "url_image": "",
      "alert_amount": 0,
      "alert_amount_enabled": true,
      "alerted_amount": false,
      "alert_date": "",
      "alert_date_enabled": true,
      "alerted_date": false,
      "custom_fields": [],
    })
  }, [showCreateStock])

  return (
    <div className="App">
      {/* <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop} // Loading...
      >
        <CircularProgress color="inherit" />
      </Backdrop> */}
      <ModalsGroup 
        columnsDefault={defaultColumns} 
        columnsCustom={customColumns}
        idColumnsTableOrder={idColumnsTableOrder} 
        data={filteredData}
        setSearchQuery={setSearchQuery}
        openMassiveUpdateStock={openMassiveUpdateStock}
        disabledUpdateButton={disabledUpdateButton}
        openCreateStock={openCreateStock}
      >
        <Container maxWidth="md" sx={{ display: (breakpointLG?"none":"block") }} style={{padding: "0"}} >
          <Grid container>
            <Grid item xs={2} >
              <UpdateButton
                clicked={()=>openMassiveUpdateStock("update")}
                disabled={disabledUpdateButton}
              />
            </Grid>
            <Grid item xs={8} >
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
          <TableProducts 
            data={filteredData} 
            columns={columnsUserOrder} 
            openUpdateAmountStock={openUpdateAmountStock} 
            handleDisabledUpdateButton={handleDisabledUpdateButton} 
          />
        }
      </ModalsGroup>
      <ManageStock
          open={showCreateStock} 
          handleClose={handleCloseCreateStock} 
          data={productUpdate}
          columnsCustom={filteredColumnsCustom}
      />
      <UpdateAmountStock
          open={showUpdateAmountStock}
          handleClose={handleCloseUpdateAmountStock}
          columnsCustom={filteredColumnsCustom}
          productUpdate={productUpdate}
      />
      <MassiveUpdateStock
          open={showMassiveUpdateStock}
          handleClose={handleMassiveUpdateStock}
          data={massiveUpdate}
      />
    </div>
  )
}
export default Home