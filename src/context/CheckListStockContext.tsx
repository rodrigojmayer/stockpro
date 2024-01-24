import { createContext, useEffect, useState } from 'react';

export const CheckListStockContext = createContext<Object | undefined>(undefined);

type CheckListStockProviderProps = {
  children: React.ReactNode;
};
  
export const CheckListStockProvider: React.FC<CheckListStockProviderProps> = ({ children }) => {
  const [checkListStock, setCheckListStock] = useState([]); 
  

  return (
    <CheckListStockContext.Provider value={{ checkListStock, setCheckListStock }}>
      {children}
    </CheckListStockContext.Provider>
  )
};
