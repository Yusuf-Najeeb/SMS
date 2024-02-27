import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'



export const fetchGradingParameters = createAsyncThunk('grading-parameters', async (query) => {
    try {
      const response = await axios.get(`/settings/grading-parameter?page=${query.page}&limit=${query.limit}`)

      return response
    } catch (error) {

    //   notifyError('Error fetching Guardian')
  
    }
  })

  export const createGradingParameter = async (payload)=>{
    try {
      const res = await axios.post(`/settings/grading-parameter`, payload)
      if(res.data.success){
        notifySuccess('Grading Parameter Added')
      }

      return res
      
    } catch (error) {
      notifyError('Unable to Add Grading Parameter')
      
    }
  }

  export const updateGradingParameter = async (id, payload)=>{
    try {
      const res = await axios.patch(`/settings/grading-parameter/${id}`, payload)
      if(res.data.success){
        notifySuccess('Grading Parameter Updated')
      }

      return res
      
    } catch (error) {
      notifyError('Unable to Update Grading Parameter')
      
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

  export const assignRoomToStaff = async (payload)=>{
    try {
      const res = await axios.post(`/rooms/staff/associate`, payload)
      if(res.data.success){
        notifySuccess('Room Assigned To Staff')
      }

      return res
      
    } catch (error) {
      notifyError('Unable to Assign Room')
      
    }
  }

  export const removeStaffInRoom = async (payload)=>{
    try {
      const res = await axios.post(`/rooms/staff/dissociate`, payload)
      if(res.data.success){
        notifySuccess('Staff Removed From Room')
      }

      return res
      
    } catch (error) {
      notifyError('Unable to Remove Staff From Room')
      
    }
  }

  export const assignRoomToStudent = async (payload)=>{
    try {
      const res = await axios.post(`/rooms/student/associate`, payload)
      if(res.data.success){
        notifySuccess('Room Assigned To Student')
      }

      return res
      
    } catch (error) {
      notifyError('Unable to Assign Room')
      
    }
  }

  export const removeStudentInRoom = async (payload)=>{
    try {
      const res = await axios.post(`/rooms/student/dissociate`, payload)
      if(res.data.success){
        notifySuccess('Student Removed From Room')
      }

      return res
      
    } catch (error) {
      notifyError('Unable to Remove Student From Room')
      
    }
  }