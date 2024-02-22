import React from 'react'
import SubjectTab from '../../../views/users/subjects/SubjectTabs'


const Income = ({ tab }) => {
  return <SubjectTab tab={tab} />
}

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { tab: 'subjects' } },
      { params: { tab: 'categories' } },
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

export default Income
