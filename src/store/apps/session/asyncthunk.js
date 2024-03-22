import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'



export const fetchSession = createAsyncThunk('session', async (query) => {
    try {
      const response = await axios.get(`/settings/sessions?page=${query.page}&limit=${query.limit}`)

      return response
    } catch (error) {

    //   notifyError('Error fetching Guardian')
  
    }
  })

  export const createSession = async (payload)=>{
    try {
      const res = await axios.post(`/settings/sessions`, payload)
      if(res.data.success){
        notifySuccess('Session Added')
      }

      return res
      
    } catch (error) {
      notifyError('Unable to Add Session')
      
    }
  }

  export const updateSession = async (id, payload)=>{
    try {
      const res = await axios.patch(`/settings/sessions/${id}`, payload)
      if(res.data.success){
        notifySuccess('Session Updated')
      }

      return res
      
    } catch (error) {
      notifyError('Unable to Update Session')
      
    }
  }

  export const deleteSession = async (id)=>{
    try {
      const res = await axios.delete(`/settings/sessions/${id}`)
      if(res.data.success){
        notifySuccess('Session Deleted')
      }

      return res
      
    } catch (error) {
      notifyError('Unable to Delete Session')
      
    }
  }

  export const makeCurrentSession = async (id)=>{
    try {
      const res = await axios.patch(`/settings/sessions/${id}`)
      if(res.data.success){
        notifySuccess('Current Session Changed')
      }

      return res
      
    } catch (error) {
      notifyError('Unable to Change Current Session')
      
    }
  }




 