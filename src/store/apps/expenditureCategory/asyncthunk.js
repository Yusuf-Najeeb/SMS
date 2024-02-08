import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'



export const fetchExpenditureCategory = createAsyncThunk('/ncome-category/FetchIncome', async (query) => {
    try {
      const response = await axios.get(`/category?page=${query.page}&limit=${query.limit}&type=expenditure`)


      return response
    } catch (error) {

    //   notifyError('Error fetching Guardian')
  
    }
  })



