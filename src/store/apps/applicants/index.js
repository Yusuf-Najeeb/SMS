// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { fetchApplicants, fetchApplicantsForGuardian } from './asyncthunk'

const initialState = {
  loading: false,
  loadingGuardianApplicants: false,
  ApplicantsData: [],
  GuardianApplicantsData: [],

//   paging: {
//     currentPage: 1,
//     totalItems: 0,
//     itemsPerPage: 0,
//     totalPages: 0
//   }
}

export const ApplicantsSlice = createSlice({
  name: 'applicants',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchApplicants.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchApplicants.fulfilled, (state, action) => {
      state.loading = false
      state.ApplicantsData = action?.payload?.data?.data

    //   state.paging = action?.payload?.data?.paging
    })
    builder.addCase(fetchApplicants.rejected, state => {
      state.loading = false
    })
    builder.addCase(fetchApplicantsForGuardian.pending, state => {
        state.loadingGuardianApplicants = true
      })
      builder.addCase(fetchApplicantsForGuardian.fulfilled, (state, action) => {
        state.loadingGuardianApplicants = false
        state.GuardianApplicantsData = action?.payload?.data?.data.applicants
  
      //   state.paging = action?.payload?.data?.paging
      })
      builder.addCase(fetchApplicantsForGuardian.rejected, state => {
        state.loadingGuardianApplicants = false
      })
  }
})

export default ApplicantsSlice.reducer
