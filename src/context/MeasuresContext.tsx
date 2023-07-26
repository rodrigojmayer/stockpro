import { createContext, useState, useEffect, useContext } from 'react';
import { MeasuresData } from '../types';
import { IsLoadingContext } from './IsLoadingContext';

const INITIAL_MEASURE = {
  id: NaN,
  name: '',
  deleted: false,
};

// type MeasuresContextType = {
//   user: MeasuresData;
// };

export const MeasuresContext = createContext<object | undefined>(undefined);

type MeasuresProviderProps = {
  children: React.ReactNode;
};

export const MeasuresProvider: React.FC<MeasuresProviderProps> = ({ children }) => {
  const [measures, setMeasures] = useState<MeasuresData>(INITIAL_MEASURE);
  const { isLoading, setIsLoading } = useContext<any>(IsLoadingContext);

  useEffect(() => {
    const fetchMeasures = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/measures/`);
        
        if (response.ok) {
          const json = await response.json();
          setMeasures(json);
        } else {
          setMeasures(INITIAL_MEASURE);
          // Handle the case where the response is not OK (e.g., show an error message)
        }
      } catch (error) {
        setMeasures(INITIAL_MEASURE);
        // Handle any network or fetch-related errors
      } finally {
            setIsLoading((prevLoading:any) => ({
            ...prevLoading,
            measures: false,
            }));
        }
    };

    fetchMeasures();
  }, []);

  return <MeasuresContext.Provider value={{ measures, setMeasures }}>{children}</MeasuresContext.Provider>;
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
