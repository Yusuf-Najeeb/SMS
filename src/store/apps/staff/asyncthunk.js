import axios from 'axios'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { createAsyncThunk } from '@reduxjs/toolkit'


export const fetchStaffs = createAsyncThunk('/StaffData/fetchStaffs', async (query) => {
  try {
    const response = await axios.get(`/staffs/allstaffs?page=${query.page}&limit=10&key=${query.key}&type=`)

    // console.log(response, 'response')

    return response
  } catch (error) {
    notifyError('Error fetching staffs')

  }
})

// export const fetchStaffByRoom = async email => {
//   try {
//     const response = await axios.get(`/staffs/gethousemasterroom/${email}`)

//     // notifySuccess('student created successfully')

//     return response
//   } catch (error) {
//     console.log(error, 'error')
//     notifyError('Error fetching staff Exams')

//     // return {
//     //   success: false
//     // }
//   }
// }

// export const fetchStafftBySubjectTaught = async email => {
//   try {
//     const response = await axios.get(`/staffs/gethousemasterroom/${email}`)

//     // notifySuccess('student created successfully')

//     return response
//   } catch (error) {
//     console.log(error, 'error')
//     notifyError('Error fetching staffs Exams')

//     // return {
//     //   success: false
//     // }
//   }
// }



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
    const response = await axios.patch(`/staffs/updatestaff/${email}`, payload)

    return response 
   
  } catch (error) {
    notifyError('Error Updating Staff, Try again')
  }
}

export const deleteStaff =  async (email) => {
  try {
    const response = await axios.delete(`/staffs/deletestaff/${email}`)

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
    const response = await axios.get(`/staffs/allstaffs?page=1&limit=2000&key=${key}`)

    return response?.data.data.result
  } catch (error) {
    
  }
}