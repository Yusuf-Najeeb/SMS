import { useAppSelector } from '.'
import { useMemo } from 'react'

export const useApplicantsSubjects = () => {
  const ApplicantsSubjectsData = useAppSelector(store => store.applicantsSubjects.ApplicantsSubjectsData)
  const loading = useAppSelector(store => store.applicantsSubjects.loading)

  return useMemo(() => [ApplicantsSubjectsData, loading], [ApplicantsSubjectsData, loading])
}
