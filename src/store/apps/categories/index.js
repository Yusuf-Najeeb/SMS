// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { fetchCategories } from './asyncthunk'

const initialState = {
  loading: false,
  CategoryData: [],

  paging: {
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 0,
    totalPages: 0
  }
}

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCategories.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.loading = false
      state.CategoryData = action?.payload?.data.data
      state.paging = action?.payload?.data?.paging
    })
    builder.addCase(fetchCategories.rejected, state => {
      state.loading = false
    })
  }
})

export default categorySlice.reducer
