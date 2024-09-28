import { useEffect, useState, useContext, useRef } from 'react'
import { Container, Grid } from '@mui/material'
// import { ThemeProvider, createTheme } from '@mui/material/styles';
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import { PlusButton, UpdateButton } from '../components/Buttons';
import ModalsGroupAdministrator from '../components/administrator/ModalsGroupAdministrator';
import MainSearch from '../components/MainSearch';
import TableCategories from '../components/administrator/TableCategories';
import TableClients from '../components/administrator/TableClients';
import Tables from '../components/administrator/Tables';
import ManageStock from '../components/ManageStock';
import ManageSubCategory from '../components/administrator/ManageSubCategory'; 
import ManageClient from '../components/administrator/ManageClient';
import { CategoriesSubData, ClientData, ColumnDataAdministrator } from '../types';
import { UserContext } from '../context/UserContext';
import { IsLoadingContext } from '../context/IsLoadingContext';
import { ColumnsContext } from '../context/ColumnsContext';
import { ProductsContext } from '../context/ProductsContext';
import MassiveUpdateStock from '../components/MassiveUpdateStock';
import { CheckListStockContext } from '../context/CheckListStockContext';
import useMediaQuery from '@mui/material/useMediaQuery';
import { LanguageLabelsContext } from '../context/LanguageLabelsContext';
import { CategoriesSubContext } from '../context/CategoriesSubContext';
import { CategoriesContext } from '../context/CategoriesContext';
import { ClientsContext } from '../context/ClientsContext';
const idColumnsTableOrder: Number[] = [-1, -2, -3, -4]

// function tableSelected(
//   filteredData: any, 
//   openUpdateSubCategoryUpdate: any,
//   handleDisabledUpdateButton: any,
//   openOptions: string
// ) {
//   if (openOptions === "admin_categories"){

//     return (
//       <TableCategories 
//       data={filteredData}
//       // columns={columnsUserOrder} 
//       openUpdateSubCategoryUpdate={openUpdateSubCategoryUpdate} 
//       handleDisabledUpdateButton={handleDisabledUpdateButton} 
//       />
//     )
//   } else {
//     return(
//     <TableClients 
//       data={filteredData}
//       // columns={columnsUserOrder} 
//       openUpdateSubCategoryUpdate={openUpdateSubCategoryUpdate} 
//       handleDisabledUpdateButton={handleDisabledUpdateButton} 
//     />
//   )
// }
// }

const columns_admin_categories = [
  {
      _id: "1",
      id: 1,
      dataKey: "category_en",
      label: "Category Eng",
      width: 120
  },
  {
      _id: "2",
      id: 2,
      dataKey: "category_es",
      label: "Category Esp",
      width: 120
  },
  {
      _id: "3",
      id: 3,
      dataKey: "category_dk",
      label: "Category Dk",
      width: 120
  },
  {
      _id: "4",
      id: 4,
      dataKey: "category_it",
      label: "Category It",
      width: 120
  },
  {
      _id: "5",
      id: 5,
      dataKey: "sub_category_en",
      label: "Sub Eng",
      width: 120
  },
  {
      _id: "6",
      id: 6,
      dataKey: "sub_category_es",
      label: "Sub Esp",
      width: 120
  },
  {
      _id: "7",
      id: 7,
      dataKey: "sub_category_dk",
      label: "Sub Dk",
      width: 120
  },
  {
      _id: "8",
      id: 8,
      dataKey: "sub_category_it",
      label: "Sub It",
      width: 120
  }
];

const columns_admin_clients = [
  {
      _id: "1",
      id: 1,
      dataKey: "id",
      label: "ID",
      width: 120
  },
  {
      _id: "2",
      id: 2,
      dataKey: "enabled",
      label: "Enabled",
      width: 120
  },
  {
      _id: "3",
      id: 3,
      dataKey: "deleted",
      label: "Deleted",
      width: 120
  },
  {
      _id: "4",
      id: 4,
      dataKey: "id_group_filestack",
      label: "ID Group Filestack",
      width: 120
  },
  {
      _id: "5",
      id: 5,
      dataKey: "client",
      label: "Client",
      width: 120
  }
]
const columnsMap: { [key: string]: { _id: string; id: number; dataKey: string; label: string; width: number; }[] } = {
  columns_admin_categories,
  columns_admin_clients,
  // Add other column arrays here
};

const initial_state_category = {
  id: 0,
  category_en: "",
  category_es: "",
  category_dk: "",
  category_it: "",
  deleted: false
}
const initial_state_sub_category = {
  _id: "",
  id: 0,
  id_category: 1,
  sub_category_en: "",
  sub_category_es: "",
  sub_category_dk: "",
  sub_category_it: "",
  deleted: false,
}
const initial_state_client = {
  _id: "",
  id: 0,
  id_group_filestack: 0,
  client: '',
  deleted: false,
  enabled: true,
};

