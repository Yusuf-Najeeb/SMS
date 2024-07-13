import axios from 'axios'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { createAsyncThunk } from '@reduxjs/toolkit'




export const fetchApplicantsSubjects = createAsyncThunk('/Applicants/AllSubjects', async () => {
  try {
    const response = await axios.get(`/applicants/allsubjects`)

    return response
  } catch (error) {

  }
})

export const createApplicantSubject = async (payload)=> {
  try {
    const response = await axios.post('/applicants/addSubject', payload)

    if(response.data.success){
      notifySuccess("Applicant Examination Subject created")
    }

    return response
  } catch (error) {
    notifyError(error?.response?.data?.message || "Unable to create Applicant Examination Subject")
    
  }
}

export const updateApplicantSubject = async (id, payload)=> {
  try {
    const response = await axios.patch(`/applicants/updateSubject/${id}`, payload)

    if(response?.data?.success){
      notifySuccess("Applicant Examination Subject updated")
    }

    return response
  } catch (error) {
    notifyError(error?.response?.data?.message || "Unable to update Applicant Examination Subject")
    
  }
}

export const deleteApplicantSubject = async (id)=> {
  try {
    const response = await axios.delete(`/applicants/deleteSubject/${id}`)

    if(response?.data?.success){
      notifySuccess("Applicant Examination Subject deleted")
    }

    return response
  } catch (error) {
    notifyError(error?.response?.data?.message || "Unable to delete Applicant Examination Subject")
    
  }
}

export const associateApplicantToAppicantSubject = async (payload)=> {
  try {
    const response = await axios.post('/applicants/associatestudent', payload)

    if(response.data.success){
      notifySuccess("Subject Assigned to Applicant")
    }

    return response
  } catch (error) {
    notifyError(error?.response?.data?.message || "Unable to assign Subject to Applicant")
    
  }
}

export const dissociateApplicantFromAppicantSubject = async (payload)=> {
  try {
    const response = await axios.post('/applicants/dissociate', payload)

    if(response.data.success){
      notifySuccess("Subject Removed From Applicant")
    }

    return response
  } catch (error) {
    notifyError(error?.response?.data?.message || "Unable to remove Subject from Applicant")
    
  }
}