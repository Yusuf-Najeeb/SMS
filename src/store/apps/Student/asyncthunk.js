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
    notifyError('Failed to Add Student')

   
  }
}

export const fetchStudents = createAsyncThunk('/Students/FetchStudents', async (query) => {
  try {
    const response = await axios.get(`/students?page=${query.page}&limit=10&key=${query.key}`)

    console.log(response, 'students response')


    return response
  } catch (error) {
    console.log(error, 'error')

  }
})

export const searchStudent = async (key)=> {
  try {
    const response = await axios.get(`/students?page=1&limit=20&key=${key}&type=student`)

    return response?.data.data.result
  } catch (error) {
    
  }
}


export const deleteStudent =  async (id) => {
  try {
    const response = await axios.delete(`/students/delete?id=${id}`)

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
    const response = await axios.patch(`/students/update?id=${id}`, payload)

    if (response.data.success){
      notifySuccess('Student Updated')
    }

    return response
  } catch (error) {
    notifyError('Unable to update student')
    
  }
}
