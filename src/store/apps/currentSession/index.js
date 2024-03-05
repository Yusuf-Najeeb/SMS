// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { fetchCurrentSession } from './asyncthunk'

const initialState = {
  CurrentSessionData: [],

}

export const currentSessionSlice = createSlice({
  name: 'currentSession',
  initialState,
  reducers: {},
  extraReducers(builder) {
   
    builder.addCase(fetchCurrentSession.fulfilled, (state, action) => {
      state.CurrentSessionData = action?.payload?.data.data
    })
  
  }
})

export default currentSessionSlice.reducer
