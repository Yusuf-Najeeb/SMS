import React from 'react'
import CbtTab from '../../../views/users/cbt/CbtTabs'


const TeachersCbt = ({ tab }) => {
  return <CbtTab tab={tab} />
}

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { tab: 'questions' } },
      { params: { tab: 'answers' } },
    ],
    fallback: false
  }
}

export const getStaticProps = async ({ params }) => {
  return {
    props: {
      tab: params?.tab
    }
  }
}

export default TeachersCbt
