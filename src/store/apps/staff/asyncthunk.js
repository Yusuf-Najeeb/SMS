import axios from 'axios'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchStaffs = createAsyncThunk('fetchStaff/', async vals => {
  try {
    const response = await axios.post('/auth/registerteacher', vals)

    // notifySuccess('student created successfully')

    return response
  } catch (error) {
    console.log(error, 'error')
    notifyError('Error fetching staffs')

    // return {
    //   success: false
    // }
  }
})
export const fetchStaffByRoom = async email => {
  try {
    const response = await axios.get(`/staffs/gethousemasterroom/${email}`)

    // notifySuccess('student created successfully')

    return response
  } catch (error) {
    console.log(error, 'error')
    notifyError('Error fetching staff Exams')

    // return {
    //   success: false
    // }
  }
}

export const fetchStafftBySubjectTaught = async email => {
  try {
    const response = await axios.get(`/staffs/gethousemasterroom/${email}`)

    // notifySuccess('student created successfully')

    return response
  } catch (error) {
    console.log(error, 'error')
    notifyError('Error fetching staffs Exams')

    // return {
    //   success: false
    // }
  }
}

export const updateStaff = createAsyncThunk('updateStaff', async query => {
  try {
    const response = await axios.patch(`/staffs/updatestaff/`, {
      params: {
        page: query.page,
        limit: query.limit
      }
    })

    return response
  } catch (error) {
    console.log(error, 'errorrrr')

    // notifyError('Error Fetching Salary Items')
  }
})

export const deleteStaff = createAsyncThunk('deleteStaff', async id => {
  try {
    const response = await axios.delete(`staff/${id}`)

    if (response.data.success) {
      notifySuccess('Staff Deleted Successfully')
    }

    return {
      status: true
    }
  } catch (error) {
    notifyError('Error deleting Staff')

    return {
      status: false
    }
  }
})
