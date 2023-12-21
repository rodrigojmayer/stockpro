import { createContext, useEffect, useState } from 'react';

export const IsLoadingContext = createContext<Object | undefined>(undefined);

type IsLoadingProviderProps = {
  children: React.ReactNode;
};

export const IsLoadingProvider: React.FC<IsLoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState({
    accessLevels: true,
    categories: true,
    columns: true,
    customColumns: true,
    // customColumns: false,
    defaultColumns: true,
    emailsAlert: false,
    fieldsFetchCreateCustomColumn: false,
    fieldsFetchCreateStock: false,
    fieldsFetchEditCustomColumn: false,
    fieldsFetchEditUsersFieldsOrder: false,
    filestack: true,
    measures: true,
    products: true,
    user: true,
    usersAlert: false,
  }); // New state for loading status
  
  useEffect(() => {
    // console.log("*-*-*-*-*user: ", user)
    console.log("*-*-*-*-*isLoading: ", isLoading)
    if(isLoading.products){
      setIsLoading((prevLoading:any) => ({
          ...prevLoading,
          products: false,
      }));
    }
    // if(isLoading.filestack){
    //   setIsLoading((prevLoading:any) => ({
    //       ...prevLoading,
    //       filestack: false,
    //   }));
    // }
    // if(isLoading.defaultColumns){
    //   setIsLoading((prevLoading:any) => ({
    //       ...prevLoading,
    //       defaultColumns: false,
    //   }));
    // }
    if(isLoading.categories){
      setIsLoading((prevLoading:any) => ({
          ...prevLoading,
          categories: false,
      }));
    }
    if(isLoading.accessLevels){
      setIsLoading((prevLoading:any) => ({
          ...prevLoading,
          accessLevels: false,
      }));
    }
    // if(isLoading.customColumns){
    //   setIsLoading((prevLoading:any) => ({
    //       ...prevLoading,
    //       customColumns: false,
    //   }));
    // }
  }, [isLoading]);
  // console.log("realoading isLoadingContext???")
  const [openBackdrop, setOpenBackdrop] = useState(true)
  // console.log("openBackdrop", openBackdrop)
  
  return <IsLoadingContext.Provider value={{ isLoading, setIsLoading, openBackdrop, setOpenBackdrop }}>{children}</IsLoadingContext.Provider>;
};
