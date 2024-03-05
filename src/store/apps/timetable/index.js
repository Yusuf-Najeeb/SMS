// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { fetchClassTimetable } from './asyncthunk'

const initialState = {
  loading: false,
  TimetableData: [],

//   paging: {
//     currentPage: 1,
//     totalItems: 0,
//     itemsPerPage: 0,
//     totalPages: 0
//   }
}

export const timetableSlice = createSlice({
  name: 'timetable',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchClassTimetable.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchClassTimetable.fulfilled, (state, action) => {
      state.loading = false
      state.TimetableData = action?.payload?.data.data
      
    //   state.paging = action?.payload?.data?.paging
    })
    builder.addCase(fetchClassTimetable.rejected, state => {
      state.loading = false
    })
  }
})

export default timetableSlice.reducer
