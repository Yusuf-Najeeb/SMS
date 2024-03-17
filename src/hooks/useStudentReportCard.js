import { useMemo } from 'react'
import { useAppSelector } from '.'

export const useStudentReportCard = () => {

  const StudentReportCard = useAppSelector(store => store.reportCard.StudentReportCard)
  const loading = useAppSelector(store => store.reportCard.loadingReportCard)

  return useMemo(() => [StudentReportCard, loading], [StudentReportCard, loading])
}
