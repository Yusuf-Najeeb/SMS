import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'



export const fetchSubjects = createAsyncThunk('subjects', async (query) => {
    try {
      const response = await axios.get(`/subjects?page=${query.page}&limit=${query.limit}&categoryId=${query.categoryId}`)

      return response
    } catch (error) {

    //   notifyError('Error fetching Guardian')
  
    }
  })

  export const createSubject = async (payload)=>{
    try {
      const res = await axios.post(`/subjects`, payload)
      if(res.data.success){
        notifySuccess('Subject Added')
      }

      return res
      
    } catch (error) {
      notifyError('Unable to Add Subject')
      
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

  export const deleteSubject = async (id)=>{
    try {
      const res = await axios.delete(`/subjects/${id}`)
      if(res.data.success){
        notifySuccess('Subject Deleted')
      }

      return res
      
    } catch (error) {
      notifyError('Unable to Delete Subject')
      
    }
  }

  export const assignTeacher = async (payload)=>{
    try {
      const res = await axios.post('/subjects/associate', payload)

      if(res.data.success){
        notifySuccess('Teacher Assigned')
      }

      return res
    } catch (error) {
      notifyError('Unable to Assign Subject To Teacher')
    }
  }

  export const removeTeacher = async (payload)=>{
    try {
      const res = await axios.post('/subjects/dissociate', payload)

      if(res.data.success){
        notifySuccess('Teacher Removed')
      }

      return res
    } catch (error) {
      notifyError('Unable to Remove Subject From Teacher')
    }
  }

  export const assignSubjectCategory = async (payload)=>{
    try {
      const res = await axios.post('/subjects/addcategory', payload)

      if(res.data.success){
        notifySuccess('Category Assigned')
      }

      return res
    } catch (error) {
      notifyError('Unable to Assign Category To Subject')
    }
  }