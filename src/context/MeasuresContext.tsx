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