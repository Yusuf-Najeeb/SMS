// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { fetchGradingParameters } from './asyncthunk'

const initialState = {
  loading: false,
  GradingParametersList: [],

  paging: {
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 0,
    totalPages: 0
  }
}

export const gradingParameterSlice = createSlice({
  name: 'gradingParameters',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchGradingParameters.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchGradingParameters.fulfilled, (state, action) => {
      state.loading = false
      state.GradingParametersList = action?.payload?.data.data
      state.paging = action?.payload?.data?.paging
    })
    builder.addCase(fetchGradingParameters.rejected, state => {
      state.loading = false
    })
  }
})

export default gradingParameterSlice.reducer
