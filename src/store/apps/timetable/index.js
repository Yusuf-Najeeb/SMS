// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { fetchClassTimetable } from './asyncthunk'

const initialState = {
  loading: false,
  TimetableData: [],
  selectedPeriod: null,

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
  reducers: {
    handleSelectPeriod: (state, action) => {
      state.selectedPeriod = action?.payload?._def?.extendedProps?.value
      
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchClassTimetable.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchClassTimetable.fulfilled, (state, action) => {
      state.loading = false
      state.TimetableData = action?.payload?.data.data
      
    })
    builder.addCase(fetchClassTimetable.rejected, state => {
      state.loading = false
    })
  }
})

export const {  handleSelectPeriod } = timetableSlice.actions

export default timetableSlice.reducer
