// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { fetchApplicantsSubjects } from './asyncthunk'

const initialState = {
  loading: false,
  ApplicantsSubjectsData: [],
}

export const applicantsSubjects = createSlice({
  name: 'applicantsSubjects',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchApplicantsSubjects.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchApplicantsSubjects.fulfilled, (state, action) => {
      state.loading = false
      state.ApplicantsSubjectsData = action?.payload?.data?.data
    })
    builder.addCase(fetchApplicantsSubjects.rejected, state => {
      state.loading = false
    })
   
  }
})

export default applicantsSubjects.reducer
