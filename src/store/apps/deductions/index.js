// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { fetchDeductions } from './asyncthunk'

const initialState = {
  loading: false,
  deductionsData: [],
 
}

export const deduction = createSlice({
  name: 'deductions',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchDeductions.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchDeductions.fulfilled, (state, action) => {
      state.loading = false

      state.deductionsData = action?.payload?.data?.data

    //   state.Paging = action?.payload?.data?.paging
    })
    builder.addCase(fetchDeductions.rejected, state => {
      state.loading = false
    })
  }
})

export default deduction.reducer
