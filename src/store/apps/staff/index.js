// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { fetchRoles } from './asyncthunk'

const initialState = {
  loading: false,
  StaffData: [],
  paging: {
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 0,
    totalPages: 0
  }
}

export const staffsSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchRoles.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchRoles.fulfilled, (state, action) => {
      state.loading = false
      state.StaffData = action?.payload?.data?.data
      state.paging = action?.payload?.data?.paging
    })
    builder.addCase(fetchRoles.rejected, state => {
      state.loading = false
    })
  }
})

export default staffsSlice.reducer
