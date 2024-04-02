import axios from 'axios'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { createAsyncThunk } from '@reduxjs/toolkit'




export const fetchCBTQuestions = createAsyncThunk('/CBT/FetchCBTQuestions', async (query) => {
  try {
    const response = await axios.get(`/cbt/allquestions?page=${query.page}&limit=10&staffId=${query.staffId}&classId=${query.classId}&subjectId=${query.subjectId}&categoryId=${query.categoryId}&sessionId=${query.sessionId}`)

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
