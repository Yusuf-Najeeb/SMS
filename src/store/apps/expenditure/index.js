// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { fetchExpenditure } from './asyncthunk'

const initialState = {
  loading: false,
  ExpenditureData: [],

//   paging: {
//     currentPage: 1,
//     totalItems: 0,
//     itemsPerPage: 0,
//     totalPages: 0
//   }
}

export const expenditureSlice = createSlice({
  name: 'expenditure',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchExpenditure.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchExpenditure.fulfilled, (state, action) => {

      state.loading = false
      state.ExpenditureData = action?.payload?.data.data
      
    //   state.paging = action?.payload?.data?.paging
    })
    builder.addCase(fetchExpenditure.rejected, state => {
      state.loading = false
    })
  }
})

export default expenditureSlice.reducer
