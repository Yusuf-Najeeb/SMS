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
