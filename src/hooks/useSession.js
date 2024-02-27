import { useAppSelector } from '.'
import { useMemo } from 'react'

export const useSession = () => {
  const SessionData = useAppSelector(store => store.session.SessionData)
  const loading = useAppSelector(store => store.session.loading)
  const paging = useAppSelector(store => store.session.paging)

  return useMemo(() => [SessionData, loading, paging], [SessionData, loading, paging])
}
