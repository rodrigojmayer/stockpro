import { createContext, useState } from 'react';

export const IsLoadingContext = createContext<Object | undefined>(undefined);

type IsLoadingProviderProps = {
  children: React.ReactNode;
};

export const IsLoadingProvider: React.FC<IsLoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState({
    defaultColumns: true,
    customColumns: true,
    columns: true,
    products: true,
    user: true,
    measures: true,
    accessLevels: true,
    categories: true,
    fieldsFetchEditCustomColumn: false,
    fieldsFetchCreateCustomColumn: false,
    fieldsFetchEditUsersFieldsOrder: false,
    fieldsFetchCreateStock: false,
    usersAlert: false,
    emailsAlert: false,
  }); // New state for loading status
  
  // console.log("realoading isLoadingContext???")
  const [openBackdrop, setOpenBackdrop] = useState(true)
  // console.log("openBackdrop", openBackdrop)
  
  return <IsLoadingContext.Provider value={{ isLoading, setIsLoading, openBackdrop, setOpenBackdrop }}>{children}</IsLoadingContext.Provider>;
};
