import { createContext, useState, useEffect, useContext } from 'react';
import { Data, UserData } from '../types';
import { IsLoadingContext } from './IsLoadingContext';
import { UserContext } from './UserContext';

// const INITIAL_USER = {
//   id: NaN,
//   id_client: NaN,
//   name: '',
//   user: '',
//   pass: '',
//   deleted: false,
//   enabled: true,
//   ordered_fields: [],
// };

// type ProductsContextType = {
//   user: UserData;
// };

export const ProductsContext = createContext<object | undefined>(undefined);

type ProductsProviderProps = {
  children: React.ReactNode;
};

export const ProductsProvider: React.FC<ProductsProviderProps> = ({ children }) => {
  const { isLoading, setIsLoading } = useContext<any>(IsLoadingContext);
  const { user } = useContext<any>(UserContext);
  
  const [products, setProducts] = useState<Data[]>([])

  const formatAlertDate = (dateString: string | null) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return date.getTime() // Returns the time in miliseconds since January 1, 1970 (UNIX timestamp)
  }


  useEffect(() => {

      
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/products/client/${user.id_client}`)
        if (response.ok) {
          const json = await response.json()

          // Map through the products array and edit the date format
          const formattedProducts = json.map((product: Data) => {
            // Assuming the 'alert_date' field is in ISO format ('YYYY-MM-DDTHH:mm:ss.sssZ')
            // You can parse the date and format it as 'DD-MM-YY' before setting it to the state
            const alert_date = product.alert_date ? new Date(product.alert_date).toLocaleDateString('en-GB') : null;

            // Return the modified product object
            return {
              ...product,
              alert_date: alert_date,
            };
          });

          // Sort the products array by the 'alert_on' field
          formattedProducts.sort((a:any, b:any) => {
            const alertOnA = formatAlertDate(a.alert_on)
            const alertOnB = formatAlertDate(b.alert_on)
            if (alertOnA && alertOnB) {
              return alertOnA - alertOnB
            }
            // If one of the dates is null or undefined, place it at the end
            return alertOnA ? -1 : 1
          })
          
          setProducts(formattedProducts)
        } else {
          // Handle the case where the response is not OK (e.g., show an error message)
        }
      } catch (error) {
        setProducts([])
        // Handle any network or fetch-related errors
      } finally {
        setIsLoading((prevLoading: any) => ({
          ...prevLoading,
          products: false,
        }));
      }
    }
  
  
  
    if (!isLoading.user) {
      // console.log(user.id_client)
      // fetchDefaultColumns();
      // fetchCustomColumns();
      fetchProducts();
    }
  }, [user ])
  


  return <ProductsContext.Provider value={{ products }}>{children}</ProductsContext.Provider>;
};
