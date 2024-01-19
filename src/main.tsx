// import React, { useMemo, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// import userContext from ''
import './index.css'
// import { UserContext } from './context/UserContext'
// import { UserData } from './types'
import { AuthProvider } from './context/AuthProvider';
import { UserProvider } from './context/UserContext';
import { FilestackProvider } from './context/FilestackContext';
import { UsersProvider } from './context/UsersContext';
import { EmailsProvider } from './context/EmailsContext';
import { CategoriesProvider } from './context/CategoriesContext';
import { MeasuresProvider } from './context/MeasuresContext';
import { AccessLevelsProvider } from './context/AccessLevelsContext';
import { IsLoadingProvider } from './context/IsLoadingContext';
import { ColumnsProvider } from './context/ColumnsContext';
import { ProductsProvider } from './context/ProductsContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
 
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <BrowserRouter>
      <IsLoadingProvider >
        <AuthProvider>
          <UserProvider >
            <FilestackProvider >
              <UsersProvider >
                <EmailsProvider >
                  <MeasuresProvider >
                    <AccessLevelsProvider>
                      <CategoriesProvider >
                        <ColumnsProvider >
                          <ProductsProvider >
                            <Routes>
                              <Route path="/*" element={<App />} />
                            </Routes>
                          </ProductsProvider>
                        </ColumnsProvider>
                      </CategoriesProvider>
                    </AccessLevelsProvider>
                  </MeasuresProvider>
                </EmailsProvider>
              </UsersProvider>
            </FilestackProvider>
          </UserProvider>
        </AuthProvider>
      </IsLoadingProvider>
    </BrowserRouter>
  // </React.StrictMode>, 
)

 