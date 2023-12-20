import { useContext } from "react";
import { UserData } from "../types"
import { IsLoadingContext } from "../context/IsLoadingContext";
import { UserContext } from "../context/UserContext";


export default function useAddUser () {
    const { INITIAL_USER, user, setUser, gmailUserLogged, setGmailUserLogged, _IdUserLogged, set_IdUserLogged } = useContext<any>(UserContext); 
    const { isLoading, setIsLoading } = useContext<any>(IsLoadingContext);

    // console.log("testing addUser")


    const addUser  = async () => {
        const bodyUser: UserData= {
        ...INITIAL_USER,
        "email": gmailUserLogged.email,
        "name": gmailUserLogged.given_name,
        "last_name": gmailUserLogged.family_name,
        "user": gmailUserLogged.email?.split("@")[0] || "",
        "language": 1,  ///////////////////////////////// FIX
        }
        try {
            console.log("testing addUser")

            const response = await fetch(`http://localhost:4000/api/clients/`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json', // Set the appropriate content-type for my API
            // Add any other requires headers here
            },
            body:JSON.stringify({
            "deleted": false,
            "enabled": true
            })
        })

        // Check if the response status is successful
        if (response.ok) {
            const responseData = await response.json() // parse the response data
            bodyUser.id_client = responseData.id
        } else if (response.status === 400) {
            // Handle non-successful responses
            const errorData = await response.json()
            console.error('Request failed 2: ', errorData.error)
            // Handle the error here
            if (errorData.errorCode === 'duplicate_product') {
            // setOpenErrorModal(true) // Open the modal for duplicate product error
            // setErrorData(errorData.errorCode)
            }
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
        if(bodyUser.id_client)
            postUser(bodyUser)
        }
    } 
    const postUser = async (bodyUser:UserData) => {
        console.error('Login.tsx postUser bodyUser: ', bodyUser)
        let loadingSuccess: boolean = false
        try {
        const response = await fetch(`http://localhost:4000/api/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Set the appropriate content-type for my API
                // Add any other requires headers here
            },
            body:JSON.stringify(bodyUser)
        })

        // Check if the response status is successful
        if (response.ok) {
            const responseData = await response.json() // parse the response data
            loadingSuccess = true
            // set_IdUserLogged(responseData._id)
            setGmailUserLogged(responseData)
        } else if (response.status === 400) {
            // Handle non-successful responses
            console.error('Request failed: ', response.status, response.statusText)
            const errorData = await response.json()
            console.error('Request failed 2: ', errorData.error)
            // Handle the error here
            if (errorData.errorCode === 'duplicate_product') {
            // setOpenErrorModal(true) // Open the modal for duplicate product error
            // setErrorData(errorData.errorCode)
            }
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
        // console.log("loadingSuccess: ", loadingSuccess)
        setIsLoading((prevLoading: any) => ({
            ...prevLoading,
            fieldsFetchCreateStock: loadingSuccess,
        }));
        }
    }

    // postClient()

    return  addUser  ;
}