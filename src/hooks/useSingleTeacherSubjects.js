import { useAppSelector } from '.'
import { useMemo } from 'react'

export const useSingleTeacherSubjects = () => {
  const SubjectsList = useAppSelector(store => store.singleTeacherSubjects.SubjectsList)
  const loading = useAppSelector(store => store.singleTeacherSubjects.loading)

  return useMemo(() => [SubjectsList, loading], [SubjectsList, loading])
}