function Administrator() {
  const breakpointLG = useMediaQuery('(min-width:1024px)');
  const isInitialRender = useRef(true);
  const { isLoading, setIsLoading, openBackdrop, setOpenBackdrop } = useContext<any>(IsLoadingContext);
  const { defaultColumns, customColumns, columns, columnsUserOrder, filteredColumnsCustom  } = useContext<any>(ColumnsContext);
  const { clients } = useContext<any>(ClientsContext) 
  // console.log("clients: ", clients)
  const { categories } = useContext<any>(CategoriesContext) 
  const { categoriesSub } = useContext<any>(CategoriesSubContext)
  const { labelsManageStock } = useContext<any>(LanguageLabelsContext)
  // console.log("products: ", products)
  const { checkListStock, setCheckListStock } = useContext<any>(CheckListStockContext)
  const [ searchQuery, setSearchQuery ] = useState("")
  // const [ showCreateStock, setShowCreateStock ] = useState(false)
  // const openCreateStock = () => {
  //   setShowCreateStock(true)
  // }
  const openCreate = () => {
    // console.log("openCreate: ")
    console.log("openOptions: ", openOptions)
    if(openOptions === "admin_categories"){
      setSubCategoryUpdate(initial_state_sub_category)
      setShowSubCategoryUpdate(true)
    } else if (openOptions === "admin_clients" )  {
      setClientUpdate(initial_state_client)
      alert("not necessary for the moment to create clients")
      // setShowClientUpdate(true)
    }
  }
  const [openOptions, setOpenOptions] = useState<string>("admin_categories")
  // const [edition, setEdition] = useState<boolean>(false);
  const [columnsSelected, setColumnsSelected] = useState<ColumnDataAdministrator[]>(columns_admin_categories);
  const [ subCategoryUpdate, setSubCategoryUpdate ] = useState<CategoriesSubData>(initial_state_sub_category)
  const [ clientUpdate, setClientUpdate ] = useState<ClientData>(initial_state_client)
  // const [ showUpdateAmountStock, setShowUpdateAmountStock ] = useState(false)
  const [ showSubCategoryUpdate, setShowSubCategoryUpdate ] = useState(false)
  const [ showClientUpdate, setShowClientUpdate ] = useState(false)
  const handleCloseUpdateSubCategory = () => {
    setShowSubCategoryUpdate(false)
    setSubCategoryUpdate(initial_state_sub_category)
  }
  const handleCloseUpdateClient = () => {
    setShowClientUpdate(false)
    setClientUpdate(initial_state_client)
  }
  const openSubCategoryUpdate = (newData:any) => {
    // console.log("newData: ", newData)
    // console.log("openOptions: ", openOptions)
  
    if(openOptions === "admin_categories"){ 
      // setShowClientUpdate(false)
      setShowSubCategoryUpdate(true)

      // setClientUpdate(initial_state_client)
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
    } else if(openOptions === "admin_clients") {
      // console.log("Right here?: ")
      // setShowSubCategoryUpdate(false)
      setShowClientUpdate(true)
      // setSubCategoryUpdate(initial_state_client)
      setClientUpdate({
        "_id": newData._id,
        "id": newData.id,
        "id_group_filestack": newData.id_group_filestack,
        "client": newData.client,
        "deleted": newData.deleted,
        "enabled": newData.enabled
      })
    }
  }  

  const [ disabledUpdateButton, setDisabledUpdateButton ] = useState<boolean>(true)
  const handleDisabledUpdateButton = (value_disable:boolean) => {
    setDisabledUpdateButton(value_disable)
  }
  
  
  function filterCategoriesFields () {
    // if(openOptions === "admin_categories"){
      const filteredFields = categoriesSub.map((categorySub: any) => {
        if(categorySub.sub_category_en !== "-"){    
          let categoryFind = categories.find((category:any) => category.id === categorySub.id_category)
          return ({
            _id: categorySub._id,
            id_category: categoryFind.id,
            category_en: categoryFind.category_en,
            category_es: categoryFind.category_es,
            category_dk: categoryFind.category_dk,
            category_it: categoryFind.category_it,
            id_sub_category: categorySub.id,
            sub_category_en: categorySub.sub_category_en,
            sub_category_es: categorySub.sub_category_es,
            sub_category_it: categorySub.sub_category_it,
            sub_category_dk: categorySub.sub_category_dk,
          }) 
        }
      }).filter(Boolean)
      return filteredFields
    // } else if(openOptions === "columns_admin_clients") {
    //   fetchClients()
    // }
  }
  // const fetchClientsData = async () => {
  //   try {
  //     const response = await fetch(`${import.meta.env.VITE_API_URL_BACKEND}/clients/`)
  //     if (!response.ok) {
  //       throw new Error(`Request failed with status: ${response.status}`);
  //     }
  //     const json = await response.json();
  //     // console.log("/*-/*-/*-json: ", json)
  //     // console.log("/*-/*-/*-response: ", response)
  //     // if(json.name===undefined) json.name = ""
  //     // if(json.last_name===undefined) json.last_name = ""
  //     console.log("json: ", json)
  //     // const data = await response.json();
  //     // console.log("data: ", data)

  //     // setClientsData(data);
  //     // return(json);
  //     // return ({
  //     //   _id: categorySub._id,
  //     //   id: categoryFind.id,
  //     //   deleted: categoryFind.category_en,
  //     //   enabled: categoryFind.category_es,
  //     //   id_group_filestack: categoryFind.category_dk,
  //     //   name: categoryFind.category_dk,
        
  //     // }) 
  //     const transformedData = json.map((client: any) => ({
  //       _id: client._id || null, // Assign null if field is missing
  //       id: client.id || null,
  //       deleted: client.deleted || false,
  //       enabled: client.enabled || false,
  //       id_group_filestack: client.id_group_filestack || null,
  //       name: client.name || "",  // Provide default values if fields are missing
  //     }));
  
  //     console.log("Transformed Clients Data: ", transformedData);
  //     return transformedData;
  //   } catch (error: any) {
  //     // Handle any network or fetch-related errors
  //     console.error("ClientContext.tsx fetchClientByClient error.message: ", error.message)
  //     console.error("ClientContext.tsx  fetchClientByClient error.stack: ", error.stack)
  //   } finally {
  //     setIsLoading((prevLoading:any) => ({
  //       ...prevLoading,
  //       client: false,
  //     }));
  //   }
  // }

  // const clients = fetchClients()
  

  const [categoriesData, setCategoriesData] = useState(filterCategoriesFields())
  const [clientsData, setClientsData] = useState(filterCategoriesFields())
  const [filteredData, setFilteredData] = useState(filterCategoriesFields())

  // useEffect(() => { // to update table after saving changes
  //   if (isInitialRender.current) {
  //     isInitialRender.current = false;
  //     return;
  //   }
  //   // setCategoriesData(filterFields())
  //   setFilteredData(filterCategoriesFields())
  // }, [categories, categoriesSub])
  useEffect(() => { // to update table after saving changes
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    // setCategoriesData(filterFields())
    if(openOptions === "admin_categories"){
    setFilteredData(filterCategoriesFields())}
    else if (openOptions === "admin_clients" )  {
      setColumnsSelected(columns_admin_clients)
      setFilteredData(clients)
    }
  }, [categories, categoriesSub, clients])
  // useEffect(() => { // to update table after saving changes
  //   if (isInitialRender.current) {
  //     isInitialRender.current = false;
  //     return;
  //   }
  //   // setCategoriesData(filterFields())
  //   setFilteredData(clients)
  // }, [clients])
  
  // useEffect(() => {
  //   setSubCategoryUpdate(initial_state_sub_category)
  // }, [showCreateStock])
  // useEffect(() => {
  //   if(openOptions === "admin_categories"){
  //     setSubCategoryUpdate(initial_state_sub_category)
  //   } else if (openOptions === "admin_clients" )  {
  //   }
  // }, [showCreate])

  useEffect(() => { //to change of table showed
    // console.log("openOptions: ", openOptions)

    if(openOptions === "admin_categories"){

      // const columnSelected = "columns_" + openOptions
      // setColumnsSelected(columnsMap[columnSelected])
      setColumnsSelected(columns_admin_categories)
      setFilteredData(categoriesData)
    } else if (openOptions === "admin_clients" )  {
      setColumnsSelected(columns_admin_clients)
      setFilteredData(clients)
    }
  }, [openOptions])
  return (
    <div className="App">
      <ModalsGroupAdministrator 
        columnsDefault={defaultColumns} 
        columnsCustom={customColumns}
        idColumnsTableOrder={idColumnsTableOrder} 
        setSearchQuery={setSearchQuery}
        disabledUpdateButton={disabledUpdateButton}
        openCreate={openCreate}
        setOpenOptions={setOpenOptions}
      >
        <Container maxWidth="md" sx={{ display: (breakpointLG?"none":"block") }} style={{padding: "0"}} >
          <Grid container>
            <Grid item xs={8} >
              <MainSearch setSearchQuery={setSearchQuery} />
            </Grid>
            <Grid item xs={2} >
              <PlusButton
                clicked={openCreate}
              />
            </Grid>
          </Grid>
        </Container>
        <Tables 
          data={filteredData}
          columns={columnsSelected} 
          openSubCategoryUpdate={openSubCategoryUpdate} 
          handleDisabledUpdateButton={handleDisabledUpdateButton} 
        />
      </ModalsGroupAdministrator>
      <ManageSubCategory
        open={showSubCategoryUpdate}
        handleClose={handleCloseUpdateSubCategory}
        subCategoryUpdate={subCategoryUpdate}
      />
      <ManageClient
        open={showClientUpdate}
        handleClose={handleCloseUpdateClient}
        clientUpdate={clientUpdate}
      />
    </div>
  )
}
export default Administrator

