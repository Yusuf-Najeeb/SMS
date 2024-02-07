import axios from 'axios'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { createAsyncThunk } from '@reduxjs/toolkit'



export const fetchExpenditure = createAsyncThunk('/expenditure/FetchExpenditure', async (query) => {
    try {
      const response = await axios.get(`/accounts?page=${query.page}&limit=10&key=${query.key}&type=expenditure`)

      console.log(response, 'expenditure data')

      return response
    } catch (error) {
      console.log(error, 'error')

    //   notifyError('Error fetching Guardian')
  
    }
  })


