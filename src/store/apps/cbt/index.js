// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { fetchCBTQuestions,  } from './asyncthunk'

const initialState = {
  loading: false,
  QuestionsData: [],

  paging: {
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 0,
    totalPages: 0
  }
}

export const CBTQuestiosSlice = createSlice({
  name: 'cbt',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCBTQuestions.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchCBTQuestions.fulfilled, (state, action) => {
      state.loading = false
      state.QuestionsData = action?.payload?.data?.data

      state.paging = action?.payload?.data?.paging
    })
    builder.addCase(fetchCBTQuestions.rejected, state => {
      state.loading = false
    })
 
  }
})

export default CBTQuestiosSlice.reducer
