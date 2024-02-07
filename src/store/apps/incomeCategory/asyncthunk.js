import axios from 'axios'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { createAsyncThunk } from '@reduxjs/toolkit'



export const fetchIncomeCategory = createAsyncThunk('/ncome-category/FetchIncome', async (query) => {
    try {
      const response = await axios.get(`/category?page=${query.page}&limit=10&type=income`)

      console.log(response, 'income category data')

      return response
    } catch (error) {
      console.log(error, 'error')

    //   notifyError('Error fetching Guardian')
  
    }
  })

  export const createCategory = async (payoad)=> {
    try {
      const res = await axios.post(`/category`, payoad)

      return res
    } catch (error) {
      console.log(error)
      
    }
  }


