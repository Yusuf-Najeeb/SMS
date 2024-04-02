import { useAppSelector } from '.'
import { useMemo } from 'react'

export const useApplicants = () => {
  const ApplicantsData = useAppSelector(store => store.applicants.ApplicantsData)
  const loading = useAppSelector(store => store.applicants.loading)

//   const paging = useAppSelector(store => store.applicants.paging)

  return useMemo(() => [ApplicantsData, loading], [ApplicantsData, loading])
}
