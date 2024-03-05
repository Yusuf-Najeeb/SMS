// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { fetchPayslips } from './asyncthunk'

const initialState = {
  loading: false,
  PayslipData: [],
 
}

export const payslip = createSlice({
  name: 'payslip',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPayslips.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchPayslips.fulfilled, (state, action) => {
      state.loading = false

      state.PayslipData = action?.payload?.data?.data
    })
    builder.addCase(fetchPayslips.rejected, state => {
      state.loading = false
    })
  }
})

export default payslip.reducer
