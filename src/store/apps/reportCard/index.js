// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { fetchStudentScores } from './asyncthunk'

const initialState = {
  loading: false,
  StudentsScoresData: [],
 
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
      state.loading = false
    })
  }
})

export default reportCard.reducer
