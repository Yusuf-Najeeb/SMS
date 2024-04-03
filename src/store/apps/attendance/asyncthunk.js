import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'

export const fetchClassAttendance = createAsyncThunk('class-attendance', async query => {
  try {
    const response = await axios.get(`/attendance/classattendance/${query.classId}/${query.sessionId}/${query.date}`)

    return response
  } catch (error) {
    //   notifyError('Error fetching Guardian')
  }
})

export const saveStudentAttendance = async payload => {
  try {
    const response = await axios.post('/attendance/record', payload)

    if (response.data.success) {
      notifySuccess('Student Attendance Saved')
    }

    return response
  } catch (error) {
    notifyError(error.response.data.message || "Unable to Save Student's Attendance")
  }
}

export const updateAttendance = async (payload, id) => {
  try {
    const response = await axios.patch(`/attendance/updateattendance?id=${id}`, payload)

    if (response.data.success) {
      notifySuccess('Student Attendance Updated')
    }

    return response
  } catch (error) {
    notifyError("Unable to update student's Attendance")
  }
}
