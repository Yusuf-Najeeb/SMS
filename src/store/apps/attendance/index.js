// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { fetchClassAttendance } from './asyncthunk'

const initialState = {
  ClassAttendanceData: [],
  loading: false,

}

export const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchClassAttendance.pending, (state, action) => {
        state.loading = true
      })
   
    builder.addCase(fetchClassAttendance.fulfilled, (state, action) => {
      state.loading = false
      state.ClassAttendanceData = action?.payload?.data.data
    })

    builder.addCase(fetchClassAttendance.rejected, (state) => {
        state.loading = false
      })
  
  }
})

export default attendanceSlice.reducer
