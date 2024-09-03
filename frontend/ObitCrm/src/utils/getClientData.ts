import apiBackendUrl from "../lib/axiosData"
import handleError from "./axiosErrorHanlder"


export const getClientData = async (clientId: number,  setLoad: (value: boolean) => void ) => {
    setLoad(true) 
    console.log(clientId)
    try {
        const {status, data} = await apiBackendUrl.get(`/client/clientData/${clientId}`)
        console.log(data, status)
        if(status === 200) {
            return data
        }  
       } catch (error) {
         handleError(error, setLoad)
       }
}