// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { fetchExpenditureCategory } from './asyncthunk'

const initialState = {
  loading: false,
  ExpenditureCategoryData: [],

//   paging: {
//     currentPage: 1,
//     totalItems: 0,
//     itemsPerPage: 0,
//     totalPages: 0
//   }
}

export const expenditureCategorySlice = createSlice({
  name: 'expenditureCategory',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchExpenditureCategory.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchExpenditureCategory.fulfilled, (state, action) => {

      state.loading = false
      state.ExpenditureCategoryData = action?.payload?.data.data
      
    //   state.paging = action?.payload?.data?.paging
    })
    builder.addCase(fetchExpenditureCategory.rejected, state => {
      state.loading = false
    })
  }
})

export default expenditureCategorySlice.reducer
