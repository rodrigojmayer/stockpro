import { createContext, useState, useEffect, useContext } from 'react';
import { CategoriesData } from '../types';
import { IsLoadingContext } from './IsLoadingContext';

const INITIAL_CATEGORY = {
  id: NaN,
  name: '',
  sub_categories: [],
  deleted: false,
};

type CategoriesContextType = {
  user: CategoriesData;
//   setUser: UserData;
};

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
        const response = await fetch(`http://localhost:4000/api/categories/`);
        
        if (response.ok) {
          const json = await response.json();
          setCategories(json);
        } else {
          setCategories(INITIAL_CATEGORY);
          // Handle the case where the response is not OK (e.g., show an error message)
        }
      } catch (error) {
        setCategories(INITIAL_CATEGORY);
        // Handle any network or fetch-related errors
      } finally {
            setIsLoading((prevLoading:any) => ({
            ...prevLoading,
            user: false,
            }));
        }
    };

    fetchCategories();
  }, []);

  return <CategoriesContext.Provider value={{ categories, setCategories }}>{children}</CategoriesContext.Provider>;
};

// const [getUser, setGetUser] = useState<UserData>( INITIAL_USER)
// const fetchUser = async () => {
// try {
//     const response = await fetch(`http://localhost:4000/api/users/64b1b4b5cc67f2fbd144413c`)
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
