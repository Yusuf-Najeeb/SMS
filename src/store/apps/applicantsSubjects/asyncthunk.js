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