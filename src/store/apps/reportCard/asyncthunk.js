import axios from 'axios'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { createAsyncThunk } from '@reduxjs/toolkit'



export const fetchStudentScores = createAsyncThunk('scores/fetch ', async (query) => {
  try {
    const response = await axios.get(`/gradebook/results/${query.subjectId}/${query.staffId}/${query.classId}/${query.sessionId}`)

    return response
  } catch (error) {

  }
})

export const saveStudentScore = async (payload)=>{
    try {
        const response = await axios.post('/gradebook/addscore', payload)

        if(response.data.success){
            notifySuccess('Student Score Saved')
        }

        return response

    } catch (error) {
        notifyError(error.response.data.message ||  'Unable to Save Student Score')
    }
}

export const fetchStudentReportCard = createAsyncThunk('report-card/fetch ', async (query) => {
    try {
      const response = await axios.get(`/gradebook/studentacademicreportbyterm/${query.classId}/${query.studentId}/${query.sessionId}`)
  
      return response
    } catch (error) {
  
    }
  })

  export const fetchStudentSubjectPosition = createAsyncThunk('subject-summary-card/fetch ', async (query) => {
    try {
      const response = await axios.get(`/gradebook/studentsubjectpositionsummary/${query.classId}/${query.sessionId}`)
  
      return response
    } catch (error) {
  
    }
  })


