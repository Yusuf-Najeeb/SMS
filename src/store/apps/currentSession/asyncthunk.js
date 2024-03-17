import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'



export const fetchCurrentSession = createAsyncThunk('session-current', async () => {
    try {
      const response = await axios.get(`/settings/sessions/current`)

      return response
    } catch (error) {

    //   notifyError('Error fetching Guardian')
  
    }
  })