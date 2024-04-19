import React from 'react'
import AffectiveTraitsTabs from '../../../views/users/AffectiveTraits/AffectiveTraitsTabs'


const AffectiveTraits = ({ tab }) => {
  return <AffectiveTraitsTabs tab={tab} />
}

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { tab: 'class' } },
      { params: { tab: 'students' } },
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

export default AffectiveTraits
