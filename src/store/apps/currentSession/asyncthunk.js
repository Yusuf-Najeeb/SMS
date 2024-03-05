import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'



export const fetchCurrentSession = createAsyncThunk('session-current', async (query) => {
    try {
      const response = await axios.get(`/settings/sessions/current`)

      return response
    } catch (error) {

    //   notifyError('Error fetching Guardian')
  
    }
  })