import { createContext, useState, useEffect, useContext } from 'react';
import { FilestackData } from '../types';
import { IsLoadingContext } from './IsLoadingContext';
// import { UserContext } from './UserContext';
import { ClientContext } from './ClientContext';

const INITIAL_FILESTACK = [{
  _id: 0,
  id_group_filestack: 1,
  filestack_email: '',
  createdAt: '',
  updatedAt: '',
  apikey: '',
  signature: '',
}];

type FilestackContextType = {
  filestack: FilestackData;
}; 

export const FilestackContext = createContext<object | undefined>(undefined);

type FilestackProviderProps = {
  children: React.ReactNode;
};

export const FilestackProvider: React.FC<FilestackProviderProps> = ({ children }) => {
  // const { user } = useContext<any>(UserContext);
  const { client } = useContext<any>(ClientContext);
  
  const { isLoading, setIsLoading } = useContext<any>(IsLoadingContext);
  const [filestack, setFilestack] = useState<FilestackData[]>(INITIAL_FILESTACK);

  const apiKey = filestack[0].apikey;
  const signature = filestack[0].signature;
  const policy = "eyJleHBpcnkiOjI3NjI0NjAwMDB9"; // The policy is always the same for for all the files for the date 2057-07-16
  
  const deleteFilesStock = (id_product: number, img_url_handle: string) => {
    // console.log("Deleting this filestock imgurl: ", imgurl)
    // console.log("Deleting this filestock apiKey: ", apiKey)
    // const fileHandle = imgurl.split('/')[3];
    // console.log("Deleting apiKey: ", apiKey)
    // console.log("Deleting fileHandle: ", fileHandle)
    // console.log("Deleting policy: ", policy)
    // console.log("Deleting signature: ", signature)
    
    const url = `https://www.filestackapi.com/api/file/${img_url_handle}?key=${apiKey}&policy=${policy}&signature=${signature}`; 
    // const url = `https://www.filestackapi.com/api/file/${fileHandle}?key=${apiKey}&policy=${policy}&signature=${signature}`; 
    // const url = `https://cdn.filestackcontent.com/auto_image/${fileHandle}?key=${apiKey}&policy=${policy}&signature=${signature}`;
    // const url = `https://cdn.filestackcontent.com/resize=w:30/auto_image/compress/${fileHandle}?key=${apiKey}&policy=${policy}&signature=${signature}`;
    const requestOptions = {
        method: 'DELETE',
    };
    fetch(url, requestOptions)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log('File deleted successfully');
    })
    .catch(error => {
        console.error('There was a problem deleting the file:', error);
    });
    // onSetImageUrlHandle("")
    const fetchDeleteImageProduct = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL_BACKEND}/products/${id_product}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json', // Set the appropriate content-type for my API
                },
                body:JSON.stringify({url_image:""})
            })
            // Check if the response status is successful
            if (response.ok) {
                // const responseData = await response.json() // parse the response data
            } else {
                // Handle non-successful responses
                console.error('Request failed: ', response.status, response.statusText)
                // Handle the error here
            }
        } catch (error: unknown) {
            if (typeof error === 'string') {
                // 'error' is now narrowed down to type 'string'
                console.error('Error:', error)
            } else if (error instanceof Error) {
                // 'error' is now narrowed down to type 'Error'
                console.error('Error object:', error.message)
            } else {
                // Handle other cases as needed
            }
        } finally {
        }
    } 
    fetchDeleteImageProduct()
  }

  useEffect(() => {
    const fetchFilestack = async () => {
      try {
        // console.log("user.id_client: ", user.id_client)
        // const response = await fetch(`${import.meta.env.VITE_API_URL_BACKEND}/filestackEmails/client/${user.id_client}`); 
        const response = await fetch(`${import.meta.env.VITE_API_URL_BACKEND}/filestackEmails/client/${client.id_group_filestack}`); 
        // console.log("filestack response: ", response)
        if (response.ok) {
          const json = await response.json();
          setFilestack(json);
        } else {
          // setFilestack(INITIAL_FILESTACK);
          // Handle the case where the response is not OK (e.g., show an error message)
        }
      } catch (error: unknown) {
        // setFilestack(INITIAL_FILESTACK);
        // Handle any network or fetch-related errors
      } finally {
            setIsLoading((prevLoading:any) => ({
            ...prevLoading,
            filestack: false,
            }));
        }
    };

    if (!isLoading.client) {
      fetchFilestack();
    }
  // }, [user]);
}, [client]);

  return (
    <FilestackContext.Provider value={{ filestack, setFilestack, deleteFilesStock }}>
      {children}
    </FilestackContext.Provider>
  )
};