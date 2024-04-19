import axios from 'axios'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { createAsyncThunk } from '@reduxjs/toolkit'




export const fetchAffectiveTraitsForClass = createAsyncThunk('/traits/class', async (query) => {
  try {
    const response = await axios.get(`/nonacademic/traits/${query.staffId}/${query.classId}/${query.sessionId}`)

    return response
  } catch (error) {

  }
})

export const fetchAffectiveTraitsForStudents = createAsyncThunk('/traits/class', async (query) => {
    try {
      const response = await axios.get(`/nonacademic/traits/student/${query.studentId}/${query.classId}/${query.sessionId}`)
  
      return response
    } catch (error) {
  
    }
  })

  export const createAffectiveTraits = async (payload)=> {
    try {
        const response = await axios.post('/nonacademic/traits', payload)

        if(response?.data?.success){
            notifySuccess('Affective Traits Created')
        }

        return response
    } catch (error) {
        notifyError(error?.response?.data?.message || 'Unable to create trait')
        
    }
  }

  export const updateAffectiveTraits = async (id, payload)=> {
    try {
        const response = await axios.patch(`/nonacademic/traits/${id}`, payload)

        if(response?.data?.success){
            notifySuccess('Affective Traits Updated')
        }

        return response
    } catch (error) {
        notifyError(error?.response?.data?.message || 'Unable to update trait')
    }
  }

  export const deleteAffectiveTraits = async (id)=> {
    try {
        const response = await axios.delete(`/nonacademic/traits/${id}`)

        if(response?.data?.success){
            notifySuccess('Affective Traits Deleted')
        }

        return response
    } catch (error) {
        notifyError(error?.response?.data?.message || 'Unable to delete trait')
    }
  }
