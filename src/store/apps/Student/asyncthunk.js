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

export const getStudentByIdentification = async(id)=>{
  try {
    const response = await axios.get(`/students/identification/${id}`)

    console.log(response, 'single student')

    return response
  } catch (error) {
    
    // notifyError('Unable to update student')
    
  }
}

export const getStudentSubjects = async(id)=>{
  try {
    const response = await axios.get(`/students/subjects/${id}`)

    console.log(response, 'students subject')

    return response
  } catch (error) {

    // notifyError('Unable to update student')
    
  }
}


export const assignStudentCategory = async (payload)=>{
  try {
    const res = await axios.post('/students/addcategory', payload)

    if(res.data.success){
      notifySuccess('Category Assigned')
    }

    return res
  } catch (error) {
    notifyError('Unable to Assign Category To Student')
  }
}