import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'




export const fetchStaffByRole = createAsyncThunk('staffDataByRole', async (query) => {
    console.log( 'before res')
  try {
    const response = await axios.get(`/staffs?page=${query.page}&limit=${query.limit}&role=${query.role}`)

    if(response?.data?.success){
        console.log(response, 'res')
    }



    return response
  } catch (error) {

  }
})

export const fetchTeachers =  async () => {
    // console.log( 'before res')
  try {
    const response = await axios.get(`/staffs?page=1&limit=300&role=teacher`)

 


    return response
  } catch (error) {
  }
}