import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'



export const fetchRooms = createAsyncThunk('rooms', async (query) => {
    try {
      const response = await axios.get(`/rooms?page=${query.page}&limit=${query.limit}&key=${query.key}`)

      return response
    } catch (error) {

    //   notifyError('Error fetching Guardian')
  
    }
  })

  export const createRoom = async (payload)=>{
    try {
      const res = await axios.post(`/rooms`, payload)
      if(res.data.success){
        notifySuccess('Room Added')
      }

      return res
      
    } catch (error) {
      notifyError('Unable to Add Room')
      
    }
  }

  export const updateRoom = async (id, payload)=>{
    try {
      const res = await axios.patch(`/rooms/${id}`, payload)
      if(res.data.success){
        notifySuccess('Room Updated')
      }

      return res
      
    } catch (error) {
      notifyError('Unable to Update Room')
      
    }
  }

  export const deleteRoom = async (id)=>{
    try {
      const res = await axios.delete(`/rooms/${id}`)
      if(res.data.success){
        notifySuccess('Room Deleted')
      }

      return res
      
    } catch (error) {
      notifyError('Unable to Delete Room')
      
    }
  }

