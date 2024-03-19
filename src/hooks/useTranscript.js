import { useMemo } from 'react'
import { useAppSelector } from '.'

export const useTranscript = () => {

  const StudentTranscript = useAppSelector(store => store.reportCard.StudentsTranscript)
  const loading = useAppSelector(store => store.reportCard.loadingStudentTranscript)

  return useMemo(() => [StudentTranscript, loading], [StudentTranscript, loading])
}
