import axios from 'axios'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { createAsyncThunk } from '@reduxjs/toolkit'




export const fetchPsychomotorSkillsForClass = createAsyncThunk('/skills/class', async (query) => {
  try {
    const response = await axios.get(`/nonacademic/skills/${query.staffId}/${query.classId}/${query.sessionId}`)

    return response
  } catch (error) {

  }
})

export const fetchPsychomotorSkillsForStudents = createAsyncThunk('/skills/class', async (query) => {
    try {
      const response = await axios.get(`/nonacademic/skills/student/${query.studentId}/${query.classId}/${query.sessionId}`)
  
      return response
    } catch (error) {
  
    }
  })

  export const createPsychomotorSkills = async (payload)=> {
    try {
        const response = await axios.post('/nonacademic/skills', payload)

        if(response?.data?.success){
            notifySuccess('Psychomotor skills Added')
        }

        return response
    } catch (error) {
        notifyError(error?.response?.data?.message || 'Unable to add psychomotor skills')
        
    }
  }

  export const updatePsychomotorSkills = async (id, payload)=> {
    try {
        const response = await axios.patch(`/nonacademic/skills/${id}`, payload)

        if(response?.data?.success){
            notifySuccess('Psychomotor skills Updated')
        }

        return response
    } catch (error) {
        notifyError(error?.response?.data?.message || 'Unable to update psychomotor skills')
    }
  }


  export const deletePsychomotorSkills = async (id)=> {
    try {
        const response = await axios.delete(`/nonacademic/skills/${id}`)

        if(response?.data?.success){
            notifySuccess('Psychomotor Skills Deleted For Student')
        }

        return response
    } catch (error) {
        notifyError(error?.response?.data?.message || 'Unable to psychomotor skills for student')
    }
  }