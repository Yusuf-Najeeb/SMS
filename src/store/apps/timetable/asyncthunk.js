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
      notifyError(error?.response?.data?.message || 'Unable to Add Period')
      
    }
  }

  export const deleteTimetablePeriod = async (id)=>{
    try {
      const res = await axios.delete(`/timetable/${id}`)
      if(res.data.success){
        notifySuccess('Period Deleted')
      }

      return res
      
    } catch (error) {
      notifyError(error?.response?.data?.message || 'Unable to Delete Period')
      
    }
  }

  export const updateTimetablePeriod = async (payload, id)=>{
    try {
      const res = await axios.patch(`/timetable/${id}`, payload)
      if(res.data.success){
        notifySuccess('Period Updated')
      }

      return res
      
    } catch (error) {
      notifyError(error?.response?.data?.message || 'Unable to Update Period')
      
    }
  }