// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { fetchStudents } from './asyncthunk'

const initialState = {
  loading: false,
  StudentData: [],
  paging: {
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 0,
    totalPages: 0
  }
}

export const StudentsSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchStudents.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchStudents.fulfilled, (state, action) => {
      state.loading = false
      state.StaffData = action?.payload?.data?.data
      state.paging = action?.payload?.data?.paging
    })
    builder.addCase(fetchStudents.rejected, state => {
      state.loading = false
    })
  }
})

export default StudentsSlice.reducer
