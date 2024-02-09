import axios from 'axios'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { createAsyncThunk } from '@reduxjs/toolkit'


export const createStudent =  async vals => {
  try {
    const response = await axios.post('/auth/register/user?role=student', vals)
    notifySuccess('Student Added')

    return response
  } catch (error) {
    notifyError('Error Creating Guardian')

   
  }
}

export const fetchStudents = createAsyncThunk('/Students/FetchStudents', async (query) => {
  try {
    const response = await axios.get(`/users?page=${query.page}&limit=10&key=${query.key}&type=student`)

    console.log(response, 'students response')


    return response
  } catch (error) {
    notifyError('Error fetching Students')

  }
})

export const searchStudent = async (key)=> {
  try {
    const response = await axios.get(`/users?page=1&limit=20&key=${key}&type=student`)

    return response?.data.data.result
  } catch (error) {
    
  }
}


export const deleteStudent =  async (id) => {
  try {
    const response = await axios.delete(`/users/delete?id=${id}`)

    if (response.data.success) {
      notifySuccess('Student Deleted')
    }

    return response
  } catch (error) {
    notifyError('Unable to Delete Student')

  }
}

export const updateStudent = async (payload, id)=> {
  try {
    const response = await axios.patch(`/users/update?id=${id}`, payload)

    if (response.data.success){
      notifySuccess('Student Updated')
    }

    return response
  } catch (error) {
    notifyError('Unable to update student')
    
  }
}
