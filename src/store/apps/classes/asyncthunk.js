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

  export const fetchStudentsInClass = async (id)=> {
    try {
      const res = await axios.get(`/classes/students/${id}`)
      
      console.log(res, 'students in class')

      return res
    } catch (error) {
      
    }
  }

  export const assignSubjectToClass = async (payload)=>{
    try {
      const res = await axios.post(`/classes/subject/associate`, payload)
      if(res.data.success){
        notifySuccess('Subject Assigned To Class')
      }

      return res
      
    } catch (error) {
      notifyError('Unable to Assign Subject')
      
    }
  }

  export const removeSubjectInClass = async (payload)=>{
    try {
      const res = await axios.post(`/classes/subject/dissociate`, payload)
      if(res.data.success){
        notifySuccess('Subject Removed From Class')
      }

      return res
      
    } catch (error) {
      notifyError('Unable to Remove Subject From Class')
      
    }
  }