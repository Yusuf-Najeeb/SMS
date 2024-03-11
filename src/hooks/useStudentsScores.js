import { useMemo } from 'react'
import { useAppSelector } from '.'

export const useStudentsScores = () => {

  const StudentsScoresData = useAppSelector(store => store.reportCard.StudentsScoresData)
  const loading = useAppSelector(store => store.reportCard.loading)

  return useMemo(() => [StudentsScoresData, loading], [StudentsScoresData, loading])
}
