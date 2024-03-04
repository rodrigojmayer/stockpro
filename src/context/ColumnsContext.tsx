import { createContext, useState, useEffect, useContext } from 'react';
import { Data, ColumnData, CustomValueData,UserData } from '../types';
import { IsLoadingContext } from './IsLoadingContext';
import { UserContext } from './UserContext';


export const ColumnsContext = createContext<object | undefined>(undefined);

type ColumnsProviderProps = {
  children: React.ReactNode;
};

export const ColumnsProvider: React.FC<ColumnsProviderProps> = ({ children }) => {
  const { isLoading, setIsLoading } = useContext<any>(IsLoadingContext);
  const { user, _IdUserLogged, gmailUserLogged } = useContext<any>(UserContext);

  
  const [defaultColumns, setDefaultColumns] = useState<ColumnData[]>([])
  const [customColumns, setCustomColumns] = useState<ColumnData[]>([])
  const [columns, setColumns] = useState<ColumnData[]>([])
  const [columnsUserOrder, setColumnsUserOrder] = useState<ColumnData[]>([])
  const [filteredColumnsCustom, setFilteredColumnsCustom] = useState<ColumnData[]>([])


  useEffect(() => {

      const fetchDefaultColumns = async () => {
        try {
          // console.log("fetchDefaultColumns prev fetch:")
          const response = await fetch(`${import.meta.env.VITE_API_URL_BACKEND}/defaultColumns/`)
          // console.log("fetchDefaultColumns response.Access-Control-Allow-Origin:", response.headers)
          if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
          }
          const json = await response.json();
          setDefaultColumns(json);
        //   if (response.ok) {
        //     const json = await response.json()
        //     setDefaultColumns(json)
        //   } else {
        //   // Handle the case where the response is not OK (e.g., show an error message)
        // }
          // alert("alert1")
        } catch (error: any) {
          // Handle any network or fetch-related errors
          console.error("fetchDefaultColumns error.message: ", error.message)
          
          console.error("fetchDefaultColumns error.stack: ", error.stack)
          // alert("alert2")

        } finally {
          setIsLoading((prevLoading: any) => ({
            ...prevLoading,
            defaultColumns: false,
          }));
        }
      }
      const fetchCustomColumns = async () => {
       
        // if (isLoading.user ||  isLoading.fieldsFetchCreateCustomColumn) {
        try {
          // console.log("fetchCustomColumns user.id_client: ", user.id_client)
          const response = await fetch(`${import.meta.env.VITE_API_URL_BACKEND}/customColumns/client/${user.id_client}`)
          // console.log("fetchCustomColumns response:", response)
          if (response.ok) {
            const json = await response.json()
            // console.log("custom columns json:", json)
            // console.log(json.filter((val:any) => {val.id_client===2}))
            setCustomColumns(json)
            // setCustomColumns([])
          } else {
            console.error("fetchCustomColumns else: ")
          // Handle the case where the response is not OK (e.g., show an error message)
          }
        } catch (error: any) {
          // Handle any network or fetch-related errors
          // debugger;
          console.error("fetchCustomColumns error.message: ", error.message)
          console.error("fetchCustomColumns error.stack: ", error.stack)
          // alert("alert3")
        } finally {
          setIsLoading((prevLoading:any) => ({
            ...prevLoading,
            customColumns: false,
            fieldsFetchCreateCustomColumn: false,
            fieldsFetchEditCustomColumn: false
          }));
        }
      }
      // console.log("ColumnsContext.tsx user.id_client1: ", user.id_client)
      // console.log("ColumnsContext.tsx _IdUserLogged: ", _IdUserLogged)
      // console.log("ColumnsContext.tsx gmailUserLogged: ", gmailUserLogged)
      
      // alert("alert4")
      if (!isLoading.user) {
        // console.log("ColumnsContext.tsx user.id_client2: ", user.id_client)
        // alert("alert5")
        fetchDefaultColumns();
        fetchCustomColumns();
      }
    // }

  }, [user, isLoading.fieldsFetchCreateCustomColumn, isLoading.fieldsFetchEditCustomColumn]);

  
  useEffect(() => {
    if (!isLoading.defaultColumns && !isLoading.customColumns) {
      
      setFilteredColumnsCustom( customColumns.filter((element) => {
        // filteredColumnsCustom = customColumns.filter((element) => {
          // return element.id_client === user.client && element.deleted === false;
          return element.deleted === false;
        })
      )
    }

  }, [defaultColumns, customColumns, isLoading.defaultColumns, isLoading.customColumns, isLoading.products]);

  useEffect(() => {
    // console.log("filteredColumnsCustom: ", filteredColumnsCustom)
    setColumns(defaultColumns.concat(filteredColumnsCustom));
    setIsLoading((prevLoading: any) => ({
      ...prevLoading,
      columns: false,
    }));
  }, [filteredColumnsCustom]);


  useEffect(() => {
    // console.log("user: ", user)
    // console.log("columns: ", columns)
    if(user.ordered_fields){
    // console.log("ColumnsContext.tsx user: ", user)

      const columns_user_order = user.ordered_fields.map((idField: number) => {
        // console.log("idField: ", idField)
        return columns.find((column) => column.id === idField);
      }).filter(Boolean) as ColumnData[];
      // console.log("columns_user_order: ", columns_user_order)
      setColumnsUserOrder(columns_user_order)
    }
  }, [columns, user]);

  useEffect(() => {

  // console.log("useEffect customColumns: ", customColumns)
  if(customColumns.length != 0){
  // console.log("useEffect customColumns true: ", customColumns)

    setIsLoading((prevLoading: any) => ({
      ...prevLoading,
      customColumns: false,
    }));
  }

}, [customColumns ])


  return (
    <ColumnsContext.Provider value={{ defaultColumns, customColumns, setCustomColumns, columns, columnsUserOrder, setColumnsUserOrder, filteredColumnsCustom }}>
      {children}
    </ColumnsContext.Provider>
  )
};
