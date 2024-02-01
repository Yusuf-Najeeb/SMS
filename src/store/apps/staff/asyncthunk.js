import axios from 'axios'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const createStaffs = createAsyncThunk('/StaffData/createStaffs', async vals => {
  try {
    const response = await axios.post('/auth/registerteacher', vals)
    console.log(response, 'respone')
    notifySuccess('student created successfully')

    return response
  } catch (error) {
    console.log(error, 'error')
    notifyError('Error creating staff')

    // return {
    //   success: false
    // }
  }
})

export const fetchStaffs = createAsyncThunk('/StaffData/fetchStaffs', async () => {
  try {
    const response = await axios.get('/staffs/allstaffs')
    console.log(response, 'respone')

    //notifySuccess('Staff gotten successfully')

    return response
  } catch (error) {
    console.log(error, 'error')
    notifyError('Error fetching staff')

    // return {
    //   success: false
    // }
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



export const createStaff = async (payload)=> {
  try {
    const response = await axios.post('/auth/registerteacher', payload)


    return response 
   

  } catch (error) {
    notifyError('Error Creating Staff, Try again')
  }
}

export const updateStaff = async (payload)=> {
  try {
    const response = await axios.patch(`/staffs/updatestaff/${payload.email}`, payload)

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