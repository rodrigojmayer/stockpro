import { useEffect, useState, useContext } from 'react'
import { Container, Grid } from '@mui/material'
// import { ThemeProvider, createTheme } from '@mui/material/styles';
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import { PlusButton, UpdateButton } from '../components/Buttons';
import ModalsGroupAdministrator from '../components/administrator/ModalsGroupAdministrator';
import MainSearch from '../components/MainSearch';
import TableCategories from '../components/administrator/TableCategories';
import ManageStock from '../components/ManageStock';
import ManageCategories from '../components/administrator/ManageCategories'; 
import { CategoriesSubData } from '../types';
import { UserContext } from '../context/UserContext';
import { IsLoadingContext } from '../context/IsLoadingContext';
import { ColumnsContext } from '../context/ColumnsContext';
import { ProductsContext } from '../context/ProductsContext';
import MassiveUpdateStock from '../components/MassiveUpdateStock';
import { CheckListStockContext } from '../context/CheckListStockContext';
import useMediaQuery from '@mui/material/useMediaQuery';
import { LanguageLabelsContext } from '../context/LanguageLabelsContext';
const idColumnsTableOrder: Number[] = [-1, -2, -3, -4]
function Administrator() {
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
    const [ subCategoryUpdate, setSubCategoryUpdate ] = useState<CategoriesSubData>({
      "_id": "",
      "id": 0,
      "id_category": 1,
      "sub_category_en": "",
      "sub_category_es": "",
      "sub_category_dk": "",
      "sub_category_it": "",
      "deleted": false,
    })
    // const [ showUpdateAmountStock, setShowUpdateAmountStock ] = useState(false)
    const [ showUpdateSubCategoryUpdate, setShowUpdateSubCategoryUpdate ] = useState(false)
    const handleCloseUpdateAmountStock = () => {
      setShowUpdateSubCategoryUpdate(false)

      setSubCategoryUpdate({
        "_id": "",
        "id": 0,
        "id_category": 1,
        "sub_category_en": "",
        "sub_category_es": "",
        "sub_category_dk": "",
        "sub_category_it": "",
        "deleted": false,
      })
    }
      const openUpdateSubCategoryUpdate = (newData:CategoriesSubData) => {

       // console.log("products: ", products)
      console.log("newData: ", newData)

      let dateObject
      let formattedDate
      // if(typeof newData.alert_date === 'string'){
      //   const dateDay = newData.alert_date.substring(0,2)
      //   const dateMonth = newData.alert_date.substring(3,5)
      //   const dateYear = newData.alert_date.substring(6,10)
      //   const dateString = `${dateYear}-${dateMonth}-${dateDay}T00:00:00Z`
      //   dateObject = new Date(dateString)
      //   formattedDate = dateObject.toLocaleDateString('en-US', {
      //     year: 'numeric',
      //     month: 'numeric',
      //     day: 'numeric',
      //   });
      // } else {
      //   dateObject = newData.alert_date
      //   formattedDate = newData.alert_date
      // }
      setShowUpdateSubCategoryUpdate(true)

      setSubCategoryUpdate({
        "_id": newData._id,
        "id": newData.id,
        "id_category": newData.id_category,
        "sub_category_en": newData.sub_category_en,
        "sub_category_es": newData.sub_category_es,
        "sub_category_dk": newData.sub_category_dk,
        "sub_category_it": newData.sub_category_it,
        "deleted": newData.deleted,
        "category_en": newData.category_en,
        "category_es": newData.category_es,
        "category_dk": newData.category_dk,
        "category_it": newData.category_it,
        "id_sub_category": newData.id,
        "sub_category": newData.sub_category
      })
    }  
  
    const [ disabledUpdateButton, setDisabledUpdateButton ] = useState<boolean>(true)
    const handleDisabledUpdateButton = (value_disable:boolean) => {
      setDisabledUpdateButton(value_disable)
    }
    
    const [filteredData, setFilteredData] = useState<CategoriesSubData[]>([])
      
    // useEffect(() => {
    //     setFilteredData(
    //       products.filter((item:any) => {
    //         // console.log("item: ", item)
    //         item.category = item.category_obj[labelsManageStock.category_name]
    //         item.sub_category = item.sub_category_obj[labelsManageStock.category_name]
    //         // item.category= "pepe"
    //         // const columnsUserOrderWithoutImages = columnsUserOrder.filter((column:any) => column.dataKey !=="url_image")
    //         // const filteredColumnsCustomUser = filteredColumnsCustom.filter((item1:any) => 
    //         //   columnsUserOrder.some((item2: any) => item2.dataKey === item1.dataKey)
    //         // )
    //         return (
    //           columnsUserOrderWithoutImages.some((column:any) => 
    //             (item[column.dataKey] || item[column.dataKey]===0) &&
    //             item[column.dataKey]
    //               .toString()
    //               .toLowerCase()
    //               .includes(searchQuery.toLowerCase()) 
    //           ) || (
    //             item.custom_fields &&
    //             filteredColumnsCustomUser
    //               .some((customColumn:any) =>
    //                       Object.entries(item.custom_fields).filter(
    //                         ([key, value]) => 
    //                         (value as string).toString().toLowerCase().includes(searchQuery.toLowerCase())
    //                         && key == customColumn.dataKey
    //                       ).length
    //             )
    //           )
    //         )
    //       })
    //     );
    // }, [searchQuery, products, columnsUserOrder]) 
  
  
    // useEffect(() => {
    //   if (  
    //         isLoading.user || 
    //         isLoading.measures || 
    //         isLoading.filestack || 
    //         isLoading.accessLevels || 
    //         isLoading.categories || 
    //         isLoading.categories_sub || 
    //         isLoading.defaultColumns || 
    //         isLoading.columns || 
    //         isLoading.products || 
    //         isLoading.customColumns || 
    //         isLoading.fieldsFetchEditCustomColumn || 
    //         isLoading.fieldsFetchCreateCustomColumn || 
    //         isLoading.fieldsFetchEditUsersFieldsOrder
    //   ) {
    //     setOpenBackdrop(true)
    //   } else {
    //     setOpenBackdrop(false)
    //   }
  
    // }, [isLoading])
  
    
    useEffect(() => {
      setSubCategoryUpdate({
        "_id": "",
        "id": 0,
        "id_category": 1,
        "sub_category_en": "",
        "sub_category_es": "",
        "sub_category_dk": "",
        "sub_category_it": "",
        "deleted": false,
      })
    }, [showCreateStock])
  
    return (
      <div className="App">
        <ModalsGroupAdministrator 
          columnsDefault={defaultColumns} 
          columnsCustom={customColumns}
          idColumnsTableOrder={idColumnsTableOrder} 
          data={filteredData}
          setSearchQuery={setSearchQuery}
          disabledUpdateButton={disabledUpdateButton}
          openCreateStock={openCreateStock}
        >
          <Container maxWidth="md" sx={{ display: (breakpointLG?"none":"block") }} style={{padding: "0"}} >
            <Grid container>
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
          {/* {openBackdrop ? "":  */}
            <TableCategories 
              data={filteredData}
              // columns={columnsUserOrder} 
              openUpdateSubCategoryUpdate={openUpdateSubCategoryUpdate} 
              handleDisabledUpdateButton={handleDisabledUpdateButton} 
            />
          {/* } */}
        </ModalsGroupAdministrator>
        {/* <ManageStock
            open={showCreateStock} 
            handleClose={handleCloseCreateStock} 
            data={productUpdate}
            columnsCustom={filteredColumnsCustom}
        /> */}
        <ManageCategories
            open={showUpdateSubCategoryUpdate}
            handleClose={handleCloseUpdateAmountStock}
            subCategoryUpdate={subCategoryUpdate}
        />
        {/* <MassiveUpdateStock
            open={showMassiveUpdateStock}
            handleClose={handleMassiveUpdateStock}
            data={massiveUpdate}
        /> */}
      </div>
    )
    // return (
    //     <div className="App">
    //         tetin
    //     </div>
    // )
}
export default Administrator