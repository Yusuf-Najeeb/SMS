// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { fetchGuardian } from './asyncthunk'

const initialState = {
  loading: false,
  GuardianData: [],

//   paging: {
//     currentPage: 1,
//     totalItems: 0,
//     itemsPerPage: 0,
//     totalPages: 0
//   }
}

export const guardianSlice = createSlice({
  name: 'guardian',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchGuardian.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchGuardian.fulfilled, (state, action) => {
      state.loading = false
      state.GuardianData = action?.payload?.data?.data
      
    //   state.paging = action?.payload?.data?.paging
    })
    builder.addCase(fetchGuardian.rejected, state => {
      state.loading = false
    })
  }
})

export default guardianSlice.reducer
