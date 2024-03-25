
import GetUserData from '../../../@core/utils/getUserData'
import AllApplicantsTable from './AllApplicantsTable'
import ApplicantsTableForParents from './ApplicantsTableForParents'


const ApplicantsHome = () => {

    const userData = GetUserData()


    if(userData?.role?.name == 'super-admin') {
  return <AllApplicantsTable />
    }  else {
    return <ApplicantsTableForParents />
  }
}

export default ApplicantsHome