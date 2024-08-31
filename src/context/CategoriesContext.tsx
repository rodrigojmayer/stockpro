import { createContext, useState, useEffect, useContext } from 'react';
import { CategoriesData } from '../types';
import { IsLoadingContext } from './IsLoadingContext';

const INITIAL_CATEGORY = {
  id: NaN,
  // name: '',
  category_en: "",
  category_es: "",
  category_dk: "",
  category_it: "",
  sub_categories: [],
  deleted: false,
};

// type CategoriesContextType = {
//   categories: CategoriesData;
// //   setUser: UserData;
// };

// export const CategoriesContext = createContext<UserContextType | undefined>(undefined);
export const CategoriesContext = createContext<object | undefined>(undefined);

type CategoriesProviderProps = {
  children: React.ReactNode;
};

export const CategoriesProvider: React.FC<CategoriesProviderProps> = ({ children }) => {
  const [categories, setCategories] = useState<CategoriesData>(INITIAL_CATEGORY);
  const { isLoading, setIsLoading } = useContext<any>(IsLoadingContext);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL_BACKEND}/categories/`);
        
        if (response.ok) {
          const json = await response.json();
          const json_categories = json.map((category:any) => {
            return (
              {_id: category._id,
              id: category.id,
              category_en: category.name,
              category_es: category.name_esp,
              category_dk: category.name_dan,
              category_it: category.name_ita,
              deleted: category.deleted}
            )
          })
          setCategories(json_categories);
        } else {
          setCategories(INITIAL_CATEGORY);
          // Handle the case where the response is not OK (e.g., show an error message)
        }
      } catch (error: unknown) {
        setCategories(INITIAL_CATEGORY);
        // Handle any network or fetch-related errors
      } finally {
            setIsLoading((prevLoading:any) => ({
            ...prevLoading,
            categories: false,
            }));
        }
    };

    fetchCategories();
  }, []);

  return ( 
    <CategoriesContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoriesContext.Provider>
  )
};

// const [getUser, setGetUser] = useState<UserData>( INITIAL_USER)
// const fetchUser = async () => {
// try {
//     const response = await fetch(`${import.meta.env.VITE_API_URL_BACKEND}/users/64b1b4b5cc67f2fbd144413c`)
//     if (response.ok) {
//     const json = await response.json()
//     // console.log("userjson: ", json)
//     setGetUser(json)
//     } else {
//     // Handle the case where the response is not OK (e.g., show an error message)
//     }
// } catch (error) {
//     setGetUser(INITIAL_USER)
//     // Handle any network or fetch-related errors
// } finally {
//     // setIsLoading((prevLoading) => ({
//     // ...prevLoading,
//     // user: false,
//     // }));
// }
// }

// fetchUser();
// // }, [])


// // export const UserContext = createContext< any >({
// //     user: getUser
//     // user:{
//     //     id: 1, 
//     //     id_client: 2, 
//     //     name: "Rodrigo", 
//     //     user: "rmayer", 
//     //     pass: "123", 
//     //     deleted: false, 
//     //     enabled: true, 
//     //     ordered_fields:[5, 1,2,3, 4]
//     //   },
//     //   setUser: () =>{}
//     // })
