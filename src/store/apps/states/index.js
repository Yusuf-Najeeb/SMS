// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { fetchStates } from './asyncthunk'

const initialState = {
  loading: false,
  StatesList: [],

  paging: {
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 0,
    totalPages: 0
  }
}

export const statesSlice = createSlice({
  name: 'states',
  initialState,
  reducers: {},
  extraReducers(builder) {
    // builder.addCase(fetchStates.pending, state => {
    //   state.loading = true
    // })
    builder.addCase(fetchStates.fulfilled, (state, action) => {
      state.loading = false
      state.StatesList = action?.payload?.data.data

    //   state.paging = action?.payload?.data?.paging
    })

    // builder.addCase(fetchStates.rejected, state => {
    //   state.loading = false
    // })
  }
})

export default statesSlice.reducer
