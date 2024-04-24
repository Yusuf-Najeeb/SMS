import axios from 'axios'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { createAsyncThunk } from '@reduxjs/toolkit'


export const fetchStaffs = createAsyncThunk('/StaffData/fetchStaffs', async (query) => {
  try {
    const response = await axios.get(`/staffs?page=${query.page}&limit=${query.limit}&key=${query.key}&type=`)

    // console.log(response, 'response')

    return response
  } catch (error) {

  }
})

export const fetchStaffByType = createAsyncThunk('staff-by-type', async (query) => {
  try {
    const response = await axios.get(`/staffs?page=${query.page}&limit=${query.limit}&key=${query.key}&type=${query.type}`)


    return response
  } catch (error) {

  }
})

export const fetchStaffByRole = createAsyncThunk('/StaffData/fetchStaffs', async (query) => {
  try {
    const response = await axios.get(`/staffs?page=${query.page}&limit=${query.limit}&role=${query.role}`)

    // console.log(response, 'response')

    return response
  } catch (error) {

  }
})




export const createStaff = async (role, payload)=> {
  try {
    const response = await axios.post(`/auth/register/staff?role=${role}`, payload)


    return response 
   

  } catch (error) {
    notifyError('Error Creating Staff, Try again')
  }
}

export const updateStaff = async (email, payload)=> {
  try {
    const response = await axios.patch(`/staffs/${email}`, payload)

    return response 
   
  } catch (error) {
    notifyError('Error Updating Staff, Try again')
  }
}

export const deleteStaff =  async (email) => {
  try {
    const response = await axios.delete(`/staffs/${email}`)

    if (response.data.success) {
      notifySuccess('Staff Deleted')
    }

    return response
  } catch (error) {
    notifyError('Error Deleting Staff')

  }
}

export const searchStaff = async (key)=> {
  try {
    const response = await axios.get(`/staffs?page=1&limit=2000&key=${key}`)

    return response?.data.data.result
  } catch (error) {
    
  }
}

export const fetchTeacherSubjects = async (email)=> {
  try {
    const response = await axios.get(`/staffs/subjects/${email}`)


    return response
  } catch (error) {
    
  }
}