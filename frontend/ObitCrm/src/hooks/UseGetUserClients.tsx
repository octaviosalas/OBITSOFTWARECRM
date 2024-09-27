

import { useEffect, useState } from "react"
import apiBackendUrl from "../lib/axiosData"
import { clientPersonalDataType } from "../types/Clients"


const UseGetUserClients = () => { 

    const [everyClientsData, setEveryClientsData] = useState<clientPersonalDataType[] | []>([])
    const [load, setLoad] = useState<boolean>(false)
    const [withOutClientsData, setWithOutClientsData] = useState<boolean>(false)

    
    const getClientsAccesUserData = async (userId: number) => { 
        setLoad(true)
        try {
            const {data, status} = await apiBackendUrl.get(`/user/userClientAcces/${userId}`)
            if(status === 200) { 
                console.log("data", data)
                 if(data.length > 0) { 
                    setWithOutClientsData(false)
                    const clientsOnlyData = data.map((c : any) => { 
                        const onlyClientsData = c.clientData
                        return onlyClientsData
                    })
                    setLoad(false)
                    setEveryClientsData(clientsOnlyData)
                 } else { 
                    setWithOutClientsData(true)
                 }

            }
        } catch (error) {
            console.log(error)
        }
    }

   return {load, everyClientsData, withOutClientsData, getClientsAccesUserData}

}

export default UseGetUserClients