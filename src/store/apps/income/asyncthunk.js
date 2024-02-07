import axios from 'axios'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { createAsyncThunk } from '@reduxjs/toolkit'



export const fetchIncome = createAsyncThunk('/ncome/FetchIncome', async (query) => {
    try {
      const response = await axios.get(`/accounts?page=${query.page}&limit=10&key=${query.key}&type=income`)

      console.log(response, 'income data')

      return response
    } catch (error) {
      console.log(error, 'error')

    //   notifyError('Error fetching Guardian')
  
    }
  })


