// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { fetchPaymentMethods } from './asyncthunk'

const initialState = {
  loading: false,
  PaymentMethodsList: [],
  paging: {
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 0,
    totalPages: 0
  }
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPaymentMethods.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchPaymentMethods.fulfilled, (state, action) => {
      state.loading = false
      state.PaymentMethodsList = action?.payload?.data?.data
      state.paging = action?.payload?.data?.paging
    })
    builder.addCase(fetchPaymentMethods.rejected, state => {
      state.loading = false
    })
  }
})

export default settingsSlice.reducer
