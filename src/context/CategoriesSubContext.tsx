import { createContext, useState, useEffect, useContext } from 'react';
import { CategoriesSubData } from '../types';
import { IsLoadingContext } from './IsLoadingContext';

const INITIAL_CATEGORY_SUB = {
  id: NaN,
  id_category: NaN,
  name: '',
  name_esp: '',
  name_dan: '',
  name_ita: '',
  sub_categories: [],
  deleted: false,
};

// export const CategoriesContext = createContext<UserContextType | undefined>(undefined);
export const CategoriesSubContext = createContext<object | undefined>(undefined);

type CategoriesSubProviderProps = {
  children: React.ReactNode;
};

export const CategoriesSubProvider: React.FC<CategoriesSubProviderProps> = ({ children }) => {
  const [categoriesSub, setCategoriesSub] = useState<CategoriesSubData>(INITIAL_CATEGORY_SUB);
  const { isLoading, setIsLoading } = useContext<any>(IsLoadingContext);

  useEffect(() => {
    const fetchCategoriesSub = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL_BACKEND}/categoriesSub/`);
        
        if (response.ok) {
          const json = await response.json();
          setCategoriesSub(json);
        } else {
          setCategoriesSub(INITIAL_CATEGORY_SUB);
          // Handle the case where the response is not OK (e.g., show an error message)
        }
      } catch (error: unknown) {
        setCategoriesSub(INITIAL_CATEGORY_SUB);
        // Handle any network or fetch-related errors
      } finally {
            setIsLoading((prevLoading:any) => ({
            ...prevLoading,
            categories_sub: false,
            }));
        }
    };

    fetchCategoriesSub();
  }, []);

  return ( 
    <CategoriesSubContext.Provider value={{ categoriesSub, setCategoriesSub }}>
      {children}
    </CategoriesSubContext.Provider>
  )
};