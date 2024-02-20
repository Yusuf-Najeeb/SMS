import React from 'react'
import ClassTab from '../../../views/users/classes/ClassTabs'


const Class = ({ tab }) => {
  return <ClassTab tab={tab} />
}

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { tab: 'classes' } },
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

export default Class
