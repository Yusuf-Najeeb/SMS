import React from 'react'
import ExpenditureTab from '../../../views/users/expenditure/ExpenditureTab'


const Income = ({ tab }) => {
  return <ExpenditureTab tab={tab} />
}

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { tab: 'expenditure' } },
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
