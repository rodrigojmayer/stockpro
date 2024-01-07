import axios from '../api/axios'
import useAuth from './useAuth'


export default function useRefreshToken() {
    const { setAuth } = useAuth()

    const refresh  = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        })
        setAuth((prev:any) => {
            console.log(JSON.stringify(prev))
            console.log(response.data.accToken)
            return{ ...prev, accToken: response.data.accToken }
        })
        return response.data.accToken
    }
    return refresh
    
}