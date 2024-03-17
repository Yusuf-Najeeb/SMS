import { useMemo } from 'react'
import { useAppSelector } from '.'

export const useStudentSubjectPosition = () => {

  const StudentSubjectPosition = useAppSelector(store => store.reportCard.StudentSubjectPosition)
  const loading = useAppSelector(store => store.reportCard.loadingStudentSubjectPosition)

  return useMemo(() => [StudentSubjectPosition, loading], [StudentSubjectPosition, loading])
}
