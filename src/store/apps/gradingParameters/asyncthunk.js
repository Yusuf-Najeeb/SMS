import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'



export const fetchGradingParameters = createAsyncThunk('grading-parameters', async (query) => {
    try {
      const response = await axios.get(`/settings/grading-parameter?page=${query.page}&limit=${query.limit}&classCategoryId=${query.classCategoryId}`)

      return response
    } catch (error) {

    //   notifyError('Error fetching Guardian')
  
    }
  })

  export const fetchGradeParameters =  async (query) => {
    try {
      const response = await axios.get(`/settings/grading-parameter?page=${query.page}&limit=${query.limit}&classCategoryId=${query.classCategoryId}`)

      return response
    } catch (error) {

  
    }
  }

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

  export const deleteGradingParameter = async (id)=>{
    try {
      const res = await axios.delete(`/settings/grading-parameter/${id}`)
      if(res.data.success){
        notifySuccess('Grading Parameter Deleted')
      }

      return res
      
    } catch (error) {
      notifyError('Unable to Delete Grading Parameter')
      
    }
  }






