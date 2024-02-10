import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { notifySuccess } from 'src/@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export const RegisterUser = createAsyncThunk('auth/Register', async values => {
  try {
    const { data } = await axios({
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      url: `${baseUrl}/auth/register/staff?role=super-admin`,
      data: {
        ...values
      }
    })

    return {
      data: data,
      success: true
    }
  } catch (error) {
    console.log(error, 'err')
    throw new Error(error.response?.data?.message || 'failed to Register')
  }
})

export const loginUser = async values => {
  try {
    const { data } = await axios({
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      url: `${baseUrl}/auth/login/staff`,
      data: {
        ...values
      }
    })
    if (data) {
      // console.log(data.data, 'loginData')

      const userObject = JSON.stringify(data?.data?.user)
      localStorage.setItem('authToken', data?.data?.token)
      localStorage.setItem('authUser', userObject)
      notifySuccess('Login successful')
    }

    return {
      data: data,
      success: true
    }
  } catch (error) {
    notifyError(error.response.data.message || 'Login failed')
    throw new Error(error.response?.data?.message || 'failed to Login')
  }
}
