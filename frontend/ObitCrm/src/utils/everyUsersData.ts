import apiBackendUrl from "../lib/axiosData"
import { shootErrorToast } from "./succesToastFunction"

export const getEveryUsers = async () => { 
    try {
        const {data, status} = await apiBackendUrl.get("/user/everyUsersData")
        if(status === 200) { 
            console.log("everyusers", data)
            return data
        }
    } catch (error) {
        shootErrorToast("Ocurrio un error al querer obtener los usuarios del sistema")
    }
}