import { useAppSelector } from '.'
import { useMemo } from 'react'

export const useGradingParameters = () => {
  const GradingParametersList = useAppSelector(store => store.gradingParameters.GradingParametersList)
  const loading = useAppSelector(store => store.gradingParameters.loading)
  const paging = useAppSelector(store => store.gradingParameters.paging)

  return useMemo(() => [GradingParametersList, loading, paging], [GradingParametersList, loading, paging])
}
