import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'



export const fetchCategories = createAsyncThunk('/category/', async (query) => {
    try {
      const response = await axios.get(`/category?page=${query.page}&limit=${query.limit}&type=${query.type}`)


      return response
    } catch (error) {

    //   notifyError('Error fetching Guardian')
  
    }
  })

  export const createCategory = async (payload)=>{
    try {
      const res = await axios.post(`/category`, payload)
      if(res.data.success){
        notifySuccess('Category Added')
      }

      return res
      
    } catch (error) {
      notifyError('Unable to Add Category')
      
    }
  }

  export const updateCategory = async (id, payload)=>{
    try {
      const res = await axios.patch(`/category?id=${id}`, payload)
      if(res.data.success){
        notifySuccess('Category Updated')
      }

      return res
      
    } catch (error) {
      notifyError('Unable to Update Category')
      
    }
  }

  export const deleteCategory = async (id)=>{
    try {
      const res = await axios.delete(`/category?id=${id}`)
      if(res.data.success){
        notifySuccess('Category Deleted')
      }

      return res
      
    } catch (error) {
      notifyError('Unable to Delete Category')
      
    }
  }