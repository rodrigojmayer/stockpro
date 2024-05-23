// import React, { useMemo, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// import userContext from ''
import './index.css'
// import { UserContext } from './context/UserContext'
// import { UserData } from './types'
import { AuthProvider } from './context/AuthProvider';
import { UserProvider } from './context/UserContext';
import { ClientProvider } from './context/ClientContext';
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
import { CheckListStockProvider } from './context/CheckListStockContext';
import { LanguageLabelsProvider } from './context/LanguageLabelsContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <BrowserRouter>
      <IsLoadingProvider>
        <AuthProvider>
          <UserProvider>
            <LanguageLabelsProvider>
              <ClientProvider>
                <CheckListStockProvider>
                  <FilestackProvider>
                    <UsersProvider>
                      <EmailsProvider>
                        <MeasuresProvider>
                          <AccessLevelsProvider>
                            <CategoriesProvider>
                              <ColumnsProvider>
                                <ProductsProvider>
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
                </CheckListStockProvider>
              </ClientProvider>
            </LanguageLabelsProvider>
          </UserProvider>
        </AuthProvider>
      </IsLoadingProvider>
    </BrowserRouter>
  // </React.StrictMode>, 
)

 