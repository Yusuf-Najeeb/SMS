// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { fetchSession } from './asyncthunk'

const initialState = {
  loading: false,
  SessionData: [],

  paging: {
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 0,
    totalPages: 0
  }
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchSession.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchSession.fulfilled, (state, action) => {
      state.loading = false
      state.SessionData = action?.payload?.data.data
      state.paging = action?.payload?.data?.paging
    })
    builder.addCase(fetchSession.rejected, state => {
      state.loading = false
    })
  }
})

export default sessionSlice.reducer
