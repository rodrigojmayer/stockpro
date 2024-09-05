import { createContext, useState, useEffect, useContext } from 'react';
import { CategoriesSubData } from '../types';
import { IsLoadingContext } from './IsLoadingContext';

const INITIAL_CATEGORY_SUB = {
  _id: "",
  id: NaN,
  id_category: NaN,
  sub_category_en: '',
  sub_category_es: '',
  sub_category_dk: '',
  sub_category_it: '',
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
  const fetchCategoriesSub = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL_BACKEND}/categoriesSub/`);
      
      if (response.ok) {
        const json = await response.json();
        const json_sub_categories = json.map((sub_category:any) => {
          return (
            {_id: sub_category._id,
            id: sub_category.id,
            id_category: sub_category.id_category,
            sub_category_en: sub_category.name,
            sub_category_es: sub_category.name_esp,
            sub_category_dk: sub_category.name_dan,
            sub_category_it: sub_category.name_ita,
            deleted: sub_category.deleted}
          )
        })
        // console.log("json_sub_categories: ",json_sub_categories)
        setCategoriesSub(json_sub_categories);
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

  useEffect(() => {
   
    fetchCategoriesSub();
  }, []);

  useEffect(() => {
    if (isLoading.categories_sub) {
      fetchCategoriesSub();
      setIsLoading((prevLoading: any) => ({
          ...prevLoading,
          categories_sub: false,
      }));
    }
  }, [isLoading.categories_sub])
  return ( 
    <CategoriesSubContext.Provider value={{ categoriesSub, setCategoriesSub }}>
      {children}
    </CategoriesSubContext.Provider>
  )
};