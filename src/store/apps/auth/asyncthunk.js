import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { notifySuccess } from 'src/@core/components/toasts/notifySuccess'

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export const RegisterUser = createAsyncThunk('auth/Register', async values => {
  try {
    const { data } = await axios({
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      url: `${baseUrl}/auth/registersuperadmin`,
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
      url: `${baseUrl}/auth/superadminlogin`,
      data: {
        ...values
      }
    })
    if (data) {
      console.log(data, 'loginData')
      const userObject = JSON.stringify(data?.data?.admin)
      localStorage.setItem('authToken', data?.data?.token)
      localStorage.setItem('authUser', userObject)
      notifySuccess('Login successful')
    }

    return {
      data: data,
      success: true
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'failed to Login')
  }
}
