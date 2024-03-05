import axios from 'axios'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const generatePayslip = async (vals) => {
  try {
    const response = await axios.post('/payroll', vals)

    notifySuccess('Generated payslip successfully')

    return response
  } catch (error) {
    notifyError('Error generating payslip')

  }
}

export const sendPayslip = async (vals) => {
    try {
      const response = await axios.post('/payroll', {period: vals.period, send: true})
  
      notifySuccess('Payslip sent successfully')
  
      return response
    } catch (error) {
      notifyError('Error sending payslip')
  
      return {
        success: false
      }
    }
  }

  export const printPayslip = async (id, period) =>{
    try {
        const {data} = await axios.patch(`/payroll?id=${id}&period=${period}`)
    
    
       return data
      } catch (error) {
        notifyError(error?.response?.data?.message || 'Unable to print payslip')
      }
  }


export const fetchPayslips = createAsyncThunk('payroll/fetch ', async (values) => {
  try {
    const response = await axios.get(`/payroll?period=${values.period}&staffId=${values.staffId}`)

    return response
  } catch (error) {

    // notifyError('Error Fetching Payslip')
  }
})

export const fetchPayslipForOneStaff = async (period, staffId) => {
    try {
      const response = await axios.get(`/payroll?period=${period}&staffId=${staffId}`)
  
      return response?.data.data
    } catch (error) {
  
      notifyError('Error Fetching Payslips')
    }
  }


