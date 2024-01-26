import axios from '../api/axios'
import useAuth from './useAuth'


export default function useRefreshToken() {
    const { setAuth } = useAuth()

    const refresh  = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        })
        setAuth((prev:any) => {
            // console.log(JSON.stringify(prev))
            // console.log("response.data: ", response.data)
            // console.log("response.data._id: ", response.data._id)
            // console.log("response.data.accessToken: ", response.data.accessToken)
            return{ 
                ...prev, 
                _id: response.data._id , 
                accessToken: response.data.accessToken 
            }
        })
        return response.data.accessToken
    }
    return refresh
    
}