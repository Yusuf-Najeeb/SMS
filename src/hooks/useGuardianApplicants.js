import { useAppSelector } from '.'
import { useMemo } from 'react'

export const useGuardianApplicants = () => {
  const ApplicantsData = useAppSelector(store => store.applicants.GuardianApplicantsData)
  const loading = useAppSelector(store => store.applicants.loadingGuardianApplicants)

//   const paging = useAppSelector(store => store.applicants.paging)

  return useMemo(() => [ApplicantsData, loading], [ApplicantsData, loading])
}
