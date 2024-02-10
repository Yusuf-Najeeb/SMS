// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { RegisterUser } from './asyncthunk'
import { loginUser } from './asyncthunk'
import { notifySuccess } from 'src/@core/components/toasts/notifySuccess'
import { notifyError } from 'src/@core/components/toasts/notifyError'

const initialState = {
  user: null,
  error: '',
  loading: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    // resetUserState: state => {
    //   const userData = JSON.parse(localStorage.getItem('loggedInUser'))
    //   state.user = userData
    // }
  },
  extraReducers: builder => {
    // builder.addCase(LoginUser.pending, state => {
    //   state.loading = true
    // })
    // builder.addCase(LoginUser.fulfilled, (state, action) => {
    //   const { token, ...restofData } = action.payload.data
    //   const userRoleObject = restofData?.role
    //   state.loading = false
    //   state.user = restofData
    //   localStorage.setItem('loggedInUser', JSON.stringify(restofData))
    //   localStorage.setItem('authToken', action.payload.data.token)
    //   notifySuccess('Successfully logged in')
    // })
    // builder.addCase(LoginUser.rejected, (state, action) => {
    //   notifyError('Login Error')
    //   state.loading = false
    //   state.error = action.error.message || 'Error Login'
    // })
    builder.addCase(RegisterUser.fulfilled, (state, action) => {

      const { token, staff } = action.payload.data.data
      const userObject = JSON.stringify(action.payload.data.data.staff)

      localStorage.setItem('authUser', userObject)
      localStorage.setItem('authToken', token)

      notifySuccess('Registration successful')
    })

    // builder.addCase(loginUser.fulfilled, (state, action) => {
    //   const { token, superAdmin } = action.payload.data
    //   localStorage.setItem('authToken', token)
    //   localStorage.setItem('authUser', action.payload.data.superAdmin)
    //   notifySuccess('Login successful')
    // })
  }
})

//export const { resetUserState } = authSlice.actions

export default authSlice.reducer
