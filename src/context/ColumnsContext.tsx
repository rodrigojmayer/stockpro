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
  const { user } = useContext<any>(UserContext);

  
  const [defaultColumns, setDefaultColumns] = useState<ColumnData[]>([])
  const [customColumns, setCustomColumns] = useState<ColumnData[]>([])
  const [columns, setColumns] = useState<ColumnData[]>([])
  const [columnsUserOrder, setColumnsUserOrder] = useState<ColumnData[]>([])
  const [filteredColumnsCustom, setFilteredColumnsCustom] = useState<ColumnData[]>([])


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
          setIsLoading((prevLoading: any) => ({
            ...prevLoading,
            defaultColumns: false,
          }));
        }
      }
      const fetchCustomColumns = async () => {
        try {
          const response = await fetch(`http://localhost:4000/api/customColumns/client/${user.id_client}`)
          if (response.ok) {
            const json = await response.json()
            // console.log("custom columns json:", json)
            // console.log(json.filter((val:any) => {val.id_client===2}))
            setCustomColumns(json)
          } else {
          // Handle the case where the response is not OK (e.g., show an error message)
        }
        } catch (error) {
          // Handle any network or fetch-related errors
        } finally {
          // setIsLoading((prevLoading) => ({
          //   ...prevLoading,
          //   customColumns: false,
          // }));
        }
      }

      if (!isLoading.user) {
        // console.log(user.id_client)
        fetchDefaultColumns();
        fetchCustomColumns();
      }

  }, [user]);

  
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
// }, [defaultColumns, customColumns, isLoading.defaultColumns, isLoading.customColumns]);

  useEffect(() => {
    setColumns(defaultColumns.concat(filteredColumnsCustom));
    setIsLoading((prevLoading: any) => ({
      ...prevLoading,
      columns: false,
    }));
  }, [filteredColumnsCustom]);


  useEffect(() => {
  const columns_user_order = user.ordered_fields.map((idField: number) => {
    return columns.find((column) => column.id === idField);
  }).filter(Boolean) as ColumnData[];
  // console.log("columns_user_order: ", columns_user_order)
  setColumnsUserOrder(columns_user_order)
  }, [columns]);

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


  return <  ColumnsContext.Provider value={{ defaultColumns, customColumns, setCustomColumns, columns, columnsUserOrder, setColumnsUserOrder, filteredColumnsCustom }}>{children}</ColumnsContext.Provider>;
};
