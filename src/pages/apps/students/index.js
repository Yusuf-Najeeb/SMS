
import { useEffect } from "react"
import StudentsTable from "../../../views/users/Student/StudentsTable"
import { fetchClasses } from "../../../store/apps/classes/asyncthunk"

import { useAppDispatch } from 'src/hooks'


const StudentsHome = () => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchClasses({ page: 1, limit: 300, key: '' }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <StudentsTable />
}

export default StudentsHome