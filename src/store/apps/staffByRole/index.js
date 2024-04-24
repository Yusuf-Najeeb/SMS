// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { fetchStaffByRole } from './asyncthunk'

const initialState = {
  StaffDataByRole: [],
 
}

export const staffByRoleSlice = createSlice({
  name: 'staffByRole',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchStaffByRole.fulfilled, (state, action) => {
        state.StaffDataByRole = action?.payload?.data?.data
        
        // console.log(action?.payload?.data?.data, 'action payload')
    })

  }
})

export default staffByRoleSlice.reducer
