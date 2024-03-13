import GetUserData from '../../../@core/utils/getUserData'
import SubjectCategoriesTableForNonAdmin from './CategoriesForNonAdmin'
import SubjectCategoriesTable from './SubjectCategoriesTable'


const CategoriesHome = () => {

    const userData = GetUserData()

    if(userData?.role?.name == 'super-admin' || userData?.role?.name == 'admin' ) {
  return <SubjectCategoriesTable />
    }  else {
    return <SubjectCategoriesTableForNonAdmin />
  }
}

export default CategoriesHome