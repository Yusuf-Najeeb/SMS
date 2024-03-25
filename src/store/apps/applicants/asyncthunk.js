import axios from 'axios'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { createAsyncThunk } from '@reduxjs/toolkit'




export const fetchApplicants = createAsyncThunk('/Applicants/FetchApplicants', async () => {
  try {
    const response = await axios.get(`/applicants/allapplicants`)

    return response
  } catch (error) {

  }
})

export const fetchApplicantsForGuardian = createAsyncThunk('/GuardianApplicants/', async (query) => {
    try {
      const response = await axios.get(`/applicants/getapplicantunderparents/${query.id}`)
  
      return response
    } catch (error) {
  
    }
  })

  export const createApplicant = async (payload)=> {
    try {
      const response = await axios.post(`/applicants/createapplicant`, payload)
  
      if (response.data.success){
        notifySuccess('Applicant Added')
      }
  
      return response
    } catch (error) {
      notifyError(error?.response?.data?.message || 'Unable to add applicant')
      
    }
  }

  export const updateApplicant = async (payload, email)=> {
    try {
      const response = await axios.patch(`/applicants/updateapplicant/${email}`, payload)
  
      if (response.data.success){
        notifySuccess('Applicant Updated')
      }
  
      return response
    } catch (error) {
      notifyError('Unable to update applicant')
      
    }
  }

  export const deleteApplicant = async ( email)=> {
    try {
      const response = await axios.delete(`/applicants/deleteapplicant/${email}`)
  
      if (response.data.success){
        notifySuccess('Applicant Deleted')
      }
  
      return response
    } catch (error) {
      notifyError('Unable to delete applicant')
      
    }
  }