import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'



export const fetchClasses = createAsyncThunk('classrooms', async (query) => {
    try {
      const response = await axios.get(`/classes?page=${query.page}&limit=${query.limit}&key=${query.key}`)

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

  export const updateSubject = async (id, payload)=>{
    try {
      const res = await axios.patch(`/subjects/${id}`, payload)
      if(res.data.success){
        notifySuccess('Subject Updated')
      }

      return res
      
    } catch (error) {
        console.log(error, 'update subject error')
      notifyError('Unable to Update Subject')
      
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