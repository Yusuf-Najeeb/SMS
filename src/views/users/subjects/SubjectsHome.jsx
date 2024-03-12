import GetUserData from '../../../@core/utils/getUserData'
import SubjectsTable from './SubjectsTable'
import SubjectsTableForTeacher from './SubjectsTableForTeacher'


const SubjectsHome = () => {

    const userData = GetUserData()

    if(userData?.role?.name == 'super-admin' || userData?.role?.name == 'admin' ) {
  return <SubjectsTable />
    }  else {
    return <SubjectsTableForTeacher />
  }
}

export default SubjectsHome