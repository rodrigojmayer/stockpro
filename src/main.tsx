// import React, { useMemo, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// import userContext from ''
import './index.css'
// import { UserContext } from './context/UserContext'
// import { UserData } from './types'
import { UserProvider } from './context/UserContext';
import { UsersProvider } from './context/UsersContext';
import { CategoriesProvider } from './context/CategoriesContext';
import { MeasuresProvider } from './context/MeasuresContext';
import { AccessLevelsProvider } from './context/AccessLevelsContext';
import { IsLoadingProvider } from './context/IsLoadingContext';
import { ColumnsProvider } from './context/ColumnsContext';
import { ProductsProvider } from './context/ProductsContext';

// const contextValue: UserData = {
//     id: 1, 
//     id_client: 2, 
//     name: "Rodrigo", 
//     user: "rmayer", 
//     pass: "123", 
//     deleted: false, 
//     enabled: true, 
//     ordered_fields:[1,2,3]
//   }
 


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <IsLoadingProvider >
      <UserProvider >
        <UsersProvider >
          <MeasuresProvider >
            <AccessLevelsProvider>
              <CategoriesProvider >
                <ColumnsProvider >
                  <ProductsProvider >
                    <App />
                  </ProductsProvider>
                </ColumnsProvider>
              </CategoriesProvider>
            </AccessLevelsProvider>
          </MeasuresProvider>
        </UsersProvider>
      </UserProvider>
    </IsLoadingProvider>
  // </React.StrictMode>, 
)

 