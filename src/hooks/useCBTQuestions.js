import { useAppSelector } from '.'
import { useMemo } from 'react'

export const useCBTQuestions = () => {
  const QuestionsData = useAppSelector(store => store.cbt.QuestionsData)
  const loading = useAppSelector(store => store.cbt.loading)

  const paging = useAppSelector(store => store.cbt.paging)

  return useMemo(() => [QuestionsData, loading, paging], [QuestionsData, loading, paging])
}
