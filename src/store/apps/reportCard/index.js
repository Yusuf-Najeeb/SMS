// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { fetchStudentScores, fetchStudentReportCard, fetchStudentSubjectPosition } from './asyncthunk'

const initialState = {
  loading: false,
  StudentsScoresData: [],
  loadingReportCard: false,
  StudentReportCard: [],
  loadingStudentSubjectPosition: false,
  StudentSubjectPosition: [],
 
}

export const reportCard = createSlice({
  name: 'reportCard',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchStudentScores.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchStudentScores.fulfilled, (state, action) => {
      state.loading = false

      state.StudentsScoresData = action?.payload?.data?.data

    //   state.Paging = action?.payload?.data?.paging
    })
    builder.addCase(fetchStudentScores.rejected, state => {
      state.loadingReportCard = false
    })

    builder.addCase(fetchStudentReportCard.pending, state => {
        state.loadingReportCard = true
      })
      builder.addCase(fetchStudentReportCard.fulfilled, (state, action) => {
        state.loadingReportCard = false

        const subjects = action?.payload?.data?.data?.subject
  
        state.StudentReportCard = Object.keys(subjects).map((subject)=> subjects[subject])

      })
      builder.addCase(fetchStudentReportCard.rejected, state => {
        state.loadingReportCard = false
      })

      builder.addCase(fetchStudentSubjectPosition.pending, state => {
        state.loadingStudentSubjectPosition = true
      })
      builder.addCase(fetchStudentSubjectPosition.fulfilled, (state, action) => {
        state.loadingStudentSubjectPosition = false

        const subjects = action?.payload?.data?.data
  
        state.StudentSubjectPosition = Object.keys(subjects).map((subject)=> subjects[subject])

      })
      builder.addCase(fetchStudentSubjectPosition.rejected, state => {
        state.loadingStudentSubjectPosition = false
      })
  }
})

export default reportCard.reducer
