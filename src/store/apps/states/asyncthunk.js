import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'



export const fetchStates = createAsyncThunk('states', async (query) => {
    try {
      const response = await axios.get(`/settings/states?countryId=${query.countryId}`)

      console.log(response, 'states')

      return response
    } catch (error) {

    //   notifyError('Error fetching Guardian')
  
    }
  })

  export const createClass = async (payload)=>{
    try {
      const res = await axios.post(`/classes`, payload)
      if(res.data.success){
        notifySuccess('Class Added')
      }

      return res
      
    } catch (error) {
      notifyError('Unable to Add Class')
      
    }
  }

  export const updateClass = async (id, payload)=>{
    try {
      const res = await axios.patch(`/classes/${id}`, payload)
      if(res.data.success){
        notifySuccess('Class Updated')
      }

      return res
      
    } catch (error) {
      notifyError('Unable to Update Class')
      
    }
  }

  export const deleteClass = async (id)=>{
    try {
      const res = await axios.delete(`/classes/${id}`)
      if(res.data.success){
        notifySuccess('Class Deleted')
      }

      return res
      
    } catch (error) {
      notifyError('Unable to Delete Class')
      
    }
  }