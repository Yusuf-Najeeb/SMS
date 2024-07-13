
import AttendanceTabs from '../../../views/users/Attendance/AttendanceTabs'


const Attendance = ({ tab }) => {
  return <AttendanceTabs tab={tab} />
}

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { tab: 'classAttendance' } },
      { params: { tab: 'editClassAttendance' } },
      { params: { tab: 'sessionAttendance' } },
      
      
    //   { params: { tab: 'reportCard' } },
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

export default Attendance
