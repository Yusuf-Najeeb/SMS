import axios from 'axios'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { createAsyncThunk } from '@reduxjs/toolkit'



export const fetchExpenditure = createAsyncThunk('/expenditure/FetchExpenditure', async (query) => {
    try {
      const response = await axios.get(`/accounts?page=${query.page}&limit=10&key=${query.key}&type=expenditure`)

      return response
    } catch (error) {

    //   notifyError('Error fetching Guardian')
  
    }
  })

  export const createExpenditure = async (vals)=> {
    try {
      const res = await axios.post(`/accounts`, vals) 

      return res
    } catch (error) {
      notifyError('Failed to create expenditure')
    }
  }


