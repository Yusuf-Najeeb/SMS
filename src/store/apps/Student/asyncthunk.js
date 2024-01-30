import axios from 'axios'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const CreateStudents = createAsyncThunk('/StudentData/CreateStudents/', async vals => {
  try {
    const response = await axios.post('/auth/registerstudent', vals)

    notifySuccess('student created successfully')

    return response
  } catch (error) {
    console.log(error, 'error')
    notifyError('Error creating students')

    // return {
    //   success: false
    // }
  }
})

export const fetchStudents = createAsyncThunk('/StudentData/fetchStaffs', async () => {
  try {
    const response = await axios.get('/students/allstudents')
    console.log(response, 'respone')
    //notifySuccess('Students gotten successfully')

    return response
  } catch (error) {
    console.log(error, 'error')
    notifyError('Error fetching students')

    // return {
    //   success: false
    // }
  }
})

// export const fetchStudentByExam = async email => {
//   try {
//     const response = await axios.get(`/api/students/getstudentexam/${email}`)

//     // notifySuccess('student created successfully')

//     return response
//   } catch (error) {
//     console.log(error, 'error')
//     notifyError('Error fetching student')

//     // return {
//     //   success: false
//     // }
//   }
// }

// export const fetchStudentBySubjectTeacher = async email => {
//   try {
//     const response = await axios.get(`/api/students/getstudentsubjectsandteachers/${email}`)

//     // notifySuccess('student created successfully')

//     return response
//   } catch (error) {
//     console.log(error, 'error')
//     notifyError('Error fetching student Exams')

//     // return {
//     //   success: false
//     // }
//   }
// }

// export const fetchStudentByRoom = async email => {
//   try {
//     const response = await axios.get(`/api/students/getstudentroom/${email}`)

//     // notifySuccess('student created successfully')

//     return response
//   } catch (error) {
//     console.log(error, 'error')
//     notifyError('Error fetching student Exams')

//     // return {
//     //   success: false
//     // }
//   }
// }

// export const fetchStudentByHouseMaster = async email => {
//   try {
//     const response = await axios.get(`/api/students/getstudentroomstaff/${email}`)

//     // notifySuccess('student created successfully')

//     return response
//   } catch (error) {
//     console.log(error, 'error')
//     notifyError('Error fetching student Exams')

//     // return {
//     //   success: false
//     // }
//   }
// }

// export const updateStudent = createAsyncThunk('updateStudent', async query => {
//   try {
//     const response = await axios.patch(`/api/students/updatestudent/`, {
//       params: {
//         page: query.page,
//         limit: query.limit
//       }
//     })

//     return response
//   } catch (error) {
//     console.log(error, 'errorrrr')

//     // notifyError('Error Fetching Salary Items')
//   }
// })

// export const deleteRole = createAsyncThunk('deleterole', async id => {
//   try {
//     const response = await axios.patch(`role/${id}`)

//     if (response.data.success) {
//       notifySuccess('Roles Deleted Successfully')
//     }

//     return {
//       status: true
//     }
//   } catch (error) {
//     notifyError('Error deleting Role')

//     return {
//       status: false
//     }
//   }
// })
