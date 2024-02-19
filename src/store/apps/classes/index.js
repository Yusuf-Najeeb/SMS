// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { fetchClasses } from './asyncthunk'

const initialState = {
  loading: false,
  ClassesList: [],

  paging: {
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 0,
    totalPages: 0
  }
}

export const classesSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchClasses.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchClasses.fulfilled, (state, action) => {
      state.loading = false
      state.ClassesList = action?.payload?.data.data
      state.paging = action?.payload?.data?.paging
    })
    builder.addCase(fetchClasses.rejected, state => {
      state.loading = false
    })
  }
})

export default classesSlice.reducer
