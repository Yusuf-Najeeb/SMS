import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'



export const fetchClassTimetable = createAsyncThunk('timetable', async (query) => {
    try {
      const response = await axios.get(`/timetable/classtimetable/${query.classId}/${query.sessionId}`)

      return response
    } catch (error) {

  
    }
  })

  export const createTimetablePeriod = async (payload)=>{
    try {
      const res = await axios.post(`/timetable/addperiod`, payload)
      if(res.data.success){
        notifySuccess('Period Added')
      }

      return res
      
    } catch (error) {
      notifyError('Unable to Add Period')
      
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