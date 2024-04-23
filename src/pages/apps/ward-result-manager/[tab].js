import ResultManagerTabs from '../../../views/users/GuardianResultManager/ResulManagerTabs'

const StudentResultManager = ({ tab }) => {
  return <ResultManagerTabs tab={tab} />
}

export const getStaticPaths = () => {
  return {
    paths: [{ params: { tab: 'reportCard' } }, { params: { tab: 'transcript' } }],
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

export default StudentResultManager
