import axios from 'axios'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const createGuardian = createAsyncThunk('/Guardian/createGuardian', async vals => {
  try {
    const response = await axios.post('/auth/registerparent', vals)
    notifySuccess('Guardian created successfully')

    return response
  } catch (error) {
    notifyError('Error creating Guardian')

   
  }
})

export const fetchGuardian = createAsyncThunk('/Guardian/FetchGuardian', async () => {
    try {
      const response = await axios.get('/parents/allparents')
      console.log(response, 'respone')

      //notifySuccess('Staff gotten successfully')
  
      return response
    } catch (error) {
      console.log(error, 'error')
      notifyError('Error fetching Guardian')
  
    }
  })

  export const deleteGuardian =  async (email) => {
    try {
      const response = await axios.delete(`/parents/deleteparent/${email}`)
  
      if (response.data.success) {
        notifySuccess('Guardian Deleted')
      }
  
      return response
    } catch (error) {
      notifyError('Error Deleting Guardian')
  
    }
  }