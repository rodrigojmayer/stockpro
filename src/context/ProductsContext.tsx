import { createContext, useState, useEffect, useContext } from 'react';
import { Data, UserData } from '../types';
import { IsLoadingContext } from './IsLoadingContext';
import { UserContext } from './UserContext';

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
  const fetchProducts = async () => {
      
    // console.log("Fetching products isLoading.fieldsFetchCreateStock:", isLoading.fieldsFetchCreateStock)

    try {
      const response = await fetch(`http://localhost:4000/api/products/client/${user.id_client}`)
      if (response.ok) {
        const json = await response.json()
        // console.log("productsContext json: ", json)
        
        // if(json.lenght>0){
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
            const alertOnA = formatAlertDate((a.alerted_amount && a.alert_amount_enabled) || (a.alerted_date && a.alert_date_enabled))
            const alertOnB = formatAlertDate((b.alerted_amount && b.alert_amount_enabled) || (b.alerted_date && b.alert_date_enabled))
            if (alertOnA && alertOnB) {
              return alertOnA - alertOnB
            }
            // If one of the dates is null or undefined, place it at the end
            return alertOnA ? -1 : 1
          })
        // console.log("productsContext here is ok: ------------------")

          setProducts(formattedProducts)
        // }
        // else{

        //   setProducts([ {
        //     "_id": "64f753ab73d98cad83d464d4",
        //     "id_client": 3,
        //     "product": "Leche",
        //     "amount": 2,
        //     "measure": "Kgs",
        //     "category": "Food",
        //     "sub_category": "Seasoning",
        //     "code": "",
        //     "price": 5,
        //     "description": "",
        //     "url_image": "",
        //     "alert_amount": 4,
        //     "alerted_amount": true,
        //     "alert_date": "2023-09-30T00:00:00.000Z",
        //     "alert_date_enabled": false,
        //     "alerted_date": true,
        //     "deleted": false,
        //     "createdAt": "2023-09-05T16:13:31.996Z",
        //     "updatedAt": "2023-11-24T23:23:05.086Z",
        //     "__v": 0,
        //     "alert_amount_enabled": true,
        //     "custom_fields": {
        //         "ret": "0",
        //         "campo personal": "Loco"
        //     }
        //   }])
        // formattedProducts
        // }
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

  useEffect(() => {
    if (!isLoading.user) {
      fetchProducts();
    }
  }, [user])
  
  useEffect(() => {
    if (isLoading.fieldsFetchCreateStock) {
      fetchProducts();
      setIsLoading((prevLoading: any) => ({
          ...prevLoading,
          fieldsFetchCreateStock: false,
      }));
    }
  }, [isLoading.fieldsFetchCreateStock ])
  


  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  )
};
