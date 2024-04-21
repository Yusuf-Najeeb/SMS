import axios from 'axios'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { createAsyncThunk } from '@reduxjs/toolkit'




export const fetchCBTQuestions = createAsyncThunk('/CBT/FetchCBTQuestions', async (query) => {
  try {
    const response = await axios.get(`/cbt/allquestions?page=${query.page}&limit=${query.limit}&staffId=${query.staffId}&classId=${query.classId}&subjectId=${query.subjectId}&categoryId=${query.categoryId}&sessionId=${query.sessionId}`)

    return response
  } catch (error) {

  }
})

export const fetchCBTAnswers = createAsyncThunk('/CBT/FetchCBTAnwers', async (query) => {
    try {
      const response = await axios.get(`/cbt/getanswers?page=${query.page}&limit=300&staffId=${query.staffId}&classId=${query.classId}&subjectId=${query.subjectId}&categoryId=${query.categoryId}&sessionId=${query.sessionId}&studentId=${query.studentId}`)
  
      return response
    } catch (error) {
  
    }
  })

  export const fetchApplicantCBTAnswers = createAsyncThunk('/ApplicantCBT/FetchCBTAnwers', async (query) => {
    try {
      const response = await axios.get(`/cbt/getanswers?page=${query.page}&limit=300&staffId=${query.staffId}&subjectId=${query.subjectId}&categoryId=${query.categoryId}&sessionId=${query.sessionId}&applicantId=${query.applicantId}`)
  
      return response
    } catch (error) {
  
    }
  })

export const submitQuestions = async (payload)=> {
    try {
        const res = await axios.post(`/cbt/questions`, payload)

        if(res?.data?.success){
            notifySuccess('Questions Submitted')
        }

        return res
    } catch (error) {
        notifyError(error?.response?.data?.message || 'Unable to Submit Questions')
        
    }
}

export const submitApplicantCBTQuestions = async (payload)=> {
    try {
        const res = await axios.post(`/cbt/questions?type=applicant`, payload)

        if(res?.data?.success){
            notifySuccess('Applicants CBT Questions Submitted')
        }

        return res
    } catch (error) {
        notifyError(error?.response?.data?.message || 'Unable to Submit Applicants CBT Questions')
        
    }
}


export const updateQuestion = async (id, payload)=> {
    try {
        const res = await axios.patch(`/cbt/update/${id}`, payload)

        if(res?.data?.success){
            notifySuccess('Question Updated')
        }

        return res
    } catch (error) {
        notifyError(error?.response?.data?.message || 'Unable to Update Question')
        
    }
}

export const deleteQuestion = async (id)=> {
    try {
        const res = await axios.delete(`/cbt/delete/${id}`)

        if(res?.data?.success){
            notifySuccess('Question Deleted')
        }

        return res
    } catch (error) {
        notifyError(error?.response?.data?.message || 'Unable to Delete Question')
        
    }
}

export const submitAnswers = async (payload)=> {
    try {
        const res = await axios.post(`/cbt/answers`, payload)

        if(res?.data?.success){
            notifySuccess('Anwers Submitted')
        }

        return res
    } catch (error) {
        notifyError(error?.response?.data?.message || 'Unable to Submit Answer')
        
    }
}

export const submitApplicantAnswers = async (payload)=> {
    try {
        const res = await axios.post(`/cbt/createapplicant`, payload)

        if(res?.data?.success){
            notifySuccess('Anwers Submitted')
        }

        return res
    } catch (error) {
        notifyError(error?.response?.data?.message || 'Unable to Submit Answer')
        
    }
}

export const gradeEssayAnswer = async (id, payload)=> {
    try {
        const res = await axios.put(`/cbt/addessayscore/${id}`, payload)

        if(res?.data?.success){
            notifySuccess('Anwer Graded')
        }

        return res
    } catch (error) {
        notifyError(error?.response?.data?.message || 'Unable to Grade Answer')
        
    }
}

export const fetchApplicantCBTQuestions = createAsyncThunk('/CBT/FetchCBTQuestions', async (query) => {
    try {
      const response = await axios.get(`/cbt/applicantquestions?page=${query.page}&limit=${query.limit}&applicantId=${query.applicantId}&subjectId=${query.subjectId}&sessionId=${query.sessionId}`)
  
      return response
    } catch (error) {
  
    }
  })
