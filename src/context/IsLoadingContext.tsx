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
    fieldsFetchEditCustomColumn: false,
    fieldsFetchCreateCustomColumn: false,
    fieldsFetchEditUsersFieldsOrder: false,
  }); // New state for loading status
  
  const [openBackdrop, setOpenBackdrop] = useState(false)
  
  return <IsLoadingContext.Provider value={{ isLoading, setIsLoading, openBackdrop, setOpenBackdrop }}>{children}</IsLoadingContext.Provider>;
};
