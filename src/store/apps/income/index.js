// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { fetchIncome } from './asyncthunk'

const initialState = {
  loading: false,
  IncomeData: [],

  paging: {
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 0,
    totalPages: 0
  }
}

export const incomeSlice = createSlice({
  name: 'income',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchIncome.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchIncome.fulfilled, (state, action) => {
      state.loading = false
      state.IncomeData = action?.payload?.data.data
      state.paging = action?.payload?.data?.paging
    })
    builder.addCase(fetchIncome.rejected, state => {
      state.loading = false
    })
  }
})

export default incomeSlice.reducer
