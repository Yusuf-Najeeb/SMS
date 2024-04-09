import StudResultTab from '../../../views/users/StudentResultManager/StudResultTab'

const StudentResultManager = ({ tab }) => {
  return <StudResultTab tab={tab} />
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
