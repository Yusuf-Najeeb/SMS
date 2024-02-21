// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { fetchRooms } from './asyncthunk'

const initialState = {
  loading: false,
  RoomsList: [],

  paging: {
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 0,
    totalPages: 0
  }
}

export const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchRooms.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchRooms.fulfilled, (state, action) => {
      state.loading = false
      state.RoomsList = action?.payload?.data.data
      state.paging = action?.payload?.data?.paging
    })
    builder.addCase(fetchRooms.rejected, state => {
      state.loading = false
    })
  }
})

export default roomsSlice.reducer
