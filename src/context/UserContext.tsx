import { createContext } from 'react'
import { UserData } from '../types'



export const UserContext = createContext< any >({
    user:{
        id: 1, 
        id_client: 2, 
        name: "Rodrigo", 
        user: "rmayer", 
        pass: "123", 
        deleted: false, 
        enabled: true, 
        ordered_fields:[5, 1,2,3, 4]
      },
      setUser: () =>{}
    })
