import axios from 'axios'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const createDeduction =  async (vals) => {
  try {
    const response = await axios.post('/deductions', vals)

    notifySuccess('Added deduction')

    return response
  } catch (error) {
    notifyError('Unable to add deduction')

  }
}

export const fetchDeductions = createAsyncThunk('deductions/fetch ', async (period) => {
  try {
    const response = await axios.get(`/deductions?staffId=''&period=${period}`)

    // console.log(response, 'deductions res')

    return response
  } catch (error) {

  }
})

export const fetchDeductionsForOneUser = async (id, period) => {
    try {
      const response = await axios.get(`/deductions?period=${period}&staffId=${id}`)
  
      return response?.data.data
    } catch (error) {
  
    }
  }

export const deleteDeduction = createAsyncThunk('/delete-deduction', async (id) => {
  try {
    const response = await axios.delete(`/deductions?id=${id}`)

    if (response.data.success) {
      notifySuccess('Deduction  Deleted Successfully')
    }

    return {
      status: true
    }
  } catch (error) {
    notifyError('Error deleting deduction')

  }
})


