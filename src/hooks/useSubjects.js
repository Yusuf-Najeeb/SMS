import { useAppSelector } from '.'
import { useMemo } from 'react'

export const useSubjects = () => {
  const SubjectsList = useAppSelector(store => store.subjects.SubjectsList)
  const loading = useAppSelector(store => store.subjects.loading)
  const paging = useAppSelector(store => store.subjects.paging)

  return useMemo(() => [SubjectsList, loading, paging], [SubjectsList, loading, paging])
}
