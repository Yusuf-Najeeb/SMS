// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { fetchSubjects } from './asyncthunk'

const initialState = {
  loading: false,
  SubjectsList: [],

  paging: {
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 0,
    totalPages: 0
  }
}

export const subjectsSlice = createSlice({
  name: 'subjects',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchSubjects.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchSubjects.fulfilled, (state, action) => {
      state.loading = false
      state.SubjectsList = action?.payload?.data.data
      state.paging = action?.payload?.data?.paging
    })
    builder.addCase(fetchSubjects.rejected, state => {
      state.loading = false
    })
  }
})

export default subjectsSlice.reducer
