
// import { useMemo } from 'react'
// import { useAppSelector } from '.'

// export const useAuth = () => {
//   const loggedInUser = useAppSelector(store => store.auth.user)
//   const userLoadingStatus = useAppSelector(store => store.auth.loading)

//   return useMemo(() => [loggedInUser, userLoadingStatus], [loggedInUser, userLoadingStatus])
// }

import { useContext } from 'react'
import { AuthContext } from 'src/context/AuthContext'

export const useAuth = () => useContext(AuthContext)

