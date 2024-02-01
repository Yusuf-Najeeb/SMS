import axios from "axios"

export const createActor = async (endpointUrl, payload)=> {
    try {
        const res = axios.post(endpointUrl, payload)

        return res
    } catch (error) {
        
    }
}