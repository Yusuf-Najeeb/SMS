import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import GetUserData from '../../../@core/utils/getUserData'

const userData = GetUserData()



export const fetchSubjectsForTeacher = createAsyncThunk('subjects', async () => {
    try {
      const response = await axios.get(`staffs/subjects/${userData?.email}`)

      return response
    } catch (error) {

    //   notifyError('Error fetching Guardian')
  
    }
  })