// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { fetchStaffActivityLog } from './asyncthunk'

const initialState = {
  loading: false,
  StaffActivityLogData: [],
  paging: {
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 0,
    totalPages: 0
  }
}

export const staffActivitySlice = createSlice({
  name: 'staffActivityLog',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchStaffActivityLog.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchStaffActivityLog.fulfilled, (state, action) => {
      state.loading = false
      state.StaffActivityLogData = action?.payload?.data?.data
      state.paging = action?.payload?.data?.paging
      
    })
    builder.addCase(fetchStaffActivityLog.rejected, state => {
      state.loading = false
    })
    
  }
})

export default staffActivitySlice.reducer
