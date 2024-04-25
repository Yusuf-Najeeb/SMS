import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'


export const fetchStaffActivityLog = createAsyncThunk('staff-activity', async (query) => {
  try {
    const response = await axios.get(`/logs?page=${query?.page}&limit=${query.limit}&staffId=${query.staffId}`)


    return response
  } catch (error) {

  }
})