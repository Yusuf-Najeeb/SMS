import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'



export const fetchExpenditureCategory = createAsyncThunk('/ncome-category/FetchIncome', async (query) => {
    try {
      const response = await axios.get(`/category?page=${query.page}&limit=10&type=expenditure`)

      console.log(response, 'expenditure category data')

      return response
    } catch (error) {
      console.log(error, 'error')

    //   notifyError('Error fetching Guardian')
  
    }
  })



