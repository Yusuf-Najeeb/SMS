import axios from 'axios'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchExpenditure = createAsyncThunk('/expenditure/FetchExpenditure', async query => {
  try {
    const response = await axios.get(
      `/accounts?page=${query.page}&limit=10&key=${query.key}&type=expenditure&year?=${query.year}&term?=${query.term}`
    )

    return response
  } catch (error) {
    //   notifyError('Error fetching Guardian')
  }
})

export const createExpenditure = async vals => {
  try {
    const res = await axios.post(`/accounts`, vals)

    return res
  } catch (error) {
    notifyError('Failed to create expenditure')
  }
}

export const updateExpenditure = async (vals, id) => {
  try {
    const res = await axios.patch(`/accounts/updateincomeandexpenditure/${id}`, vals)

    return res
  } catch (error) {
    notifyError('Failed to update expenditure')
  }
}

export const processExpenditure = async vals => {
  try {
    const res = await axios.post(`/accounts/process`, vals)

    if (res.data.success) {
      notifySuccess('Expenditure Updated')
    }

    return res
  } catch (error) {
    notifyError('Failed to update expenditure')
  }
}

export const deleteExpenditure = async id => {
  try {
    const res = await axios.delete(`/accounts/${id}`)

    if (res.data) {
      notifySuccess('Expenditure Deleted')
    }

    return res
  } catch (error) {
    notifyError('Failed to delete expenditure')
  }
}
