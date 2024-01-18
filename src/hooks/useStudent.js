import { useAppSelector } from '.'
import { useMemo } from 'react'
export const useStudent = () => {
  const StudentData = useAppSelector(store => store.student.StudentData)
  const loading = useAppSelector(store => store.student.loading)
  const paging = useAppSelector(store => store.student.paging)

  return useMemo(() => [StudentData, loading, paging], [StudentData, loading, paging])
}
