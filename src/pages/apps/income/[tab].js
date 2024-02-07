import React from 'react'
import IncomeTab from '../../../views/users/Income/IncomeTab'


const Income = ({ tab }) => {
  return <IncomeTab tab={tab} />
}

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { tab: 'income' } },
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
