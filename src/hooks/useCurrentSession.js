import { useAppSelector } from '.'
import { useMemo } from 'react'

export const useCurrentSession = () => {
  const CurrentSessionData = useAppSelector(store => store.currentSession.CurrentSessionData)

  return useMemo(() => [CurrentSessionData], [CurrentSessionData])
}
