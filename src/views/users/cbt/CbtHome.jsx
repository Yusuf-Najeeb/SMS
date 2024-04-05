import React from 'react'
import GetUserData from '../../../@core/utils/getUserData'
import CBTQuestions from './CBTQuestions'
import CBTQuestionsForStudents from './CbtQuestionsForStudents'

// ** Component Import
import NotAuthorized from 'src/pages/401'
import BlankLayout from 'src/@core/layouts/BlankLayout'

const userData = GetUserData()

const CbtHome = () => {

    if(userData?.role?.name == 'super-admin' || userData?.role?.name == 'admin' || userData?.role?.name == 'teacher' ) {
  return (
    <CBTQuestions />
  )
    } else if (userData?.role?.name == 'student'){
        return (
            <CBTQuestionsForStudents />
        )
    } else {
        return (
            <BlankLayout>
  <NotAuthorized />
</BlankLayout>
        )
    }
}

export default CbtHome