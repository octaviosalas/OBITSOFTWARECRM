import axios from "axios"

const apiBackendUrl = axios.create({ 
    baseURL: import.meta.env.VITE_API_URL
})

export default apiBackendUrl