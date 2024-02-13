import axios from "axios"
import { notifyError } from "../../../@core/components/toasts/notifyError"

export const uploadImage = async (formData)=> {
  try {
    const response = await axios.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data'} 
    })

    return response?.data.data
  } catch (error) {
    notifyError('Image upload failed, Try again')
  }
}
