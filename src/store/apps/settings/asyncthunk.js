import axios from 'axios'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { createAsyncThunk } from '@reduxjs/toolkit'


export const fetchPaymentMethods = createAsyncThunk('/StaffData/fetchStaffs', async (query) => {
  try {
    const response = await axios.get(`/settings/payment-mode?page=${query.page}&limit=${query.limit}`)

    // console.log(response, 'response')

    return response
  } catch (error) {
    console.log(error, 'error')

  }
})

export const deletePaymentMethod =  async (id) => {
    try {
      const response = await axios.delete(`/settings/payment-mode/${id}`)
  
      if (response.data.success) {
        notifySuccess('Payment method Deleted')
      }
  
      return response
    } catch (error) {
      notifyError('Unable to Delete Payment Method')
  
    }
  }


  export const getCurrentSession = async ()=> {
    try {
      const res = await axios.get('/settings/sessions/current')

      return res
    } catch (error) {
      
    }
  }