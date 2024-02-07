// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { fetchIncomeCategory } from './asyncthunk'

const initialState = {
  loading: false,
  IncomeCategoryData: [],

//   paging: {
//     currentPage: 1,
//     totalItems: 0,
//     itemsPerPage: 0,
//     totalPages: 0
//   }
}

export const incomeCategorySlice = createSlice({
  name: 'incomeCategory',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchIncomeCategory.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchIncomeCategory.fulfilled, (state, action) => {

      state.loading = false
      state.IncomeCategoryData = action?.payload?.data.data
      
    //   state.paging = action?.payload?.data?.paging
    })
    builder.addCase(fetchIncomeCategory.rejected, state => {
      state.loading = false
    })
  }
})

export default incomeCategorySlice.reducer
